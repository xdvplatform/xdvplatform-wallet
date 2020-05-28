"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentNodeSchema = void 0;
const class_validator_1 = require("class-validator");
let DocumentItemNodeSchema = /** @class */ (() => {
    class DocumentItemNodeSchema {
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.IsBase64()
    ], DocumentItemNodeSchema.prototype, "document", void 0);
    return DocumentItemNodeSchema;
})();
let DocumentNodeSchema = /** @class */ (() => {
    class DocumentNodeSchema {
    }
    __decorate([
        class_validator_1.IsDefined()
    ], DocumentNodeSchema.prototype, "issuer", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], DocumentNodeSchema.prototype, "tag", void 0);
    __decorate([
        class_validator_1.IsOptional()
    ], DocumentNodeSchema.prototype, "detachedSignatures", void 0);
    __decorate([
        class_validator_1.IsOptional()
    ], DocumentNodeSchema.prototype, "logs", void 0);
    return DocumentNodeSchema;
})();
exports.DocumentNodeSchema = DocumentNodeSchema;
//# sourceMappingURL=DocumentNodeSchema.js.map