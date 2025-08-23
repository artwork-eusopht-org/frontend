import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import ComboBox from '@/components/ui/select-with-seach';

export interface Offer {
  offer_id: number;
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  price: number;
  payment_status: string;
  sold: string;
  visitors?: number;
  offerStatus: string;
  offer: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string,
  offer_status: string,
}

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  price: string;
  payment_status: string;
  sold: string;
  visitors?: number;
  offerStatus: string;
}

export default function Dashboard() {

  const [offers, setOffers] = useState<Offer[]>([]);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);

  async function fetchData() {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'artworks/get-artwork/fetch-all-offers');
      const json = await response.json();
      console.log('All Recent Offers', json.data);
      setOffers(json.data);
      setFilteredOffers(json.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  }

  async function fetchArtWork() {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + 'artworks/');
      const json = await response.json();
      console.log('All Artworks', json.data);
      setArtworks(json.data);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  }

  useEffect(() => {
    fetchData();
    fetchArtWork();
  }, []);
  
  const handleArtworkChange = (artworkId: number) => {
    console.log("artworkId", artworkId);
    if(artworkId == 0){
      setFilteredOffers(offers);
    }else{
      const selectedOffers = offers.filter((offer) => offer.id === artworkId);
      setFilteredOffers(selectedOffers);
      console.log("Filtered offers:", selectedOffers);
    }
    
  };

  const respondOffer = async (id: number, status: string, artID: number) => {
    console.log("Accepted artwork ID:", id);
    try {
      const form = new FormData();

      // Append all fields
      form.append("id", String(id));
      form.append("offer_status", status);
      

      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "artworks/respond-offer",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.status);
      if (data.status === 200) { // <-- matches PHP backend's response
        toast({
          title: "Success",
          description: data.message,
          variant: "default",
        });
        await fetchData();
        console.log("calling handle change after accept reject", artID);
        handleArtworkChange(artID);
      } else {
        toast({
          title: "Error",
          description: "Failed to accept offer: Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accept':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Reject':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your artworks.
          </p>
        </div>
      </div>

      {/* Recent Offers */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Offers</CardTitle>

              {/* <select
                className="border rounded-md px-3 py-1 text-sm text-gray-700 bg-white shadow-sm"
                onChange={(e) => handleArtworkChange(Number(e.target.value))}
              >
                <option value="">All Artwork</option>
                {artworks.map((art) => (
                  <option key={art.id} value={art.id}>
                    {art.title}
                  </option>
                ))}
              </select> */}

              <ComboBox  options={artworks.map((art) => ({
                  value: art.id,
                  label: art.title,
                }))}
                // value={selectedArtworkId}
                onChange={(val) => handleArtworkChange(Number(val))}
                placeholder="All Artwork" />
              
              {/* <Link to="/artworks">
                <Button variant="ghost" size="sm" className="gap-2">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link> */}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredOffers.map((artwork) => (
              <div
                key={artwork.offer_id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{artwork.title}</h4>
                    <Badge className={getStatusColor(artwork.offer_status)}>
                      {artwork.offer_status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {artwork.artist}
                  </p>
                  <p className="text-sm">
                    Offer: ${artwork.offer}
                  </p>
                  <p className="text-sm">
                    Name: {artwork.name}
                  </p>
                  <p className="text-sm">
                    Email: {artwork.email}
                  </p>
                  <p className="text-sm">
                    Phone: {artwork.phone}
                  </p>
                  <p className="text-sm">
                    Notes: {artwork.notes}
                  </p>
                  <p className="text-sm">
                    Date: {new Date(artwork.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-[#570DF8] hover:bg-[#480bcf] text-white"
                    onClick={() => respondOffer(artwork.offer_id, "Accept",artwork.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white shadow-none"
                    onClick={() => respondOffer(artwork.offer_id, "Reject",artwork.id)}
                  >
                    Reject
                  </Button>
                </div>

              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
