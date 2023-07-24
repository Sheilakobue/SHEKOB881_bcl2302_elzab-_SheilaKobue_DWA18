import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';

const Header = () => {
  const handleSearch = (event) => {
    // You can add your search functionality here
    console.log('Searching for:', event.target.value);
  };

  const handleLogin = () => {
    // You can add your login functionality here
    console.log('User clicked login');
  };

  return (
    <nav>
      <div className="logo">My Podcast</div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
        />
        <FaSearch className="search-icon" />
      </div>
      <div className="login">
        <FaUser className="user-icon" onClick={handleLogin} />
      </div>
    </nav>
  );
};

export default Header;