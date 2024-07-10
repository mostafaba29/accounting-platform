// components/ClientCard.tsx
import Image from 'next/image';

interface ClientCardProps {
    name: string;
    image: string;
    description: string;
}

const ClientCard: React.FC<ClientCardProps> = ({ name, image, description }) => {
    return (
        <div className="flex flex-col items-center text-center  p-6 rounded-lg ">
            <Image src={image} alt={name} width={150} height={150} className="rounded-full shadow-md w-[150px] h-[150px] object-cover" />
            <h2 className="text-2xl font-semibold mt-4">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
        </div>
    );
};

export default ClientCard;
