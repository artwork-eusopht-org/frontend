import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const VisitorDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    offer: "",
    notes: "",
    readyToPurchase: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.offer) {
      alert("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (isNaN(Number(formData.offer))) {
      alert("Offer must be a number in AUD.");
      return;
    }

    try {
      const res = await fetch("http://localhost/mailer-backend/send-offer.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "success") { // <-- matches PHP backend's response
        setSubmitted(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitted(false);
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            offer: "",
            notes: "",
            readyToPurchase: false,
          });
        }, 2000);
      } else {
        alert("Failed to send offer: " + (data.message || "Please try again later."));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check your PHP server logs.");
    }
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side - full image */}
      <div className="md:w-1/2 w-full">
        <img
          src="/artwork.png"
          alt="Artwork"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side - details */}
      <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center bg-white">
        <h1 className="text-3xl md:text-4xl font-bold text-[#00263E] mb-4">
          Branch of Affection
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-6">
          Two bright little birds share a tender moment on a sunlit branch, a simple yet heartwarming reminder that love needs no words.
        </p>
        <ul className="space-y-2 text-gray-600 mb-10 text-sm md:text-base">
          <li><strong>Artist:</strong> John Doe</li>
          <li><strong>Year:</strong> 2023</li>
          <li><strong>Medium:</strong> Oil on Canvas</li>
          <li><strong>Dimensions:</strong> 80 x 100 cm</li>
          <li><strong>Price:</strong> AUD 500</li>
        </ul>
      </div>

      {/* Floating button */}
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#009CDE] hover:bg-[#0088C2] text-white px-6 py-3 rounded-full shadow-lg z-50"
      >
        Make an Offer
      </Button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative my-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center p-4">
                <h2 className="text-2xl font-bold text-[#00263E] mb-4">
                  Thank You!
                </h2>
                <p>Your offer has been sent. We’ll be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Full Name *
                  </label>
                  <Input
                    name="fullName"
                    placeholder="e.g. John Smith"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Email Address *
                  </label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="e.g. john@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number (optional)
                  </label>
                  <Input
                    name="phone"
                    placeholder="e.g. 0400 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Your Offer (AUD) *
                  </label>
                  <Input
                    name="offer"
                    placeholder="e.g. 350"
                    value={formData.offer}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Additional Notes (optional)
                  </label>
                  <Textarea
                    name="notes"
                    placeholder="e.g. I can collect the artwork after the exhibition closes"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    name="readyToPurchase"
                    checked={formData.readyToPurchase}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        readyToPurchase: Boolean(checked),
                      }))
                    }
                  />
                  <label className="text-sm">
                    I am ready to purchase this artwork now at my offered price
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  Your details will only be used to respond to your offer and
                  will not be shared with anyone else.
                </p>
                <Button
                  type="submit"
                  className="w-full bg-[#009CDE] hover:bg-[#0088C2] text-white"
                >
                  Submit Offer
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitorDashboard;
