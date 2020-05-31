"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RucType = void 0;
const class_validator_1 = require("class-validator");
const DGen_1 = require("./DGen");
let RucType = /** @class */ (() => {
    class RucType {
        static toXmlObject(instance, name, parent) {
            let node = parent.ele(name)
                .ele('dDV').txt(instance.dDV).up()
                .ele('dRuc').txt(instance.dRuc).up()
                .ele('dTipoRuc').txt(instance.dTipoRuc.toFixed()).up();
            return node;
        }
    }
    __decorate([
        class_validator_1.IsEnum(DGen_1.TipoRuc)
    ], RucType.prototype, "dTipoRuc", void 0);
    __decorate([
        class_validator_1.Matches('(([P][E][-](([-]|[0-9]){1,17})|[N][-](([-]|[0-9]){1,18})|[E][-](([-]|[0-9]){1,18})|(([-]|[0-9]){5,20}))|(((([0-9]{1})[-][A][V][-](([-]|[0-9]){1,15}))|(([0-9]{2})[-][A][V][-](([-]|[0-9]){1,14})))|((([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,15}))|(([0-9]{1,2})[-][N][T][-](([-]|[0-9]){1,14}))|([N][T][-](([-]|[0-9]){1,14}))|(([0-9]{1,2})[-][P][I][-](([-]|[0-9]){1,14}))|([P][I][-](([-]|[0-9]){1,14}))|(([0-9]){1,2}[P][I][-](([-]|[0-9]){1,14})))))?')
    ], RucType.prototype, "dRuc", void 0);
    __decorate([
        class_validator_1.Matches('[0-9]{2}')
    ], RucType.prototype, "dDV", void 0);
    return RucType;
})();
exports.RucType = RucType;
//# sourceMappingURL=RucType.js.map