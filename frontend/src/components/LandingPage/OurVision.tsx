import Image from 'next/image';

export default function OurVision() {
  return (
    <section className="bg-sky-50 text-sky-800 py-12 bg-cover  bg-center relative" style={{ backgroundImage: "url('/vision.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Vision</h2>
        <p className="text-lg mb-8 text-white">
          At United For F&A Consultants, we strive to provide unparalleled financial and HR consulting services.
          Our goal is to empower businesses with the tools and strategies they need to succeed.
        </p>
        <p className="text-lg mb-8 text-white">
          At United For F&A Consultants, we strive to provide unparalleled financial and HR consulting services.
          Our goal is to empower businesses with the tools and strategies they need to succeed.
        </p>
        <p className="text-lg mb-8 text-white">
          At United For F&A Consultants, we strive to provide unparalleled financial and HR consulting services.
          Our goal is to empower businesses with the tools and strategies they need to succeed.
        </p>
      </div>
    </section>
  );
}
