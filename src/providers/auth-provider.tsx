// Crate auth provider that has two functions: login and logout 
import { User, mockUser } from '../mocks/user';
import { createContext, useState, ReactNode } from 'react';

type AuthContextData = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);


	const login = () => {
		setUser(mockUser);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
};