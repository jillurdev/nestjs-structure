import {
	IsEmail,
	IsOptional,
	IsString,
	MinLength,
	Matches,
} from "class-validator";

export class UpdateUserDto {
	@IsString()
	@IsOptional()
	name?: string;

	@IsEmail()
	@IsOptional()
	email?: string;

	@IsString()
	@IsOptional()
	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/, {
		message: "Invalid Bangladeshi phone number",
	})
	phone?: string;

	@IsString()
	@MinLength(6)
	@IsOptional()
	password?: string;

	@IsString()
	@IsOptional()
	avatarUrl?: string;
}
