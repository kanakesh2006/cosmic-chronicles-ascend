
-- Drop table if it exists and recreate it
DROP TABLE IF EXISTS public.space_events CASCADE;

-- Create the space_events table
CREATE TABLE public.space_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  details TEXT,
  event_date DATE NOT NULL,
  year INTEGER NOT NULL,
  type TEXT DEFAULT 'other',
  image_urls TEXT[] DEFAULT '{}',
  references TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on event_date for faster queries
CREATE INDEX idx_space_events_date ON public.space_events(event_date);

-- Create index on month-day for "on this day" queries
CREATE INDEX idx_space_events_month_day ON public.space_events(EXTRACT(MONTH FROM event_date), EXTRACT(DAY FROM event_date));

-- Enable Row Level Security (RLS)
ALTER TABLE public.space_events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is historical data)
CREATE POLICY "Allow public read access to space events" 
  ON public.space_events 
  FOR SELECT 
  TO public 
  USING (true);

-- Create policy to allow authenticated users to insert (for admin functions)
CREATE POLICY "Allow authenticated insert to space events" 
  ON public.space_events 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Insert a few sample events to test the system
INSERT INTO public.space_events (title, description, details, event_date, year, type, references) VALUES
('Apollo 11 Moon Landing', 'First human moon landing', 'Neil Armstrong and Buzz Aldrin became the first humans to land on the Moon', '1969-07-20', 1969, 'milestone', ARRAY['https://en.wikipedia.org/wiki/Apollo_11']),
('Sputnik 1 Launch', 'First artificial satellite', 'The Soviet Union launched Sputnik 1, the first artificial Earth satellite', '1957-10-04', 1957, 'launch', ARRAY['https://en.wikipedia.org/wiki/Sputnik_1']),
('Hubble Space Telescope Launch', 'Launch of Hubble Space Telescope', 'NASA launched the Hubble Space Telescope aboard Space Shuttle Discovery', '1990-04-24', 1990, 'launch', ARRAY['https://en.wikipedia.org/wiki/Hubble_Space_Telescope']);
