'use client';
import { ReactNode, createContext, useContext } from 'react';
import { useUser } from '../hooks/useUser';


type UserProviderProps = {
    children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
    const user = useUser();

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

const UserContext = createContext<any>(null);

export const useUserContext = () => useContext(UserContext);
