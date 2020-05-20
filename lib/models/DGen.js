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
exports.DGen = exports.PhoneType = exports.EmailType = exports.TipoReceptor = exports.TipoAmbiente = exports.TipoSucursal = exports.TipoTransaccionVenta = exports.TipoGeneracion = exports.EnvioContenedorFE = exports.EntregaCafe = exports.FormularioCafe = exports.Destino = exports.TipoOperacion = exports.TipoNaturalezaOperacion = exports.TipoEmision = exports.TipoDocumento = exports.TipoRuc = void 0;
const moment_1 = __importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const Receptor_1 = require("./Receptor");
const Emisor_1 = require("./Emisor");
const RucType_1 = require("./RucType");
var TipoRuc;
(function (TipoRuc) {
    TipoRuc[TipoRuc["Natural"] = 1] = "Natural";
    TipoRuc[TipoRuc["Juridico"] = 2] = "Juridico";
})(TipoRuc = exports.TipoRuc || (exports.TipoRuc = {}));
var TipoDocumento;
(function (TipoDocumento) {
    TipoDocumento["FacturaOpsInterna"] = "01";
    TipoDocumento["FacturaImportacion"] = "02";
    TipoDocumento["FacturaExportacion"] = "03";
    TipoDocumento["NotaCreditoReferencia_FEs"] = "04";
    TipoDocumento["NotaDebitoReferencia_FEs"] = "05";
    TipoDocumento["NotaCreditoGenerica"] = "06";
    TipoDocumento["NotaDebitoGenerica"] = "07";
    TipoDocumento["FacturaZonaFranca"] = "08";
    TipoDocumento["Reembolso"] = "09";
})(TipoDocumento = exports.TipoDocumento || (exports.TipoDocumento = {}));
var TipoEmision;
(function (TipoEmision) {
    TipoEmision["UsoPrevioOpsNormal"] = "01";
    TipoEmision["UsoPrevioOpsContigencia"] = "02";
    TipoEmision["UsoPosteriorOpsNormal"] = "03";
    TipoEmision["UsoPosteriorOpsContigencia"] = "04";
})(TipoEmision = exports.TipoEmision || (exports.TipoEmision = {}));
var TipoNaturalezaOperacion;
(function (TipoNaturalezaOperacion) {
    TipoNaturalezaOperacion["Venta"] = "01";
    TipoNaturalezaOperacion["Exportacion"] = "02";
    TipoNaturalezaOperacion["Transferencia"] = "10";
    TipoNaturalezaOperacion["Devolucion"] = "11";
    TipoNaturalezaOperacion["Consignacion"] = "12";
    TipoNaturalezaOperacion["Remesa"] = "13";
    TipoNaturalezaOperacion["EntregaGratuita"] = "14";
    TipoNaturalezaOperacion["Compra"] = "20";
    TipoNaturalezaOperacion["Importacion"] = "21";
})(TipoNaturalezaOperacion = exports.TipoNaturalezaOperacion || (exports.TipoNaturalezaOperacion = {}));
var TipoOperacion;
(function (TipoOperacion) {
    TipoOperacion[TipoOperacion["Venta"] = 1] = "Venta";
    TipoOperacion[TipoOperacion["Compra"] = 2] = "Compra";
})(TipoOperacion = exports.TipoOperacion || (exports.TipoOperacion = {}));
var Destino;
(function (Destino) {
    Destino[Destino["Panama"] = 1] = "Panama";
    Destino[Destino["Extranjero"] = 2] = "Extranjero";
})(Destino = exports.Destino || (exports.Destino = {}));
var FormularioCafe;
(function (FormularioCafe) {
    FormularioCafe[FormularioCafe["SinGeneracionCAFE"] = 1] = "SinGeneracionCAFE";
    FormularioCafe[FormularioCafe["CintaPapel"] = 2] = "CintaPapel";
    FormularioCafe[FormularioCafe["PapelFormatoCarta"] = 3] = "PapelFormatoCarta";
})(FormularioCafe = exports.FormularioCafe || (exports.FormularioCafe = {}));
var EntregaCafe;
(function (EntregaCafe) {
    EntregaCafe[EntregaCafe["SinGeneracionCAFE"] = 1] = "SinGeneracionCAFE";
    EntregaCafe[EntregaCafe["EntregadoReceptorEnPapel"] = 2] = "EntregadoReceptorEnPapel";
    EntregaCafe[EntregaCafe["EnviadoReceptorElectronicamente"] = 3] = "EnviadoReceptorElectronicamente";
})(EntregaCafe = exports.EntregaCafe || (exports.EntregaCafe = {}));
var EnvioContenedorFE;
(function (EnvioContenedorFE) {
    EnvioContenedorFE[EnvioContenedorFE["Normal"] = 1] = "Normal";
    EnvioContenedorFE[EnvioContenedorFE["ReceptorExceptuaAlEmisorObligEnvioContenido"] = 2] = "ReceptorExceptuaAlEmisorObligEnvioContenido";
})(EnvioContenedorFE = exports.EnvioContenedorFE || (exports.EnvioContenedorFE = {}));
var TipoGeneracion;
(function (TipoGeneracion) {
    TipoGeneracion[TipoGeneracion["SistemaFacturacionContribuyente"] = 1] = "SistemaFacturacionContribuyente";
    TipoGeneracion[TipoGeneracion["TerceroContratado"] = 2] = "TerceroContratado";
    TipoGeneracion[TipoGeneracion["TerceroProveedorSolucion"] = 3] = "TerceroProveedorSolucion";
    TipoGeneracion[TipoGeneracion["DGIPaginaWeb"] = 4] = "DGIPaginaWeb";
    TipoGeneracion[TipoGeneracion["DGIMobileApp"] = 5] = "DGIMobileApp";
})(TipoGeneracion = exports.TipoGeneracion || (exports.TipoGeneracion = {}));
var TipoTransaccionVenta;
(function (TipoTransaccionVenta) {
    TipoTransaccionVenta[TipoTransaccionVenta["Giro"] = 1] = "Giro";
    TipoTransaccionVenta[TipoTransaccionVenta["ActivoFijo"] = 2] = "ActivoFijo";
    TipoTransaccionVenta[TipoTransaccionVenta["BienesRaices"] = 3] = "BienesRaices";
    TipoTransaccionVenta[TipoTransaccionVenta["PrestacionServicio"] = 4] = "PrestacionServicio";
})(TipoTransaccionVenta = exports.TipoTransaccionVenta || (exports.TipoTransaccionVenta = {}));
var TipoSucursal;
(function (TipoSucursal) {
    TipoSucursal[TipoSucursal["Retail"] = 1] = "Retail";
    TipoSucursal[TipoSucursal["AlPorMayor"] = 2] = "AlPorMayor";
})(TipoSucursal = exports.TipoSucursal || (exports.TipoSucursal = {}));
var TipoAmbiente;
(function (TipoAmbiente) {
    TipoAmbiente[TipoAmbiente["Produccion"] = 1] = "Produccion";
    TipoAmbiente[TipoAmbiente["Pruebas"] = 2] = "Pruebas";
})(TipoAmbiente = exports.TipoAmbiente || (exports.TipoAmbiente = {}));
var TipoReceptor;
(function (TipoReceptor) {
    TipoReceptor["Contribuyente"] = "01";
    TipoReceptor["ConsumidorFinal"] = "02";
    TipoReceptor["Gobierno"] = "03";
    TipoReceptor["Extranjero"] = "04";
})(TipoReceptor = exports.TipoReceptor || (exports.TipoReceptor = {}));
class EmailType {
}
exports.EmailType = EmailType;
class PhoneType {
}
exports.PhoneType = PhoneType;
let DGen = /** @class */ (() => {
    class DGen {
        static toXmlObject(instance, parent) {
            let node = parent.ele('gDGen')
                .ele('iAmb').txt(instance.iAmb.toFixed()).up()
                .ele('iTpEmis').txt(instance.iTpEmis).up();
            if (instance.dIntEmFe) {
                node = node.ele('dIntEmFe').txt(instance.dIntEmFe).up();
            }
            if (instance.dFechaCont) {
                node = node.ele('dFechaCont').txt(moment_1.default(instance.dFechaCont).format()).up();
            }
            if (instance.dFechaSalida) {
                node = node.ele('dFechaSalida').txt(moment_1.default(instance.dFechaSalida).format()).up();
            }
            if (instance.iTipoTranVenta) {
                node = node.ele('iTipoTranVenta').txt(instance.iTipoTranVenta.toFixed()).up();
            }
            if (instance.dMotCont) {
                node = node.ele('dMotCont').txt(instance.dMotCont).up();
            }
            node = node.ele('iDoc').txt(instance.iDoc).up()
                .ele('dNroDF').txt(instance.dNroDF).up()
                .ele('dPtoFacDF').txt(instance.dPtoFacDF).up()
                .ele('dFechaEm').txt(moment_1.default(instance.dFechaEm).format()).up()
                .ele('iNatOp').txt(instance.iNatOp).up()
                .ele('iTipoOp').txt(instance.iTipoOp.toFixed()).up()
                .ele('iDest').txt(instance.iDest.toFixed()).up()
                .ele('iFormCAFE').txt(instance.iFormCafe.toFixed()).up()
                .ele('iEntCafe').txt(instance.iEntCafe.toFixed()).up()
                .ele('dEnvFe').txt(instance.dEnvFe.toFixed()).up()
                .ele('iProGen').txt(instance.iProGen.toFixed()).up();
            node = Emisor_1.Emisor.toXmlObject(instance.gEmis, node).up();
            node = Receptor_1.Receptor.toXmlObject(instance.gDatRec, node).up();
            if (instance.gAutXML) {
                node = node.ele('gAutXML');
                instance.gAutXML.map(i => {
                    return RucType_1.RucType.toXmlObject(i.gRucAutXML, 'gRucAutXML', node);
                });
            }
            return node;
        }
    }
    __decorate([
        class_validator_1.IsEnum(TipoAmbiente)
    ], DGen.prototype, "iAmb", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoEmision)
    ], DGen.prototype, "iTpEmis", void 0);
    __decorate([
        class_validator_1.IsDate()
    ], DGen.prototype, "dFechaCont", void 0);
    __decorate([
        class_validator_1.MaxLength(150),
        class_validator_1.MinLength(15)
    ], DGen.prototype, "dMotCont", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoDocumento)
    ], DGen.prototype, "iDoc", void 0);
    __decorate([
        class_validator_1.Matches('^(?=.*[1-9].*)[0-9]{10}$')
    ], DGen.prototype, "dNroDF", void 0);
    __decorate([
        class_validator_1.Matches('^^(?=.*[1-9].*)[0-9]{3}$')
    ], DGen.prototype, "dPtoFacDF", void 0);
    __decorate([
        class_validator_1.Matches('(?=.*[1-9].*)[0-9]{9}')
    ], DGen.prototype, "dSeg", void 0);
    __decorate([
        class_validator_1.IsDate()
    ], DGen.prototype, "dFechaEm", void 0);
    __decorate([
        class_validator_1.IsDate()
    ], DGen.prototype, "dFechaSalida", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoNaturalezaOperacion)
    ], DGen.prototype, "iNatOp", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoOperacion)
    ], DGen.prototype, "iTipoOp", void 0);
    __decorate([
        class_validator_1.IsEnum(Destino)
    ], DGen.prototype, "iDest", void 0);
    __decorate([
        class_validator_1.IsEnum(FormularioCafe)
    ], DGen.prototype, "iFormCafe", void 0);
    __decorate([
        class_validator_1.IsEnum(EntregaCafe)
    ], DGen.prototype, "iEntCafe", void 0);
    __decorate([
        class_validator_1.IsEnum(EnvioContenedorFE)
    ], DGen.prototype, "dEnvFe", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoGeneracion)
    ], DGen.prototype, "iProGen", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoTransaccionVenta)
    ], DGen.prototype, "iTipoTranVenta", void 0);
    __decorate([
        class_validator_1.IsEnum(TipoSucursal)
    ], DGen.prototype, "iTipoSuc", void 0);
    __decorate([
        class_validator_1.MaxLength(5000)
    ], DGen.prototype, "dIntEmFe", void 0);
    __decorate([
        class_validator_1.ValidateNested()
    ], DGen.prototype, "gEmis", void 0);
    __decorate([
        class_validator_1.ValidateNested()
    ], DGen.prototype, "gDatRec", void 0);
    __decorate([
        class_validator_1.ArrayMaxSize(10)
    ], DGen.prototype, "gAutXML", void 0);
    return DGen;
})();
exports.DGen = DGen;
//# sourceMappingURL=DGen.js.map