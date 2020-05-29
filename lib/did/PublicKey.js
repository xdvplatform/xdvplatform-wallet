"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKey = void 0;
const class_validator_1 = require("class-validator");
let PublicKey = /** @class */ (() => {
    class PublicKey {
    }
    __decorate([
        class_validator_1.IsDefined()
    ], PublicKey.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], PublicKey.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], PublicKey.prototype, "owner", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsEthereumAddress()
    ], PublicKey.prototype, "ethereumAddress", void 0);
    __decorate([
        class_validator_1.IsBase64(),
        class_validator_1.IsOptional()
    ], PublicKey.prototype, "publicKeyBase64", void 0);
    __decorate([
        class_validator_1.IsOptional()
    ], PublicKey.prototype, "publicKeyBase58", void 0);
    __decorate([
        class_validator_1.IsHexadecimal(),
        class_validator_1.IsOptional()
    ], PublicKey.prototype, "publicKeyHex", void 0);
    __decorate([
        class_validator_1.IsOptional()
    ], PublicKey.prototype, "publicKeyPem", void 0);
    return PublicKey;
})();
exports.PublicKey = PublicKey;
//# sourceMappingURL=PublicKey.js.map