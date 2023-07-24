import React, { useState } from 'react';

const products = [
  { id: 1, name: 'Product A', date: '2023-07-20' },
  { id: 2, name: 'Product B', date: '2023-07-22' },
  { id: 3, name: 'Product C', date: '2023-07-21' },
  // Add more products as needed
];

const NavBar = () => {
  const [sortOrder, setSortOrder] = useState('AtoZ');
  const [sortByDate, setSortByDate] = useState('');

  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'AtoZ' ? 'ZtoA' : 'AtoZ'));
  };

  const handleSortByDate = (type) => {
    setSortByDate(type);
  };

  // Function to sort products based on sort order and date
  const sortedProducts = () => {
    let sorted = [...products];

    if (sortOrder === 'AtoZ') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (sortByDate === 'mostRecent') {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortByDate === 'leastRecent') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return sorted;
  };

  const sortedProductList = sortedProducts();

  return (
    <div>
      <button onClick={handleSortOrderChange}>
        Sort {sortOrder === 'AtoZ' ? 'Z-A' : 'A-Z'}
      </button>
      <button onClick={() => handleSortByDate('mostRecent')}>Most Recent</button>
      <button onClick={() => handleSortByDate('leastRecent')}>Least Recent</button>

      <ul>
        {sortedProductList.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;