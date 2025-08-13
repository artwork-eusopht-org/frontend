// EditArtworkModal.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EditArtworkModal({ open, onClose, artwork, onSave }) {
  const [form, setForm] = useState({ ...artwork });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Artwork</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
          <Input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
          <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <Input name="minPrice" type="number" value={form.minPrice} onChange={handleChange} placeholder="Price" />
          <Input name="status" value={form.status} onChange={handleChange} placeholder="Status" />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              onClick={handleSubmit}
              style={{ backgroundColor: '#570DF8', color: 'white' }}
            >
              Save
            </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
