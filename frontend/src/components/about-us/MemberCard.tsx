import Image from 'next/image';

interface MemberCardProps {
    name:string;
    image:string;
    jobTitle:string;
    description:string;
}
export default function MemberCard ({name,image,jobTitle,description}:MemberCardProps) {
    return(
        <div className='w-[300px] h-[400px] border border-slate-600 rounded-lg' >
            <div className='flex flex-col items-center text-center my-1'>
                <div className='h-[200px] w-[200px]'>
                    <Image src={image} alt={name} width={200} height={200} className='rounded-full' />
                </div>
                <h2 className='text-xl font-bold'>{name}</h2>
                <p className="text-base font-semibold text-gray-500">{jobTitle}</p>
                <p className="text-wrap w-[275px] ">{description}</p>
            </div>
        </div>
    );
}