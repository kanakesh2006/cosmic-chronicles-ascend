
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CelestialObject {
  id: string;
  name: string;
  type: 'star' | 'planet' | 'constellation' | 'nebula';
  x: number;
  y: number;
  brightness: number;
  description: string;
  facts: string[];
}

const celestialObjects: CelestialObject[] = [
  {
    id: 'sirius',
    name: 'Sirius',
    type: 'star',
    x: 20,
    y: 30,
    brightness: 1,
    description: 'The brightest star in the night sky, also known as the Dog Star.',
    facts: ['Located 8.6 light-years away', 'Actually a binary star system', 'Visible from every inhabited region on Earth']
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    x: 60,
    y: 45,
    brightness: 0.8,
    description: 'The Red Planet, fourth from the Sun.',
    facts: ['Has the largest volcano in the solar system', 'A day on Mars is 24h 37m', 'Has two small moons: Phobos and Deimos']
  },
  {
    id: 'orion',
    name: 'Orion Nebula',
    type: 'nebula',
    x: 40,
    y: 60,
    brightness: 0.6,
    description: 'A stellar nursery where new stars are born.',
    facts: ['Located 1,344 light-years away', 'Visible to naked eye as fuzzy star', 'Contains about 2,000 times the mass of our Sun']
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    type: 'constellation',
    x: 75,
    y: 20,
    brightness: 0.7,
    description: 'The Queen constellation, easily recognizable by its W shape.',
    facts: ['Contains the famous Pac-Man Nebula', 'Visible year-round in northern hemisphere', 'Named after a vain queen in Greek mythology']
  }
];

const StarMapExplorer = () => {
  const [selectedObject, setSelectedObject] = useState<CelestialObject | null>(null);
  const [hoveredObject, setHoveredObject] = useState<CelestialObject | null>(null);
  const [animatedStars, setAnimatedStars] = useState<Array<{x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Generate random background stars
    const stars = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setAnimatedStars(stars);
  }, []);

  const getObjectIcon = (type: string) => {
    switch (type) {
      case 'star': return '⭐';
      case 'planet': return '🪐';
      case 'nebula': return '🌌';
      case 'constellation': return '✨';
      default: return '•';
    }
  };

  const getObjectColor = (type: string) => {
    switch (type) {
      case 'star': return 'text-yellow-300';
      case 'planet': return 'text-red-400';
      case 'nebula': return 'text-purple-400';
      case 'constellation': return 'text-blue-300';
      default: return 'text-white';
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 glow-text">
            <span className="cosmic-gradient bg-clip-text text-transparent">
              Star Map Explorer
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate the cosmos and discover celestial wonders. Click on any object to learn more about its mysteries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Star Map */}
          <div className="lg:col-span-2">
            <Card className="glass-morphism p-6 h-96 lg:h-[500px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30" />
              
              {/* Background stars */}
              {animatedStars.map((star, index) => (
                <div
                  key={index}
                  className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    animationDelay: `${star.delay}s`
                  }}
                />
              ))}

              {/* Celestial objects */}
              {celestialObjects.map((object) => (
                <div
                  key={object.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-150 ${getObjectColor(object.type)}`}
                  style={{
                    left: `${object.x}%`,
                    top: `${object.y}%`,
                    fontSize: `${16 + object.brightness * 8}px`,
                    filter: hoveredObject?.id === object.id ? 'drop-shadow(0 0 10px currentColor)' : 'none'
                  }}
                  onClick={() => setSelectedObject(object)}
                  onMouseEnter={() => setHoveredObject(object)}
                  onMouseLeave={() => setHoveredObject(null)}
                >
                  {getObjectIcon(object.type)}
                  
                  {/* Hover tooltip */}
                  {hoveredObject?.id === object.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                      <div className="bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                        {object.name}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80" />
                    </div>
                  )}
                </div>
              ))}

              {/* Constellation lines (example) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="20%" y1="30%"
                  x2="75%" y2="20%"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1="40%" y1="60%"
                  x2="60%" y2="45%"
                  stroke="rgba(139, 92, 246, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </svg>
            </Card>
          </div>

          {/* Object Details Panel */}
          <div className="space-y-4">
            <Card className="glass-morphism">
              <CardContent className="p-6">
                {selectedObject ? (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-2xl ${getObjectColor(selectedObject.type)}`}>
                        {getObjectIcon(selectedObject.type)}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{selectedObject.name}</h3>
                        <Badge className="capitalize mt-1" variant="secondary">
                          {selectedObject.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {selectedObject.description}
                    </p>
                    
                    <div>
                      <h4 className="text-purple-300 font-semibold mb-2">Fascinating Facts:</h4>
                      <ul className="space-y-2">
                        {selectedObject.facts.map((fact, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔭</div>
                    <h3 className="text-xl font-bold text-white mb-2">Explore the Universe</h3>
                    <p className="text-gray-300">
                      Click on any celestial object in the star map to learn about its wonders and mysteries.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick navigation */}
            <Card className="glass-morphism">
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-3">Quick Navigation</h4>
                <div className="grid grid-cols-2 gap-2">
                  {celestialObjects.map((object) => (
                    <Button
                      key={object.id}
                      variant="ghost"
                      size="sm"
                      className="justify-start text-gray-300 hover:text-white hover:bg-purple-500/20"
                      onClick={() => setSelectedObject(object)}
                    >
                      <span className={`mr-2 ${getObjectColor(object.type)}`}>
                        {getObjectIcon(object.type)}
                      </span>
                      {object.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarMapExplorer;
