export interface JwtUser {
	id: string;
	handle: string;
	fullName: string;
	email: string;
	phone: string;
	status: string;
	isVerified: boolean;
	kycTier: string;
}
