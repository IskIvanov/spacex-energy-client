export type User = {
	name: string;
	email: string;
	isActive: boolean;
	role: 'admin' | 'user' | 'guest';
  };

export const mockAdmin: User = {
	name: "John Doe",
	email: "johndoe@example.com",
	isActive: true,
	role: "admin",
};

export const mockUser: User = {
	name: "Joost Nijhuis",
	email: "Joost@example.com",
	isActive: true,
	role: "user",
  };

export const mockGuest: User = {
	name: "Joost Nijhuis",
	email: "Joost@example.com",
	isActive: true,
	role: "guest",
  };