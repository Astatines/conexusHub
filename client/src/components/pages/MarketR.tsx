'use client';
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import GetStartedButton from '../ui/get-started-button';

const MarketR = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className='min-h-screen p-10 bg-black text-purple-500 flex items-center'>
      <div className='max-w-lg w-full mx-auto md:rounded-2xl p-6 md:p-8 shadow-input bg-zinc-900 rounded-xl'>
        <h2 className='font-bold text-2xl text-purple-500 dark:text-neutral-200 mb-4'>
          Register Your Marketplace
        </h2>
        <p className='text-purple-400 text-sm max-w-sm mb-6 dark:text-neutral-300'>
          List your items in our marketplace and connect with a world of
          customers eager to find their next favorite purchase!
        </p>
        <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

        <form onSubmit={handleSubmit} className='space-y-6'>
          {/* Marketplace Details */}
          <section>
            <h3 className='font-semibold text-lg text-purple-500'>
              Marketplace Information
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='shopName'>Marketplace Name</Label>
                <Input
                  id='shopName'
                  name='shopName'
                  placeholder='What do you call your marketplace?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='estd'>ESTD</Label>
                <Input
                  id='estd'
                  name='estd'
                  placeholder='When was your marketplace established?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='location'>Location</Label>
                <Input
                  id='location'
                  name='location'
                  placeholder='Where is your marketplace located?'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='shopImageURL'>Representative Image</Label>
                <Input id='shopImageURL' name='shopImageURL' type='file' />
              </LabelInputContainer>
            </div>
          </section>

          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
          {/* Product Information */}
          <section>
            <h3 className='font-semibold text-lg text-purple-500'>
              Example Product
            </h3>
            <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />
            <div className='space-y-4'>
              <LabelInputContainer>
                <Label htmlFor='productName'>Product Name</Label>
                <Input
                  id='productName'
                  name='productName'
                  placeholder='Name of your product'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='category'>Category</Label>
                <Input
                  id='category'
                  name='category'
                  placeholder='Product category'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='quantity'>Quantity</Label>
                <Input
                  id='quantity'
                  name='quantity'
                  placeholder='Available quantity'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='price'>Price</Label>
                <Input
                  id='price'
                  name='price'
                  placeholder='Rs. 0.00'
                  type='number'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='unit'>Unit of Measurement</Label>
                <Input
                  id='unit'
                  name='unit'
                  placeholder='Kg, Litre, etc.'
                  type='text'
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor='productImageURL'>Product Image</Label>
                <Input
                  id='productImageURL'
                  name='productImageURL'
                  type='file'
                />
              </LabelInputContainer>
            </div>
          </section>
          <div className='bg-gradient-to-r from-transparent via-purple-300 dark:via-purple-700 to-transparent my-4 h-[1px] w-full' />

          {/* Register Button */}
          <div className='relative w-full'>
            <GetStartedButton text={'Register'} className='w-full absolute' />
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

export default MarketR;
