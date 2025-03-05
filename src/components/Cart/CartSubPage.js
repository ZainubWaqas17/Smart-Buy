import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // for routing
import "../../App";
import { CartContext } from "../../contexts/CartContext";
import "./CartSubPage.css";

const CartSubPage = ({ toggleCart }) => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // for debugging
  console.log("Cart items:", cart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    toggleCart(); // Close the cart offcanvas
    navigate("/checkout"); // Navigate to the checkout page
  };

  //render component
  return (
    <div>
      <ul className="list-group">
        {/*if cart is empty */}
        {cart.length === 0 ? (
          <li className="list-group-item">Your cart is empty.</li>
        ) : (
          cart.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "40px", height: "40px" }}
                className="me-2"
              />
              {item.name} - ${item.price.toFixed(2)}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
      <p className="mt-3">Total: ${total.toFixed(2)}</p>
      <button className="btn btn-success" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default CartSubPage;
