import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./CheckOut.css";

const Checkout = ({ resetCartCounter }) => {
  const { setCart } = useContext(CartContext);
  const [cart, setLocalCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [showAlert, setShowAlert] = useState(false); // State to manage alert visibility

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCart(savedCart);
    setCart(savedCart);
    calculateTotal(savedCart);
  }, [setCart]);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    const { cardName, cardNumber, expiryDate, cvv } = paymentDetails;
    const newErrors = {};

    // Validate payment details before proceeding
    if (!cardName) newErrors.cardName = "Cardholder name is required.";
    if (!cardNumber) newErrors.cardNumber = "Card number is required.";
    else if (cardNumber.length !== 16 || isNaN(cardNumber))
      newErrors.cardNumber = "Please enter a valid 16-digit card number.";

    if (!expiryDate) newErrors.expiryDate = "Expiration date is required.";
    else if (!/^\d{2}\/\d{2}$/.test(expiryDate))
      newErrors.expiryDate = "Please enter a valid expiration date (MM/YY).";

    if (!cvv) newErrors.cvv = "CVV is required.";
    else if (cvv.length !== 3 || isNaN(cvv))
      newErrors.cvv = "Please enter a valid 3-digit CVV.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowAlert(true); // Show alert on successful order confirmation

    localStorage.removeItem("cart");
    setLocalCart([]);
    setCart([]);
    setTotal(0);

    setPaymentDetails({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });

    document.getElementById("checkout-form").reset();
    resetCartCounter();
    setErrors({}); // Clear any previous errors after successful submission
  };

  const handlePaymentChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "", // Clear error when user starts typing in the field
    }));
  };

  return (
    <div className="container my-5">
      {showAlert && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Order confirmed!</strong> Thank you for your purchase.
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}
      <div className="row">
        <div className="col-lg-4 mb-4">
          {/* Order Summary Section */}
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: "#0f5050", color: "white" }}
            >
              Order Summary
            </div>
            <div className="card-body" id="order-summary">
              <ul id="order-items" className="list-group">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                      className="order-item-image me-2"
                    />
                    <div>
                      {item.name} - ${item.price.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <hr />
              <h6>Total: ${total.toFixed(2)}</h6>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="card mt-4">
            <div
              className="card-header"
              style={{ backgroundColor: "#0f5050", color: "white" }}
            >
              Payment Details
            </div>
            <div className="card-body">
              <form id="payment-form">
                <div className="mb-3">
                  <label htmlFor="cardName" className="form-label">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    className="form-control"
                    value={paymentDetails.cardName}
                    onChange={handlePaymentChange}
                    placeholder="Enter cardholder name"
                    required
                  />
                  {errors.cardName && (
                    <small className="text-danger">{errors.cardName}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="form-control"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="Enter your card number"
                    required
                  />
                  {errors.cardNumber && (
                    <small className="text-danger">{errors.cardNumber}</small>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className="form-control"
                      value={paymentDetails.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                    {errors.expiryDate && (
                      <small className="text-danger">{errors.expiryDate}</small>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="form-control"
                      value={paymentDetails.cvv}
                      onChange={handlePaymentChange}
                      placeholder="Enter CVV"
                      required
                    />
                    {errors.cvv && (
                      <small className="text-danger">{errors.cvv}</small>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card">
            <div
              className="card-header"
              style={{ backgroundColor: "#0f5050", color: "white" }}
            >
              Complete Your Order
            </div>
            <div className="card-body">
              <form id="checkout-form" onSubmit={handleCheckout}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter your delivery address"
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="delivery-preference" className="form-label">
                    Delivery Preference
                  </label>
                  <select
                    id="delivery-preference"
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select delivery preference
                    </option>
                    <option value="standard">
                      Standard Delivery (3-5 days)
                    </option>
                    <option value="express">Express Delivery (1-2 days)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#0f5050" }}
                >
                  Confirm Order
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
