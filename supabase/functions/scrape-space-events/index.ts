
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WikipediaEvent {
  text: string;
  pages: Array<{
    title: string;
    extract: string;
    content_urls: {
      desktop: {
        page: string;
      };
    };
  }>;
  year: number;
}

interface SpaceEvent {
  title: string;
  description: string;
  details: string;
  event_date: string;
  year: number;
  type: string;
  image_urls: string[];
  references: string[];
}

const SPACE_KEYWORDS = [
  'NASA', 'astronaut', 'space', 'moon', 'Mars', 'launch', 'ISS', 
  'satellite', 'observatory', 'cosmic', 'Hubble', 'ESA', 'spacecraft',
  'rocket', 'mission', 'orbit', 'planet', 'solar', 'universe', 'galaxy',
  'Apollo', 'Soyuz', 'SpaceX', 'telescope', 'comet', 'asteroid', 'eclipse',
  'supernova', 'lunar', 'stellar', 'interstellar', 'nebula', 'meteor'
];

const EVENT_TYPES = {
  'launch': ['launch', 'launched', 'mission', 'lift off', 'takeoff'],
  'discovery': ['discover', 'found', 'observed', 'detected', 'spotted'],
  'eclipse': ['eclipse', 'occultation', 'transit'],
  'milestone': ['first', 'land', 'orbit', 'dock', 'return', 'achievement']
};

function determineEventType(text: string): string {
  const lowerText = text.toLowerCase();
  
  for (const [type, keywords] of Object.entries(EVENT_TYPES)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      return type;
    }
  }
  
  return 'other';
}

function isSpaceRelated(text: string): boolean {
  const lowerText = text.toLowerCase();
  return SPACE_KEYWORDS.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

async function fetchNASAImages(query: string): Promise<string[]> {
  try {
    const searchQuery = encodeURIComponent(query.replace(/[^\w\s]/g, '').substring(0, 50));
    const response = await fetch(`https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image&page_size=2`);
    
    if (!response.ok) return [];
    
    const data = await response.json();
    const images: string[] = [];
    
    if (data.collection?.items) {
      for (const item of data.collection.items.slice(0, 2)) {
        if (item.links?.[0]?.href) {
          images.push(item.links[0].href);
        }
      }
    }
    
    return images;
  } catch (error) {
    console.error('NASA API error:', error);
    return [];
  }
}

async function scrapeWikipediaEvents(month: number, day: number): Promise<SpaceEvent[]> {
  const monthStr = month.toString().padStart(2, '0');
  const dayStr = day.toString().padStart(2, '0');
  
  try {
    console.log(`Fetching Wikipedia events for ${monthStr}/${dayStr}...`);
    
    // Use the correct Wikipedia REST API endpoint for "On This Day" events
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${monthStr}/${dayStr}`,
      {
        headers: {
          'User-Agent': 'CosmicChronicles/1.0 (https://example.com/contact)',
          'Accept': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      console.error(`Wikipedia API error for ${monthStr}/${dayStr}:`, response.status);
      return [];
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error(`Expected JSON, got ${contentType} for ${monthStr}/${dayStr}`);
      return [];
    }
    
    const data = await response.json();
    const spaceEvents: SpaceEvent[] = [];
    
    if (data.events && Array.isArray(data.events)) {
      console.log(`Processing ${data.events.length} events for ${monthStr}/${dayStr}`);
      
      for (const event of data.events) {
        const eventText = event.text || '';
        const eventYear = event.year || new Date().getFullYear();
        
        if (isSpaceRelated(eventText)) {
          console.log(`Found space event for ${monthStr}/${dayStr}: ${eventText.substring(0, 100)}...`);
          
          const page = event.pages?.[0];
          const title = page?.title || eventText.substring(0, 100);
          const description = eventText;
          const details = page?.extract || eventText;
          const references = page?.content_urls?.desktop?.page ? [page.content_urls.desktop.page] : [];
          
          // Fetch NASA images
          const imageQuery = title.replace(/[^\w\s]/g, '').substring(0, 30);
          const images = await fetchNASAImages(imageQuery);
          
          // Add fallback space image if no NASA images found
          const finalImages = images.length > 0 ? images : [
            'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop'
          ];
          
          spaceEvents.push({
            title: title.substring(0, 200),
            description: description.substring(0, 500),
            details: details.substring(0, 1000),
            event_date: `${eventYear}-${monthStr}-${dayStr}`,
            year: eventYear,
            type: determineEventType(eventText),
            image_urls: finalImages,
            references: references
          });
        }
      }
    } else {
      console.log(`No events array found for ${monthStr}/${dayStr}`);
    }
    
    return spaceEvents;
  } catch (error) {
    console.error(`Error scraping ${monthStr}/${dayStr}:`, error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'scrape';
    
    if (action === 'scrape') {
      console.log('Starting Wikipedia scraping for all 365 days...');
      
      let totalEvents = 0;
      const errors: string[] = [];
      
      // Clear existing data to avoid duplicates
      console.log('Clearing existing space events...');
      const { error: deleteError } = await supabaseClient
        .from('space_events')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (deleteError) {
        console.error('Error clearing existing data:', deleteError);
      }
      
      // Loop through all 365 days
      for (let month = 1; month <= 12; month++) {
        const daysInMonth = new Date(2024, month, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          try {
            console.log(`Scraping events for ${month}/${day}...`);
            
            const events = await scrapeWikipediaEvents(month, day);
            
            if (events.length > 0) {
              // Insert events into Supabase
              const { error } = await supabaseClient
                .from('space_events')
                .insert(events);
              
              if (error) {
                console.error(`Database error for ${month}/${day}:`, error);
                errors.push(`${month}/${day}: ${error.message}`);
              } else {
                totalEvents += events.length;
                console.log(`✅ Inserted ${events.length} events for ${month}/${day}`);
              }
            } else {
              console.log(`No space events found for ${month}/${day}`);
            }
            
            // Small delay to be respectful to Wikipedia API
            await new Promise(resolve => setTimeout(resolve, 200));
            
          } catch (error) {
            console.error(`Error processing ${month}/${day}:`, error);
            errors.push(`${month}/${day}: ${error.message}`);
          }
        }
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          message: `Scraping completed! Inserted ${totalEvents} space events.`,
          totalEvents,
          errors: errors.slice(0, 10) // Limit error list
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }
    
    if (action === 'status') {
      // Check how many events we have in the database
      const { data, error } = await supabaseClient
        .from('space_events')
        .select('id, event_date')
        .order('event_date');
        
      if (error) {
        throw error;
      }
      
      return new Response(
        JSON.stringify({
          success: true,
          totalEvents: data?.length || 0,
          dateRange: data?.length > 0 ? {
            earliest: data[0]?.event_date,
            latest: data[data.length - 1]?.event_date
          } : null
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action parameter' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
