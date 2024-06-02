import { useState } from 'react';
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Modal from './Modal';
import AddForm from './AddForm';

interface AddItemButtonProps {
    type: 'product' | 'user' | 'blog';
    onClick: () => void;
}

export default function AddItemButton({ type, onClick }: AddItemButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
        onClick();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSave = () => {
        setIsOpen(false);
        // Add logic to refresh the data or notify the parent component
    };

    return (
        <>
            <Button onClick={handleClick} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" /> <span>Add {type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </Button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <AddForm type={type} onClose={handleClose} onSave={handleSave} />
            </Modal>
        </>
    );
}
