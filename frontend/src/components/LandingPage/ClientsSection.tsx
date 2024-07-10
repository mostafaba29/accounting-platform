'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { Client } from '@/components/types/ClientTableColumns';
import Image from 'next/image';

interface ClientSecitonProps {
    clients: Client[]
}
export default function ClientsSection ({clients}: ClientSecitonProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % clients.length);
        }, 3000); // Change every 3 seconds
        return () => clearInterval(interval);
    }, [clients.length]);

    const displayedClients = [
        clients[index],
        clients[(index + 1) % clients.length],
        clients[(index + 2) % clients.length],
    ];

  return (
    <div className="relative flex overflow-hidden">
      <AnimatePresence>
        {displayedClients.map((client, i) => (
          <motion.div
            key={client.id}
            className={clsx(
              'absolute inset-0 flex flex-col items-center justify-center',
              i === 0 ? 'opacity-100' : 'opacity-0'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={`/imgs/${client.image}`} 
              alt={client.name}
              width={96} height={96}
              className="w-24 h-24 rounded-full"
            />
            <h3 className="mt-4 text-lg font-semibold">{client.name}</h3>
            <p className="mt-2 text-center">{client.description}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    );
}