"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTPayload = void 0;
const class_validator_1 = require("class-validator");
let JWTPayload = /** @class */ (() => {
    class JWTPayload {
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined()
    ], JWTPayload.prototype, "iat", void 0);
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined()
    ], JWTPayload.prototype, "nbf", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], JWTPayload.prototype, "iss", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], JWTPayload.prototype, "sub", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsDefined()
    ], JWTPayload.prototype, "aud", void 0);
    return JWTPayload;
})();
exports.JWTPayload = JWTPayload;
//# sourceMappingURL=JWTPayload.js.map