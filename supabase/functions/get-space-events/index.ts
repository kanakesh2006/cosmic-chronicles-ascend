
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url);
    const date = url.searchParams.get('date'); // Expected format: MM-DD
    const year = url.searchParams.get('year');
    const limit = url.searchParams.get('limit') || '10';

    if (!date) {
      return new Response(
        JSON.stringify({ error: 'Date parameter is required (format: MM-DD)' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Parse the date
    const [month, day] = date.split('-').map(num => parseInt(num));
    
    if (!month || !day || month < 1 || month > 12 || day < 1 || day > 31) {
      return new Response(
        JSON.stringify({ error: 'Invalid date format. Use MM-DD (e.g., 07-20)' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Build query
    let query = supabaseClient
      .from('space_events')
      .select('*')
      .eq('extract(month from event_date)', month)
      .eq('extract(day from event_date)', day)
      .order('year', { ascending: false })
      .limit(parseInt(limit));

    // Add year filter if specified
    if (year) {
      query = query.eq('year', parseInt(year));
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    // Transform the data for frontend consumption
    const events = data?.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      details: event.details,
      date: event.event_date,
      year: event.year,
      type: event.type,
      category: event.type, // For compatibility with existing frontend
      imageUrl: event.image_urls?.[0] || 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
      image_urls: event.image_urls,
      references: event.references,
      source: 'wikipedia'
    })) || [];

    return new Response(
      JSON.stringify({
        success: true,
        date: date,
        events: events,
        count: events.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
