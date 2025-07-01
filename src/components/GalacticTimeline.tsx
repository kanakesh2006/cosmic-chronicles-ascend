
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TimelineEvent {
  id: number;
  date: string;
  year: number;
  title: string;
  description: string;
  category: 'mission' | 'discovery' | 'achievement' | 'phenomenon';
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "July 20, 1969",
    year: 1969,
    title: "Apollo 11 Moon Landing",
    description: "Neil Armstrong and Buzz Aldrin become the first humans to walk on the Moon, marking humanity's greatest space achievement.",
    category: "achievement",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    date: "April 12, 1961",
    year: 1961,
    title: "First Human in Space",
    description: "Yuri Gagarin completes the first human spaceflight aboard Vostok 1, orbiting Earth in 108 minutes.",
    category: "achievement",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    date: "September 5, 1977",
    year: 1977,
    title: "Voyager 1 Launch",
    description: "NASA launches Voyager 1, which would become the first human-made object to enter interstellar space.",
    category: "mission",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    date: "February 24, 1987",
    year: 1987,
    title: "Supernova 1987A",
    description: "The closest observed supernova since 1604, providing unprecedented insights into stellar death.",
    category: "phenomenon",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    date: "October 15, 1997",
    year: 1997,
    title: "Cassini-Huygens Launch",
    description: "The spacecraft begins its journey to Saturn, later providing detailed studies of the planet and its moons.",
    category: "mission",
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=300&fit=crop"
  }
];

const GalacticTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = filter === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(event => event.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mission': return 'bg-blue-500';
      case 'discovery': return 'bg-green-500';
      case 'achievement': return 'bg-purple-500';
      case 'phenomenon': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="galactic-timeline" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-5xl font-bold mb-6 relative z-20">
            <span className="cosmic-gradient bg-clip-text text-transparent">
              Galactic Timeline
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto relative z-20">
            Journey through the most significant moments in space exploration and cosmic discovery
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-12 relative z-20">
          {['all', 'mission', 'discovery', 'achievement', 'phenomenon'].map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`capitalize ${
                filter === category 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'border-purple-500 text-purple-300 hover:bg-purple-500/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative z-10">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 rounded-full opacity-50 z-0" />

          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } gap-8 relative z-10`}
              >
                {/* Timeline node */}
                <div className="relative flex-shrink-0 z-10">
                  <div className={`w-6 h-6 rounded-full ${getCategoryColor(event.category)} animate-glow relative z-10`} />
                  <div className="absolute inset-0 w-6 h-6 rounded-full bg-white opacity-20 animate-ping" />
                </div>

                {/* Event card */}
                <Card 
                  className={`flex-1 max-w-md glass-morphism hover:bg-white/10 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                    index % 2 === 0 ? 'ml-4' : 'mr-4'
                  } relative z-10`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        className={`${getCategoryColor(event.category)} text-white capitalize`}
                      >
                        {event.category}
                      </Badge>
                      <span className="text-purple-300 font-mono text-sm">{event.year}</span>
                    </div>
                    <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                    <p className="text-purple-200 text-sm">{event.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating cosmic elements */}
      <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 animate-float z-0" />
      <div className="absolute bottom-20 right-10 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-40 animate-float z-0" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default GalacticTimeline;
