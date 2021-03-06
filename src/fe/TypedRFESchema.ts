export const TypedRFESchema = {
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
        "DGen": {
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
        "FormularioCafe": {
            "enum": [
                1,
                2,
                3
            ],
            "type": "number"
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
        "Item": {
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
        },
        "TiempoPago": {
            "enum": [
                1,
                2,
                3
            ],
            "type": "number"
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
        },
        "Totales": {
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
        "dId": {
            "type": "string"
        },
        "dVerForm": {
            "type": "number"
        },
        "gDGen": {
            "$ref": "#/definitions/DGen"
        },
        "gItem": {
            "description": "C01: Grupo de datos que especifica cada ítem del detalle de la transacción",
            "items": {
                "$ref": "#/definitions/Item"
            },
            "type": "array"
        },
        "gTot": {
            "$ref": "#/definitions/Totales",
            "description": "C01: Grupo de datos que especifica cada ítem del detalle de la transacción"
        }
    },
    "type": "object"
}

