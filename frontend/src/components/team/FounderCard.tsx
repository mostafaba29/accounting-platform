import Image from 'next/image';

interface MemberCardProps {
    name:string;
    image:string;
    jobTitle:string;
    brief:string;
}
export default function MemberCard ({name,image,jobTitle,brief}:MemberCardProps) {
    return(
        <div className="flex flex-row items-center text-start w-[700px]">
            <Image
                src={image}
                alt={name}
                className="rounded-lg shadow-md w-[275px] h-[325px] object-cover"
                width={300}
                height={400}
            />
            <div className='border-2 border-unitedPrimary rounded-lg p-6 m-1 h-full '>
                <h2 className="text-2xl font-semibold mt-4">{name}</h2>
                <p className="text-gray-500 mt-1">{jobTitle}</p>
                <p className="mt-2 text-gray-700">{brief}</p>
            </div>
        </div>
    );
}