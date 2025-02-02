import type { Metadata } from "next";
import Footer from '@/components/shared/Footer';
export const metadata: Metadata = {
    title: 'About Us | United for F&A Consultants',
    description: 'Learn about our team and our mission at United for F&A Consultants.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <main className="flex flex-col items-center">
      {children}
    </main> 
    <Footer />
  </>
  );
}
