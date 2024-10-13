import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IShop } from '../../vite-env';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const [shops, setShops] = useState<IShop[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop`);
        console.log('Data fetched:', response.data.shops); // Log the data for debugging
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
      }
    };
    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-black text-purple-500 flex items-center relative flex-col'>
      <Authorization />

      <div className='p-5'>
        {shops.map((shop: IShop) => {
          return (
            <div key={shop._id} className='border border-white p-5 m-5'>
              <div>Shop Name: {shop.shopName}</div>
              <div>Owner: {shop.owner.userName}</div>
              <div>Location: {shop.location}</div>
              <div>
                Shop Image: <img src={shop.shopImageURL} alt={shop.shopName} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marketplace;
