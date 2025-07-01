
import React from 'react';
import StarField from '@/components/StarField';
import GalacticTimeline from '@/components/GalacticTimeline';

const Timeline = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="cosmic-gradient bg-clip-text text-transparent">
                  Interactive Cosmic Timeline
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Explore significant astronomical events through an interactive spiral timeline
              </p>
            </div>
          </div>
        </div>
        <GalacticTimeline />
      </div>
    </div>
  );
};

export default Timeline;
