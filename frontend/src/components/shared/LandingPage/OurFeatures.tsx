import Image from "next/image";
import { Users, CheckCircleIcon, StarIcon, Rocket } from 'lucide-react';

const features = [
  {
    icon: Users,
    titleEn: "Specialized Team",
    titleAr: "فريق عمل متخصص",
    descriptionEn: "Our team is specialized and professional in all the consulting services we provide through our office. Our main goal is to provide full benefit to you and achieve the highest benefit from our services.",
    descriptionAr: "فريق عملنا متخصص و محترف في كافة ما نقدمه من خدمات إستشارية من خلال مكتبنا ـ هدفنا الرئيسي هو تقديم النفع الكامل لك وتحقيق أعلى أستفادة من خدماتنا"
  },
  {
    icon: CheckCircleIcon,
    titleEn: "Quality",
    titleAr: "الجودة",
    descriptionEn: "The quality of the services we provide has been sufficiently verified to be a component of the client's success.",
    descriptionAr: "جودة ما نقدمه من خدمات تم تدقيقه بالقدر الكافي ليكون مقوم من مقومات إنجاح العميل"
  },
  {
    icon: StarIcon,
    titleEn: "Client Satisfaction",
    titleAr: "رضا العملاء عن مستوى الخدمة",
    descriptionEn: "Our office always ensures your satisfaction with the service provided by all means and solutions, holding meetings to identify your needs and reviewing all outputs and consultations in a way that serves you best.",
    descriptionAr: "مكتبنا يحرص دائما على رضائك عن الخدمة المقدمة بكافة الوسائل والحلول وإعادة الإجتماعات للتعرف على احتياجك وإعادة مراجعة كافة المخرجات والإستشارات بالشكل الذي يخدمك على أفضل وجه"
  },
  {
    icon: Rocket,
    titleEn: "Effective Role in Client Success",
    titleAr: "الدور الفعال في إنجاح العملاء",
    descriptionEn: "Our goals are always to play an effective role in helping and succeeding our clients and providing them with beneficial consulting services, regardless of the financial return. We never sell our services as much as we care about the success of our clients.",
    descriptionAr: "أهدافنا دائما هي القيام بالدور الفعال لمساعدة وإنجاح عملاؤنا وتقديم ما ينفعهم من خدمات استشارية وبغض النظر عن المقابل المادي، فنحن لا نبيع أبداً خدماتنا بقدر ما يهمنا من إنجاح عملاؤنا"
  }
];

interface OurFeaturesProps {
  locale: string
}
export default function OurFeatures({locale}: OurFeaturesProps) {
  const isRTL = locale === 'ar';

  const text = {
    title: isRTL ? 'ميزاتنا' : 'Our Features',
    summary: isRTL
      ? 'نقدم خدمات متميزة من خلال فريق متخصص، مع التركيز على الجودة ورضا العملاء، ونلعب دورًا فعالًا في نجاح عملائنا.'
      : 'We offer exceptional services through a specialized team, focusing on quality and customer satisfaction, playing an effective role in our clients success.'
  };

  return (
    <section className={`p-4 bg-unitedPrimary flex flex-col items-center w-full h-screen ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-semibold mb-4 text-white w-full text-center">{text.title}</h1>
      <p className="text-xl text-slate-200/90 max-w-3xl text-center mb-8">{text.summary}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-6xl">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-slate-100 hover:p-8">
              <Icon className="w-16 h-16 text-unitedSecondary mb-4" />
              <h2 className="text-xl font-semibold text-unitedPrimary w-full text-center mb-2">
                {isRTL ? feature.titleAr : feature.titleEn}
              </h2>
              <p className="text-gray-600 text-center">
                {isRTL ? feature.descriptionAr : feature.descriptionEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}