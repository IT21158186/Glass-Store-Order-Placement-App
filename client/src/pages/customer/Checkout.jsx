import React, { useEffect, useState } from "react";
import authAxios from "../../utils/authAxios";
import { apiUrl } from "../../utils/Constants";
import { useLocation } from "react-router-dom";
import { useAuth } from "../common/AuthContext";
import { toast } from "react-toastify";

export default function Checkout() {
  const [card, setCard] = useState({
    userid: "",
    name: "",
    email: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    address: "", // Add address field
  });
  const [buttonText, setBtnText] = useState("Save Card");
  const location = useLocation();
  const total = location.state;

  // Validation states
  const [errors, setErrors] = useState({});

  // Get saved card details if available
  const getSavedCardDetails = async () => {
    try {
      const det = await authAxios.get(`${apiUrl}/card/`);
      if (det?.data.length > 0) {
        setCard(det.data[0]);
        console.log(det.data[0]);
        setBtnText("Place Order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedCardDetails();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cardNumberRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

    if (!card.name) newErrors.name = "Name on the card is required.";
    if (!emailRegex.test(card.email))
      newErrors.email = "Invalid email address.";
    if (
      !cardNumberRegex.test(card.cardNumber) ||
      card.cardNumber.replace(/-/g, "").length !== 16
    ) {
      newErrors.cardNumber =
        "Card number must be in format 1234-5678-XXXX-XXXX and have exactly 16 digits.";
    }
    if (!card.expMonth || card.expMonth < 1 || card.expMonth > 12)
      newErrors.expMonth = "Valid expiration month is required.";
    if (!card.expYear || card.expYear.length !== 4)
      newErrors.expYear = "Valid expiration year is required.";
    if (card.cvv.length !== 3) newErrors.cvv = "CVV must be exactly 3 digits."; // CVV validation
    if (!card.address) newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrder = async () => {
    if (!validateForm()) return;

    try {
      if (buttonText === "Place Order") {
        const data = {
          userId: card.userid,
          cardNo: card.cardNumber,
          price: total,
          email: card.email,
          mm: card.expMonth,
          yy: card.expYear,
          name: card.name,
          address: card.address, // Include address in the order creation
        };
        const resp = await authAxios.post(`${apiUrl}/order/createOrder`, data);
        toast.success("Order placed successfully");
      } else {
        const resp = await authAxios.post(`${apiUrl}/card/save`, card);
        toast.success("Card saved successfully");
        await getSavedCardDetails();
        setBtnText("Place Order");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateCardDetails = (e) => {
    setCard((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Determine if card details are saved
  const isCardSaved = !!card.userid; // Check if there's a saved card

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-3 px-4 sm:py-6 lg:col-span-6 lg:py-12">
          {" "}
          {/* Adjusted padding here */}
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form action="" className="mt-10 flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-semibold text-gray-500"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john.capler@fang.com"
                  onChange={updateCardDetails}
                  value={card?.email}
                  disabled={isCardSaved} // Disable if card details are saved
                  className={`mt-1 block w-full rounded border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <label
                  htmlFor="card-number"
                  className="text-xs font-semibold text-gray-500"
                >
                  Card number
                </label>
                <input
                  type="text"
                  onChange={updateCardDetails}
                  value={card?.cardNumber}
                  id="card-number"
                  name="cardNumber"
                  placeholder="1234-5678-XXXX-XXXX"
                  disabled={isCardSaved} // Disable if card details are saved
                  className={`block w-full rounded border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-xs">{errors.cardNumber}</p>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Expiration date
                </p>
                <div className="mr-6 flex flex-wrap">
                  <div className="my-1">
                    <label htmlFor="month" className="sr-only">
                      Select expiration month
                    </label>
                    <input
                      id="expMonth"
                      type="number"
                      min="1"
                      max="12"
                      name="expMonth"
                      disabled={isCardSaved} // Disable if card details are saved
                      className={`p-3 border ${
                        errors.expMonth ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-300 bg-gray-50`}
                      placeholder="MM"
                      value={card.expMonth}
                      onChange={updateCardDetails}
                    />
                    {errors.expMonth && (
                      <p className="text-red-500 text-xs">{errors.expMonth}</p>
                    )}
                  </div>
                  <div className="my-1 ml-3 mr-6">
                    <label htmlFor="year" className="sr-only">
                      Select expiration year
                    </label>
                    <input
                      id="expYear"
                      type="number"
                      min="1000"
                      max="9999"
                      name="expYear"
                      disabled={isCardSaved} // Disable if card details are saved
                      className={`p-3 border ${
                        errors.expYear ? "border-red-500" : "border-gray-300"
                      } placeholder-gray-300 bg-gray-50`}
                      placeholder="YYYY"
                      value={card.expYear}
                      onChange={updateCardDetails}
                    />
                    {errors.expYear && (
                      <p className="text-red-500 text-xs">{errors.expYear}</p>
                    )}
                  </div>

                  <div className="relative my-1">
                    <label htmlFor="security-code" className="sr-only">
                      Security code
                    </label>
                    <input
                      type="text"
                      onChange={updateCardDetails}
                      value={card?.cvv}
                      id="security-code"
                      name="cvv"
                      placeholder="CVV"
                      disabled={isCardSaved} // Disable if card details are saved
                      className={`block w-36 rounded border ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      } bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs">{errors.cvv}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">
                  Name on card
                </p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Capler"
                  onChange={updateCardDetails}
                  value={card?.name}
                  disabled={isCardSaved} // Disable if card details are saved
                  className={`mt-1 block w-full rounded border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">Address</p>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Your address"
                  onChange={updateCardDetails}
                  value={card?.address}
                  disabled={isCardSaved} // Disable if card details are saved
                  className={`mt-1 block w-full rounded border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">{errors.address}</p>
                )}
              </div>

              <div>
                <button
                  type="button"
                  onClick={createOrder}
                  className="mt-4 w-full rounded bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-teal-500"
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Total Price Section */}
        <div className="col-span-4 hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
          <div className="bg-teal-500 rounded-2xl p-4 text-center">
            <h2 className="text-lg font-medium text-white">Total Value:</h2>
            <p className="text-2xl font-semibold text-white">
              LKR. {total.toLocaleString()}.00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
