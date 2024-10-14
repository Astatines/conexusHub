const Loader = () => {
  return (
    <div className='flex w-screen h-screen items-center justify-center flex-col'>
      <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-t-2 border-secondary'></div>
      <div className='p-10 font-bold text-7xl fixed  text-primary sabin'>
        LOADING
      </div>
    </div>
  );
};

export default Loader;
