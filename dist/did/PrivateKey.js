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
exports.PrivateKey = void 0;
const class_validator_1 = require("class-validator");
let PrivateKey = (() => {
    class PrivateKey {
        constructor() {
        }
        toAuthorizationKey() {
            return {
                publicKey: this.publicKeyBase58,
                type: this.type,
            };
        }
        toPublicKey() {
            return {
                publicKeyBase58: this.publicKeyBase58,
                type: this.type,
                owner: this.owner,
            };
        }
    }
    __decorate([
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "owner", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "type", void 0);
    __decorate([
        class_validator_1.IsBase64(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "publicKeyBase64", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "publicKeyBase58", void 0);
    __decorate([
        class_validator_1.IsHexadecimal(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "publicKeyHex", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "publicKeyPem", void 0);
    __decorate([
        class_validator_1.IsBase64(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "privateKeyBase64", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "privateKeyBase58", void 0);
    __decorate([
        class_validator_1.IsHexadecimal(),
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "privateKeyHex", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        __metadata("design:type", String)
    ], PrivateKey.prototype, "privateKeyPem", void 0);
    return PrivateKey;
})();
exports.PrivateKey = PrivateKey;
