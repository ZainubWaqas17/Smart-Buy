import React from "react";
import mainPageImage from "../../assets/imgs/main-page.png";
import "./MainImage.css";

const MainImageSection = () => {
  return (
    <section>
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <a href="#product-section">
            {/* Clicking the img will scroll the user down to items */}
            <img src={mainPageImage} alt="Smart Buy Main Page" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MainImageSection;
