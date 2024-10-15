import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IShop } from '../../vite-env';
import { cn } from '../../lib/utils';
import { def_user } from '../../assets';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const [shops, setShops] = useState<IShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/explore`);
        setShops(response.data.shops);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='min-h-screen bg-background text-text flex items-center relative flex-col mb-10'>
      <Authorization />
      <div className='flex flex-col mb-10 '>
        <h1 className='text-5xl font-bold text-primary text-center pb-2'>
          Explore Marketplace
        </h1>
        <p className='text-center text-2xl text-accent'>
          Discover. Connect. Thrive – Your Marketplace, Now Digitally Yours.
        </p>
        <p className='text-accent font'></p>
      </div>

      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4  '>
        {shops.map((shop: IShop) => {
          return (
            <Link to={`/marketplace/${shop._id}`}>
              <div className='w-[300px] group/card text-text  transition-all ease-in border-2 border-secondary hover:border-primary  rounded-xl'>
                <div
                  className={cn(
                    ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in'
                  )}
                >
                  <div className='text content'>
                    <h1 className='font-bold text-xl md:text-2xl  relative z-10'>
                      {shop.shopName}
                    </h1>
                    <p className=' text-sm  relative z-10 mb-4'>
                      {shop.location}
                    </p>
                  </div>

                  <div className='flex flex-row items-center space-x-4 z-10'>
                    <img
                      height='100'
                      width='100'
                      alt='Avatar'
                      src={def_user}
                      className='h-10 w-10 rounded-full border-2 object-cover'
                    />
                    <div className='flex flex-col'>
                      <p className='font-normal text-base  relative z-10'>
                        {shop.owner.userName}
                      </p>
                      <p className='text-sm '>
                        {new Date(shop.estd).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
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
