
export interface HistoricalEvent {
  id: number;
  title: string;
  description: string;
  month: number;
  day: number;
  year: number;
  category: string;
  imageUrl: string;
  references: string[];
  significance: 'major' | 'notable' | 'interesting';
}

export const historicalEvents: HistoricalEvent[] = [
  // January Events
  {
    id: 1,
    title: "Galileo Discovers Jupiter's Moons",
    description: "Galileo Galilei discovers the four largest moons of Jupiter (Io, Europa, Ganymede, and Callisto) using his telescope, providing evidence for the Copernican heliocentric model.",
    month: 1,
    day: 7,
    year: 1610,
    category: "Discovery",
    imageUrl: "https://images.unsplash.com/photo-1614732414444-096bea517d6e?w=800&h=600&fit=crop",
    references: ["Galileo's Sidereus Nuncius", "NASA Jupiter Mission Archives"],
    significance: "major"
  },
  {
    id: 2,
    title: "Apollo 1 Fire Tragedy",
    description: "Apollo 1 crew members Gus Grissom, Ed White, and Roger Chaffee die in a cabin fire during a launch rehearsal test, leading to major safety improvements in the Apollo program.",
    month: 1,
    day: 27,
    year: 1967,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    references: ["NASA Apollo 1 Investigation", "Apollo Program History"],
    significance: "major"
  },
  
  // February Events
  {
    id: 3,
    title: "Pluto Discovered",
    description: "Clyde Tombaugh discovers Pluto at Lowell Observatory in Arizona by comparing photographic plates taken on different nights, expanding our knowledge of the outer solar system.",
    month: 2,
    day: 18,
    year: 1930,
    category: "Discovery",
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop",
    references: ["Lowell Observatory Archives", "International Astronomical Union"],
    significance: "major"
  },
  {
    id: 4,
    title: "Luna 9 First Soft Moon Landing",
    description: "Soviet Luna 9 spacecraft achieves the first successful soft landing on the Moon, transmitting the first photographs from the lunar surface back to Earth.",
    month: 2,
    day: 3,
    year: 1966,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776656981-33add2d3d19d?w=800&h=600&fit=crop",
    references: ["Soviet Space Program Archives", "NASA Lunar Mission Database"],
    significance: "major"
  },

  // March Events
  {
    id: 5,
    title: "William Herschel Discovers Uranus",
    description: "British astronomer William Herschel discovers Uranus, the first planet found with a telescope, doubling the known size of our solar system.",
    month: 3,
    day: 13,
    year: 1781,
    category: "Discovery",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["Royal Astronomical Society", "Herschel's Observational Records"],
    significance: "major"
  },
  {
    id: 6,
    title: "Vanguard 1 Satellite Launch",
    description: "Vanguard 1, the oldest satellite still in orbit, is launched by the United States, becoming the first solar-powered satellite and providing valuable data about Earth's shape.",
    month: 3,
    day: 17,
    year: 1958,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=600&fit=crop",
    references: ["NASA Vanguard Project", "Smithsonian Air and Space Museum"],
    significance: "notable"
  },

  // April Events
  {
    id: 7,
    title: "Yuri Gagarin's Historic Spaceflight",
    description: "Soviet cosmonaut Yuri Gagarin becomes the first human to journey into outer space aboard Vostok 1, orbiting Earth once in 108 minutes and opening the era of human spaceflight.",
    month: 4,
    day: 12,
    year: 1961,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop",
    references: ["Soviet Space Program", "Gagarin Museum", "NASA Historical Database"],
    significance: "major"
  },
  {
    id: 8,
    title: "First Space Shuttle Launch",
    description: "Space Shuttle Columbia launches on STS-1, beginning NASA's Space Shuttle program era with the first reusable orbital spacecraft, revolutionizing space access.",
    month: 4,
    day: 12,
    year: 1981,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1517976519-f344415d8c2a?w=800&h=600&fit=crop",
    references: ["NASA Space Shuttle Program", "Kennedy Space Center Archives"],
    significance: "major"
  },

  // May Events
  {
    id: 9,
    title: "Alan Shepard's First American Spaceflight",
    description: "Alan Shepard becomes the first American in space aboard Mercury-Redstone 3 (Freedom 7), completing a 15-minute suborbital flight and marking America's entry into human spaceflight.",
    month: 5,
    day: 5,
    year: 1961,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
    references: ["NASA Mercury Program", "Shepard Biography Archive"],
    significance: "major"
  },
  {
    id: 10,
    title: "Hubble Space Telescope Repair",
    description: "Space Shuttle Endeavour completes the first Hubble Space Telescope servicing mission, installing corrective optics that fix Hubble's mirror problem and restore its vision.",
    month: 5,
    day: 13,
    year: 1993,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop",
    references: ["NASA Hubble Servicing Missions", "Space Telescope Science Institute"],
    significance: "major"
  },

  // June Events
  {
    id: 11,
    title: "Valentina Tereshkova First Woman in Space",
    description: "Soviet cosmonaut Valentina Tereshkova becomes the first woman to travel to space aboard Vostok 6, orbiting Earth 48 times over three days and inspiring generations of female astronauts.",
    month: 6,
    day: 16,
    year: 1963,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop",
    references: ["Soviet Space Program", "Women in Space Foundation"],
    significance: "major"
  },
  {
    id: 12,
    title: "Mars Pathfinder Landing",
    description: "NASA's Mars Pathfinder successfully lands on Mars, deploying the Sojourner rover - the first mobile robot to operate on another planet, revolutionizing Mars exploration.",
    month: 6,
    day: 4,
    year: 1997,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["NASA Mars Pathfinder Mission", "JPL Mission Archives"],
    significance: "major"
  },

  // July Events
  {
    id: 13,
    title: "Apollo 11 Moon Landing",
    description: "Neil Armstrong and Buzz Aldrin become the first humans to land on the Moon during Apollo 11 mission, with Armstrong taking the first steps on the lunar surface while millions watched on Earth.",
    month: 7,
    day: 20,
    year: 1969,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776656981-33add2d3d19d?w=800&h=600&fit=crop",
    references: ["NASA Apollo 11 Mission", "Lunar Sample Laboratory", "Armstrong Family Archive"],
    significance: "major"
  },
  {
    id: 14,
    title: "Mars Global Surveyor Launch",
    description: "NASA launches Mars Global Surveyor, which would go on to provide detailed maps of Mars' surface and atmosphere, revolutionizing our understanding of the Red Planet.",
    month: 7,
    day: 7,
    year: 1996,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["NASA Mars Global Surveyor", "JPL Mars Exploration"],
    significance: "notable"
  },

  // August Events
  {
    id: 15,
    title: "Viking 2 Mars Landing",
    description: "NASA's Viking 2 lander successfully touches down on Mars, joining Viking 1 to provide unprecedented close-up images and scientific data from the Martian surface.",
    month: 8,
    day: 7,
    year: 1976,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["NASA Viking Mission", "Mars Exploration History"],
    significance: "major"
  },
  {
    id: 16,
    title: "Voyager 2 Launch",
    description: "NASA launches Voyager 2 spacecraft, which would become the only probe to visit all four outer planets (Jupiter, Saturn, Uranus, and Neptune) and continue into interstellar space.",
    month: 8,
    day: 20,
    year: 1977,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1517976519-f344415d8c2a?w=800&h=600&fit=crop",
    references: ["NASA Voyager Program", "JPL Deep Space Network"],
    significance: "major"
  },

  // September Events
  {
    id: 17,
    title: "GRAIL Moon Mission Launch",
    description: "NASA launches the GRAIL (Gravity Recovery and Interior Laboratory) mission with twin spacecraft to study the Moon's gravitational field and internal structure in unprecedented detail.",
    month: 9,
    day: 10,
    year: 2011,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776656981-33add2d3d19d?w=800&h=600&fit=crop",
    references: ["NASA GRAIL Mission", "Lunar Science Institute"],
    significance: "notable"
  },
  {
    id: 18,
    title: "Neptune Discovery",
    description: "German astronomer Johann Galle discovers Neptune at the Berlin Observatory, confirming mathematical predictions by Urbain Le Verrier and John Couch Adams about the eighth planet.",
    month: 9,
    day: 23,
    year: 1846,
    category: "Discovery",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["Berlin Observatory Records", "International Astronomical Union"],
    significance: "major"
  },

  // October Events
  {
    id: 19,
    title: "Sputnik 1 Launch",
    description: "Soviet Union launches Sputnik 1, the first artificial satellite to orbit Earth, beginning the Space Age and sparking the Space Race between the USSR and United States.",
    month: 10,
    day: 4,
    year: 1957,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=600&fit=crop",
    references: ["Soviet Space Program", "Sputnik Historical Archive", "Space Race Documentation"],
    significance: "major"
  },
  {
    id: 20,
    title: "Cassini Saturn Arrival",
    description: "NASA's Cassini spacecraft arrives at Saturn after a 7-year journey, beginning an epic 13-year mission that would revolutionize our understanding of Saturn and its moons.",
    month: 10,
    day: 15,
    year: 2004,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop",
    references: ["NASA Cassini Mission", "JPL Saturn Exploration"],
    significance: "major"
  },

  // November Events
  {
    id: 21,
    title: "Mariner 9 Mars Orbit",
    description: "NASA's Mariner 9 becomes the first spacecraft to orbit another planet, arriving at Mars and mapping its entire surface while discovering Olympus Mons and Valles Marineris.",
    month: 11,
    day: 14,
    year: 1971,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop",
    references: ["NASA Mariner Program", "Mars Orbital Survey Archive"],
    significance: "major"
  },
  {
    id: 22,
    title: "International Space Station First Crew",
    description: "Expedition 1 crew (William Shepherd, Yuri Gidzenko, and Sergei Krikalev) arrives at the International Space Station, beginning continuous human presence in space.",
    month: 11,
    day: 2,
    year: 2000,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=600&fit=crop",
    references: ["NASA ISS Program", "International Space Station Archive"],
    significance: "major"
  },

  // December Events
  {
    id: 23,
    title: "Apollo 17 Moon Landing",
    description: "Apollo 17, the final Apollo mission, lands on the Moon with Eugene Cernan and Harrison Schmitt, the first scientist-astronaut to walk on the lunar surface, marking the end of the Apollo program.",
    month: 12,
    day: 11,
    year: 1972,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1446776656981-33add2d3d19d?w=800&h=600&fit=crop",
    references: ["NASA Apollo 17 Mission", "Lunar Sample Laboratory"],
    significance: "major"
  },
  {
    id: 24,
    title: "Kepler Space Telescope Launch Preparation",
    description: "Final preparations begin for NASA's Kepler Space Telescope, which would go on to discover thousands of exoplanets and revolutionize our understanding of planetary systems.",
    month: 12,
    day: 8,
    year: 2008,
    category: "Space Mission",
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=800&h=600&fit=crop",
    references: ["NASA Kepler Mission", "Exoplanet Archive"],
    significance: "notable"
  }
];

// Helper function to get events by date
export const getEventsByDate = (month: number, day: number): HistoricalEvent[] => {
  return historicalEvents.filter(event => event.month === month && event.day === day);
};

// Helper function to get events by month
export const getEventsByMonth = (month: number): HistoricalEvent[] => {
  return historicalEvents.filter(event => event.month === month);
};

// Helper function to get events by category
export const getEventsByCategory = (category: string): HistoricalEvent[] => {
  return historicalEvents.filter(event => event.category === category);
};
