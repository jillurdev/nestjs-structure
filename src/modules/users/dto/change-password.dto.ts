import { IsString, MinLength, NotEquals } from "class-validator";

export class ChangePasswordDto {
	@IsString()
	currentPassword: string;

	@IsString()
	@MinLength(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" })
	@NotEquals(null, {
		message: "নতুন পাসওয়ার্ড বর্তমান পাসওয়ার্ডের মতো হতে পারবে না",
	})
	newPassword: string;
}
