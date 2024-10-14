'use client';
import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';

type CardType = {
  title: string;
  src: string;
  link: string;
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out cursor-pointer shadow-lg transform hover:scale-105',
        hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className='object-cover absolute inset-0 h-full w-full'
      />
      {/* Dark overlay added here */}
      <div className='absolute inset-0 bg-black opacity-50 transition-opacity duration-300' />
      {/* Always visible title with background */}
      <div className='absolute inset-0 flex items-end py-4 px-4 transition-opacity duration-300'>
        <div className='text-lg p-3 rounded-md font-semibold text-white'>
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = 'Card';

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='grid grid-cols-2 max-md:grid-cols-1 gap-10 max-w-5xl mx-auto md:px-8 w-full pb-10'>
      {cards.map((card, index) => (
        <Link key={index} to={card.link}>
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Link>
      ))}
    </div>
  );
}
