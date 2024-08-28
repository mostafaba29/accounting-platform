import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button'

interface IntroductionProps {
  locale:string;
  text:string;
}
export default function Introduction ({locale,text}:IntroductionProps) {
  const isRTL = locale === 'ar';
  return (
    <section className=" bg-transparent py-12 px-4  flex flex-row items-center justify-center gap-10 h-[100vh]">
      {!isRTL && <Image src={`/imgs/landingPage/calcMan.jpg` } alt="Introduction" height={600} width={800} 
      className='object-cover w-[800px] h-[600px] shadow-md rounded-lg opacity-90' />}
       <div className={`flex flex-col text-start items-start justify-around h-[450px] ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
        <div className="w-full">
          <p className="text-xl text-unitedPrimary break-words text-justify">
            {text}
          </p>
        </div>
        <div className={`mt-4 ${isRTL ? 'mr-auto' : 'ml-auto'}`}>
          <Link href="/auth/signup">
            <Button 
              className='text-white p-4 font-semibold text-lg bg-unitedPrimary w-[200px] h-[40px] hover:bg-unitedPrimary/85 '
            >
              {isRTL ? 'انضم إلينا' : 'Join Us'}
            </Button>
          </Link>
        </div>
      </div>
      {isRTL && <Image src={`/imgs/landingPage/calcMan.jpg` } alt="Introduction" height={600} width={800} 
      className='object-cover w-[800px] h-[600px] shadow-md rounded-lg opacity-90' />}
    </section>
  );
}
