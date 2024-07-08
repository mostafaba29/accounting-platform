import HeaderSection from '@/components/HeaderSection';
import NavigationBar from '@/components/NavigationBar';
import JoinForm from '@/components/JoinForm';
import Footer from '@/components/Footer';

export default function JointUs() {


  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center">
        <HeaderSection pageTitle={'Join Us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} breadCrumbLinkArr={[]} />
        <div className="my-4 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/85">
          <div className="mb-12 w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 bg-slate-100 py-2 rounded-xl shadow-md">Apply for a job at our united for F&A Consultants</h1>
 
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">Send us your info and we will contact you if there is a vacancy</p>
            <JoinForm />
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}
