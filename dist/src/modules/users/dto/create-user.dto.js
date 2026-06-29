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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)({ message: "নাম অবশ্যই টেক্সট হতে হবে" }),
    (0, class_validator_1.IsNotEmpty)({ message: "নাম দেওয়া আবশ্যক" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "সঠিক ইমেইল ঠিকানা দিন" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim() || undefined),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "ফোন নম্বর অবশ্যই টেক্সট হতে হবে" }),
    (0, class_validator_1.IsNotEmpty)({ message: "ফোন নম্বর দেওয়া আবশ্যক" }),
    (0, class_validator_1.Matches)(/^(?:\+?88)?01[3-9]\d{8}$/, {
        message: "সঠিক বাংলাদেশি ফোন নম্বর দিন",
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "পাসওয়ার্ড অবশ্যই টেক্সট হতে হবে" }),
    (0, class_validator_1.MinLength)(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে" }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "ডিভাইস আইডি অবশ্যই টেক্সট হতে হবে" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "deviceId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "রেফারেল কোড অবশ্যই টেক্সট হতে হবে" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(6, { message: "রেফারেল কোড ৬ অক্ষরের হতে হবে" }),
    (0, class_validator_1.MaxLength)(6, { message: "রেফারেল কোড ৬ অক্ষরের হতে হবে" }),
    (0, class_transformer_1.Transform)(({ value }) => value?.trim() || undefined),
    __metadata("design:type", String)
], CreateUserDto.prototype, "referralCode", void 0);
//# sourceMappingURL=create-user.dto.js.map