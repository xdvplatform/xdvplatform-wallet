"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receptor = void 0;
const class_validator_1 = require("class-validator");
const DGen_1 = require("./DGen");
const CodigoUbicacionType_1 = require("./CodigoUbicacionType");
const RucType_1 = require("./RucType");
let Receptor = /** @class */ (() => {
    class Receptor {
        static toXmlObject(instance, parent) {
            let node = parent.ele('gDatRec');
            node = RucType_1.RucType.toXmlObject(instance.gRucRec, 'gRucRec', parent).up();
            node = CodigoUbicacionType_1.CodigoUbicacionType.toXmlObject(instance.gUbiRec, 'gUbiRec', parent).up();
            node = node.ele('iTipoRec').txt(instance.iTipoRec).up();
            node = node.ele('cPaisRec').txt(instance.cPaisRec).up();
            // if (instance.gIdExtType) {
            //     node = node.ele('gIdExtType').txt(instance.gIdExtType.toXmlObject(node)).up();
            // }
            if (instance.cPaisRecDesc) {
                node = node.ele('cPaisRecDesc').txt(instance.cPaisRecDesc).up();
            }
            if (instance.dNombRec) {
                node = node.ele('dNombRec').txt(instance.dNombRec).up();
            }
            if (instance.dDirecRec) {
                node = node.ele('dDirecRec').txt(instance.dDirecRec).up();
            }
            if (instance.dTfnRec) {
                instance.dTfnRec.forEach(i => {
                    node = node.ele('dTfnRec').txt(i).up();
                });
            }
            if (instance.dCorElecRec) {
                instance.dCorElecRec.forEach(i => {
                    node = node.ele('dCorElecRec').txt(i).up();
                });
            }
            return node;
        }
    }
    __decorate([
        class_validator_1.IsEnum(DGen_1.TipoReceptor)
    ], Receptor.prototype, "iTipoRec", void 0);
    __decorate([
        class_validator_1.ValidateNested()
    ], Receptor.prototype, "gRucRec", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], Receptor.prototype, "dNombRec", void 0);
    __decorate([
        class_validator_1.MaxLength(100)
    ], Receptor.prototype, "dDirecRec", void 0);
    __decorate([
        class_validator_1.ValidateNested()
    ], Receptor.prototype, "gUbiRec", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(3),
        class_validator_1.Matches(`[0-9]{3,4}-[0-9]{4}`)
    ], Receptor.prototype, "dTfnRec", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(3),
        class_validator_1.Matches(`([0-9a-zA-Z#$%]([-.\w]*[0-9a-zA-Z#$%'\\.\\-_])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})`)
    ], Receptor.prototype, "dCorElecRec", void 0);
    __decorate([
        class_validator_1.MaxLength(50),
        class_validator_1.MinLength(5)
    ], Receptor.prototype, "cPaisRecDesc", void 0);
    return Receptor;
})();
exports.Receptor = Receptor;
//# sourceMappingURL=Receptor.js.map