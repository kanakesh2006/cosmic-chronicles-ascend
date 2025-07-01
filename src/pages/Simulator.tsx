
import React from 'react';
import StarField from '@/components/StarField';
import EventSimulator from '@/components/EventSimulator';

const Simulator = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="cosmic-gradient bg-clip-text text-transparent">
                  Cosmic Event Simulator
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Simulate legendary astronomical phenomena with interactive controls
              </p>
            </div>
          </div>
        </div>
        <EventSimulator />
      </div>
    </div>
  );
};

export default Simulator;
