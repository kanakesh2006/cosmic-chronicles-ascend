
import React from 'react';
import StarField from '@/components/StarField';
import CosmicHero from '@/components/CosmicHero';
import OnThisDaySection from '@/components/OnThisDaySection';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <StarField />
      
      <div className="relative z-10">
        <CosmicHero />
        <OnThisDaySection />
        
        {/* Footer */}
        <footer className="py-12 px-4 border-t border-purple-500/20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold glow-text mb-2">
                <span className="cosmic-gradient bg-clip-text text-transparent">
                  Cosmic Chronicles
                </span>
              </h3>
              <p className="text-gray-400">
                Exploring the universe, one day at a time
              </p>
            </div>
            <p className="text-gray-500 text-sm">
              Built with ❤️ for space enthusiasts everywhere
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
