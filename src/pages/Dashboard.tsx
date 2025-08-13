import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockArtworks = [
  {
    id: 1,
    title: 'Modern Sculpture',
    description: 'Metal sculpture inspired by contemporary urban life.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=600&fit=crop',
    visitorCount: 37,
    offerStatus: 'Accepted',
    status: 'sold',
    paymentReceived: true,
    artist: 'Unknown Artist',
  },
  {
    id: 2,
    title: 'Abstract Canvas Art',
    description: 'Hand-painted abstract art on canvas by emerging artists.',
    price: 750,
    image: 'https://images.unsplash.com/photo-1529245019870-59b249281fd3?w=800&h=600&fit=crop',
    visitorCount: 23,
    offerStatus: 'Pending',
    status: 'available',
    paymentReceived: false,
    artist: 'Unknown Artist',
  },
  {
    id: 3,
    title: 'Modern Sculpture',
    description: 'Metal sculpture inspired by contemporary urban life.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=600&fit=crop',
    visitorCount: 37,
    offerStatus: 'Accepted',
    status: 'sold',
    paymentReceived: true,
    artist: 'Unknown Artist',
  },
];

export default function Dashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
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
              <CardTitle>Recent Offers</CardTitle>
              <Link to="/artworks">
                <Button variant="ghost" size="sm" className="gap-2">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{artwork.title}</h4>
                    <Badge className={getStatusColor(artwork.status)}>
                      {artwork.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {artwork.artist}
                  </p>
                  <p className="text-sm">
                    💰 Price: ${artwork.price}
                  </p>
                  <p className="text-sm">
                    📦 Offer Status: {artwork.offerStatus}
                  </p>
                  <p className="text-sm">
                    💳 Payment: {artwork.paymentReceived ? "Received" : "Pending"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-[#570DF8] hover:bg-[#480bcf] text-white"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#570DF8] hover:bg-[#480bcf] text-white"
                  >
                    Decline
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
