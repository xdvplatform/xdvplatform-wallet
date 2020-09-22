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
exports.ParsedDID = exports.Params = exports.DIDDocument = void 0;
const class_validator_1 = require("class-validator");
let DIDDocument = (() => {
    class DIDDocument {
        constructor() {
            this.created = new Date();
            this.updated = new Date();
            this['@context'] = 'https://w3id.org/did/v1';
        }
    }
    __decorate([
        class_validator_1.IsDefined(),
        __metadata("design:type", String)
    ], DIDDocument.prototype, "id", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsArray(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], DIDDocument.prototype, "publicKey", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], DIDDocument.prototype, "authentication", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        __metadata("design:type", Object)
    ], DIDDocument.prototype, "uportProfile", void 0);
    __decorate([
        class_validator_1.IsArray(),
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested(),
        __metadata("design:type", Array)
    ], DIDDocument.prototype, "service", void 0);
    return DIDDocument;
})();
exports.DIDDocument = DIDDocument;
class Params {
}
exports.Params = Params;
class ParsedDID {
}
exports.ParsedDID = ParsedDID;
