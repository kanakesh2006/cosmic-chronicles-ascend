
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

interface SimulationParams {
  speed: number;
  scale: number;
  intensity: number;
}

interface Phenomenon {
  id: string;
  name: string;
  description: string;
  defaultParams: SimulationParams;
  color: string;
}

const phenomena: Phenomenon[] = [
  {
    id: 'solar-eclipse',
    name: 'Solar Eclipse',
    description: 'Watch as the Moon passes between Earth and the Sun, casting a shadow on our planet.',
    defaultParams: { speed: 50, scale: 75, intensity: 80 },
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'meteor-shower',
    name: 'Meteor Shower',
    description: 'Experience the breathtaking display of meteors streaking across the night sky.',
    defaultParams: { speed: 70, scale: 60, intensity: 90 },
    color: 'from-green-400 to-blue-500'
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    description: 'Witness the dancing lights caused by solar particles interacting with Earth\'s magnetic field.',
    defaultParams: { speed: 30, scale: 85, intensity: 70 },
    color: 'from-green-300 to-purple-500'
  },
  {
    id: 'supernova',
    name: 'Supernova Explosion',
    description: 'Observe the spectacular death of a massive star as it explodes in brilliant glory.',
    defaultParams: { speed: 40, scale: 90, intensity: 100 },
    color: 'from-red-500 to-yellow-400'
  }
];

const EventSimulator = () => {
  const [selectedPhenomenon, setSelectedPhenomenon] = useState(phenomena[0]);
  const [params, setParams] = useState<SimulationParams>(phenomena[0].defaultParams);
  const [isPlaying, setIsPlaying] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
  }>>([]);
  const animationRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        updateSimulation();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, params, selectedPhenomenon]);

  const updateSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particles based on phenomenon type
    setParticles(prevParticles => {
      let newParticles = [...prevParticles];

      // Add new particles based on phenomenon
      if (selectedPhenomenon.id === 'meteor-shower' && Math.random() < params.intensity / 100) {
        newParticles.push({
          id: Date.now() + Math.random(),
          x: Math.random() * canvas.width,
          y: 0,
          vx: (Math.random() - 0.5) * params.speed / 10,
          vy: params.speed / 10,
          life: 100,
          color: `hsl(${120 + Math.random() * 60}, 70%, 60%)`
        });
      } else if (selectedPhenomenon.id === 'aurora' && Math.random() < 0.3) {
        newParticles.push({
          id: Date.now() + Math.random(),
          x: Math.random() * canvas.width,
          y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 150,
          color: `hsl(${Math.random() < 0.5 ? 120 : 280}, 70%, 60%)`
        });
      }

      // Update existing particles
      newParticles = newParticles
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1
        }))
        .filter(particle => particle.life > 0 && particle.y < canvas.height);

      // Draw particles
      newParticles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 100;
        ctx.fill();
        
        // Add trail for meteors
        if (selectedPhenomenon.id === 'meteor-shower') {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      return newParticles;
    });

    // Draw phenomenon-specific effects
    if (selectedPhenomenon.id === 'solar-eclipse') {
      drawSolarEclipse(ctx, canvas);
    } else if (selectedPhenomenon.id === 'supernova') {
      drawSupernova(ctx, canvas);
    }
  };

  const drawSolarEclipse = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sunRadius = 40 * (params.scale / 100);
    const moonRadius = 35 * (params.scale / 100);
    const moonX = centerX + Math.sin(Date.now() * params.speed / 10000) * 60;

    // Draw sun
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius);
    sunGradient.addColorStop(0, '#FFF700');
    sunGradient.addColorStop(1, '#FF8C00');
    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw moon shadow
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.arc(moonX, centerY, moonRadius, 0, Math.PI * 2);
    ctx.fill();

    // Draw corona effect during eclipse
    if (Math.abs(moonX - centerX) < 20) {
      const coronaGradient = ctx.createRadialGradient(centerX, centerY, moonRadius, centerX, centerY, sunRadius + 20);
      coronaGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      coronaGradient.addColorStop(1, 'rgba(255, 255, 255, 0.3)');
      ctx.fillStyle = coronaGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sunRadius + 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawSupernova = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const time = Date.now() * params.speed / 1000;
    const radius = (Math.sin(time) * 0.5 + 0.5) * 100 * (params.scale / 100);

    // Draw explosion
    const explosionGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    explosionGradient.addColorStop(0, `rgba(255, 255, 255, ${params.intensity / 100})`);
    explosionGradient.addColorStop(0.3, `rgba(255, 200, 0, ${params.intensity / 200})`);
    explosionGradient.addColorStop(0.7, `rgba(255, 100, 0, ${params.intensity / 300})`);
    explosionGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    ctx.fillStyle = explosionGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw shock waves
    for (let i = 0; i < 3; i++) {
      const waveRadius = radius + i * 30 + Math.sin(time + i) * 10;
      ctx.strokeStyle = `rgba(255, 255, 255, ${(params.intensity / 100) * (1 - i * 0.3)})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  const resetSimulation = () => {
    setParams(selectedPhenomenon.defaultParams);
    setParticles([]);
    setIsPlaying(false);
  };

  const changePhenomenon = (phenomenon: Phenomenon) => {
    setSelectedPhenomenon(phenomenon);
    setParams(phenomenon.defaultParams);
    setParticles([]);
    setIsPlaying(false);
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 glow-text">
            <span className="cosmic-gradient bg-clip-text text-transparent">
              Cosmic Event Simulator
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Simulate and control astronomical phenomena with real-time interactive visualizations
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Phenomenon Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Select Phenomenon</h3>
            {phenomena.map((phenomenon) => (
              <Card
                key={phenomenon.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPhenomenon.id === phenomenon.id
                    ? 'glass-morphism border-purple-500 bg-purple-500/10'
                    : 'glass-morphism hover:bg-white/5'
                }`}
                onClick={() => changePhenomenon(phenomenon)}
              >
                <CardContent className="p-4">
                  <div className={`w-full h-2 rounded-full bg-gradient-to-r ${phenomenon.color} mb-3`} />
                  <h4 className="font-semibold text-white mb-2">{phenomenon.name}</h4>
                  <p className="text-sm text-gray-300">{phenomenon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Simulation Canvas */}
          <div className="lg:col-span-2">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-center text-white">
                  {selectedPhenomenon.name} Simulation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="w-full h-auto bg-gradient-to-b from-indigo-900 to-purple-900 rounded-lg"
                  />
                  
                  {/* Play controls overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`px-6 py-2 ${
                          isPlaying 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button
                        onClick={resetSimulation}
                        variant="outline"
                        className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Parameter Controls */}
          <div className="space-y-6">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-white">Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Speed: {params.speed}%
                  </label>
                  <Slider
                    value={[params.speed]}
                    onValueChange={(value) => setParams(prev => ({ ...prev, speed: value[0] }))}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Scale: {params.scale}%
                  </label>
                  <Slider
                    value={[params.scale]}
                    onValueChange={(value) => setParams(prev => ({ ...prev, scale: value[0] }))}
                    max={150}
                    min={25}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Intensity: {params.intensity}%
                  </label>
                  <Slider
                    value={[params.intensity]}
                    onValueChange={(value) => setParams(prev => ({ ...prev, intensity: value[0] }))}
                    max={100}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card className="glass-morphism">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-300">Status:</span>
                  <Badge className={isPlaying ? 'bg-green-600' : 'bg-gray-600'}>
                    {isPlaying ? 'Running' : 'Paused'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Particles:</span>
                  <span className="text-white">{particles.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventSimulator;
