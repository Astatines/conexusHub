import React, { useState, useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import GetStartedButton from '../ui/get-started-button';
import axios from 'axios';
import MovingGradient from '../ui/moving-gradient';
import { BadgeAlert } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Authorization from '../Authorization';
import Loader from '../Loader';

const BACKEND_URL = 'http://localhost:3000';

const AddProduct = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [productImageURL, setProductImageURL] = useState<File | null>(null);

  const productImageRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // For smooth scrolling
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      // !productName
      // !category ||
      // !quantity ||
      // !price ||
      // !unit ||
      !productImageURL
    ) {
      setMessage('Please fill all the fields');
      setError(true);
      scrollToTop();
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('unit', unit);
    formData.append('productImageURL', productImageURL);
    const resetForm = () => {
      setProductName('');
      setCategory('');
      setQuantity('');
      setPrice('');
      setUnit('');
      setProductImageURL(null);
      //file input value reset
      if (productImageRef.current) productImageRef.current.value = '';
    };

    try {
      setLoading(true);
      await axios
        .post(`${BACKEND_URL}/api/product/add`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            id: id,
          },
        })
        .then((res) => {
          setLoading(false);
          setMessage(res.data.message);
          setSuccess(true);
          resetForm();
          scrollToTop();
        });
    } catch (error) {
      console.error(error);
      setMessage('Adding Product Failed! Please try again');
      setError(true);
      scrollToTop();
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate(`/marketplace/${id}`);
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error, success, navigate, id]);

  return (
    <div className='min-h-screen p-10 pt-0 bg-background text-text flex items-center relative flex-col'>
      <Authorization />
      {success || error ? (
        <MovingGradient className='rounded-xl shadow-md mb-4 shake fixed top-10'>
          <div className='w-64 p-4 flex items-center flex-col'>
            <h4 className='text-md mb-2 flex flex-row items-center gap-2 font-bold text-text'>
              <span>Conexus Alert!</span>
              <BadgeAlert />
            </h4>
            <p className='break-words text-sm text-text/80 text-center'>
              {message}
            </p>
          </div>
        </MovingGradient>
      ) : null}

      {loading ? (
        <Loader />
      ) : (
        <div className='max-w-lg w-full mx-auto md:rounded-2xl p-6 md:p-8 shadow-input bg-background rounded-xl'>
          <h2 className='font-bold text-2xl text-text dark:text-neutral-200 mb-4'>
            Add Your Product
          </h2>
          <p className='text-text text-sm max-w-sm mb-6 dark:text-neutral-300'>
            The more the items, the more the customer, let it slide.
          </p>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Marketplace Details */}

            <section>
              <h3 className='font-semibold text-lg text-text'>
                Product Details
              </h3>
              <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
              <div className='space-y-4'>
                <LabelInputContainer>
                  <Label htmlFor='productName'>Product Name</Label>
                  <Input
                    id='productName'
                    name='productName'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder='Name of your product'
                    type='text'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='category'>Category</Label>
                  <Input
                    id='category'
                    name='category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder='Product category'
                    type='text'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='quantity'>Quantity</Label>
                  <Input
                    id='quantity'
                    name='quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder='Available quantity'
                    type='number'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    id='price'
                    name='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Rs. 0.00'
                    type='number'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='unit'>Unit of Measurement</Label>
                  <Input
                    id='unit'
                    name='unit'
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder='Kg, Litre, etc.'
                    type='text'
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor='productImageURL'>Product Image</Label>
                  <Input
                    id='productImageURL'
                    ref={productImageRef}
                    onChange={(e) =>
                      setProductImageURL(e.target.files?.[0] || null)
                    } // Only one onChange handler
                    name='productImageURL'
                    type='file' // Removed value prop
                  />
                </LabelInputContainer>
              </div>
            </section>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

            {/* Register Button */}
            <div className='relative w-full'>
              <GetStartedButton
                text={'Add to Shop'}
                className='w-full bg-secondary hover:bg-primary absolute'
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Reusable Container Component for Form Inputs
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

export default AddProduct;
