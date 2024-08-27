import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button'
export default function Introduction () {
  return (
    <section className=" bg-unitedPrimary py-12 px-4  flex flex-row items-center justify-center gap-10 h-[100vh]">
      <Image src={`/imgs/landingPage/calcMan.jpg` } alt="Introduction" height={600} width={800} 
      className='object-cover w-[800px] h-[600px] shadow-md rounded-lg opacity-90' />
      <div className='flex flex-col text-start items-start justify-around h-[450px]'>
        <h1 className="text-4xl font-bold mb-6 text-center text-white py-2 ">United Group For F&A consultants</h1>
        <div>
          <p className="text-xl text-white break-words">United Consultants Office for Financial and Administrative Consulting stands out by employing highly specialized consultants, </p>
          <p className="text-xl text-white break-words"> rather than relying on external assistance, to provide unparalleled expertise in commercial, financial, </p>
          <p className="text-xl text-white break-words">and administrative consulting. Our core mission is to deliver exceptional, client-focused services that safeguard against unnecessary expenses, ensuring maximum value and benefit.</p>
        </div>
        <div className="mt-4 ml-[500px]">
          <Link href="/auth/signup"><Button 
          className='text-gray-700 p-4 font-bold text-lg bg-cyan-100 w-[200px] h-[40px] hover:bg-transparent hover:border border-cyan-100 hover:text-white'>
            Join Us
          </Button></Link>
        </div>
      </div>
    </section>
  );
}
