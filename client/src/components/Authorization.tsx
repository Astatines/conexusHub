import { Link } from 'react-router-dom';
import AnimatedBorderTrail from './ui/border-trail';
import { IUser } from '../vite-env';
import { useSelector } from 'react-redux';

export default function Authorization() {
  const user = useSelector(
    (state: {
      auth: {
        user: IUser | null;
      };
    }) => state.auth.user
  );

  return (
    <>
      <Link to={user ? '/profile' : '/login'}>
        <AnimatedBorderTrail
          className='my-10'
          duration='10s'
          trailColor='purple'
          trailSize='md'
        >
          <ul className='flex justify-center text-purple-500 items-center w-[400px] py-5 rounded-xl transition-transform font-extrabold transform hover:scale-105 bg-zinc-900 gap-4'>
            {user ? user.userName : 'Get Authorized'}
            <p className='font-extrabold text-5xl rounded-full '></p>
          </ul>
        </AnimatedBorderTrail>
      </Link>
    </>
  );
}
