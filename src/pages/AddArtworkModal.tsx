// AddArtworkModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function AddArtworkModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    year: "",
    medium: "",
    dimensions: "",
    image: "",
    description: "",
    minPrice: "",
    offerStatus: "No Offer",
    paymentStatus: "Unpaid",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative price
    if (name === "minPrice" && Number(value) < 0) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const newArtwork = { ...form, id: Date.now() };
    onAdd(newArtwork);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Artwork</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Artwork Title (e.g., Branch of Affection)"
          />

          <Input
            name="artist"
            value={form.artist}
            onChange={handleChange}
            placeholder="Artist (e.g., John Doe)"
          />

          <Input
            name="year"
            type="number"
            min="0"
            value={form.year}
            onChange={handleChange}
            placeholder="Year (e.g., 2023)"
          />

          <Input
            name="medium"
            value={form.medium}
            onChange={handleChange}
            placeholder="Medium (e.g., Oil on Canvas)"
          />

          <Input
            name="dimensions"
            value={form.dimensions}
            onChange={handleChange}
            placeholder="Dimensions (e.g., 80 x 100 cm)"
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
          </div>

          {/* Description */}
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
          />

          {/* Price */}
          <Input
            name="minPrice"
            type="number"
            min="0"
            value={form.minPrice}
            onChange={handleChange}
            placeholder="Price"
          />

          {/* Offer Status Dropdown */}
          <Select
            value={form.offerStatus}
            onValueChange={(value) => handleSelectChange("offerStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Offer Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="No Offer">No Offer</SelectItem>
              <SelectItem value="On Offer">On Offer</SelectItem>
            </SelectContent>
          </Select>

          {/* Payment Status Dropdown */}
          <Select
            value={form.paymentStatus}
            onValueChange={(value) => handleSelectChange("paymentStatus", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#570DF8] text-white hover:bg-[#4a0ed1]"
            >
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddArtworkModal;
