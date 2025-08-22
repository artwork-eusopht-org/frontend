// AddArtworkModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function AddArtworkModal({ open, onClose, onAdd }) {
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      console.log(form.image);
      if(form.title == ""){
        alert("Title is required");
        return;
      }
      if(form.artist == ""){
        alert("Artist is required");
        return;
      }
      if(form.minPrice == ""){
        alert("Price is required");
        return;
      }
      if(form.image == ""){
        alert("Image is required");
        return;
      }

      // Append all fields
      formData.append("title", form.title);
      formData.append("artist", form.artist);
      formData.append("year", form.year);
      formData.append("medium", form.medium);
      formData.append("dimensions", form.dimensions);
      formData.append("description", form.description);
      formData.append("minPrice", form.minPrice);
      formData.append("offerStatus", form.offerStatus);
      formData.append("paymentStatus", form.paymentStatus);

      // Image must be a File object (from <input type="file" />)
      formData.append("image", form.image); // assuming form.image is a File

      const { data } = await axios.post(
        import.meta.env.VITE_API_URL + "artworks/add-artwork",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.status !== 200) {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: data.message,
        variant: "default",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Reset form here
      setForm({
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

      await onAdd();
      
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while uploading.",
        variant: "destructive",
      });
    }
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
            <Input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
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
          {/* <Select
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
          </Select> */}

          {/* Payment Status Dropdown */}
          {/* <Select
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
          </Select> */}

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
