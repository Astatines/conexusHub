import { useDispatch, useSelector } from 'react-redux';
import { resetState, setUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import Authorization from '../Authorization';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RootState } from '../../redux/store';
import { def_user } from '../../assets';
import GetStartedButton from '../ui/get-started-button';

const BACKEND_URL = 'http://localhost:3000';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    number: user?.number || '',
    address: user?.address || '',
  });
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
          headers: { email: user?.email },
        });
        setFormData({
          userName: response.data.user.userName,
          number: response.data.user.number,
          address: response.data.user.address,
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserData();
  }, [dispatch, user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setUpdateError(null);

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/user/profile/${user?._id}`,
        formData
      );
      if (response.status === 200) {
        dispatch(setUser(response.data.user));
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      setUpdateError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(resetState());
    navigate('/login');
  };

  return (
    <div className='flex flex-col items-center p-10 pt-0 w-screen'>
      <Authorization />
      <div className='flex flex-row max-w-[1320px] w-full gap-10 items-center justify-center max-md:flex-col'>
        <div>
          <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
            <label className='flex justify-between items-center rounded-xl pl-4 text-sm w-[400px]'>
              Name
              <input
                value={formData.userName}
                className='w-[300px] shadow-sm text-sm p-2 px-5 ml-3 rounded-xl outline-none'
                type='text'
                name='userName'
                onChange={handleChange}
              />
            </label>
            <label className='flex justify-between items-center rounded-xl pl-4 w-[400px] text-sm'>
              Address
              <input
                value={formData.address}
                className='shadow-sm text-sm p-2 px-5 w-[300px] ml-3 rounded-xl outline-none'
                type='text'
                placeholder='Where do you live?'
                name='address'
                onChange={handleChange}
              />
            </label>
            <label className='w-[400px] flex justify-between items-center rounded-xl pl-4 text-sm'>
              Number
              <input
                value={formData.number}
                className='shadow-sm text-sm p-2 px-5 w-[300px] ml-3 rounded-xl outline-none'
                type='text'
                name='number'
                placeholder='Contact Number'
                onChange={handleChange}
              />
            </label>
            {updateError && <p className='text-red-500'>{updateError}</p>}
            <button
              className='bg-secondary hover:bg-primary py-3 rounded-xl text-text hover:text-background font-bold transition-all ease-in'
              type='submit'
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
        <div className='shadow-inner border-t-2 shadow-shadow max-w-[400px] w-full rounded-xl relative'>
          <div className='h-[115px] shadow-shadow shadow-xl border-2 rounded-xl bg-background'>
            <img
              src={def_user}
              className='w-[150px] rounded-full absolute top-10 left-5'
              alt='User Profile'
            />
          </div>
          <div className='h-full px-5 pt-[80px]'>
            <p className='font-bold text-2xl'>
              {formData.userName || 'Your Name'}
            </p>
            <p className='text-sm'>
              {formData.address || 'Where do you live?'}
            </p>
            <p className='text-2xl font-bold mt-4'>Shops:</p>
            <p className='text-sm'>You have {user?.shops.length} shops.</p>
            <p className='text-2xl font-bold mt-4'>Cart:</p>
            <p className='text-sm'>
              You have {user?.cart.length} items in your cart.
            </p>
            <div onClick={handleLogout} className='relative my-4 flex w-full'>
              <GetStartedButton
                text={'Logout'}
                className='w-full absolute bg-secondary hover:bg-primary'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
