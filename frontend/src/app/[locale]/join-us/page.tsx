import HeaderSection from '@/components/shared/HeaderSection';
import JoinForm from '@/components/JoinForm';
import {useTranslations} from 'next-intl';

export default function JointUs() {
  const t = useTranslations('join-us');

  return (
    <>
        <HeaderSection pageTitle={{en:'Join our team',ar:'انضم الي فريقنا'}} pageImage={'contactUs.jpg'} breadCrumbArr={{en:[],ar:[]}} breadCrumbLinkArr={[]} />
        <div className="my-4 px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px] shadow-lg bg-gray-200/25">
          <div className="mb-12 w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 ">{t('title')}</h1>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg leading-relaxed text-gray-700 text-center mb-8">{t('subTitle')}</p>
            <JoinForm />
          </div>
        </div>
      </div>
    </>
  );
}
