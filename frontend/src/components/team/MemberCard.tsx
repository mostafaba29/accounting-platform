import Image from 'next/image';

interface MemberCardProps {
    name:string;
    image:string;
    jobTitle:string;
}
export default function MemberCard ({name,image,jobTitle}:MemberCardProps) {
    return(
        <div className='w-[250px] h-[400px] ' >
            <div className='flex flex-col items-center text-center my-1'>
                <div>
                    <Image src={image} alt={name} width={250} height={350} className='rounded-md shadow-md w-[200px] h-[300px] object-cover' />
                </div>
                <h2 className='text-xl font-bold mt-2'>{name}</h2>
                <p className="text-base font-semibold text-gray-500 my-1">{jobTitle}</p>
            </div>
        </div>
    );
}