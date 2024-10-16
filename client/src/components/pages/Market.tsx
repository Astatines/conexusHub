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
import { Minus, Plus } from 'lucide-react';

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
      <div className='flex flex-col mb-10 '>
        <h1 className='text-5xl font-bold text-primary text-center'>
          {shop?.shopName}
        </h1>
        <p className='text-center text-accent'>{shop?.location}</p>
        <p className='text-accent font'></p>
      </div>
      <div className='grid p-10 pt-0 grid-cols-4   max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4'>
        {shop?.products.map((product: IProduct) => (
          <div
            key={product._id}
            className='relative w-[320px] border-2 border-secondary hover:border-primary hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in rounded-xl overflow-hidden shadow-lg bg-background '
          >
            {/* Product Image with Overlay */}
            <div className='relative'>
              <img
                className='w-full h-[250px] object-cover rounded-t-xl'
                src={product.productImageURL}
                alt={product.productName}
              />
            </div>

            {/* Quantity Controls and Add to Bag Button */}
            <div className='px-4 py-2 '>
              <div className='flex bg-background rounded-xl my-2 items-center flex-col justify-between'>
                <div className='flex  w-full justify-between pb-3 '>
                  <div>
                    {' '}
                    <h4 className='font-bold text-xl'>{product.productName}</h4>
                    <p className='text-base'>
                      Rs. {product.price}/{product.unit}
                    </p>
                  </div>{' '}
                  <p className='text-sm'>
                    {product.quantity === 0 ? (
                      <span className='text-red-500'>Out of Stock</span>
                    ) : (
                      <span className='text-green-500'>Available</span>
                    )}
                  </p>
                </div>

                <div className='flex w-full '>
                  <button
                    className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary items-center flex justify-center hover:text-background font-bold transition-all ease-in active:translate-y-0.5 hover:translate-x-0.5'
                    onClick={() =>
                      changeQuantity(
                        '-',
                        product._id,
                        quantities[product._id],
                        product.quantity
                      )
                    }
                  >
                    <Minus />
                  </button>
                  <input
                    className='bg-background w-[60px] outline-none text-center text-text font-bold'
                    value={quantities[product._id] || 0}
                    type='text'
                    readOnly
                  />
                  <button
                    className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all flex items-center justify-center ease-i active:translate-y-0.5 hover:translate-x-0.5'
                    onClick={() =>
                      changeQuantity(
                        '+',
                        product._id,
                        quantities[product._id],
                        product.quantity
                      )
                    }
                  >
                    <Plus />
                  </button>
                </div>
              </div>
              <button
                className='text-text shadow-inner rounded-xl my-1 p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all ease-in active:translate-y-0.5 hover:translate-x-0.5'
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
            <AnimatedBorderTrail className=''>
              <div className='relative w-[320px] border-2 border-secondary hover:border-primary hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in rounded-xl overflow-hidden shadow-lg bg-background cursor-pointer'>
                {/* Product Image with Overlay */}
                <div className='relative'>
                  <img
                    className='w-full h-[250px] object-cover rounded-t-xl'
                    src={def_item}
                  />
                </div>

                {/* Quantity Controls and Add to Bag Button */}
                <div className='px-4 py-2 '>
                  <div className='flex bg-background rounded-xl my-2 items-center flex-col justify-between'>
                    <div className='flex  w-full justify-between pb-3 '>
                      <div>
                        {' '}
                        <h4 className='font-bold text-xl'>Product Name</h4>
                        <p className='text-base'>Rs. Price/unit</p>
                      </div>{' '}
                    </div>

                    <div className='flex w-full '>
                      <button className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary items-center flex justify-center hover:text-background font-bold transition-all ease-in active:translate-y-0.5 hover:translate-x-0.5'>
                        <Minus />
                      </button>
                      <input
                        className='bg-background w-[60px] outline-none text-center text-text font-bold'
                        type='text'
                        readOnly
                      />
                      <button className='text-text shadow-inner rounded-xl p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all flex items-center justify-center ease-i active:translate-y-0.5 hover:translate-x-0.5'>
                        <Plus />
                      </button>
                    </div>
                  </div>
                  <button className='text-text shadow-inner rounded-xl my-1 p-3 w-full bg-secondary hover:bg-primary hover:text-background font-bold transition-all ease-in active:translate-y-0.5 hover:translate-x-0.5'>
                    Add New Product
                  </button>
                </div>
              </div>
            </AnimatedBorderTrail>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Marketplace;
