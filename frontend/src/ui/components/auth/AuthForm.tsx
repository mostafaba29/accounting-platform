import React, { FC, FormEvent } from 'react';
import InputField from './InputField';

interface AuthFormProps {
    formType: 'signin' | 'signup';
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    formData: { [key: string]: string };
    setFormData: (formData: { [key: string]: string }) => void;
  }

  const AuthForm: FC<AuthFormProps> = ({ formType, onSubmit, formData, setFormData }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <form onSubmit={onSubmit} className="space-y-6">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {formType === 'signup' && (
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {formType === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </div>
      </form>
    );
  };
  
  export default AuthForm;