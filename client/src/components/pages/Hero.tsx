import { Link } from 'react-router-dom';
import { BackgroundBeamsWithCollision } from '.././ui/background-beams-with-collision';
import GetStartedButton from '../ui/get-started-button';
import SplitText from '../ui/split-text';

const Hero = () => {
  return (
    <BackgroundBeamsWithCollision className='min-h-screen  flex flex-col '>
      <SplitText text={'CONEXUS'} className=' font-semibold text-purple-500' />
      <Link to='/hub'>
        <GetStartedButton text='Get Started' className='mt-4' />
      </Link>
    </BackgroundBeamsWithCollision>
  );
};

export default Hero;
