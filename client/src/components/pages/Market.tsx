import { useEffect, useState } from 'react';
import Authorization from '../Authorization';
import axios from 'axios';
import { IProduct, IShop } from '../../vite-env';
import { Link, useParams } from 'react-router-dom';
import { def_item } from '../../assets';
import AnimatedBorderTrail from '../ui/border-trail';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../Loader';

const BACKEND_URL = 'http://localhost:3000';

const Marketplace = () => {
  const { id } = useParams();
  const [shop, setShop] = useState<IShop | undefined>(undefined);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const { user } = useSelector((state: RootState) => state.auth);

  const changeQuantity = (
    symbol: string,
    productId: string,
    currentQuantity: number,
    productQuantity: number
  ) => {
    const currentQty = currentQuantity || 0; // Handle undefined quantities
    setQuantities((prevQuantities) => {
      const newQuantity =
        symbol === '-' && currentQty > 0
          ? currentQty - 1
          : symbol === '+' && currentQty < productQuantity
          ? currentQty + 1
          : currentQty;

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const addToBag = (productId: string, quantity: number) => {
    const selectedQuantity = quantities[productId] || 0;
    console.log('clicked', selectedQuantity);

    // Perform any further logic, like adding to a shopping cart

    // Reset quantity for this product after adding to the bag
    setQuantities((prevQuantities) => ({ ...prevQuantities, [productId]: 0 }));
    console.log(quantity);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/shop/${id}`);
        console.log(response.data.shop);
        setShop(response.data.shop);
      } catch (error) {
        setError('Failed to fetch shop data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <Loader />; // Display loading state
  }

  return (
    <div className='min-h-screen bg-background text-text flex items-center relative flex-col pb-10'>
      {error ? <p className='text-red-500'>{error}</p> : null}
      <Authorization />
      <div className='grid p-10 pt-0 grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6'>
        {shop?.products.map((product: IProduct) => (
          <div
            key={product._id}
            className='relative w-[300px] rounded-xl overflow-hidden shadow-lg bg-background cursor-pointer'
          >
            {/* Product Image with Overlay */}
            <div className='relative'>
              <img
                className='w-full h-[250px] object-cover rounded-t-xl'
                src={def_item}
                alt={product.productName}
              />
              {/* Black Overlay */}
              <div className='absolute inset-0 bg-background opacity-60'></div>

              {/* Product Details (Overlaid) */}
              <div className='absolute inset-0 flex flex-col justify-center items-center text-text px-4 bg-background opacity-70 hover:opacity-0 transition-all duration-300 ease-in-out'>
                <h4 className='font-bold text-xl'>{product.productName}</h4>
                <p className='text-base'>Rs. {product.price}</p>
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
              <div className='flex bg-background rounded-xl my-2 items-center justify-between'>
                <button
                  className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all ease-in'
                  onClick={() =>
                    changeQuantity(
                      '-',
                      product._id,
                      quantities[product._id],
                      product.quantity
                    )
                  }
                >
                  -
                </button>
                <input
                  className='bg-background w-[60px] outline-none text-center text-text font-bold'
                  value={quantities[product._id] || 0}
                  type='text'
                  readOnly
                />
                <button
                  className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all ease-in'
                  onClick={() =>
                    changeQuantity(
                      '+',
                      product._id,
                      quantities[product._id],
                      product.quantity
                    )
                  }
                >
                  +
                </button>
              </div>
              <button
                className='text-text shadow-inner rounded-xl my-1 p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all ease-in'
                onClick={() =>
                  addToBag(product._id, quantities[product._id] || 0)
                }
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}

        {user?._id === shop?.owner ? (
          <Link to={`/marketplace/${id}/add-product`}>
            <AnimatedBorderTrail className='h-[400px] w-[300px]'>
              <div className='bg-background h-full rounded-xl flex items-center justify-center cursor-pointer'>
                <p>Add Products</p>
              </div>
            </AnimatedBorderTrail>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Marketplace;
