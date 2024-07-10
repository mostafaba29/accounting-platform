import Image from 'next/image';

interface MemberCardProps {
    name:string;
    image:string;
    jobTitle:string;
    description:string;
}
export default function MemberCard ({name,image,jobTitle,description}:MemberCardProps) {
    return(
        <div className='w-[300px] h-[400px] ' >
            <div className='flex flex-col items-center text-center my-1'>
                <div>
                    <Image src={image} alt={name} width={150} height={150} className='rounded-full w-[150px] h-[150px] object-cover' />
                </div>
                <h2 className='text-xl font-bold mt-1'>{name}</h2>
                <p className="text-base font-semibold text-gray-500 my-2">{jobTitle}</p>
                <p className="text-wrap w-[275px] mt-1">{description}</p>
            </div>
        </div>
    );
}