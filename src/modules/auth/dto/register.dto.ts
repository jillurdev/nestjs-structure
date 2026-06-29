import {
	IsDateString,
	IsEmail,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {
	@IsString()
	@MinLength(2)
	@MaxLength(100)
	fullName: string;

	@IsEmail()
	@Transform(({ value }) => value.trim().toLowerCase())
	email: string;

	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/)
	phone: string;

	@IsDateString()
	dateOfBirth: string;

	@IsString()
	@MinLength(8)
	password: string;

	@IsOptional()
	@IsString()
	deviceId?: string;
}