import { User } from '../mocks/user';
import { createContext, useState, ReactNode } from 'react';

type AuthContextData = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);

	const login = (user: User) => {
		setUser(user);
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