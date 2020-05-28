export declare const TotalesSchema: {
    $schema: string;
    definitions: {
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
        CodigoRetencion: {
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
        TiempoPago: {
            enum: number[];
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
