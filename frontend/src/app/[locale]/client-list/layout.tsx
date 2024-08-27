import type { Metadata } from "next";
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/shared/Footer';
import HeaderSection from '@/components/shared/HeaderSection';
export const metadata: Metadata = {
    title: 'Client List | United for F&A Consultants',
    description: 'View our client list at United for F&A Teams.',
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
      <HeaderSection pageTitle={{en:'Clients & Partners', ar:'العملاء والشركاء'}} pageImage={'contactUs.jpg'} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
      {children}
    </main> 
    <Footer />
  </>
  );
}
