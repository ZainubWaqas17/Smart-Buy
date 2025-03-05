import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="container my-4">
      {/* container:bootstrap class that aligns content centrally, my-4: adds 4 units margin on top and bottom */}
      <input
        type="text"
        id="search"
        className="form-control mb-4"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* mb-4: adds margin-bottom of 4 units below the input field. */}
    </section>
  );
};

export default SearchBar;
