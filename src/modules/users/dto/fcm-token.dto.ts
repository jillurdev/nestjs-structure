import { DevicePlatform } from "@/common/enums";
import { IsEnum, IsString } from "class-validator";


export class SaveDeviceTokenDto {
	@IsString()
	token: string;

	@IsEnum(DevicePlatform)
	platform: DevicePlatform;
}
