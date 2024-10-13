import { Link } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from '.././ui/background-beams-with-collision';
import GetStartedButton from '../ui/get-started-button';
import SplitText from '../ui/split-text';
import Authorization from '../Authorization';

const Hero = () => {
  return (
    <BackgroundBeamsWithCollision className='min-h-screen  flex flex-col w-screen '>
      <Authorization />
      <div className='flex flex-col items-center justify-center h-full w-screen'>
        <SplitText
          text={'CONEXUS'}
          className=' font-semibold text-purple-500'
        />
        <Link to='/hub'>
          <GetStartedButton text='Explore' className='mt-4 w-[200px] ' />
        </Link>
      </div>{' '}
    </BackgroundBeamsWithCollision>
  );
};

export default Hero;
