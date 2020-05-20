"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.ISC = exports.Precio = exports.CodigoItem = exports.ITBMS = exports.TasaITBMS = exports.TasaISC = void 0;
const moment_1 = __importDefault(require("moment"));
const class_validator_1 = require("class-validator");
var TasaISC;
(function (TasaISC) {
    /**
     *                      Impuesto Selectivo al Consumo de Gaseosas
                            Impuesto Selectivo al Consumo de Joyas y Armas de Fuego
                            Impuesto Selectivo al Consumo de televisión por cable, microondas y satelital, telefonía móvil
                            Impuesto Selectivo al Consumo de Bebidas Alcohólicas (B/. 0.05 por litro según detalle)
                            Impuesto Selectivo al Consumo de Vinos (B/. 0.05 por litro según detalle)
     */
    TasaISC[TasaISC["Tasa5c"] = 0.05] = "Tasa5c";
    /** Jarabes, siropes o concentrados */
    TasaISC[TasaISC["Tasa6c"] = 0.06] = "Tasa6c";
    /** Impuesto Selectivo al Consumo de Bebidas Espirituosas */
    TasaISC[TasaISC["TasaBebidas"] = 0] = "TasaBebidas";
    /** Impuesto Selectivo al Consumo de Cervezas(B/. 0.1325 por litro según detalle) */
    TasaISC[TasaISC["Tasa13_20c"] = 0.1325] = "Tasa13_20c";
    /** Impuesto Selectivo al Consumo de Cigarrillos y tabacos */
    TasaISC[TasaISC["Tasa32_50c"] = 0.325] = "Tasa32_50c";
    /** Impuesto Selectivo al Consumo de Licores */
    TasaISC[TasaISC["Tasa3_50c"] = 0.035] = "Tasa3_50c";
    /**  Impuesto Selectivo al Consumo de Minería no metálica*/
    TasaISC[TasaISC["TasaMineriaNoMetalica"] = 0] = "TasaMineriaNoMetalica";
})(TasaISC = exports.TasaISC || (exports.TasaISC = {}));
var TasaITBMS;
(function (TasaITBMS) {
    TasaITBMS["TasaExonerado"] = "00";
    TasaITBMS["Tasa7Porc_Regular"] = "01";
    TasaITBMS["Tasa10Porc_Alcoholes"] = "02";
    TasaITBMS["Tasa15Porc_Cigarrillos"] = "03";
})(TasaITBMS = exports.TasaITBMS || (exports.TasaITBMS = {}));
class ITBMS {
}
exports.ITBMS = ITBMS;
class CodigoItem {
}
exports.CodigoItem = CodigoItem;
class Precio {
}
exports.Precio = Precio;
class ISC {
}
exports.ISC = ISC;
let Item = /** @class */ (() => {
    class Item {
        static toXmlObject(instance, parent) {
            let node = parent.ele('gItem');
            node.ele('cCantCodInt').txt(instance.cCantCodInt.toFixed()).up()
                .ele('dDescProd').txt(instance.dDescProd).up()
                .ele('dSecItem').txt(instance.dSecItem.toFixed()).up();
            node = node.ele('gPrecios')
                .ele('dPrItem').txt(instance.gPrecios.dPrItem.toFixed()).up()
                .ele('dPrUnit').txt(instance.gPrecios.dPrUnit.toFixed()).up()
                .ele('dValTotItem').txt(instance.gPrecios.dValTotItem.toFixed()).up();
            node = node.ele('gITBMSItem')
                .ele('dTasaITBMS').txt(instance.gITBMSItem.dTasaITBMS).up()
                .ele('dValITBMS').txt(instance.gITBMSItem.dValITBMS.toFixed()).up();
            if (instance.dInfEmFE) {
                node = node.ele('dInfEmFE').txt(instance.dInfEmFE).up();
            }
            if (instance.cUnidadCPBS) {
                node = node.ele('cUnidadCPBS').txt(instance.cUnidadCPBS).up();
            }
            if (instance.dCodCPBScmp) {
                node = node.ele('dCodCPBScmp').txt(instance.dCodCPBScmp).up();
            }
            if (instance.dCodCPBSabr) {
                node = node.ele('dCodCPBSabr').txt(instance.dCodCPBSabr).up();
            }
            if (instance.dCodProd) {
                node = node.ele('dCodProd').txt(instance.dCodProd).up();
            }
            if (instance.dFechaCad) {
                node = node.ele('dFechaCad').txt(moment_1.default(instance.dFechaCad).format('YYYY-MM-DD')).up();
            }
            if (instance.dFechaFab) {
                node = node.ele('dFechaFab').txt(moment_1.default(instance.dFechaFab).format('YYYY-MM-DD')).up();
            }
            if (instance.cUnidad) {
                node = node.ele('cUnidad').txt(instance.cUnidad).up();
            }
            return node;
        }
    }
    __decorate([
        class_validator_1.MaxLength(4)
    ], Item.prototype, "dSecItem", void 0);
    __decorate([
        class_validator_1.MaxLength(500)
    ], Item.prototype, "dDescProd", void 0);
    __decorate([
        class_validator_1.MaxLength(20)
    ], Item.prototype, "dCodProd", void 0);
    __decorate([
        class_validator_1.IsNumber()
    ], Item.prototype, "cCantCodInt", void 0);
    __decorate([
        class_validator_1.MaxLength(5000)
    ], Item.prototype, "dInfEmFE", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], Item.prototype, "gPrecios", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], Item.prototype, "gITBMSItem", void 0);
    return Item;
})();
exports.Item = Item;
//# sourceMappingURL=Item.js.map