
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ExternalLink, Rocket, Telescope } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AstronomicalEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  year: number;
  category: string;
  imageUrl: string;
  references?: string[];
}

const OnThisDaySection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock astronomical events data - in real app, this would come from an API
  const mockEvents: AstronomicalEvent[] = [
    {
      id: 1,
      title: "Sputnik 1 Launch",
      description: "The Soviet Union successfully launched Sputnik 1, the first artificial satellite to orbit Earth. This historic event marked the beginning of the Space Age and sparked the Space Race between the Soviet Union and the United States.",
      date: "October 4",
      year: 1957,
      category: "Space Mission",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
      references: ["NASA Historical Archive", "Space History Database"]
    },
    {
      id: 2,
      title: "Apollo 11 Moon Landing",
      description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon while Michael Collins orbited above. Armstrong's famous words 'That's one small step for man, one giant leap for mankind' marked this historic achievement.",
      date: "July 20",
      year: 1969,
      category: "Moon Mission",
      imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=600&fit=crop",
      references: ["NASA Apollo Archive", "Lunar Sample Laboratory"]
    },
    {
      id: 3,
      title: "Hubble Space Telescope Launch",
      description: "The Hubble Space Telescope was deployed by Space Shuttle Discovery, revolutionizing our understanding of the universe with unprecedented views of distant galaxies, nebulae, and cosmic phenomena.",
      date: "April 24",
      year: 1990,
      category: "Space Telescope",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop",
      references: ["STScI Archive", "Hubble Heritage Project"]
    },
    {
      id: 4,
      title: "Cassini-Huygens Saturn Arrival",
      description: "The Cassini spacecraft entered orbit around Saturn, beginning a 13-year mission that would transform our understanding of the ringed planet and its moons, including the discovery of liquid water on Enceladus.",
      date: "July 1",
      year: 2004,
      category: "Planetary Mission",
      imageUrl: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&h=600&fit=crop",
      references: ["JPL Mission Archive", "Cassini Imaging Science"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const timer = setTimeout(() => {
      // Filter events based on selected date (for demo, we'll show all events)
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  const formatDateForDisplay = (date: Date) => {
    return format(date, "MMMM d, yyyy");
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the astronomical events and space missions that happened on this day throughout history
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
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto bg-slate-900 text-purple-200")}
                />
              </PopoverContent>
            </Popover>
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
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-600/80 text-purple-100">
                        {event.category === 'Space Mission' && <Rocket className="w-3 h-3 mr-1" />}
                        {event.category === 'Space Telescope' && <Telescope className="w-3 h-3 mr-1" />}
                        {event.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <CardTitle className="text-xl font-bold text-purple-200 mb-2">
                      {event.title}
                    </CardTitle>
                    <p className="text-sm text-purple-300 mb-2">
                      {event.date}, {event.year}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  
                  {event.references && (
                    <div className="space-y-2">
                      <p className="text-xs text-purple-400 font-medium">References:</p>
                      {event.references.map((ref, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          <span className="text-xs text-gray-400">{ref}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <Telescope className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-purple-200 mb-2">No Events Found</h3>
            <p className="text-gray-400">
              No astronomical events recorded for {formatDateForDisplay(selectedDate)}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnThisDaySection;
