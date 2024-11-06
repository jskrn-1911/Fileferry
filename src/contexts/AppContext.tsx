import React, { useContext, createContext, ReactNode, useState } from 'react';

interface AppContextType {
    user: string | null;
    setUser: (user: string | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
    loggedIn: boolean;
    setLoggedIn: (status: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loggedIn, setLoggedIn}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if(!context){
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}