/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomePages = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    const uniqueCities = [...new Set(items.map((item) => item.city))];
    setCities(uniqueCities);
    setFilteredItems(items);
  }, [items]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('https://restaurant-api.dicoding.dev/list');
      setItems(response.data.restaurants);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    filterRestaurants(event.target.value);
  };

  const handleClearAll = () => {
    setSelectedCity('');
    setFilteredItems(items);
    setCurrentPage(1); // Reset ke halaman pertama setelah menghapus filter
  };

  const filterRestaurants = (city) => {
    if (city === '') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.city === city);
      setFilteredItems(filtered);
    }
    setCurrentPage(1); // Reset ke halaman pertama setelah menghapus filter
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} />);
    }
    return stars;
  };

  return (
    <div>
      <Navbar cities={cities} selectedCity={selectedCity} handleCityChange={handleCityChange} handleClearAll={handleClearAll} />
      <div className="mt-8 sm:mt-12 mx-4 sm:mx-8 lg:mx-36">
        <h1 className="text-3xl sm:text-4xl text-slate-500 mt-24 lg:mt-36 text-center lg:text-left">All Restaurants</h1>

        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="max-w-xs sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72">
                  <LazyLoadImage className="rounded-t-lg w-full h-full object-cover" src={`https://restaurant-api.dicoding.dev/images/medium/${item.pictureId}`} alt={item.name} effect="blur" />
                </div>
                <div className="p-4 sm:p-5">
                  <h5 className="mb-2 mt-8 lg:mt-0 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                  <p className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">Kota: {item.city}</p>
                  <div className="mb-2 font-normal text-sm text-gray-700 dark:text-gray-400">Rating: {renderRating(item.rating)}</div>
                  <button className="inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-sm hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Link to={`/detail-restaurant/${item.id}`}>Learn More</Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-2 mt-8 sm:mt-12 mb-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-xl text-gray-700 dark:text-gray-400">{currentPage}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredItems.length}
            className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePages;
