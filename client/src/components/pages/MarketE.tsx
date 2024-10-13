import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IShop } from '../../vite-env';
import { cn } from '../../lib/utils';
import { def_shop, def_user } from '../../assets';
import { Link } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const [shops, setShops] = useState<IShop[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/explore`);
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
      }
    };
    fetchData();
  }, []);

  return (
    <div className='min-h-screen bg-black text-purple-500 flex items-center relative flex-col pb-10'>
      <Authorization />

      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4'>
        {shops.map((shop: IShop) => {
          return (
            <Link to={`/marketplace/${shop._id}`}>
              <div className='w-[300px] group/card'>
                <div
                  className={cn(
                    ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4'
                  )}
                  style={{
                    backgroundImage: `url(${def_shop})`,
                  }}
                >
                  <div className='absolute w-full h-full top-0 left-0 transition duration-300 bg-black opacity-60'></div>
                  <div className='flex flex-row items-center space-x-4 z-10'>
                    <img
                      height='100'
                      width='100'
                      alt='Avatar'
                      src={def_user}
                      className='h-10 w-10 rounded-full border-2 object-cover'
                    />
                    <div className='flex flex-col'>
                      <p className='font-normal text-base text-gray-50 relative z-10'>
                        {shop.owner.userName}
                      </p>
                      <p className='text-sm text-gray-400'>
                        {new Date(shop.estd).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                  <div className='text content'>
                    <h1 className='font-bold text-xl md:text-2xl text-gray-50 relative z-10'>
                      {shop.shopName}
                    </h1>
                    <p className='font-normal text-sm text-gray-400 relative z-10 mb-4'>
                      {shop.location}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Marketplace;
