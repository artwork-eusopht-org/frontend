// ArtworkCard.tsx
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditArtworkModal } from "./EditArtworkModal";

export function ArtworkCard({ artwork, onUpdate }) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <Card>
      <CardContent className="p-4">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{artwork.title}</h3>
        <p className="text-sm text-gray-600">{artwork.description}</p>
        <p className="mt-1 text-sm">Minimum Price: ${artwork.minPrice}</p>
        <p className="text-xs text-gray-400">Status: {artwork.status}</p>

        <div className="flex gap-2 mt-3">
          <Button variant="secondary" onClick={() => alert("Details Popup")}>View</Button>
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
        </div>

        <EditArtworkModal
          open={showEdit}
          onClose={() => setShowEdit(false)}
          artwork={artwork}
          onSave={(updatedArt) => {
            onUpdate(updatedArt);
            setShowEdit(false);
          }}
        />
      </CardContent>
    </Card>
  );
}
