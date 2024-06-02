import { useState, useEffect } from 'react';
import axios from 'axios';

interface EditFormProps {
  item: any;
  type: 'product' | 'user' | 'blog';
  onClose: () => void;
  onSave: (updatedItem: any) => void;
}

const fieldConfigurations: Record<string, { label: string; type: string; name: string }[]> = {
  product: [
    { label: 'Name', type: 'text', name: 'name' },
    { label: 'Description', type: 'text', name: 'description' },
    { label: 'Price', type: 'number', name: 'price' },
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
  ],
};

export default function EditForm({ item, type, onClose, onSave }: EditFormProps) {
  const [formData, setFormData] = useState(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

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
      await axios.put(`http://localhost:8000/api/v1/${type}s/${formData._id}`, formData);
      onSave(formData);
    } catch (error) {
      console.error(`Error updating ${type}`, error);
    }
  };

  const fields = fieldConfigurations[type];

  return (
    <div>
      <h2>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <form onSubmit={handleSubmit}>
        {fieldConfigurations[type].map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === 'file' ? (
              <input type={field.type} name={field.name} onChange={handleFileChange} />
            ) : field.type === 'textarea' ? (
              <textarea name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
            ) : (
              <input type={field.type} name={field.name} value={formData[field.name] || ''} onChange={handleChange} />
            )}
          </div>
        ))}
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}