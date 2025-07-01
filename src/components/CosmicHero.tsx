
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const CosmicHero = () => {
  const scrollToTimeline = () => {
    const timeline = document.getElementById('galactic-timeline');
    timeline?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-twinkle" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-blue-300 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 left-1/4 w-3 h-3 bg-pink-300 rounded-full animate-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-cyan-300 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }} />
        
        {/* Floating cosmic elements */}
        <div className="absolute top-32 right-10 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 animate-float" />
        <div className="absolute bottom-32 left-16 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text">
            <span className="cosmic-gradient bg-clip-text text-transparent animate-cosmic-pulse">
              Cosmic Chronicles
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-purple-200 mb-4 animate-fade-in">
            On This Day in Space
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Journey through the universe's most incredible moments. Discover astronomical events, 
            space missions, and cosmic phenomena that shaped our understanding of the cosmos.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            onClick={scrollToTimeline}
            className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-glow transition-all duration-300 transform hover:scale-105"
          >
            Explore the Timeline
          </Button>
          <Button 
            variant="outline" 
            className="px-8 py-4 text-lg border-purple-500 text-purple-300 hover:bg-purple-500/10 transition-all duration-300"
          >
            Today's Events
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-purple-400" />
        </div>
      </div>

      {/* Cosmic particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CosmicHero;
