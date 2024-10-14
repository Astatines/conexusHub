import { Home, Component, Bell, User } from 'lucide-react';
import AnimatedDock from './ui/animated-dock';

export default function Authorization() {
  return (
    <div className='w-full max-w-screen flex justify-center items-center '>
      <div className='relative flex h-60 w-full items-center justify-center'>
        <AnimatedDock
          items={[
            {
              href: '/',
              icon: <Home />,
              title: 'Home',
            },
            {
              href: '/hub',
              icon: <Component />,
              title: 'Hub',
            },
            {
              href: '/notifications',
              icon: <Bell />,
              title: 'Notifications',
            },
            {
              href: '/profile',
              icon: <User />,
              title: 'Profile',
            },
          ]}
          largeClassName='max-w-lg'
        />
      </div>
    </div>
  );
}
