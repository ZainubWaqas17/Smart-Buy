import React, { useContext } from "react";
import PlayStation from "../../assets/imgs/Gaming Console.jpg";
import Ipad from "../../assets/imgs/Ipad.jpg";
import Television from "../../assets/imgs/Television.jpg";
import Airpods from "../../assets/imgs/airpods.png";
import Camera from "../../assets/imgs/camera.jpg";
import Drone from "../../assets/imgs/drone.jpg";
import Controller from "../../assets/imgs/gaming controller.jpg";
import HardDrive from "../../assets/imgs/hard drive.jpg";
import Headset from "../../assets/imgs/headphones.jpg";
import Keyboard from "../../assets/imgs/keyboard.jpg";
import Kindle from "../../assets/imgs/kindle.jpg";
import Laptop from "../../assets/imgs/laptop.jpg";
import Microphone from "../../assets/imgs/microphone.jpg";
import Monitor from "../../assets/imgs/monitor.jpg";
import Mouse from "../../assets/imgs/mouse.jpg";
import MobilePhone from "../../assets/imgs/phone.jpg";
import Speaker from "../../assets/imgs/portable speaker.jpg";
import PowerBank from "../../assets/imgs/powerBank.jpg";
import Printer from "../../assets/imgs/printer.jpg";
import Projector from "../../assets/imgs/projector.jpg";
import Smartwatch from "../../assets/imgs/smart watch.png";
import Soundbar from "../../assets/imgs/soundbar.jpg";
import Adapter from "../../assets/imgs/universal adapter.jpg";
import Webcam from "../../assets/imgs/webcam.jpg";
import { CartContext } from "../../contexts/CartContext"; // Import your CartContext
import "./ProductSection.css";

const products = [
  { name: "Headset", price: 30.0, image: Headset, alt: "Headset" },
  { name: "Laptop", price: 350.0, image: Laptop, alt: "Laptop" },
  { name: "Camera", price: 120.0, image: Camera, alt: "Camera" },
  { name: "Airpods", price: 135.0, image: Airpods, alt: "Airpods" },
  {
    name: "Mobile Phone",
    price: 30.0,
    image: MobilePhone,
    alt: "Mobile Phone",
  },
  { name: "Smartwatch", price: 140.0, image: Smartwatch, alt: "Smartwatch" },
  { name: "Printer", price: 155.0, image: Printer, alt: "Printer" },
  { name: "Power Bank", price: 50.0, image: PowerBank, alt: "Power Bank" },
  {
    name: "Play Station",
    price: 360.0,
    image: PlayStation,
    alt: "Play Station",
  },
  { name: "Speaker", price: 45.0, image: Speaker, alt: "Speaker" },
  { name: "Ipad", price: 250.0, image: Ipad, alt: "Ipad" },
  { name: "Monitor", price: 275.0, image: Monitor, alt: "Monitor" },
  { name: "Keyboard", price: 75.0, image: Keyboard, alt: "Keyboard" },
  { name: "Controller", price: 50.0, image: Controller, alt: "Controller" },
  { name: "Projector", price: 115.0, image: Projector, alt: "Projector" },
  { name: "Hard Drive", price: 40.0, image: HardDrive, alt: "Hard Drive" },
  { name: "Drone", price: 275.0, image: Drone, alt: "Drone" },
  { name: "Television", price: 450.0, image: Television, alt: "Television" },
  { name: "Kindle", price: 115.0, image: Kindle, alt: "Kindle" },
  { name: "Microphone", price: 30.0, image: Microphone, alt: "Microphone" },
  { name: "Adapter", price: 35.0, image: Adapter, alt: "Adapter" },
  { name: "Soundbar", price: 65.0, image: Soundbar, alt: "Soundbar" },
  { name: "Webcam", price: 35.0, image: Webcam, alt: "Webcam" },
  { name: "Mouse", price: 40.0, image: Mouse, alt: "Mouse" },
];

const ProductSection = ({ searchTerm, setSearchTerm }) => {
  // Filter products based on the searchTerm (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setSearchTerm(""); // Clear the search term to collapse the search results
  };

  return (
    <section className="container mt-5" id="product-section">
      <div className="row">
        {filteredProducts.map((product, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
            <div className="card h-100 text-center">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.alt}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price.toFixed(2)}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
