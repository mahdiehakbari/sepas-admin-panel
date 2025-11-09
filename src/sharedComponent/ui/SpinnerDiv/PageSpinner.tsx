export const PageSpinner = () => {
  return (
    <div className='relative w-12 h-12'>
      <div className='w-12 h-12 rounded-full absolute border-8 border-dashed border-gray-200'></div>
      <div className='w-12 h-12 rounded-full animate-spin absolute border-8 border-dashed border-primary border-t-transparent'></div>
    </div>
  );
};
