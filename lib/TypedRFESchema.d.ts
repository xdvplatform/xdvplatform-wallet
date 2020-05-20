export declare const TypedRFESchema: {
    $schema: string;
    definitions: {
        AutorizadoDescargar: {
            properties: {
                gRucAutXML: {
                    $ref: string;
                };
            };
            type: string;
        };
        Bonificaciones: {
            properties: {
                dDetalDesc: {
                    description: string;
                    type: string;
                };
                dValDesc: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        CodigoItem: {
            properties: {
                dCantComInvent: {
                    type: string;
                };
                dCantGTINCom: {
                    type: string;
                };
                dGTINCom: {
                    type: string;
                };
                dGTINInv: {
                    type: string;
                };
            };
            type: string;
        };
        CodigoRetencion: {
            enum: number[];
            type: string;
        };
        CodigoUbicacionType: {
            properties: {
                dCodUbi: {
                    type: string;
                };
                dCorreg: {
                    type: string;
                };
                dDistr: {
                    type: string;
                };
                dProv: {
                    type: string;
                };
            };
            type: string;
        };
        DGen: {
            properties: {
                dEnvFe: {
                    $ref: string;
                    description: string;
                };
                dFechaCont: {
                    description: string;
                    format: string;
                    type: string;
                };
                dFechaEm: {
                    description: string;
                    format: string;
                    type: string;
                };
                dFechaSalida: {
                    description: string;
                    format: string;
                    type: string;
                };
                dIntEmFe: {
                    description: string;
                    type: string;
                };
                dMotCont: {
                    description: string;
                    type: string;
                };
                dNroDF: {
                    description: string;
                    type: string;
                };
                dPtoFacDF: {
                    description: string;
                    type: string;
                };
                dSeg: {
                    description: string;
                    type: string;
                };
                gAutXML: {
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                gDatRec: {
                    $ref: string;
                    description: string;
                };
                gEmis: {
                    $ref: string;
                    description: string;
                };
                iAmb: {
                    $ref: string;
                    description: string;
                };
                iDest: {
                    $ref: string;
                    description: string;
                };
                iDoc: {
                    $ref: string;
                    description: string;
                };
                iEntCafe: {
                    $ref: string;
                    description: string;
                };
                iFormCafe: {
                    $ref: string;
                    description: string;
                };
                iNatOp: {
                    $ref: string;
                    description: string;
                };
                iProGen: {
                    $ref: string;
                    description: string;
                };
                iTipoOp: {
                    $ref: string;
                    description: string;
                };
                iTipoSuc: {
                    $ref: string;
                    description: string;
                };
                iTipoTranVenta: {
                    $ref: string;
                    description: string;
                };
                iTpEmis: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        Destino: {
            enum: number[];
            type: string;
        };
        Emisor: {
            properties: {
                dCoordEm: {
                    type: string;
                };
                dCorElecEmi: {
                    items: {
                        type: string;
                    };
                    type: string;
                };
                dDirecEm: {
                    type: string;
                };
                dNombEm: {
                    type: string;
                };
                dSucEm: {
                    type: string;
                };
                dTfnEm: {
                    items: {
                        type: string;
                    };
                    type: string;
                };
                gRucEmi: {
                    $ref: string;
                };
                gUbiEm: {
                    $ref: string;
                };
            };
            type: string;
        };
        EntregaCafe: {
            enum: number[];
            type: string;
        };
        EnvioContenedorFE: {
            enum: number[];
            type: string;
        };
        FormaPago: {
            enum: string[];
            type: string;
        };
        FormaPagoType: {
            properties: {
                dFormaPagoDesc: {
                    description: string;
                    type: string;
                };
                dVlrCuota: {
                    description: string;
                    type: string;
                };
                iFormaPago: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        FormularioCafe: {
            enum: number[];
            type: string;
        };
        ISC: {
            properties: {
                dTasaISC: {
                    $ref: string;
                };
                dValISC: {
                    type: string;
                };
            };
            type: string;
        };
        ITBMS: {
            properties: {
                dTasaITBMS: {
                    $ref: string;
                };
                dValITBMS: {
                    type: string;
                };
            };
            type: string;
        };
        IdExtType: {
            properties: {
                dIdExt: {
                    type: string;
                };
                dPaisExt: {
                    type: string;
                };
            };
            type: string;
        };
        Item: {
            properties: {
                cCantCodInt: {
                    description: string;
                    type: string;
                };
                cUnidad: {
                    description: string;
                    type: string;
                };
                cUnidadCPBS: {
                    description: string;
                    type: string;
                };
                dCodCPBSabr: {
                    description: string;
                    type: string;
                };
                dCodCPBScmp: {
                    description: string;
                    type: string;
                };
                dCodProd: {
                    description: string;
                    type: string;
                };
                dDescProd: {
                    description: string;
                    type: string;
                };
                dFechaCad: {
                    anyOf: ({
                        description: string;
                        format: string;
                        type: string;
                    } | {
                        type: string;
                        description?: undefined;
                        format?: undefined;
                    })[];
                };
                dFechaFab: {
                    anyOf: ({
                        description: string;
                        format: string;
                        type: string;
                    } | {
                        type: string;
                        description?: undefined;
                        format?: undefined;
                    })[];
                    description: string;
                };
                dInfEmFE: {
                    description: string;
                    type: string;
                };
                dSecItem: {
                    type: string;
                };
                gCodItem: {
                    $ref: string;
                };
                gISCItem: {
                    $ref: string;
                };
                gITBMSItem: {
                    $ref: string;
                };
                gPrecios: {
                    $ref: string;
                };
            };
            type: string;
        };
        OtrosImpuestos: {
            enum: number[];
            type: string;
        };
        OtrosImpuestosTasas: {
            properties: {
                dCodOTITotal: {
                    $ref: string;
                    description: string;
                };
                dValOTITotal: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        Precio: {
            properties: {
                dPrAcarItem: {
                    type: string;
                };
                dPrItem: {
                    type: string;
                };
                dPrSegItem: {
                    type: string;
                };
                dPrUnit: {
                    type: string;
                };
                dPrUnitDesc: {
                    type: string;
                };
                dValTotItem: {
                    type: string;
                };
            };
            type: string;
        };
        Receptor: {
            properties: {
                cPaisRec: {
                    description: string;
                    type: string;
                };
                cPaisRecDesc: {
                    description: string;
                    type: string;
                };
                dCorElecRec: {
                    description: string;
                    items: {
                        type: string;
                    };
                    type: string;
                };
                dDirecRec: {
                    description: string;
                    type: string;
                };
                dNombRec: {
                    description: string;
                    type: string;
                };
                dTfnRec: {
                    description: string;
                    items: {
                        type: string;
                    };
                    type: string;
                };
                gIdExtType: {
                    $ref: string;
                    description: string;
                };
                gRucRec: {
                    $ref: string;
                    description: string;
                };
                gUbiRec: {
                    $ref: string;
                    description: string;
                };
                iTipoRec: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        Retencion: {
            properties: {
                cCodRetenc: {
                    $ref: string;
                    description: string;
                };
                cValRetenc: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
        RucType: {
            properties: {
                dDV: {
                    type: string;
                };
                dRuc: {
                    type: string;
                };
                dTipoRuc: {
                    $ref: string;
                };
            };
            type: string;
        };
        TasaISC: {
            enum: number[];
            type: string;
        };
        TasaITBMS: {
            enum: string[];
            type: string;
        };
        TiempoPago: {
            enum: number[];
            type: string;
        };
        TipoAmbiente: {
            enum: number[];
            type: string;
        };
        TipoDocumento: {
            enum: string[];
            type: string;
        };
        TipoEmision: {
            enum: string[];
            type: string;
        };
        TipoGeneracion: {
            enum: number[];
            type: string;
        };
        TipoNaturalezaOperacion: {
            enum: string[];
            type: string;
        };
        TipoOperacion: {
            enum: number[];
            type: string;
        };
        TipoReceptor: {
            enum: string[];
            type: string;
        };
        TipoRuc: {
            enum: number[];
            type: string;
        };
        TipoSucursal: {
            enum: number[];
            type: string;
        };
        TipoTransaccionVenta: {
            enum: number[];
            type: string;
        };
        Totales: {
            properties: {
                dNroItems: {
                    description: string;
                    type: string;
                };
                dTotAcar: {
                    description: string;
                    type: string;
                };
                dTotDesc: {
                    description: string;
                    type: string;
                };
                dTotGravado: {
                    description: string;
                    type: string;
                };
                dTotISC: {
                    description: string;
                    type: string;
                };
                dTotITBMS: {
                    description: string;
                    type: string;
                };
                dTotNeto: {
                    description: string;
                    type: string;
                };
                dTotRec: {
                    description: string;
                    type: string;
                };
                dTotSeg: {
                    description: string;
                    type: string;
                };
                dVTot: {
                    description: string;
                    type: string;
                };
                dVTotItems: {
                    description: string;
                    type: string;
                };
                dVuelto: {
                    description: string;
                    type: string;
                };
                gDescBonif: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                gFormaPago: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                gOTITotal: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                gPagPlazo: {
                    description: string;
                    items: {
                        $ref: string;
                    };
                    type: string;
                };
                gRetenc: {
                    $ref: string;
                    description: string;
                };
                iPzPag: {
                    $ref: string;
                    description: string;
                };
            };
            type: string;
        };
        VencimientoPago: {
            properties: {
                dFecItPlazo: {
                    description: string;
                    format: string;
                    type: string;
                };
                dInfPagPlazo: {
                    description: string;
                    type: string;
                };
                dSecItem: {
                    description: string;
                    type: string;
                };
                dValItPlazo: {
                    description: string;
                    type: string;
                };
            };
            type: string;
        };
    };
    properties: {
        dId: {
            type: string;
        };
        dVerForm: {
            type: string;
        };
        gDGen: {
            $ref: string;
        };
        gItem: {
            description: string;
            items: {
                $ref: string;
            };
            type: string;
        };
        gTot: {
            $ref: string;
            description: string;
        };
    };
    type: string;
};
