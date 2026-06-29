"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectWithdrawalDto = exports.ApproveWithdrawalDto = exports.CreateWithdrawalDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateWithdrawalDto {
}
exports.CreateWithdrawalDto = CreateWithdrawalDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWithdrawalDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.WithdrawalMethod),
    __metadata("design:type", String)
], CreateWithdrawalDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?:\+?88)?01[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    }),
    __metadata("design:type", String)
], CreateWithdrawalDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWithdrawalDto.prototype, "accountName", void 0);
class ApproveWithdrawalDto {
}
exports.ApproveWithdrawalDto = ApproveWithdrawalDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ApproveWithdrawalDto.prototype, "adminNote", void 0);
class RejectWithdrawalDto {
}
exports.RejectWithdrawalDto = RejectWithdrawalDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Rejection note is required" }),
    __metadata("design:type", String)
], RejectWithdrawalDto.prototype, "adminNote", void 0);
//# sourceMappingURL=withdrawal.dto.js.map