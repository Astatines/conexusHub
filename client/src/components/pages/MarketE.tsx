import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IShop } from '../../vite-env';
import { cn } from '../../lib/utils';
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

      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 px-10  '>
        {shops.map((shop: IShop) => {
          return (
            <div className=' relative w-[300px] group/card text-text hover:text-text transition-all ease-in border-2 border-secondary hover:border-primary  rounded-xl'>
              <div
                className={cn(
                  '  overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col p-4 hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in items-center'
                )}
              >
                <img
                  className=' shadow-shadow shadow-sm w-full h-[250px] rounded-xl object-cover hover:translate-y-[-0.5] active:translate-x-[-0.5}  transition-all ease-in'
                  src={shop.shopImageURL}
                  alt={shop.shopName}
                />
                <h2 className='font-bold text-text p-2'>
                  {shop.shopName} -{' '}
                  <span className='text-accent'>{shop.location}</span>
                </h2>
                <button className='w-full'>
                  <Link to={`/marketplace/${shop._id}`}>
                    <p className=' font-bold bg-secondary w-full py-2 rounded-xl hover:bg-primary hover:text-background text-text transition-all ease-in'>
                      View Shop
                    </p>
                  </Link>
                </button>
              </div>
              <div className='flex flex-row items-center top-7 left-6 absolute  gap-3  '>
                {' '}
                <img
                  className=' h-10 w-10  rounded-full border-2 object-cover'
                  src={shop.owner.userImageURL}
                  alt={shop.owner.userName}
                />
                <p className='font-bold bg-transparent p-2 rounded-xl text-accent text-opacity-80'>
                  {shop.owner.userName}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marketplace;

// <div className='w-[300px] group/card text-text  transition-all ease-in border-2 border-secondary hover:border-primary  rounded-xl'>
// <div
//   className={cn(
//     ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in'
//   )}
// >
//   <div className='text content'>
//     <h1 className='font-bold text-xl md:text-2xl  relative z-10'>
//       {shop.shopName}
//     </h1>
//     <p className=' text-sm  relative z-10 mb-4'>
//       {shop.location}
//     </p>
//   </div>
//   <div className='border-2 rounded-xl my-2'>
//     <img src={shop.shopImageURL} alt='' />
//   </div>

//   <div className='flex flex-row items-center space-x-4 z-10'>
//     <img
//       height='100'
//       width='100'
//       alt='userImageUrl'
//       src={shop.owner.userImageURL || def_user}
//       className='h-10 w-10 rounded-full border-2 object-cover'
//     />

//     <div className='flex flex-col'>
//       <p className='font-normal text-base  relative z-10'>
//         {shop.owner.userName}
//       </p>
//       <p className='text-sm '>
//         {new Date(shop.estd).toLocaleDateString('en-US', {
//           year: 'numeric',
//           month: 'long',
//           day: 'numeric',
//         })}
//       </p>
//     </div>
//   </div>
// </div>
// </div>
