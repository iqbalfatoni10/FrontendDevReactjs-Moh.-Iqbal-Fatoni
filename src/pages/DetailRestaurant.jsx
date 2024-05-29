/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const DetailRestaurant = () => {
  const { id } = useParams();
  const [item, setItems] = useState(null);

  useEffect(() => {
    Detail();
  }, []);

  const Detail = async () => {
    try {
      const response = await axios.get(`https://restaurant-api.dicoding.dev/detail/${id}`);
      setItems(response.data.restaurant);
      console.log(response.data.restaurant);
    } catch (error) {
      console.error('Error fetching data : ', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} />);
    }
    return stars;
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 sm:mx-12 lg:mx-36">
        <div className="mt-10 lg:mt-20">
          <LazyLoadImage className="rounded-lg w-full" src={`https://restaurant-api.dicoding.dev/images/medium/${item.pictureId}`} alt={item.name} effect="blur" />
        </div>
        <div className="lg:mt-20 pl-0 lg:pl-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-black font-bold mb-4 text-center lg:text-left">{item.name}</h1>
          <p className="text-slate-600 text-lg sm:text-xl mb-4">
            <span className="text-slate-600 text-lg sm:text-xl font-bold">Alamat:</span> {item.address}, {item.city}
          </p>
          <p className="text-slate-600 text-lg sm:text-xl mb-4">
            <span className="text-slate-600 text-lg sm:text-xl font-bold">Kategori:</span> {item.categories.map((category) => category.name).join(', ')}
          </p>
          <div className="text-slate-600 text-lg sm:text-xl font-bold mb-4">
            Rating: {renderRating(item.rating)} {item.rating}/5
          </div>
          <p className="text-slate-600 text-lg sm:text-xl font-bold mb-2">Menu</p>
          <hr />
          <p className="text-slate-600 text-lg sm:text-xl mb-4">
            <span className="text-slate-600 text-lg sm:text-xl font-bold">Makanan:</span> {item.menus.foods.map((makanan) => makanan.name).join(', ')}
          </p>
          <p className="text-slate-600 text-lg sm:text-xl mb-4">
            <span className="text-slate-600 text-lg sm:text-xl font-bold">Minuman:</span> {item.menus.drinks.map((minuman) => minuman.name).join(', ')}
          </p>
        </div>
      </div>

      <div className="mx-4 sm:mx-12 lg:mx-36">
        <p className="text-slate-600 text-lg sm:text-xl font-bold mb-2 mt-10">Deskripsi</p>
        <hr className="mb-4" />
        <p className="mb-3 text-lg text-gray-700 dark:text-gray-400 text-justify">{item.description}</p>
      </div>

      <div className="mx-4 sm:mx-12 lg:mx-36">
        <p className="text-slate-600 text-lg sm:text-xl mb-2 font-bold mt-10 lg:mt-6">Ulasan Pelanggan:</p>
        <hr className="mb-4" />
        {item.customerReviews.map((review, index) => (
          <div key={index} className="mb-6">
            <p className="text-slate-600 text-lg font-bold">{review.name}</p>
            <p className="text-slate-600 text-md italic mb-2">{review.date}</p>
            <p className="text-slate-600 text-lg">{review.review}</p>
          </div>
        ))}
        <div className="flex justify-end mx-4 sm:mx-12 lg:mx-36 mt-6">
          <button className="bg-blue-600 text-white duration-500 px-10 py-2 hover:bg-blue-700 rounded mb-6">
            <Link to="/">Kembali</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailRestaurant;
