"use client";
import { usePathname } from 'next/navigation';

interface LoadingSpinnerProps {
  messageEn: string;
  messageAr: string;
}

export default function LoadingSpinner({ messageEn, messageAr }: LoadingSpinnerProps) {
    const pathname = usePathname();
    const isRTL = pathname.startsWith('/ar');
    const lang = isRTL ? 'ar' : 'en';

  const message = lang === 'ar' ? messageAr : messageEn;

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="animate-spin rounded-full h-48 w-48 border-t-4 border-r-4 border-unitedPrimary"></div>
      <p className="my-4 text-unitedPrimary text-lg font-bold">{message}</p>
    </div>
  );
};

