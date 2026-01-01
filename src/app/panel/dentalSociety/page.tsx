import Image from 'next/image';

const dentalSociety = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Image
        src='/assets/icons/dental-society-logo.png'
        alt='dental-society-logo'
        width={200}
        height={200}
      />
    </div>
  );
};

export default dentalSociety;
