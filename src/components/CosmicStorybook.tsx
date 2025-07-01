
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  date: string;
  category: string;
  pages: Array<{
    title: string;
    content: string;
    animation: string;
    interactiveElements: Array<{
      type: 'planet' | 'star' | 'spacecraft';
      position: { x: number; y: number };
      fact: string;
    }>;
  }>;
}

const stories: Story[] = [
  {
    id: 1,
    title: "The Apollo 11 Journey",
    date: "July 1969",
    category: "Historic Mission",
    pages: [
      {
        title: "Launch Day",
        content: "On July 16, 1969, three brave astronauts sat atop the mighty Saturn V rocket, ready to embark on humanity's greatest adventure. The rocket stood 363 feet tall, weighing 6.2 million pounds.",
        animation: "rocket-launch",
        interactiveElements: [
          { type: 'spacecraft', position: { x: 50, y: 80 }, fact: "Saturn V had 3 stages and 11 engines in total" }
        ]
      },
      {
        title: "Journey to the Moon",
        content: "For three days, the astronauts traveled through the cosmic void, covering 240,000 miles. They watched Earth shrink to a small blue marble behind them.",
        animation: "space-travel",
        interactiveElements: [
          { type: 'planet', position: { x: 20, y: 30 }, fact: "Earth appeared as a 'pale blue dot' from this distance" },
          { type: 'planet', position: { x: 80, y: 60 }, fact: "The Moon's gravity began pulling the spacecraft" }
        ]
      },
      {
        title: "One Small Step",
        content: "Neil Armstrong's boot touched the lunar surface at 20:17 UTC. His words echoed across space: 'That's one small step for man, one giant leap for mankind.'",
        animation: "moon-landing",
        interactiveElements: [
          { type: 'star', position: { x: 30, y: 20 }, fact: "The American flag was planted here" },
          { type: 'star', position: { x: 70, y: 50 }, fact: "Footprints remain on the Moon to this day" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Voyager's Grand Tour",
    date: "1977-Present",
    category: "Deep Space Mission",
    pages: [
      {
        title: "The Grand Design",
        content: "In 1977, a rare planetary alignment occurred that happens only once every 175 years. Scientists seized this opportunity to send two spacecraft on a 'Grand Tour' of the outer planets.",
        animation: "planetary-alignment",
        interactiveElements: [
          { type: 'planet', position: { x: 25, y: 40 }, fact: "Jupiter - First stop of the grand tour" },
          { type: 'planet', position: { x: 50, y: 50 }, fact: "Saturn - Famous for its beautiful rings" },
          { type: 'planet', position: { x: 75, y: 35 }, fact: "Uranus - Tilted on its side" }
        ]
      },
      {
        title: "Beyond the Solar System",
        content: "In 2012, Voyager 1 became the first human-made object to enter interstellar space. It continues to send data from the space between stars, over 14 billion miles from Earth.",
        animation: "interstellar-journey",
        interactiveElements: [
          { type: 'spacecraft', position: { x: 60, y: 30 }, fact: "Still transmitting after 45+ years" },
          { type: 'star', position: { x: 80, y: 60 }, fact: "Closest star is still 4 light-years away" }
        ]
      }
    ]
  }
];

const CosmicStorybook = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [clickedElements, setClickedElements] = useState<Set<string>>(new Set());

  const story = stories[currentStory];
  const page = story.pages[currentPage];

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setCurrentPage(stories[currentStory - 1].pages.length - 1);
    }
  };

  const handleElementClick = (element: any, index: number) => {
    const elementId = `${currentStory}-${currentPage}-${index}`;
    setClickedElements(prev => new Set([...prev, elementId]));
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'planet': return '🪐';
      case 'star': return '⭐';
      case 'spacecraft': return '🚀';
      default: return '✨';
    }
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 glow-text">
            <span className="cosmic-gradient bg-clip-text text-transparent">
              Cosmic Storybook
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive tales of space exploration with animated scenes and hidden cosmic secrets
          </p>
        </div>

        {/* Story selector */}
        <div className="flex justify-center gap-4 mb-8">
          {stories.map((_, index) => (
            <Button
              key={index}
              variant={currentStory === index ? "default" : "outline"}
              onClick={() => {
                setCurrentStory(index);
                setCurrentPage(0);
              }}
              className={currentStory === index ? 'bg-purple-600' : 'border-purple-500 text-purple-300'}
            >
              Story {index + 1}
            </Button>
          ))}
        </div>

        <Card className="glass-morphism max-w-4xl mx-auto">
          <CardContent className="p-8">
            {/* Story header */}
            <div className="text-center mb-8">
              <Badge className="mb-3 bg-purple-600">{story.category}</Badge>
              <h3 className="text-3xl font-bold text-white mb-2">{story.title}</h3>
              <p className="text-purple-300">{story.date}</p>
            </div>

            {/* Interactive story page */}
            <div className="relative">
              <div className="min-h-[400px] bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-pink-900/30 rounded-lg p-8 relative overflow-hidden">
                {/* Background animation elements */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`
                      }}
                    />
                  ))}
                </div>

                {/* Interactive elements */}
                {page.interactiveElements.map((element, index) => {
                  const elementId = `${currentStory}-${currentPage}-${index}`;
                  const isClicked = clickedElements.has(elementId);
                  
                  return (
                    <div
                      key={index}
                      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125"
                      style={{
                        left: `${element.position.x}%`,
                        top: `${element.position.y}%`
                      }}
                      onClick={() => handleElementClick(element, index)}
                    >
                      <div className={`text-2xl ${isClicked ? 'animate-glow' : 'animate-bounce'}`}>
                        {getElementIcon(element.type)}
                      </div>
                      
                      {isClicked && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 max-w-xs">
                          <div className="bg-black/90 text-white p-3 rounded-lg text-sm">
                            {element.fact}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-black/90" />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Page content */}
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold text-white mb-4">{page.title}</h4>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {page.content}
                  </p>
                </div>
              </div>

              {/* Page navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentStory === 0 && currentPage === 0}
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="text-center">
                  <p className="text-purple-300 text-sm">
                    Page {currentPage + 1} of {story.pages.length}
                  </p>
                  <div className="flex gap-1 mt-2 justify-center">
                    {story.pages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentPage ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={nextPage}
                  disabled={currentStory === stories.length - 1 && currentPage === story.pages.length - 1}
                  className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hidden elements counter */}
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Click on the cosmic elements to reveal hidden facts! 
            Found: {clickedElements.size} / {stories.reduce((acc, story) => acc + story.pages.reduce((pageAcc, page) => pageAcc + page.interactiveElements.length, 0), 0)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CosmicStorybook;
