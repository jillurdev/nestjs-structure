import { Transform } from "class-transformer";
import {
	IsDateString,
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@Transform(({ value }) => value?.trim())
	@MinLength(3)
	@MaxLength(30)
	@Matches(/^[a-zA-Z0-9_.]+$/, {
		message:
			"Handle may only contain letters, numbers, underscores and periods.",
	})
	handle: string;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value }) => value?.trim())
	@MinLength(2)
	@MaxLength(100)
	fullName: string;

	@IsEmail()
	@Transform(({ value }) => value?.trim().toLowerCase())
	email: string;

	@IsString()
	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/, {
		message: "Invalid Bangladeshi phone number",
	})
	phone: string;

	@IsDateString()
	dateOfBirth: string;

	@IsString()
	@MinLength(8)
	@MaxLength(100)
	password: string;
}
