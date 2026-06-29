import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value?.trim())
	@MaxLength(500)
	bio?: string;

	@IsOptional()
	@IsString()
	avatarUrl?: string;
}
