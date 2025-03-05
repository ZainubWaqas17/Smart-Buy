import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CartSubPage from "./components/Cart/CartSubPage";
import Checkout from "./components/CheckOut/CheckOut";
import FakeAPI from "./components/FakeAPI/FakeAPI";
import Login from "./components/Login/Login";
import MainImageSection from "./components/MainPage/MainImage";
import Navbar from "./components/NavBar/NavBar";
import ProductSection from "./components/ProductSection/ProductSection";
import SearchBar from "./components/SearchBar/SearchBar";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const resetCartCounter = () => {
    setCartCount(0);
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar
            toggleCart={toggleCart}
            cartCount={cartCount}
            resetCartCounter={resetCartCounter}
          />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/checkout"
              element={<Checkout resetCartCounter={resetCartCounter} />}
            />
            <Route
              path="/"
              element={
                <>
                  <MainImageSection />
                  <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                  <ProductSection
                    searchTerm={searchTerm}
                    setCartCount={setCartCount}
                    setSearchTerm={setSearchTerm}
                  />
                </>
              }
            />
            <Route path="/FakeAPI" element={<FakeAPI />} />
          </Routes>
          <div
            className={`offcanvas offcanvas-end ${isCartOpen ? "show" : ""}`}
            id="cart-subpage"
            tabIndex="-1"
            aria-hidden={!isCartOpen}
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Shopping Cart</h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleCart}
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <CartSubPage toggleCart={toggleCart} />
            </div>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
