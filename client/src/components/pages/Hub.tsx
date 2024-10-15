// import { FocusCards } from '../ui/focus-cards';
// import { shop01, shop02, service01, service02 } from '../../assets';
import Authorization from '../Authorization';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const options = [
  {
    _id: '1',
    type: 'Explore Marketplace',
    link: '/explore-marketplace',
  },
  {
    _id: '2',
    type: 'Register your own Marketplace',
    link: '/register-marketplace',
  },
  {
    _id: '3',
    type: 'Explore Services',
    link: '/explore-services',
  },
  {
    _id: '4',
    type: 'Register your own Service',
    link: '/register-service',
  },
];

const Hub = () => {
  return (
    <div className='bg-background text-text min-h-screen flex flex-col items-center justify-center px-10 '>
      <Authorization />
      <div className='flex flex-col mb-10 '>
        <h1 className='text-5xl pb-2 font-bold text-primary text-center'>
          CONEXUS HUB
        </h1>
        <p className='text-center text-2xl text-accent'>
          Discover. Connect. Thrive – Your Marketplace, Now Digitally Yours.
        </p>
        <p className='text-accent font'></p>
      </div>
      <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4  '>
        {options.map((option) => {
          return (
            <Link to={`${option.link}`}>
              <div className='w-[300px] group/card text-text hover:text-text transition-all ease-in border-2 border-secondary hover:border-primary  rounded-xl'>
                <div
                  className={cn(
                    ' cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4 hover:translate-x-0.5 active:translate-y-0.5  transition-all ease-in'
                  )}
                >
                  <div className='text content'>
                    <h1 className='font-bold text-xl md:text-2xl  relative z-10'></h1>
                    <p className=' text-sm  relative z-10 mb-4'></p>
                  </div>

                  <div className='flex flex-row items-center space-x-4 z-10'>
                    <div className='flex flex-col'>
                      <p className='font-normal text-base  relative z-10'>
                        {' '}
                        {option.type}
                      </p>
                      <p className='text-sm'></p>
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

export default Hub;
