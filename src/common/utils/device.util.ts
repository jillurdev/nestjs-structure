import { UAParser } from "ua-parser-js";
import { DevicePlatform } from "../enums";

export function getPlatform(userAgent?: string): DevicePlatform {
	const parser = new UAParser(userAgent);
	const os = parser.getOS().name?.toLowerCase();

	switch (os) {
		case "android":
			return DevicePlatform.ANDROID;

		case "ios":
			return DevicePlatform.IOS;

		case "windows":
			return DevicePlatform.WINDOWS;

		case "mac os":
		case "macos":
			return DevicePlatform.MACOS;

		case "linux":
			return DevicePlatform.LINUX;

		default:
			return DevicePlatform.WEB;
	}
}

export function getDeviceName(userAgent?: string): string {
	const parser = new UAParser(userAgent);

	const browser = parser.getBrowser().name ?? "Unknown Browser";
	const os = parser.getOS().name ?? "Unknown OS";

	return `${browser} on ${os}`;
}
