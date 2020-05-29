export const DGenSchema =  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
        "AutorizadoDescargar": {
            "properties": {
                "gRucAutXML": {
                    "$ref": "#/definitions/RucType"
                }
            },
            "type": "object"
        },
        "CodigoUbicacionType": {
            "properties": {
                "dCodUbi": {
                    "type": "string"
                },
                "dCorreg": {
                    "type": "string"
                },
                "dDistr": {
                    "type": "string"
                },
                "dProv": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "Destino": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "Emisor": {
            "properties": {
                "dCoordEm": {
                    "type": "string"
                },
                "dCorElecEmi": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "dDirecEm": {
                    "type": "string"
                },
                "dNombEm": {
                    "type": "string"
                },
                "dSucEm": {
                    "type": "string"
                },
                "dTfnEm": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "gRucEmi": {
                    "$ref": "#/definitions/RucType"
                },
                "gUbiEm": {
                    "$ref": "#/definitions/CodigoUbicacionType"
                }
            },
            "type": "object"
        },
        "EntregaCafe": {
            "enum": [
                1,
                2,
                3
            ],
            "type": "number"
        },
        "EnvioContenedorFE": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "FormularioCafe": {
            "enum": [
                1,
                2,
                3
            ],
            "type": "number"
        },
        "IdExtType": {
            "properties": {
                "dIdExt": {
                    "type": "string"
                },
                "dPaisExt": {
                    "type": "string"
                }
            },
            "type": "object"
        },
        "Receptor": {
            "properties": {
                "cPaisRec": {
                    "description": "B411: País del receptor de la FE. Debe ser PAN(Panamá) si B15=1 (destino u origen de la operacion es Panamá)",
                    "type": "string"
                },
                "cPaisRecDesc": {
                    "description": "B411: País del receptor de la FE no existente en la tabla",
                    "type": "string"
                },
                "dCorElecRec": {
                    "description": "B409: Correo electrónico del receptor",
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "dDirecRec": {
                    "description": "B404: Dirección del receptor de la FE",
                    "type": "string"
                },
                "dNombRec": {
                    "description": "B403: Razón social (persona jurídica) o Nombre y Apellido (persona natural) del receptor de la FE",
                    "type": "string"
                },
                "dTfnRec": {
                    "description": "B408: Teléfono de contacto del receptor de la FE",
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "gIdExtType": {
                    "$ref": "#/definitions/IdExtType",
                    "description": "B406: Identificación de extranjeros"
                },
                "gRucRec": {
                    "$ref": "#/definitions/RucType",
                    "description": "402: RUC del Contribuyente Receptor"
                },
                "gUbiRec": {
                    "$ref": "#/definitions/CodigoUbicacionType",
                    "description": "B405: Codigo, Corregimiento, Distrito, Provincia donde se ubica el punto de facturación"
                },
                "iTipoRec": {
                    "$ref": "#/definitions/TipoReceptor",
                    "description": "ID: B401 - Identifica el tipo de receptor de la FE"
                }
            },
            "type": "object"
        },
        "RucType": {
            "properties": {
                "dDV": {
                    "type": "string"
                },
                "dRuc": {
                    "type": "string"
                },
                "dTipoRuc": {
                    "$ref": "#/definitions/TipoRuc"
                }
            },
            "type": "object"
        },
        "TipoAmbiente": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "TipoDocumento": {
            "enum": [
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09"
            ],
            "type": "string"
        },
        "TipoEmision": {
            "enum": [
                "01",
                "02",
                "03",
                "04"
            ],
            "type": "string"
        },
        "TipoGeneracion": {
            "enum": [
                1,
                2,
                3,
                4,
                5
            ],
            "type": "number"
        },
        "TipoNaturalezaOperacion": {
            "enum": [
                "01",
                "02",
                "10",
                "11",
                "12",
                "13",
                "14",
                "20",
                "21"
            ],
            "type": "string"
        },
        "TipoOperacion": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "TipoReceptor": {
            "enum": [
                "01",
                "02",
                "03",
                "04"
            ],
            "type": "string"
        },
        "TipoRuc": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "TipoSucursal": {
            "enum": [
                1,
                2
            ],
            "type": "number"
        },
        "TipoTransaccionVenta": {
            "enum": [
                1,
                2,
                3,
                4
            ],
            "type": "number"
        }
    },
    "properties": {
        "dEnvFe": {
            "$ref": "#/definitions/EnvioContenedorFE",
            "description": "*\n    B17: Envío del contenedor para el receptor"
        },
        "dFechaCont": {
            "description": "ID: B04 Fecha y hora de inicio de la operación en contingencia",
            "format": "date-time",
            "type": "string"
        },
        "dFechaEm": {
            "description": "B10: Fecha de emisión del documento",
            "format": "date-time",
            "type": "string"
        },
        "dFechaSalida": {
            "description": "B11: Fecha de salida de las mercancías. Informar cuando sea conocida",
            "format": "date-time",
            "type": "string"
        },
        "dIntEmFe": {
            "description": "B29: Informaciones de interés del emitente con respecto a la FE",
            "type": "string"
        },
        "dMotCont": {
            "description": "Razón de la operación en contingencia",
            "type": "string"
        },
        "dNroDF": {
            "description": "B07: Número del documento fiscal en la serie correspondiente, de 000000001 a 999999999, no siendo permitido el reinicio de la numeración.",
            "type": "string"
        },
        "dPtoFacDF": {
            "description": "B08: Punto de Facturación del documento fiscal. La serie sirve para permitir que existan secuencias independientes de numeración de facturas, con diversas finalidades, sea por libre elección del emisor, tales como puntos de facturación distintos (como cajas de un supermercado, o bodegas de un distribuidor), tipos de productos, especies de operación, etc., sea para finalidades que vengan  a ser determinadas por la DIRECCIÓN GENERAL DE INGRESOS.",
            "type": "string"
        },
        "dSeg": {
            "description": "B09: Codigo de seguridad.",
            "type": "string"
        },
        "gAutXML": {
            "items": {
                "$ref": "#/definitions/AutorizadoDescargar"
            },
            "type": "array"
        },
        "gDatRec": {
            "$ref": "#/definitions/Receptor",
            "description": "Receptor"
        },
        "gEmis": {
            "$ref": "#/definitions/Emisor",
            "description": "*\nEmisor"
        },
        "iAmb": {
            "$ref": "#/definitions/TipoAmbiente",
            "description": "Ambientes de destino de la FE"
        },
        "iDest": {
            "$ref": "#/definitions/Destino",
            "description": "B14: Destino u origen de la operación"
        },
        "iDoc": {
            "$ref": "#/definitions/TipoDocumento",
            "description": "ID: B06 - Tipo de documento"
        },
        "iEntCafe": {
            "$ref": "#/definitions/EntregaCafe",
            "description": "B16: Manera de entrega del CAFE al receptor"
        },
        "iFormCafe": {
            "$ref": "#/definitions/FormularioCafe",
            "description": "B15: Formato de generación del CAFE"
        },
        "iNatOp": {
            "$ref": "#/definitions/TipoNaturalezaOperacion",
            "description": "B12: Naturaleza de la Operación"
        },
        "iProGen": {
            "$ref": "#/definitions/TipoGeneracion",
            "description": "B18: Proceso de generación de la FE"
        },
        "iTipoOp": {
            "$ref": "#/definitions/TipoOperacion",
            "description": "B13: Tipo de la operación"
        },
        "iTipoSuc": {
            "$ref": "#/definitions/TipoSucursal",
            "description": "B20: Tipo de Sucursal"
        },
        "iTipoTranVenta": {
            "$ref": "#/definitions/TipoTransaccionVenta",
            "description": "B19: Tipo de transacción de venta"
        },
        "iTpEmis": {
            "$ref": "#/definitions/TipoEmision",
            "description": "Tipo de Emision"
        }
    },
    "type": "object"
}

