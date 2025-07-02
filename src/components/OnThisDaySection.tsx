
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
  month: number;
  day: number;
  year: number;
  category: string;
  imageUrl: string;
  references?: string[];
}

const OnThisDaySection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<AstronomicalEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Comprehensive astronomical events database organized by month and day
  const astronomicalEventsDB: AstronomicalEvent[] = [
    // July 2nd events
    {
      id: 1,
      title: "Giotto Spacecraft Launched",
      description: "The European Space Agency's Giotto spacecraft was launched to intercept Halley's Comet. It became the first spacecraft to approach the nucleus of a comet closely, providing unprecedented images and data about comet composition.",
      month: 7,
      day: 2,
      year: 1985,
      category: "Space Mission",
      imageUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop",
      references: ["ESA Mission Archive", "Comet Research Database"]
    },
    {
      id: 2,
      title: "Solar Eclipse Expedition",
      description: "A total solar eclipse was visible across the Pacific Ocean. This eclipse was particularly significant for astronomical research, allowing scientists to study the solar corona and verify Einstein's theory of general relativity through light deflection measurements.",
      month: 7,
      day: 2,
      year: 2019,
      category: "Solar Eclipse",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      references: ["International Astronomical Union", "Eclipse Research Consortium"]
    },
    
    // July 20th - Apollo 11
    {
      id: 3,
      title: "Apollo 11 Moon Landing",
      description: "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon while Michael Collins orbited above. Armstrong's famous words 'That's one small step for man, one giant leap for mankind' marked this historic achievement.",
      month: 7,
      day: 20,
      year: 1969,
      category: "Moon Mission",
      imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800&h=600&fit=crop",
      references: ["NASA Apollo Archive", "Lunar Sample Laboratory"]
    },
    
    // October 4th - Sputnik
    {
      id: 4,
      title: "Sputnik 1 Launch",
      description: "The Soviet Union successfully launched Sputnik 1, the first artificial satellite to orbit Earth. This historic event marked the beginning of the Space Age and sparked the Space Race between the Soviet Union and the United States.",
      month: 10,
      day: 4,
      year: 1957,
      category: "Space Mission",
      imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      references: ["NASA Historical Archive", "Space History Database"]
    },
    
    // April 24th - Hubble
    {
      id: 5,
      title: "Hubble Space Telescope Launch",
      description: "The Hubble Space Telescope was deployed by Space Shuttle Discovery, revolutionizing our understanding of the universe with unprecedented views of distant galaxies, nebulae, and cosmic phenomena.",
      month: 4,
      day: 24,
      year: 1990,
      category: "Space Telescope",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop",
      references: ["STScI Archive", "Hubble Heritage Project"]
    },
    
    // July 1st - Cassini
    {
      id: 6,
      title: "Cassini-Huygens Saturn Arrival",
      description: "The Cassini spacecraft entered orbit around Saturn, beginning a 13-year mission that would transform our understanding of the ringed planet and its moons, including the discovery of liquid water on Enceladus.",
      month: 7,
      day: 1,
      year: 2004,
      category: "Planetary Mission",
      imageUrl: "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&h=600&fit=crop",
      references: ["JPL Mission Archive", "Cassini Imaging Science"]
    },
    
    // Add more events for July 2nd
    {
      id: 7,
      title: "Mars Pathfinder Landing",
      description: "NASA's Mars Pathfinder successfully landed on Mars, deploying the Sojourner rover - the first successful U.S. mission to Mars since the Viking missions of 1976. It provided valuable data about Martian geology and atmosphere.",
      month: 7,
      day: 4,
      year: 1997,
      category: "Mars Mission",
      imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
      references: ["NASA JPL", "Mars Exploration Program"]
    }
  ];

  useEffect(() => {
    setLoading(true);
    
    // Filter events based on selected date
    const selectedMonth = selectedDate.getMonth() + 1; // getMonth() returns 0-11
    const selectedDay = selectedDate.getDate();
    
    const filteredEvents = astronomicalEventsDB.filter(event => 
      event.month === selectedMonth && event.day === selectedDay
    );
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setEvents(filteredEvents);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  const formatDateForDisplay = (date: Date) => {
    return format(date, "MMMM d, yyyy");
  };

  const getDateKey = (date: Date) => {
    return `${date.getMonth() + 1}-${date.getDate()}`;
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
        ) : events.length > 0 ? (
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
                      {format(new Date(event.year, event.month - 1, event.day), "MMMM d, yyyy")}
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
        ) : (
          <div className="text-center py-16">
            <div className="mb-4">
              <Telescope className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            </div>
            <h3 className="text-2xl font-bold text-purple-200 mb-2">No Events Found</h3>
            <p className="text-gray-400">
              No astronomical events recorded for {formatDateForDisplay(selectedDate)}. Try selecting a different date to discover other cosmic moments in history!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OnThisDaySection;
