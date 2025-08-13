import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function VisitorArtworkPage() {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState<any>(null);

  useEffect(() => {
    // For now, just mock data
    const mockArtworks = [
      {
        id: "1",
        title: "Starry Night",
        artist: "Vincent van Gogh",
        description: "One of the most famous paintings in the world.",
        image: "artworks.png"
      },
      {
        id: "2",
        title: "Mona Lisa",
        artist: "Leonardo da Vinci",
        description: "A masterpiece of the Italian Renaissance.",
        image: "artworks.png"
      }
    ];

    const found = mockArtworks.find(a => a.id === artworkId);
    setArtwork(found || null);
  }, [artworkId]);

  if (!artwork) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Big image section */}
      <div className="md:w-2/3 w-full h-1/2 md:h-full">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details section */}
      <div className="md:w-1/3 w-full p-6 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
        <p className="text-lg text-gray-600 mb-4">By {artwork.artist}</p>
        <p className="text-base">{artwork.description}</p>
      </div>
    </div>
  );
}
