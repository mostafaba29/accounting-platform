import React, { FC, ChangeEvent } from 'react';

interface InputFieldProps {
    label:string;
    type:string;
    name:string;
    value:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

const InputField:FC<InputFieldProps>=({label,type,name,value,onChange})=>{

    return (
        <div className='mb-4'>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};

export default InputField;