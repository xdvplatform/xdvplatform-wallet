"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdExtType = void 0;
const class_validator_1 = require("class-validator");
let IdExtType = /** @class */ (() => {
    class IdExtType {
        toXmlObject(parent) {
            let node = parent.ele('gIdExtType')
                .ele('dIdExt').txt(this.dIdExt).up()
                .ele('dPaisExt').txt(this.dPaisExt).up();
            return node;
        }
    }
    __decorate([
        class_validator_1.MaxLength(50)
    ], IdExtType.prototype, "dIdExt", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], IdExtType.prototype, "dPaisExt", void 0);
    return IdExtType;
})();
exports.IdExtType = IdExtType;
//# sourceMappingURL=IdExtType.js.map