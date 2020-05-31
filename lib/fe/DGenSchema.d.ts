export declare const DGenSchema: {
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
        FormularioCafe: {
            enum: number[];
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
    };
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
