/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react';
import react from '../../assets/react.svg';

const Navbar = ({ cities, selectedCity, handleCityChange, handleClearAll }) => {
  const handleClick = (e) => {
    let list = document.querySelector('ul');
    if (e.target.name === 'menu') {
      e.target.name = 'close';
      list.classList.add('top-[80px]');
      list.classList.add('opacity-100');
    } else {
      e.target.name = 'menu';
      list.classList.remove('top-[80px]');
      list.classList.remove('opacity-100');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 px-4 sm:px-8 md:px-16 lg:px-36 py-5 bg-white shadow md:flex md:items-center md:justify-between z-50">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold">
          <img src={react} alt="logo" className="h-8 inline mr-2" />
          Restaurant <span className="text-blue-600">React</span>
        </span>
        <span className="text-3xl cursor-pointer mx-2 md:hidden block">
          <ion-icon name="menu" onClick={handleClick}></ion-icon>
        </span>
      </div>

      <ul className="md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500">
        <li className="mx-4 my-6 md:my-0">
          <p className="text-base">Filter By:</p>
        </li>
        <li className="mx-4 my-6 md:my-0">
          <select
            value={selectedCity}
            onChange={handleCityChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Semua Kota</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </li>

        <button onClick={handleClearAll} className="bg-blue-600 text-white duration-500 px-10 py-2 mx-4 hover:bg-blue-700 rounded">
          Clear All
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
