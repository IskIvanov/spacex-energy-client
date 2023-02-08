export type User = {
	name: string;
	email: string;
	isActive: boolean;
	role: 'admin' | 'user';
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