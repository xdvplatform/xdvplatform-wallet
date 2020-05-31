"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DId = void 0;
const class_validator_1 = require("class-validator");
let DId = /** @class */ (() => {
    class DId {
        toXmlObject() {
            return {
                dId: this.value,
            };
        }
    }
    __decorate([
        class_validator_1.Matches('[F][E](([A|V|T|E|P|N|I]|[-]|[a-zA-Z0-9]){64})?'),
        class_validator_1.MinLength(64)
    ], DId.prototype, "value", void 0);
    return DId;
})();
exports.DId = DId;
//# sourceMappingURL=DId.js.map