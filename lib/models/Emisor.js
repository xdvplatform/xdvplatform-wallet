"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emisor = void 0;
const class_validator_1 = require("class-validator");
const RucType_1 = require("./RucType");
const CodigoUbicacionType_1 = require("./CodigoUbicacionType");
let Emisor = /** @class */ (() => {
    class Emisor {
        static toXmlObject(instance, parent) {
            let node = parent.ele('gEmis');
            node = RucType_1.RucType.toXmlObject(instance.gRucEmi, 'gRucEmi', parent).up();
            node = CodigoUbicacionType_1.CodigoUbicacionType.toXmlObject(instance.gUbiEm, 'gUbiEm', parent).up();
            node.ele('dNombEm').txt(instance.dNombEm).up()
                .ele('dCoordEm').txt(instance.dCoordEm).up()
                .ele('dDirecEm').txt(instance.dDirecEm).up()
                .ele('gUbiEm').ele(instance.gUbiEm).up();
            if (instance.dTfnEm) {
                instance.dTfnEm.forEach(i => {
                    node = node.ele('dTfnEm').txt(i).up();
                });
            }
            if (instance.dCorElecEmi) {
                instance.dCorElecEmi.forEach(i => {
                    node = node.ele('dCorElecEmi').txt(i).up();
                });
            }
            return node;
        }
    }
    __decorate([
        class_validator_1.ValidateNested()
    ], Emisor.prototype, "gRucEmi", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], Emisor.prototype, "dNombEm", void 0);
    __decorate([
        class_validator_1.Matches('[a-zA-Z0-9]{4}')
    ], Emisor.prototype, "dSucEm", void 0);
    __decorate([
        class_validator_1.MaxLength(22),
        class_validator_1.Matches('^([-+]?)([\d]{1,2})(((\.)[\d]{4,6}(,)))(-([\d]{2})(\.)[\d]{4,6})$')
    ], Emisor.prototype, "dCoordEm", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], Emisor.prototype, "dDirecEm", void 0);
    __decorate([
        class_validator_1.ValidateNested()
    ], Emisor.prototype, "gUbiEm", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(3),
        class_validator_1.ArrayMinSize(1),
        class_validator_1.Matches(`[0-9]{3,4}-[0-9]{4}`)
    ], Emisor.prototype, "dTfnEm", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(3),
        class_validator_1.Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    ], Emisor.prototype, "dCorElecEmi", void 0);
    return Emisor;
})();
exports.Emisor = Emisor;
//# sourceMappingURL=Emisor.js.map