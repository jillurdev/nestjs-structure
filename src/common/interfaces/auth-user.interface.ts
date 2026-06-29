import { Role, UserStatus } from "../enums";

export interface AuthUser {
	id: string;
	role: Role;
	email: string;
	phone: string;
	handle: string;
	status: UserStatus;
	isVerified: boolean;
}