import { IsString, IsOptional, MinLength, Matches } from "class-validator";

export class LoginDto {
	@IsString({ message: "ফোন নম্বর অবশ্যই টেক্সট হতে হবে" })
	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/, {
		message: "সঠিক বাংলাদেশি ফোন নম্বর দিন",
	})
	phone: string;

	@IsString({ message: "পাসওয়ার্ড অবশ্যই টেক্সট হতে হবে" })
	@MinLength(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" })
	password: string;

	@IsString({ message: "ডিভাইস আইডি অবশ্যই টেক্সট হতে হবে" })
	@IsOptional()
	deviceId?: string;
}
