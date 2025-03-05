import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import "./NavBar.css";

const Navbar = ({ toggleCart, resetCartCounter }) => {
  const { cart } = useContext(CartContext); // to be able to access cart from CartContext

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i
            className="fa-solid fa-headphones"
            alt="Smart Buy"
            style={{ color: "white", height: "40px" }}
          ></i>
          <span style={{ color: "white", fontSize: "24px", marginLeft: "8px" }}>
            SmartBuy
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#favourites">
                <i className="fas fa-heart"></i> Favourites
              </a>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <i className="fas fa-user"></i> Login
              </Link>
            </li>

            <li className="nav-item">
              <button
                className="nav-link position-relative btn"
                onClick={toggleCart}
                id="cart-icon"
                style={{ background: "none", border: "none", color: "white" }}
              >
                <i className="fas fa-shopping-cart fa-lg"></i> Cart
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  id="cart-count"
                >
                  {cart.length}
                </span>
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/FakeAPI">
                API
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
