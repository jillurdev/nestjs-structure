import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
	Matches,
	MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateUserDto {
	@IsString({ message: "নাম অবশ্যই টেক্সট হতে হবে" })
	@IsNotEmpty({ message: "নাম দেওয়া আবশ্যক" })
	name: string;

	@IsEmail({}, { message: "সঠিক ইমেইল ঠিকানা দিন" })
	@IsOptional()
	@Transform(({ value }) => value?.trim() || undefined)
	email?: string;

	@IsString({ message: "ফোন নম্বর অবশ্যই টেক্সট হতে হবে" })
	@IsNotEmpty({ message: "ফোন নম্বর দেওয়া আবশ্যক" })
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

	@IsString({ message: "রেফারেল কোড অবশ্যই টেক্সট হতে হবে" })
	@IsOptional()
	@MinLength(6, { message: "রেফারেল কোড ৬ অক্ষরের হতে হবে" })
	@MaxLength(6, { message: "রেফারেল কোড ৬ অক্ষরের হতে হবে" })
	@Transform(({ value }) => value?.trim() || undefined)
	referralCode?: string;
}
