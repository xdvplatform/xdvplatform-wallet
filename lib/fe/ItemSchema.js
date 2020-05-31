"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
exports.ItemSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "CodigoItem": {
            "properties": {
                "dCantComInvent": {
                    "type": "number"
                },
                "dCantGTINCom": {
                    "type": "number"
                },
                "dGTINCom": {
                    "type": "number"
                },
                "dGTINInv": {
                    "type": "number"
                }
            },
            "type": "object"
        },
        "ISC": {
            "properties": {
                "dTasaISC": {
                    "$ref": "#/definitions/TasaISC"
                },
                "dValISC": {
                    "type": "number"
                }
            },
            "type": "object"
        },
        "ITBMS": {
            "properties": {
                "dTasaITBMS": {
                    "$ref": "#/definitions/TasaITBMS"
                },
                "dValITBMS": {
                    "type": "number"
                }
            },
            "type": "object"
        },
        "Precio": {
            "properties": {
                "dPrAcarItem": {
                    "type": "number"
                },
                "dPrItem": {
                    "type": "number"
                },
                "dPrSegItem": {
                    "type": "number"
                },
                "dPrUnit": {
                    "type": "number"
                },
                "dPrUnitDesc": {
                    "type": "number"
                },
                "dValTotItem": {
                    "type": "number"
                }
            },
            "type": "object"
        },
        "TasaISC": {
            "enum": [
                0,
                0.035,
                0.05,
                0.06,
                0.1325,
                0.325
            ],
            "type": "number"
        },
        "TasaITBMS": {
            "enum": [
                "00",
                "01",
                "02",
                "03"
            ],
            "type": "string"
        }
    },
    "properties": {
        "cCantCodInt": {
            "description": "C06:Cantidad del producto o servicio en la unidad de medida del código interno",
            "type": "number"
        },
        "cUnidad": {
            "description": "C05:Unidad de medida del código interno",
            "type": "string"
        },
        "cUnidadCPBS": {
            "description": "C11:Unidad de medida en la Codificación Panameña de Bienes y Servicios",
            "type": "string"
        },
        "dCodCPBSabr": {
            "description": "C09:Código del Ítem en la Codificación Panameña de Bienes y Servicios Abreviada",
            "type": "string"
        },
        "dCodCPBScmp": {
            "description": "C10:Código del Ítem en la Codificación Panameña de Bienes y Servicios",
            "type": "string"
        },
        "dCodProd": {
            "description": "Codigo interno del item",
            "type": "string"
        },
        "dDescProd": {
            "description": "C03:Descripción del producto o servicio",
            "type": "string"
        },
        "dFechaCad": {
            "anyOf": [
                {
                    "description": "Enables basic storage and retrieval of dates and times.",
                    "format": "date-time",
                    "type": "string"
                },
                {
                    "type": "string"
                }
            ]
        },
        "dFechaFab": {
            "anyOf": [
                {
                    "description": "Enables basic storage and retrieval of dates and times.",
                    "format": "date-time",
                    "type": "string"
                },
                {
                    "type": "string"
                }
            ],
            "description": "C07:Fecha de fabricación/elaboración"
        },
        "dInfEmFE": {
            "description": "C19:Informaciones de interés del emitente con respeto a un ítem de la FE",
            "type": "string"
        },
        "dSecItem": {
            "type": "number"
        },
        "gCodItem": {
            "$ref": "#/definitions/CodigoItem"
        },
        "gISCItem": {
            "$ref": "#/definitions/ISC"
        },
        "gITBMSItem": {
            "$ref": "#/definitions/ITBMS"
        },
        "gPrecios": {
            "$ref": "#/definitions/Precio"
        }
    },
    "type": "object"
};
//# sourceMappingURL=ItemSchema.js.map