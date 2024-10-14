import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IProduct, IShop } from '../../vite-env';
import { useParams } from 'react-router-dom';
import { def_item } from '../../assets';
import AnimatedBorderTrail from '../ui/border-trail';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const { id } = useParams();
  const [shop, setShop] = useState<IShop | undefined>(undefined);
  const [quantity, setQuantity] = useState(0);

  const { user } = useSelector((state: RootState) => state.auth);

  const changeQuantity = (
    symbol: string,
    quantity: number,
    setQuantity: (value: number) => void,
    productQuantity: number
  ) => {
    if (symbol === '-') {
      if (quantity >= 1) {
        setQuantity(quantity - 1);
      }
    }
    if (symbol === '+') {
      if (quantity < productQuantity) {
        setQuantity(quantity + 1);
      }
    }
  };
  const addToBag = (
    productQuantity: number,
    quantity: number,
    setQuantity: (value: number) => void
  ) => {
    console.log('clicked');

    productQuantity -= quantity;
    setQuantity(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/${id}`);
        console.log(response.data.shop);
        setShop(response.data.shop);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className='min-h-screen bg-black text-purple-500 flex items-center relative flex-col pb-10'>
      <Authorization />
      <div className='grid p-10 pt-0 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 '>
        {shop?.products.map((product: IProduct) => (
          <div
            key={product._id}
            className='relative w-[300px] f rounded-xl overflow-hidden shadow-lg bg-zinc-900 cursor-pointer'
          >
            {/* Product Image with Overlay */}
            <div className='relative'>
              <img
                className='w-full h-[250px] object-cover '
                src={def_item}
                alt={product.productName}
              />
              {/* Black Overlay */}
              <div className='absolute inset-0 bg-black opacity-50'></div>

              {/* Product Details (Overlaid) */}
              <div className='absolute inset-0 flex flex-col justify-center items-center text-purple-500 px-4 bg-black opacity-[0.5]'>
                <h4 className='font-bold text-xl'>{product.productName}</h4>
                <p className='text-base'>Rs.{product.price}</p>
                <p className='text-sm'>
                  {product.quantity === 0 ? (
                    <span className='text-red-500'>Out of Stock</span>
                  ) : (
                    <span className='text-green-500'>Available</span>
                  )}
                </p>
              </div>
            </div>

            {/* Quantity Controls and Add to Bag Button */}
            <div className='px-4 py-2 '>
              <div className='flex bg-zinc-800  rounded-xl my-2'>
                <button
                  className='text-purple-500 shadow-inner shadow-zinc-700 rounded-xl p-3 w-full bg-zinc-900'
                  onClick={() =>
                    changeQuantity('-', quantity, setQuantity, product.quantity)
                  }
                >
                  -
                </button>
                <input
                  className='bg-zinc-800 w-[60px] outline-none text-center text-purple-500 font-bold'
                  value={quantity}
                  type='text'
                  readOnly
                />
                <button
                  className='text-purple-500 shadow-inner shadow-zinc-700 rounded-xl p-3 w-full bg-zinc-900'
                  onClick={() =>
                    changeQuantity('+', quantity, setQuantity, product.quantity)
                  }
                >
                  +
                </button>
              </div>
              <button
                className='text-purple-500 shadow-inner shadow-zinc-700 rounded-xl my-1 p-3 w-full bg-zinc-900'
                onClick={() =>
                  addToBag(product.quantity, quantity, setQuantity)
                }
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}

        {user?._id === shop?.owner ? (
          <AnimatedBorderTrail className='h-[400px] w-[300px]'>
            <div className='bg-zinc-900 h-full rounded-xl flex items-center justify-center cursor-pointer'>
              <p>Add Products</p>
            </div>
          </AnimatedBorderTrail>
        ) : null}
      </div>
    </div>
  );
};

export default Marketplace;
