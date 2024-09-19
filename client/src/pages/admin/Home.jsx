import React, { useState, useEffect } from "react";
import axios from "axios";
import PaymentTable from "../../components/admin/PaymentTable";
import Divider from "@mui/material/Divider";
import { apiUrl } from "../../utils/Constants";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    try {
      const response = await axios.get(`${apiUrl}/card/all`);
      setCards(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div class="flex justify-center items-center">
        <h1 class="text-4xl font-bold text-gray-800">
          Payment Methods Management
        </h1>
      </div>
      <Divider />

      {loading ? <div>Loading...</div> : <PaymentTable cards={cards} />}
    </div>
  );
};

export default Home;
