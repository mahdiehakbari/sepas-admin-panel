export const FormTitle = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center gap-6 mb-6'>
      <h2 className='text-lg font-semibold text-gray-800'>{title}</h2>
      <div className='flex-grow border-t border-[var(--second-gray)]'></div>
    </div>
  );
};
