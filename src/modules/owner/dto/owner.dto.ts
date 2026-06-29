import {
	IsString,
	IsNumber,
	IsBoolean,
	IsOptional,
	IsEmail,
	Min,
	Matches,
	IsObject,
} from "class-validator";

export class CreateAdminDto {
	@IsString()
	name: string;

	@IsString()
	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/, { message: "Invalid phone number" })
	phone: string;

	@IsString()
	password: string;

	@IsEmail()
	@IsOptional()
	email?: string;
}

export class UpdateSettingDto {
	@IsString()
	value: string;
}

export class UpdateMultipleSettingsDto {
	@IsObject()
	settings: Record<string, string>;
}

export class GiveBonusDto {
	@IsNumber()
	@Min(1)
	amount: number;

	@IsString()
	reason: string;
}

export class RevenueDto {
	@IsNumber()
	@IsOptional()
	admobRevenue?: number;

	@IsNumber()
	@IsOptional()
	adsenseRevenue?: number;

	@IsNumber()
	@IsOptional()
	unityRevenue?: number;

	@IsNumber()
	@IsOptional()
	otherRevenue?: number;

	@IsNumber()
	@IsOptional()
	totalPaidOut?: number;
}

export class MaintenanceDto {
	@IsBoolean()
	enabled: boolean;
}

export class ForceUpdateDto {
	@IsBoolean()
	enabled: boolean;

	@IsString()
	version: string;
}
