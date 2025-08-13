'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EditArtworkModal } from './EditArtworkModal';
import { AddArtworkModal } from './AddArtworkModal';

export interface Artwork {
  id: number;
  title: string;
  artist: string;
  description: string;
  image: string;
  price: number;
  status: 'available' | 'sold';
  rating?: number;
  visitorCount?: number;
  offerStatus?: 'Accepted' | 'Rejected' | 'Pending';
  paymentReceived?: boolean;
}

const mockExhibitions = [
  {
    products: [
      {
        id: 1,
        title: 'Abstract Canvas Art',
        description: 'Hand-painted abstract art on canvas by emerging artists.',
        price: 750,
        image: 'artworks.png',
        visitorCount: 23,
        offerStatus: 'Pending',
        status: 'available',
        paymentReceived: false,
        artist: 'Unknown Artist',
      },
      {
        id: 2,
        title: 'Modern Sculpture',
        description: 'Metal sculpture inspired by contemporary urban life.',
        price: 1200,
        image: 'artworks.png',
        visitorCount: 37,
        offerStatus: 'Accepted',
        status: 'sold',
        paymentReceived: true,
        artist: 'Unknown Artist',
      },
    ],
  },
];

const extractedMockArtworks: Artwork[] = mockExhibitions.flatMap((ex) =>
  ex.products.map((product, index) => ({
    id: index + 100, // offset ID to avoid clash with manually added
    title: product.title,
    artist: product.artist,
    description: product.description,
    image: product.image,
    price: product.price,
    status: product.status as 'available' | 'sold',
    rating: 4.5,
    visitorCount: product.visitorCount,
    offerStatus: product.offerStatus as 'Accepted' | 'Rejected' | 'Pending',
    paymentReceived: product.paymentReceived,
  }))
);

const AllArtworks: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(extractedMockArtworks);

  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const handleUpdate = (updatedArtwork: Artwork) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === updatedArtwork.id ? updatedArtwork : art))
    );
    setEditingArtwork(null);
  };

  const handleAdd = (newArtwork: Artwork) => {
    setArtworks((prev) => [...prev, { ...newArtwork, id: Date.now() }]);
    setAddModalOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#570DF8]">All Artworks</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.history.back()}>
            Back
          </Button>
          <Button
            className="bg-[#570DF8] hover:bg-[#480bcf] text-white"
            onClick={() => setAddModalOpen(true)}
          >
            + Add Artwork
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art, index) => (
          <Card key={art.id} className="overflow-hidden group relative">
            <div className="aspect-[4/3] bg-muted">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover"
              />
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{art.title}</CardTitle>
              <p className="text-xs text-muted-foreground">Artwork No: #{index + 1}</p>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{art.description}</p>
              <p className="text-primary font-semibold">Price: ${art.price}</p>

              <p className="text-xs text-muted-foreground">Artist: {art.artist}</p>

              {art.visitorCount !== undefined && (
                <p>👁️ Visitors: {art.visitorCount}</p>
              )}

              {art.offerStatus && (
                <div className="flex items-center gap-2">
                  <span>📩 Offer Status:</span>
                  <Badge
                    variant={
                      art.offerStatus === 'Accepted'
                        ? 'default'
                        : art.offerStatus === 'Rejected'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {art.offerStatus}
                  </Badge>
                </div>
              )}

              {art.paymentReceived !== undefined && (
                <div className="flex items-center gap-2">
                  <span>💰 Payment:</span>
                  <Badge variant={art.paymentReceived ? 'default' : 'secondary'}>
                    {art.paymentReceived ? 'Received' : 'Pending'}
                  </Badge>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span>✔️ Sold:</span>
                <Badge variant={art.status === 'sold' ? 'default' : 'secondary'}>
                  {art.status === 'sold' ? 'Yes' : 'No'}
                </Badge>
              </div>

              <div className="pt-2">
                <p className="text-xs font-medium mb-1">📎 QR Code:</p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://localhost:8082/artwork/${art.id}`}
                  alt="QR Code"
                />
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=http://localhost:8082/artwork/${art.id}`}
                  download={`artwork-${art.id}-qrcode.png`}
                  className="text-xs text-blue-600 underline mt-1 inline-block"
                >
                  Download QR Code
                </a>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => setEditingArtwork(art)}
              >
                ✏️ Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingArtwork && (
        <EditArtworkModal
          artwork={editingArtwork}
          onClose={() => setEditingArtwork(null)}
          onSave={handleUpdate}
          open
        />
      )}

      {isAddModalOpen && (
        <AddArtworkModal
          onClose={() => setAddModalOpen(false)}
          onAdd={handleAdd}
          open
        />
      )}
    </div>
  );
};

export default AllArtworks;

