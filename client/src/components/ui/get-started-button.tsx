import { ArrowRight } from 'lucide-react';

import { cn } from '../../lib/utils';

interface IGetStartedButtonProps {
  text: string;
  className?: string;
}

export default function GetStartedButton({
  text = 'Get started',
  className,
}: IGetStartedButtonProps) {
  return (
    <div className='min-h-12 w-48'>
      <button
        className={cn(
          'group flex h-12 w-40 items-center justify-center gap-3 rounded-lg bg-background p-2 font-bold transition-colors duration-100 ease-in-out ',
          className
        )}
      >
        <span
          className={cn(
            'text-text transition-colors duration-100 ease-in-out group-hover:text-background'
          )}
        >
          {text}
        </span>
        <div
          className={cn(
            'relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full transition-transform duration-100',
            'bg-background '
          )}
        >
          <div className='absolute left-0 flex h-7 w-14 -translate-x-1/2 items-center justify-center transition-all duration-200 ease-in-out group-hover:translate-x-0'>
            <ArrowRight
              size={16}
              className={cn(
                'size-7 transform p-1 text-text opacity-0 group-hover:opacity-100'
              )}
            />
            <ArrowRight
              size={16}
              className={cn(
                'size-7 transform p-1 text-text opacity-100 transition-transform duration-300 ease-in-out group-hover:opacity-0'
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
}
