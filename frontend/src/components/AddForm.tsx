import { useState } from 'react';
import axios from 'axios';

interface FormProps {
  type: 'product' | 'user' | 'blog';
  onClose: () => void;
  onSave: () => void;
}

const fieldConfigurations: Record<string, { label: string; type: string; name: string }[]> = {
  product: [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Description', type: 'text', name: 'description' },
    { label: 'Price', type: 'number', name: 'price' },
    { label: 'coverImage', type: 'file', name: 'coverImage'},
    { label:'file_name', type: 'string', name: 'file_name'},
    { label: 'Images', type: 'file', name: 'images' },
  ],
  user: [
    { label: 'First Name', type: 'text', name: 'firstName' },
    { label: 'Last Name', type: 'text', name: 'lastName' },
    { label: 'Email', type: 'email', name: 'email' },
  ],
  blog: [
    { label: 'Title', type: 'text', name: 'title' },
    { label: 'Content', type: 'textarea', name: 'content' },
    { label: 'Cover Image', type: 'file', name: 'coverImage' },
    {label:'author', type: 'string', name: 'author'},
    {label:'images', type:'file', name:'images'},
  ],
};

export default function AddForm({ type, onClose, onSave }: FormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/v1/${type}s`, formData,{withCredentials: true});
      onSave();
    } catch (error) {
      console.error(`Error adding ${type}`, error);
    }
  };

  const fields = fieldConfigurations[type];

  return (
    <form onSubmit={handleSubmit} className="relative p-6 bg-white shadow-lg rounded">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
      </button>
      <h2 className="text-xl mb-4">Add New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2">{field.label}:</label>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              onChange={field.type === 'file' ? handleFileChange : handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Save
      </button>
    </form>
  );
}
