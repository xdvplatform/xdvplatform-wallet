"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEBuilder = exports.Plantillas = void 0;
const models_1 = require("./models");
const class_validator_1 = require("class-validator");
const xmlbuilder2_1 = require("xmlbuilder2");
const TypedRFE_1 = require("./TypedRFE");
exports.Plantillas = {
    PruebasFechas: (dt) => ({
        dFechaEm: dt,
        dFechaSalida: dt,
    }),
    Pruebas: {
        iAmb: models_1.TipoAmbiente.Pruebas
    },
    TodoElectronicoLocal: {
        iFormCafe: models_1.FormularioCafe.SinGeneracionCAFE,
        iEntCafe: models_1.EntregaCafe.EnviadoReceptorElectronicamente,
        iProGen: models_1.TipoGeneracion.SistemaFacturacionContribuyente,
        iDest: models_1.Destino.Panama,
        iTpEmis: models_1.TipoEmision.UsoPrevioOpsNormal,
        iDoc: models_1.TipoDocumento.FacturaOpsInterna,
        dEnvFe: models_1.EnvioContenedorFE.Normal,
    }
};
let FEBuilder = /** @class */ (() => {
    class FEBuilder {
        constructor() {
        }
        static create() {
            return new FEBuilder();
        }
        /**
         * Sets the DId type
         * @param entry
         */
        rFE(entry, ...sources) {
            this._rFE = Object.assign(new TypedRFE_1.TypedRFE(), Object.assign({}, entry), ...sources);
            return this;
        }
        toXml() {
            return __awaiter(this, void 0, void 0, function* () {
                yield class_validator_1.validateOrReject(this._rFE);
                const rfe = 'http://dgi-fep.mef.gob.pa';
                const xsi = 'http://www.w3.org/2001/XMLSchema-instance';
                const doc = xmlbuilder2_1.create({
                    defaultNamespace: {
                        ele: rfe,
                        att: null,
                    }
                }).ele('rFE')
                    .ele('dVerForm').txt(this._rFE.dVerForm.toFixed(2)).up()
                    .ele('dId').txt(this._rFE.dId).up();
                console.log(this._rFE.gDGen);
                // add dGen
                let parent = models_1.DGen.toXmlObject(this._rFE.gDGen, doc).up();
                // add gItem
                if (this._rFE.gItem) {
                    this._rFE.gItem.forEach(i => {
                        parent = models_1.Item.toXmlObject(i, parent).up();
                    });
                    // parent = parent.up()
                }
                // add gTot
                parent = models_1.Totales.toXmlObject(this._rFE.gTot, parent).up();
                const xmlString = parent.end({ headless: true, prettyPrint: false });
                console.log(xmlString);
                return xmlString;
            });
        }
    }
    __decorate([
        class_validator_1.IsDefined(),
        class_validator_1.ValidateNested()
    ], FEBuilder.prototype, "_rFE", void 0);
    return FEBuilder;
})();
exports.FEBuilder = FEBuilder;
;
//# sourceMappingURL=FEBuilder.js.map