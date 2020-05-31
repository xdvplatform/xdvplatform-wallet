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
exports.Totales = exports.OtrosImpuestos = exports.TiempoPago = exports.CodigoRetencion = exports.Retencion = exports.VencimientoPago = exports.OtrosImpuestosTasas = exports.FormaPago = exports.FormaPagoType = exports.Bonificaciones = void 0;
const class_validator_1 = require("class-validator");
const moment_1 = __importDefault(require("moment"));
class Bonificaciones {
}
exports.Bonificaciones = Bonificaciones;
class FormaPagoType {
}
exports.FormaPagoType = FormaPagoType;
var FormaPago;
(function (FormaPago) {
    FormaPago["Credito"] = "01";
    FormaPago["Contado"] = "02";
    FormaPago["TarjetaCredito"] = "03";
    FormaPago["TarjetaDebito"] = "04";
    FormaPago["TarjetaFidelidad"] = "05";
    FormaPago["ValeDevolucion"] = "06";
    FormaPago["ValeRegalo"] = "07";
    FormaPago["ACH"] = "08";
    FormaPago["Otro"] = "99";
})(FormaPago = exports.FormaPago || (exports.FormaPago = {}));
class OtrosImpuestosTasas {
}
exports.OtrosImpuestosTasas = OtrosImpuestosTasas;
class VencimientoPago {
}
exports.VencimientoPago = VencimientoPago;
class Retencion {
}
exports.Retencion = Retencion;
var CodigoRetencion;
(function (CodigoRetencion) {
    CodigoRetencion[CodigoRetencion["PagoServicioProfesionalEstado100Porc"] = 1] = "PagoServicioProfesionalEstado100Porc";
    CodigoRetencion[CodigoRetencion["PagoVentaBienesServiciosEstado50Porc"] = 2] = "PagoVentaBienesServiciosEstado50Porc";
    CodigoRetencion[CodigoRetencion["PagoNoDomiciliadoEmpresaConstituidaExterior100Porc"] = 3] = "PagoNoDomiciliadoEmpresaConstituidaExterior100Porc";
    CodigoRetencion[CodigoRetencion["PagoCompraBienesServicios50Porc"] = 4] = "PagoCompraBienesServicios50Porc";
    CodigoRetencion[CodigoRetencion["PagoComercionAfiliadoSistemaTC_TD50Porc"] = 7] = "PagoComercionAfiliadoSistemaTC_TD50Porc";
    CodigoRetencion[CodigoRetencion["Otros"] = 8] = "Otros";
})(CodigoRetencion = exports.CodigoRetencion || (exports.CodigoRetencion = {}));
var TiempoPago;
(function (TiempoPago) {
    TiempoPago[TiempoPago["Inmediato"] = 1] = "Inmediato";
    TiempoPago[TiempoPago["Plazo"] = 2] = "Plazo";
    TiempoPago[TiempoPago["Mixto"] = 3] = "Mixto";
})(TiempoPago = exports.TiempoPago || (exports.TiempoPago = {}));
var OtrosImpuestos;
(function (OtrosImpuestos) {
    OtrosImpuestos[OtrosImpuestos["Suma911"] = 1] = "Suma911";
    OtrosImpuestos[OtrosImpuestos["TasaPortabilidadNum\u00E9rica"] = 2] = "TasaPortabilidadNum\u00E9rica";
})(OtrosImpuestos = exports.OtrosImpuestos || (exports.OtrosImpuestos = {}));
let Totales = /** @class */ (() => {
    class Totales {
        constructor() {
            this.gDescBonif = [];
            this.gPagPlazo = [];
            this.gFormaPago = [];
        }
        static toXmlObject(instance, parent) {
            let node = parent.ele('gTot');
            node.ele('iPzPag').txt(instance.iPzPag.toFixed()).up()
                .ele('dNroItems').txt(instance.dNroItems.toFixed(2)).up()
                .ele('dTotITBMS').txt(instance.dTotITBMS.toFixed(2)).up()
                .ele('dTotNeto').txt(instance.dTotNeto.toFixed(2)).up()
                .ele('dTotRec').txt(instance.dTotRec.toFixed(2)).up()
                .ele('dTotGravado').txt(instance.dTotGravado.toFixed(2)).up()
                .ele('dVTot').txt(instance.dVTot.toFixed(2)).up()
                .ele('dVTotItems').txt(instance.dVTotItems.toFixed(2)).up()
                .ele('dVuelto').txt(instance.dVuelto.toFixed(2)).up();
            if (instance.dTotAcar) {
                node = node.ele('dTotAcar').txt(instance.dTotAcar.toFixed(2)).up();
            }
            if (instance.dTotDesc) {
                node = node.ele('dTotDesc').txt(instance.dTotDesc.toFixed(2)).up();
            }
            if (instance.dTotISC) {
                node = node.ele('dTotISC').txt(instance.dTotISC.toFixed(2)).up();
            }
            if (instance.dTotSeg) {
                node = node.ele('dTotSeg').txt(instance.dTotSeg.toFixed(2)).up();
            }
            if (instance.gRetenc) {
                node = node.ele('gRetenc')
                    .ele('cCodRetenc').txt(instance.gRetenc.cCodRetenc.toFixed()).up()
                    .ele('cValRetenc').txt(instance.gRetenc.cValRetenc.toFixed(2)).up();
            }
            if (instance.gPagPlazo) {
                instance.gPagPlazo.map(i => {
                    node = node.ele('gPagPlazo')
                        .ele('dFecItPlazo').txt(moment_1.default(i.dFecItPlazo).format()).up()
                        .ele('dSecItem').txt(i.dSecItem.toFixed()).up()
                        .ele('dValItPlazo').txt(i.dValItPlazo.toFixed(2)).up();
                    if (i.dInfPagPlazo) {
                        node = node.ele('dInfPagPlazo').txt(i.dInfPagPlazo).up();
                    }
                });
            }
            if (instance.gOTITotal) {
                // instance.gOTITotal.map(i => {K
                node = node.ele('gOTITotal')
                    .ele('dCodOTITotal').txt(instance.gOTITotal.dCodOTITotal.toFixed()).up()
                    .ele('dValOTITotal').txt(instance.gOTITotal.dValOTITotal.toFixed(2)).up();
                //  });
            }
            if (instance.gDescBonif) {
                instance.gDescBonif.map(i => {
                    node = node.ele('gDescBonif')
                        .ele('dDetalDesc').txt(i.dDetalDesc).up()
                        .ele('dValDesc').txt(i.dValDesc.toFixed(2)).up();
                });
            }
            return node;
        }
    }
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dNroItems", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        }),
        class_validator_1.IsOptional()
    ], Totales.prototype, "dTotAcar", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        }),
        class_validator_1.IsOptional()
    ], Totales.prototype, "dTotDesc", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dTotGravado", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        }),
        class_validator_1.IsOptional()
    ], Totales.prototype, "dTotISC", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dTotITBMS", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dTotNeto", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dTotRec", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        }),
        class_validator_1.IsOptional()
    ], Totales.prototype, "dTotSeg", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dVTot", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        })
    ], Totales.prototype, "dVTotItems", void 0);
    __decorate([
        class_validator_1.IsNumber({
            maxDecimalPlaces: 2
        }),
        class_validator_1.IsOptional()
    ], Totales.prototype, "dVuelto", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(5),
        class_validator_1.ValidateNested(),
        class_validator_1.IsOptional()
    ], Totales.prototype, "gDescBonif", void 0);
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ArrayMaxSize(10),
        class_validator_1.ValidateNested()
    ], Totales.prototype, "gFormaPago", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsOptional()
    ], Totales.prototype, "gOTITotal", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(99),
        class_validator_1.IsOptional(),
        class_validator_1.ValidateNested()
    ], Totales.prototype, "gPagPlazo", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsOptional()
    ], Totales.prototype, "gRetenc", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_validator_1.IsDefined()
    ], Totales.prototype, "iPzPag", void 0);
    return Totales;
})();
exports.Totales = Totales;
//# sourceMappingURL=Totales.js.map