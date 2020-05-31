"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalesSchema = void 0;
exports.TotalesSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "Bonificaciones": {
            "properties": {
                "dDetalDesc": {
                    "description": "D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura",
                    "type": "string"
                },
                "dValDesc": {
                    "description": "D201: Monto Descuentos/Bonificaciones y otros ajustes",
                    "type": "number"
                }
            },
            "type": "object"
        },
        "CodigoRetencion": {
            "enum": [
                1,
                2,
                3,
                4,
                7,
                8
            ],
            "type": "number"
        },
        "FormaPago": {
            "enum": [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "99"
            ],
            "type": "string"
        },
        "FormaPagoType": {
            "properties": {
                "dFormaPagoDesc": {
                    "description": "D302: Descripción de forma de pago no listada en el formato",
                    "type": "string"
                },
                "dVlrCuota": {
                    "description": "D303: Valor de la fracción pagada utilizando esta forma de pago",
                    "type": "number"
                },
                "iFormaPago": {
                    "$ref": "#/definitions/FormaPago",
                    "description": "D301: Forma de pago de la factura"
                }
            },
            "type": "object"
        },
        "OtrosImpuestos": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "OtrosImpuestosTasas": {
            "properties": {
                "dCodOTITotal": {
                    "$ref": "#/definitions/OtrosImpuestos",
                    "description": "D601:Código de Otras Tasas o Impuesto del total del ítem"
                },
                "dValOTITotal": {
                    "description": "D602:Monto de Otras Tasas o Impuesto del total del ítem",
                    "type": "number"
                }
            },
            "type": "object"
        },
        "Retencion": {
            "properties": {
                "cCodRetenc": {
                    "$ref": "#/definitions/CodigoRetencion",
                    "description": "D401: Código de Retención a aplicar"
                },
                "cValRetenc": {
                    "description": "D402: Monto de la retención a aplicar",
                    "type": "number"
                }
            },
            "type": "object"
        },
        "TiempoPago": {
            "enum": [
                1,
                2,
                3
            ],
            "type": "number"
        },
        "VencimientoPago": {
            "properties": {
                "dFecItPlazo": {
                    "description": "D502: Fecha de vencimiento de la fracción",
                    "format": "date-time",
                    "type": "string"
                },
                "dInfPagPlazo": {
                    "description": "D504: Informaciones de interés del emitente con respeto a  esta fracción de pago",
                    "type": "string"
                },
                "dSecItem": {
                    "description": "D501: Número secuencial de cada fracción de pago a plazo",
                    "type": "number"
                },
                "dValItPlazo": {
                    "description": "D503: Valor de la fracción",
                    "type": "number"
                }
            },
            "type": "object"
        }
    },
    "properties": {
        "dNroItems": {
            "description": "D13: Número total de ítems de la factura",
            "type": "number"
        },
        "dTotAcar": {
            "description": "D07: Valor del acarreo cobrado en el precio total",
            "type": "number"
        },
        "dTotDesc": {
            "description": "D06: Suma de los descuentos y bonificaciones concedidos sobre el valor total de la factura",
            "type": "number"
        },
        "dTotGravado": {
            "description": "D05: Suma total de monto gravado",
            "type": "number"
        },
        "dTotISC": {
            "description": "D04: Total del ISC",
            "type": "number"
        },
        "dTotITBMS": {
            "description": "D03: Total del ITBMS",
            "type": "number"
        },
        "dTotNeto": {
            "description": "D02: Suma de los precios antes de impuesto",
            "type": "number"
        },
        "dTotRec": {
            "description": "D10: Suma de los valores recibidos",
            "type": "number"
        },
        "dTotSeg": {
            "description": "D08: Valor del seguro cobrado en el precio total",
            "type": "number"
        },
        "dVTot": {
            "description": "D09: Valor total de la factura",
            "type": "number"
        },
        "dVTotItems": {
            "description": "D14: Suma total de los ítems con los montos de los impuestos",
            "type": "number"
        },
        "dVuelto": {
            "description": "D11: Vuelto entregado al cliente",
            "type": "number"
        },
        "gDescBonif": {
            "description": "Definición de tipo para el grupo:\nD20: Grupo de datos de que describen descuentos o bonificaciones adicionales aplicados a la factura",
            "items": {
                "$ref": "#/definitions/Bonificaciones"
            },
            "type": "array"
        },
        "gFormaPago": {
            "description": "Definición de tipo para el grupo:\nD30: Grupo de formas de pago de la factura",
            "items": {
                "$ref": "#/definitions/FormaPagoType"
            },
            "type": "array"
        },
        "gOTITotal": {
            "description": "D60:Grupo de Total Otras Tasas o Impuestos (OTI) del Item",
            "items": {
                "$ref": "#/definitions/OtrosImpuestosTasas"
            },
            "type": "array"
        },
        "gPagPlazo": {
            "description": "Definición de tipo para el grupo:\nD50: Grupo de informaciones de pago a plazo",
            "items": {
                "$ref": "#/definitions/VencimientoPago"
            },
            "type": "array"
        },
        "gRetenc": {
            "$ref": "#/definitions/Retencion",
            "description": "Definición de tipo para el grupo:\nD40: Grupo datos cuando a la factura aplican retenciones"
        },
        "iPzPag": {
            "$ref": "#/definitions/TiempoPago",
            "description": "D12: Tiempo de pago"
        }
    },
    "type": "object"
};
//# sourceMappingURL=Totales.js.map