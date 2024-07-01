import Image from 'next/image';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import MemberCard from '@/components/about-us/MemberCard';

export default function AboutUs() {

    return (
        <>
          <NavigationBar />
          <div className="flex flex-col items-center">
          <HeaderSection pageTitle={'About us'} pageImage={'contactUs.jpg'} breadCrumbArr={[]} />
          <div className="container mx-auto px-4 py-8 lg:w-[1500px] md:w-[1000px] w-[600px]">
            <section className="mb-12">
              <h1 className="text-4xl font-bold mb-6">About Company</h1>
              <p className="text-lg leading-relaxed text-gray-700">
                Our accounting company, with over 20 years of experience, 
                stands as a beacon of excellence and reliability in the financial sector. 
                We have honed our skills across all manners of accounting problems, 
                offering comprehensive solutions to businesses of all sizes. 
                Our expertise spans from meticulous bookkeeping and financial reporting to strategic tax planning and compliance. 
                Our dedicated team of professionals is committed to delivering personalized services tailored to meet the unique needs of each client. 
                We pride ourselves on our ability to navigate the complexities of the financial world, 
                ensuring our clients achieve their financial goals with confidence and peace of mind. 
                Trust in our experience, and let us guide you towards financial success with our unmatched dedication and skill.
              </p>
            </section>
            <section>
              <h1 className="text-4xl font-bold mb-6">Founders</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/images/zaki-mohamed.jpg"
                    alt="Zaki Mohamed"
                    className="rounded-full"
                    width={150}
                    height={150}
                  />
                  <h2 className="text-2xl font-semibold mt-4">Zaki Mohamed</h2>
                  <p className="text-gray-600 mt-2">Chief Financial Officer</p>
                  <p className="mt-2 text-gray-700">
                    Zaki Mohamed brings over 20 years of accounting experience to our team. His expertise in financial strategy and management has been instrumental in guiding our clients through complex financial landscapes. Zaki is known for his meticulous attention to detail and his unwavering commitment to financial integrity and excellence.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Image
                    src="/images/ahmed-mohamed.jpg"
                    alt="Ahmed Mohamed"
                    className="rounded-full"
                    width={150}
                    height={150}
                  />
                  <h2 className="text-2xl font-semibold mt-4">Ahmed Mohamed</h2>
                  <p className="text-gray-600 mt-2">Senior Accountant</p>
                  <p className="mt-2 text-gray-700">
                    Ahmed Mohamed is a seasoned accountant with a deep understanding of financial reporting 
                    and compliance. With his extensive knowledge and analytical skills, Ahmed ensures that our clients 
                    financial records are accurate and up-to-date, providing them with the insights needed to 
                    make informed financial decisions.
                  </p>
                </div>
              </div>
            </section>
            <section>
            <h1 className="text-2xl font-bold my-6">Team members</h1>
              <MemberCard name="mostafa" image="/imgs/headersection/contactUs.jpg" jobTitle="Engineer" 
              description="sfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsgsfkha;sfghasfhg;ahfsghasfghalfhsg" 
              />
            </section>
          </div>
          </div>
          <Footer />
        </>
    );
}