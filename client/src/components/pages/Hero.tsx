import { Link } from 'react-router-dom';
import GetStartedButton from '../ui/get-started-button';
import SplitText from '../ui/split-text';
import Authorization from '../Authorization';

const Hero = () => {
  return (
    <div className='min-h-screen  h-full flex items-center justify-center flex-col'>
      <Authorization />
      <div className='flex flex-col items-center justify-center h-full w-screen'>
        <SplitText
          text={'CONEXUS'}
          className=' font-semibold  text-secondary'
        />

        <p className='text-7xl max-lg:text-4xl max-w-[1320px] text-center font-thin'>
          <span className='text-text'>From </span>
          <span className='text-primary'>tailors</span>
          <span className='text-text'> to </span>
          <span className='text-primary'>grocery stores,</span>
          <span className='text-text'> we digitalize </span>
          <span className='text-primary'>everything around you.</span>
        </p>

        <Link to='/hub'>
          <GetStartedButton
            text='Explore'
            className='my-10 w-[200px] bg-secondary hover:bg-primary '
          />
        </Link>
      </div>{' '}
    </div>
  );
};

export default Hero;
