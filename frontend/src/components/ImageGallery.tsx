"use client";
import {useState} from 'react';
import Image from "next/image";

  
interface ImageGalleryProps {
    coverImage:string;
    images:string[]
    type:string;
}
export default function ImageGallery({coverImage,images,type}:ImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(coverImage);
    return (
            <div className='flex flex-row items-center'>
                <div className="flex flex-col items-center justify-around mx-3 gap-2">
                <Image 
                        src={`/imgs/${type}/${coverImage}`} 
                        alt="cover image" 
                        width={125} 
                        height={125} 
                        className='object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-90 rounded-xl'
                        onClick={() => setActiveImage(coverImage)}
                        />
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            src={`/imgs/${type}/${image}`}
                            alt="cover image"
                            width={125}
                            height={125}
                            className='object-cover w-[125px] h-[125px] cursor-pointer hover:opacity-90 rounded-xl'
                            onClick={() => setActiveImage(image)}
                        />
                    ))} 
                </div>
                <Image src={`/imgs/${type}/${activeImage}`} alt="cover image" width={400} height={520} className='object-fit w-[400px] h-[520px] rounded-lg'/>
            </div>
            
        )   
}