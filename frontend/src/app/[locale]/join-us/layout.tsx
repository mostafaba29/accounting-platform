import type { Metadata } from "next";
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/shared/Footer';
export const metadata: Metadata = {
    title: 'Join Us | United for F&A Consultants',
    description: 'Apply for a job at our united for F&A Teams.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <>
    <NavigationBar />
    <main className="flex flex-col items-center">
      {children}
    </main> 
    <Footer />
  </>
  );
}
