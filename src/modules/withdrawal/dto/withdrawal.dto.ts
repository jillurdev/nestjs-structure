import {
	IsNotEmpty,
	IsNumber,
	IsString,
	IsOptional,
	Min,
	Matches,
	IsEnum,
} from "class-validator";
import { WithdrawalMethod } from "@prisma/client";

export class CreateWithdrawalDto {
	@IsNumber()
	@Min(1)
	amount: number;

	@IsEnum(WithdrawalMethod)
	method: WithdrawalMethod;

	@IsString()
	@IsNotEmpty()
	@Matches(/^(?:\+?88)?01[3-9]\d{8}$/, {
		message: "Invalid Bangladeshi phone number",
	})
	accountNumber: string;

	@IsString()
	@IsNotEmpty()
	accountName: string;
}

export class ApproveWithdrawalDto {
	@IsString()
	@IsOptional()
	adminNote?: string;
}

export class RejectWithdrawalDto {
	@IsString()
	@IsNotEmpty({ message: "Rejection note is required" })
	adminNote: string;
}
