import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';

const PaymentTable = ({ cards }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [updatedCard, setUpdatedCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term

    const handleDeleteDialogOpen = (card) => {
        setSelectedCard(card);
        setDeleteDialogOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleUpdateDialogOpen = (card) => {
        setSelectedCard(card);
        setUpdatedCard({ ...card });
        setUpdateDialogOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCard(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`${apiUrl}/card/${selectedCard._id}`);
            toast.warning('Deleted Successfully!');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
        setDeleteDialogOpen(false);
    };

    const handleUpdateConfirmed = async () => {
        if (!updatedCard) return;

        try {
            await axios.put(`${apiUrl}/card/${selectedCard._id}`, updatedCard);
            toast.success('Card updated successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error updating card:', error);
            toast.error('Failed to update card details');
        }

        setUpdateDialogOpen(false);
    };

    // Filter cards based on the search term
    const filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (cards.length > 0) {
        return (
            <div className="overflow-xl-auto">
                {/* Search Bar */}
                <div className="flex justify-end mb-4">
                    <TextField
                        label="Search by Name"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        sx={{ width: "300px" }}
                    />
                </div>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Customer ID</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Card Number</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Expiration</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">CVV</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCards.map(card => (
                            <tr key={card._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{card._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{card.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{card.cardNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{`${card.expMonth}/${card.expYear}`}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{card.cvv}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateDialogOpen(card)}>Update</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteDialogOpen(card)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                    <DialogTitle>Delete Payment Details</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete the payment details of {selectedCard && selectedCard.name}?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteDialogClose} color="primary">No</Button>
                        <Button onClick={handleDeleteConfirmed} color="secondary">Yes</Button>
                    </DialogActions>
                </Dialog>

                {/* Update Payment Details Dialog */}
                <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
                    <DialogTitle>Update Payment Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            name="name"
                            value={updatedCard?.name || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="cardNumber"
                            label="Card Number"
                            type="text"
                            fullWidth
                            name="cardNumber"
                            value={updatedCard?.cardNumber || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="expMonth"
                            label="Expiration Month"
                            type="text"
                            fullWidth
                            name="expMonth"
                            value={updatedCard?.expMonth || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="expYear"
                            label="Expiration Year"
                            type="text"
                            fullWidth
                            name="expYear"
                            value={updatedCard?.expYear || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="cvv"
                            label="CVV"
                            type="text"
                            fullWidth
                            name="cvv"
                            value={updatedCard?.cvv || ''}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="cardType"
                            label="Card Type"
                            type="text"
                            fullWidth
                            name="cardType"
                            value={updatedCard?.cardType || ''}
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleUpdateDialogClose} color="primary">Cancel</Button>
                        <Button onClick={handleUpdateConfirmed} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return <div>No payment data available.</div>;
};

export default PaymentTable;
