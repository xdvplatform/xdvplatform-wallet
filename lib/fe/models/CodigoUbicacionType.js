"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodigoUbicacionType = void 0;
const Ubicaciones_1 = require("./Ubicaciones");
const class_validator_1 = require("class-validator");
let CodigoUbicacionType = /** @class */ (() => {
    class CodigoUbicacionType {
        static toXmlObject(instance, name, parent) {
            const entry = Object.entries(Ubicaciones_1.Ubicaciones).find(([k, v]) => {
                return v === instance.dCodUbi;
            });
            if (!entry) {
                throw new Error(`Invalid dCodUbi ${name}.${instance.dCodUbi}`);
            }
            const [provincia, distrito, corregimiento] = entry[1].split('-');
            let node = parent.ele(name)
                .ele('dCodUbi').txt(entry[1])
                .ele('dProv').txt(provincia).up()
                .ele('dDistr').txt(distrito).up()
                .ele('dCorreg').txt(corregimiento).up();
            return node;
        }
    }
    __decorate([
        class_validator_1.MaxLength(50)
    ], CodigoUbicacionType.prototype, "dCorreg", void 0);
    __decorate([
        class_validator_1.MaxLength(50)
    ], CodigoUbicacionType.prototype, "dDistr", void 0);
    __decorate([
        class_validator_1.MaxLength(50)
    ], CodigoUbicacionType.prototype, "dProv", void 0);
    return CodigoUbicacionType;
})();
exports.CodigoUbicacionType = CodigoUbicacionType;
//# sourceMappingURL=CodigoUbicacionType.js.map