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
exports.ProcessTopupDto = exports.CreateTopupDto = void 0;
const class_validator_1 = require("class-validator");
var TopupMethod;
(function (TopupMethod) {
    TopupMethod["BKASH"] = "BKASH";
    TopupMethod["NAGAD"] = "NAGAD";
})(TopupMethod || (TopupMethod = {}));
class CreateTopupDto {
}
exports.CreateTopupDto = CreateTopupDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(50),
    __metadata("design:type", Number)
], CreateTopupDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TopupMethod),
    __metadata("design:type", String)
], CreateTopupDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTopupDto.prototype, "transactionId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?:\+?88)?01[3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
    }),
    __metadata("design:type", String)
], CreateTopupDto.prototype, "senderNumber", void 0);
class ProcessTopupDto {
}
exports.ProcessTopupDto = ProcessTopupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessTopupDto.prototype, "adminNote", void 0);
//# sourceMappingURL=topup.dto.js.map