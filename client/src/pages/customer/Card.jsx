import React, { useState, useEffect } from "react";
import axios from "axios";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { usePDF } from "react-to-pdf"; // Import usePDF hook
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function Card() {
  const [cards, setCards] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null); // Card to edit
  const { toPDF, targetRef } = usePDF({ filename: "SavedCards.pdf" }); // PDF generation hook

  const [formData, setFormData] = useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    name: "",
    email: "",
  });

  // Fetch card details
  const fetchCards = async () => {
    try {
      const det = await authAxios.get(`${apiUrl}/card`);
      setCards(det.data); // Set fetched card data
      setIsLoading(false); // Stop loading after data is fetched
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    fetchCards(); // Fetch cards when the component mounts
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save new card
  const handleSaveCard = async () => {
    try {
      await authAxios.post("/payment/save", formData); // Save new card
      setShowForm(false);
      fetchCards(); // Refresh card list after saving
      toast.success("Card saved successfully!"); // Show success toast
    } catch (error) {
      console.error("Error saving card:", error);
      toast.error("Failed to save card."); // Show error toast
    }
  };

  // Update existing card
  const handleUpdateCard = async () => {
    try {
      await axios.put(`${apiUrl}/card/${selectedCard._id}`, formData); // Update card
      setSelectedCard(null);
      setShowForm(false);
      fetchCards(); // Refresh card list after updating
      toast.success("Card updated successfully!"); // Show success toast
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Failed to update card."); // Show error toast
    }
  };

 // Delete card
const handleDeleteCard = async (id) => {
  try {
    await authAxios.delete(`${apiUrl}/card/${id}`); // Delete card by ID
    fetchCards(); // Refresh card list after deletion
    toast.success("Card deleted successfully!"); // Show success toast
    setTimeout(() => {
      window.location.reload(); // Refresh the page after a brief delay
    }, 2000); // Adjust the delay to give the toast time to display
  } catch (error) {
    console.error("Error deleting card:", error);
    toast.error("Failed to delete card."); // Show error toast
  }
};


  // Open form to edit existing card
  const handleEditCard = (card) => {
    setSelectedCard(card);
    setFormData({
      cardNumber: card.cardNumber,
      expMonth: card.expMonth,
      expYear: card.expYear,
      cvv: card.cvv,
      name: card.name,
      email: card.email,
    });
    setShowForm(true); // Show the form for editing
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-5">
      <br></br>
      <button
        onClick={() => toPDF()} // PDF download functionality
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
      <br></br>
      <br></br>
      <br></br>

      <div ref={targetRef}>
        {" "}
        {/* PDF generation target */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          My Saved Cards
        </h2>
        {Array.isArray(cards) && cards.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6">Card Number</th>
                <th className="py-3 px-6">Card Holder's Name</th>
                <th className="py-3 px-6">Expire</th>
                <th className="py-3 px-6">CVV</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {cards.map((card) => (
                <tr
                  key={card._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {card.cardNumber}
                  </td>
                  <td className="py-4 px-6">{card.name}</td>
                  <td className="py-4 px-6">{`${card.expMonth}/${card.expYear}`}</td>
                  <td className="py-4 px-6">{card.cvv}</td>
                  <td className="py-4 px-6">{card.email}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                        onClick={() => handleEditCard(card)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold"
                        onClick={() => handleDeleteCard(card._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No cards found. </div>
        )}
      </div>

      {/* Add or Edit Card Form */}
      <Dialog open={showForm} onClose={() => setShowForm(false)}>
        <DialogTitle>{selectedCard ? "Update Card" : "Add Card"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Expire Month"
            name="expMonth"
            value={formData.expMonth}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Expire Year"
            name="expYear"
            value={formData.expYear}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="CVV"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Card Holder's Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={selectedCard ? handleUpdateCard : handleSaveCard}
            color="primary"
          >
            {selectedCard ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
