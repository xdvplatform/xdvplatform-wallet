export declare const ItemSchema: {
    $schema: string;
    definitions: {
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
        TasaISC: {
            enum: number[];
            type: string;
        };
        TasaITBMS: {
            enum: string[];
            type: string;
        };
    };
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
