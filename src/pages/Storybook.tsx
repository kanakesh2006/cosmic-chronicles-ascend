
import React from 'react';
import StarField from '@/components/StarField';
import CosmicStorybook from '@/components/CosmicStorybook';

const Storybook = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      <div className="relative z-10">
        <div className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="cosmic-gradient bg-clip-text text-transparent">
                  Cosmic Storybook
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience astronomical events through interactive animated stories
              </p>
            </div>
          </div>
        </div>
        <CosmicStorybook />
      </div>
    </div>
  );
};

export default Storybook;
