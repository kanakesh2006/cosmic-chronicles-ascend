
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ExternalLink, Rocket, Telescope, AlertCircle, Star, History } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { getEventsByDate, type HistoricalEvent } from '@/data/historicalEvents';

interface AstronomicalEvent {
  id: number;
  title: string;
  description: string;
  month: number;
  day: number;
  year: number;
  category: string;
  imageUrl: string;
  references?: string[];
  url?: string;
  source: 'nasa' | 'historical';
}

interface NASAApiResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const OnThisDaySection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const NASA_API_KEY = 'DvrFnIYNJ0Cj7btTNN2mdpSpKiBENWc0GZSjDxSd';

  // Cache management to reduce API calls
  const getCacheKey = (date: Date) => {
    return `nasa-apod-${format(date, 'yyyy-MM-dd')}`;
  };

  const getCachedData = (cacheKey: string): AstronomicalEvent[] | null => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsedData = JSON.parse(cached);
        // Check if cache is less than 24 hours old
        const cacheTime = new Date(parsedData.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - cacheTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff < 24) {
          return parsedData.data;
        }
      }
    } catch (e) {
      console.log('Cache read error:', e);
    }
    return null;
  };

  const setCachedData = (cacheKey: string, data: AstronomicalEvent[]) => {
    try {
      const cacheData = {
        data,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (e) {
      console.log('Cache write error:', e);
    }
  };

  const fetchNASAData = async (date: Date): Promise<AstronomicalEvent[]> => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    try {
      // NASA APOD API for the specific date
      const apodResponse = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${formattedDate}`
      );

      if (!apodResponse.ok) {
        throw new Error(`NASA API Error: ${apodResponse.status}`);
      }

      const apodData: NASAApiResponse = await apodResponse.json();
      
      const event: AstronomicalEvent = {
        id: Date.now(), // Unique ID for NASA events
        title: apodData.title,
        description: apodData.explanation,
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
        category: apodData.media_type === 'video' ? 'Space Video' : 'Astronomical Image',
        imageUrl: apodData.media_type === 'image' ? (apodData.hdurl || apodData.url) : 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop',
        references: ['NASA Astronomy Picture of the Day'],
        url: apodData.url,
        source: 'nasa'
      };

      return [event];
    } catch (error) {
      console.error('NASA API fetch error:', error);
      throw error;
    }
  };

  const getHistoricalEvents = (date: Date): AstronomicalEvent[] => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const historicalEvents = getEventsByDate(month, day);
    
    return historicalEvents.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      month: event.month,
      day: event.day,
      year: event.year,
      category: event.category,
      imageUrl: event.imageUrl,
      references: event.references,
      source: 'historical' as const
    }));
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Loading events for date:', format(selectedDate, 'yyyy-MM-dd'));
        
        // Always get historical events (no API calls needed)
        const historicalEvents = getHistoricalEvents(selectedDate);
        console.log('Found historical events:', historicalEvents.length);
        
        // Get NASA APOD data (with caching)
        const cacheKey = getCacheKey(selectedDate);
        const cachedNASAData = getCachedData(cacheKey);
        let nasaEvents: AstronomicalEvent[] = [];

        if (cachedNASAData) {
          console.log('Using cached NASA data for', format(selectedDate, 'yyyy-MM-dd'));
          nasaEvents = cachedNASAData;
        } else {
          try {
            console.log('Fetching NASA data for', format(selectedDate, 'yyyy-MM-dd'));
            nasaEvents = await fetchNASAData(selectedDate);
            setCachedData(cacheKey, nasaEvents);
          } catch (nasaError) {
            console.error('NASA API failed, using historical events only:', nasaError);
            // Don't throw error, just continue with historical events
          }
        }

        // Combine both sources
        const allEvents = [...nasaEvents, ...historicalEvents];
        console.log('Total events loaded:', allEvents.length);
        setEvents(allEvents);

      } catch (error) {
        console.error('Failed to load events:', error);
        setError('Failed to load some astronomical data. Showing available events.');
        // Show historical events even if NASA API fails
        const historicalEvents = getHistoricalEvents(selectedDate);
        setEvents(historicalEvents);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent rapid API calls when date changes
    const timer = setTimeout(loadEvents, 300);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  const formatDateForDisplay = (date: Date) => {
    return format(date, "MMMM d, yyyy");
  };

  const getEventIcon = (category: string, source: string) => {
    if (source === 'nasa') return <Star className="w-3 h-3 mr-1" />;
    if (category === 'Space Mission') return <Rocket className="w-3 h-3 mr-1" />;
    if (category === 'Discovery') return <Telescope className="w-3 h-3 mr-1" />;
    return <History className="w-3 h-3 mr-1" />;
  };

  const getEventBadgeColor = (source: string, category: string) => {
    if (source === 'nasa') return 'bg-blue-600/80 text-blue-100';
    if (category === 'Space Mission') return 'bg-purple-600/80 text-purple-100';
    if (category === 'Discovery') return 'bg-green-600/80 text-green-100';
    return 'bg-orange-600/80 text-orange-100';
  };

  return (
    <section id="on-this-day-section" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="cosmic-gradient bg-clip-text text-transparent">
              On This Day in Space
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            Discover historical astronomical events and NASA's featured content for this day
          </p>
          <p className="text-sm text-purple-400 mb-8">
            Combining historical space events with real-time NASA data
          </p>
          
          {/* Date Picker */}
          <div className="flex justify-center mb-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal bg-slate-800/50 border-purple-500/30 text-purple-200 hover:bg-purple-500/10",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? formatDateForDisplay(selectedDate) : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-900 border-purple-500/30" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    console.log('Date selected:', date);
                    if (date) setSelectedDate(date);
                  }}
                  initialFocus
                  disabled={(date) => date > new Date()}
                  className="p-3 pointer-events-auto bg-slate-900 text-purple-200"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Data Sources Notice */}
          <div className="mb-8 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Historical events database + NASA APOD (cached to preserve API limits)</span>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-purple-500/20 animate-pulse">
                <CardHeader>
                  <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
                  <div className="h-6 bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 mb-8">
            <div className="mb-4">
              <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-yellow-300 mb-2">Partial Data Available</h3>
            <p className="text-gray-400 mb-4">{error}</p>
          </div>
        ) : null}

        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={`${event.source}-${event.id}`} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                        getEventBadgeColor(event.source, event.category)
                      )}>
                        {getEventIcon(event.category, event.source)}
                        {event.source === 'nasa' ? 'NASA Featured' : event.category}
                      </span>
                    </div>
                    {event.source === 'historical' && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-700/80 text-slate-200">
                          {event.year}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-purple-200 mb-2">
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-purple-300 mb-2">
                      {event.source === 'historical' 
                        ? `${format(new Date(event.year, event.month - 1, event.day), "MMMM d, yyyy")}`
                        : formatDateForDisplay(selectedDate)
                      }
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
                    {event.description}
                  </p>
                  
                  {event.references && (
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-purple-400 font-medium">Sources:</p>
                      {event.references.map((ref, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-gray-400">{ref}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {event.url && (
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <a href={event.url} target="_blank" rel="noopener noreferrer">
                        View Full Content <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Telescope className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-purple-200 mb-2">No Events Found</h3>
            <p className="text-gray-400">
              No astronomical events found for {formatDateForDisplay(selectedDate)}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnThisDaySection;
