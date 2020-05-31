"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedRFE = void 0;
const models_1 = require("./models");
const class_validator_1 = require("class-validator");
let TypedRFE = /** @class */ (() => {
    class TypedRFE {
        constructor() {
            this.gDGen = new models_1.DGen();
            this.gItem = [];
            this.gTot = new models_1.Totales();
        }
    }
    __decorate([
        class_validator_1.IsNumber()
    ], TypedRFE.prototype, "dVerForm", void 0);
    __decorate([
        class_validator_1.Matches(/[F][E](([A|V|T|E|P|N|I]|[-]|[a-zA-Z0-9]){64})?/),
        class_validator_1.MinLength(64)
    ], TypedRFE.prototype, "dId", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested()
    ], TypedRFE.prototype, "gDGen", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ArrayMaxSize(1000),
        class_validator_1.ValidateNested()
    ], TypedRFE.prototype, "gItem", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested()
    ], TypedRFE.prototype, "gTot", void 0);
    return TypedRFE;
})();
exports.TypedRFE = TypedRFE;
//# sourceMappingURL=TypedRFE.js.map