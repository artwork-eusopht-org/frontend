-- Create artworks table
CREATE TABLE public.artworks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  qr_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'reserved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  visitor_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- Create policies for artworks (publicly viewable)
CREATE POLICY "Artworks are viewable by everyone" 
ON public.artworks 
FOR SELECT 
USING (true);

-- Create policies for offers (user-specific)
CREATE POLICY "Users can view their own offers" 
ON public.offers 
FOR SELECT 
USING (auth.uid() = visitor_id);

CREATE POLICY "Users can create their own offers" 
ON public.offers 
FOR INSERT 
WITH CHECK (auth.uid() = visitor_id);

CREATE POLICY "Users can update their own offers" 
ON public.offers 
FOR UPDATE 
USING (auth.uid() = visitor_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_artworks_updated_at
  BEFORE UPDATE ON public.artworks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON public.offers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample artworks for testing
INSERT INTO public.artworks (title, artist, description, price, qr_code, image_url) VALUES
('Sunset Dreams', 'Maria Rodriguez', 'A beautiful abstract representation of sunset colors flowing across the canvas.', 1500.00, 'ART001', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400'),
('City Lights', 'John Smith', 'Urban landscape capturing the energy of city nightlife.', 2200.00, 'ART002', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'),
('Ocean Waves', 'Sarah Johnson', 'Peaceful seascape with gentle waves and morning light.', 1800.00, 'ART003', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400');