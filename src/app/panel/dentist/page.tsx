'use client';
import { ProfileForm } from '@/features/Form/ProfileForm';
import { useRouter } from 'next/navigation';

const Dentist = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/panel/dentistDefinition');
  };
  return <ProfileForm name='profile' handleBack={handleBack} />;
};

export default Dentist;
