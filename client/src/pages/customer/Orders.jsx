import React, { useState, useEffect } from "react";
import { useAuth } from "../common/AuthContext";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { usePDF } from "react-to-pdf";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "MyOrders.pdf" });
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    getUserDetails();
    getAllOrdersByUser();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/loggedInUser`);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error("User profile not found.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
      }
      return null;
    }
  };

  const getAllOrdersByUser = async () => {
    try {
      const userData = await getUserDetails();
      if (!userData) {
        console.error("No user data found.");
        return;
      }

      const response = await authAxios.get(
        `${apiUrl}/order/getOrders/${userData._id}`
      );
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authAxios.delete(`${apiUrl}/order/${orderId}`);
      if (response.status === 200) {
        toast.success("Order canceled successfully");
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      }
    } catch (error) {
      console.error("Error canceling order:", error);
      toast.error("Failed to cancel order");
    }
  };

  const handleUpdateOrder = (order) => {
    setSelectedOrder(order);
    setNewAddress(order.address);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateAddress = async () => {
    console.log(newAddress);
    try {
      // Send the address wrapped in an object
      await axios.put(`${apiUrl}/order/${selectedOrder._id}`, { newAddress });
      toast.success("Order address updated successfully");
      getAllOrdersByUser();
      handleClose();
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order address");
    }
  };

  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <button
          onClick={() => toPDF()}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>

        <div ref={targetRef}>
          <h2 className="text-2xl font-semibold mb-4 text-center">My Orders</h2>
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm leading-normal">
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Order Number
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Customer Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Order Address
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Payment By
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Amount
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider">
                  Ordered At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 font-semibold tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {orders?.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-5 py-5 bg-white whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-5 py-5 bg-white">{order.email || "N/A"}</td>
                  <td className="px-5 py-5 bg-white">
                    {order.address || "N/A"}
                  </td>
                  <td className="px-5 py-5 bg-white">
                    {order.cardNo || "N/A"}
                  </td>
                  <td className="px-5 py-5 bg-white">{order.price}</td>
                  <td className="px-5 py-5 bg-white">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-5 py-5 bg-white text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                        onClick={() => handleUpdateOrder(order)}
                      >
                        Update
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Order Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateAddress} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
