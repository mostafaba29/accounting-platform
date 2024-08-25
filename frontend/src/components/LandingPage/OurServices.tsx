import Image from "next/image"
export default function OurServices() {
    return (
        <section className="p-4 bg-transparent rounded-lg shadow-md flex flex-col items-center w-full">
            <h1 className="text-3xl font-semibold mb-4 text-black w-full text-center">Our Services</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            <div className="flex flex-col items-center">
                <Image src="/imgs/landingPage/money.png" alt="money" width={200} height={200} className="object-cover w-[150px] h-[150px]" />
                <h1 className="text-xl font-semibold  text-black w-full text-center ">Wealth Managment</h1>
                <p className="text-wrap w-[275px] mt-1 text-center text-gray-500">We deliver thoughtful advice on how to build wealth.</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src="/imgs/landingPage/calculator.png" alt="calculator" width={200} height={200} className="object-cover w-[150px] h-[150px]"/>
                <h1 className="text-xl font-semibold  text-black w-full text-center ">Tax Preparation</h1>
                <p className="text-wrap w-[275px] mt-1 text-center text-gray-500">We prepare everything you need for you tax retrun.</p>
            </div>
            <div className="flex flex-col items-center">
                <Image src="/imgs/landingPage/book.png" alt="book" width={200} height={200} className="object-cover w-[150px] h-[150px]"/>
                <h1 className="text-xl font-semibold  text-black w-full text-center ">On Demand business soulutions</h1>
                <p className="text-wrap w-[275px] mt-1 text-center text-gray-500">We deliver on demand business solutions. </p>
            </div>
           </div>
        </section>
    )
}