import React, { useState, useEffect, useRef } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import GetStartedButton from '../ui/get-started-button';
import axios from 'axios';
import MovingGradient from '../ui/moving-gradient';
import { BadgeAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Authorization from '../Authorization';

const BACKEND_URL = 'http://localhost:3000';

const Signup = () => {
  const navigate = useNavigate();
  //login information
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //additional information
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userImageURL, setUserImageURL] = useState<File | null>(null);
  const userImageRef = useRef<HTMLInputElement | null>(null);

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // For smooth scrolling
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userName ||
      !email ||
      !password ||
      !number ||
      !address ||
      !userImageURL
    ) {
      setMessage('Please fill all the fields');
      setError(true);
      scrollToTop();
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setError(true);
      scrollToTop();
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long');
      setError(true);
      scrollToTop();
      return;
    }

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('email', email);
    formData.append('password', password);

    formData.append('number', number.toString());
    formData.append('address', address);
    formData.append('userImageURL', userImageURL);

    const resetForm = () => {
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNumber('');
      setAddress('');
      setUserImageURL(null);
      if (userImageRef.current) {
        userImageRef.current.value = '';
      }
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/user/signup`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(response.data);
      setMessage(response.data.message);
      setSuccess(true);
      resetForm();
      scrollToTop();
    } catch (err) {
      console.error(err);
      setMessage('Failed to Signup');
      setError(true);
      scrollToTop();
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        navigate('/login');
      }, 2000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [error, success, navigate]);

  return (
    <div className='min-h-screen p-10 pt-4 bg-black text-purple-500 flex items-center flex-col'>
      <Authorization />
      {success || error ? (
        <MovingGradient className='rounded-xl shadow-md mb-4 shake'>
          <div className='w-64 p-4 flex items-center flex-col '>
            <h4 className='text-md mb-2 flex flex-row items-center  gap-2 font-bold text-purple-500'>
              <span>Conexus Alert!</span>
              <BadgeAlert />
            </h4>
            <p className='break-words text-sm text-black/80 text-center'>
              {message}
            </p>
          </div>
        </MovingGradient>
      ) : null}

      <div className='max-w-lg w-full mx-auto md:rounded-2xl p-6 md:p-8 shadow-input bg-zinc-900 rounded-xl'>
        <h2 className='font-bold text-2xl text-purple-500 dark:text-neutral-200 mb-4'>
          Welcome to Conexus
        </h2>
        <p className='text-purple-400 text-sm max-w-sm mb-6 dark:text-neutral-300'>
          Signup now for a seamless experience with Conexus.
        </p>
        <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

        <form onSubmit={handleSubmit} className='space-y-6'>
          <section>
            <h3 className='font-semibold text-lg text-purple-500'>
              Login Information
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='shopName'>Your Name</Label>
                <Input
                  id='userName'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  name='userName'
                  placeholder='What do you call yourself?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='email'>Your Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Your email address'
                  type='email'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Set a strong password'
                  type='password'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm your password'
                  type='password'
                />
              </LabelInputContainer>
            </div>
          </section>

          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
          {/* Product Information */}
          <section>
            <h3 className='font-semibold text-lg text-purple-500'>
              Additional Information{' '}
              <span className='text-purple-700 text-sm'>Are you a robot?</span>
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='productName'>Phone number</Label>
                <Input
                  id='number'
                  name='number'
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder='Your contact number'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='address'>Address</Label>
                <Input
                  id='address'
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Where do you live?'
                  type='text'
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor='userImageURL'>Profile Image </Label>
                <Input
                  id='userImageURL'
                  ref={userImageRef}
                  onChange={(e) => setUserImageURL(e.target.files?.[0] || null)} //
                  name='userImageURL'
                  type='file'
                />
              </LabelInputContainer>
            </div>
          </section>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          {/* Register Button */}
          <div className='relative w-full'>
            <GetStartedButton text={'Signup'} className='w-full absolute' />
          </div>
        </form>
      </div>
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

export default Signup;
