// Crate auth provider that has two functions: login and logout 
import { User } from '../mocks/user';
import { createContext, useState, ReactNode, useEffect } from 'react';

type AuthContextData = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
	isAuthenticated: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<User | null>(null);

	const login = (user: User) => {
		setIsAuthenticated(!isAuthenticated);
		setUser(user);
	};

	const logout = () => {
		setIsAuthenticated(!isAuthenticated);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	)
};