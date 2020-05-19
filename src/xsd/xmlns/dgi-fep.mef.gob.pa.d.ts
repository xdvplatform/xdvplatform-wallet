import * as Primitive from './xml-primitives';

// Source files:
// http://localhost:8080/FE_Flat_v1.00.xsd


interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _cCodUbicType extends BaseType {
	dCorreg: string;
	dDistr: string;
	dProv: string;
}
export interface cCodUbicType extends _cCodUbicType { constructor: { new(): cCodUbicType }; }
export var cCodUbicType: { new(): cCodUbicType };

type cCodUbicTypeDCorregType = string;
type _cCodUbicTypeDCorregType = Primitive._string;

type cCodUbicTypeDDistrType = string;
type _cCodUbicTypeDDistrType = Primitive._string;

type cCodUbicTypeDProvType = string;
type _cCodUbicTypeDProvType = Primitive._string;

export type emailType = string;
type _emailType = Primitive._string;

export type Fecha_num = number;
type _Fecha_num = Primitive._number;

export type fechaTZ = Date;
type _fechaTZ = Primitive._Date;

export type fechaYMD = Date;
type _fechaYMD = Primitive._Date;

interface _gDatRecType extends BaseType {
	/** B409: Correo electrónico del receptor */
	dCorElectRec?: string[];
	/** B404: Dirección del receptor de la FE */
	dDirecRec?: string;
	/** B403: Razón social (persona jurídica) o Nombre y Apellido (persona natural) del receptor de la FE */
	dNombRec?: string;
	/** B411: País del receptor de la FE no existente en la tabla */
	dPaisRecDesc?: string;
	/** B408: Teléfono de contacto del receptor de la FE */
	dTfnRec?: string[];
	/** B406: Identificación de extranjeros */
	gIdExt?: gIdExtType;
	/** 402: RUC del Contribuyente Receptor */
	gRucRec?: RucRecType;
	/** B405: Codigo, Corregimiento, Distrito, Provincia donde se ubica el punto de facturación */
	gUbiRec?: cCodUbicType;
	/** ID: B401 - Identifica el tipo de receptor de la FE */
	iTipoRec: gDatRecTypeITipoRecType;
}
export interface gDatRecType extends _gDatRecType { constructor: { new(): gDatRecType }; }
export var gDatRecType: { new(): gDatRecType };

type gDatRecTypeDDirecRecType = string;
type _gDatRecTypeDDirecRecType = Primitive._string;

type gDatRecTypeDNombRecType = string;
type _gDatRecTypeDNombRecType = Primitive._string;

type gDatRecTypeDPaisRecDescType = string;
type _gDatRecTypeDPaisRecDescType = Primitive._string;

type gDatRecTypeITipoRecType = ("01" | "02" | "03" | "04");
interface _gDatRecTypeITipoRecType extends Primitive._string { content: gDatRecTypeITipoRecType; }

interface _gDFRefType extends BaseType {
	/** B603: Fecha de emisión del Documento Fiscal Referenciado */
	dFechaDFRef: Date;
	/** B602: Razón Social (Persona Jurídica) o Nombre y Apellido (Persona Natural) del emisor del documento fiscal referenciado */
	dNombEmRef: string;
	/** B604: Información de Referencia de la FE */
	gDFRefNum: gDFRefTypeGDFRefNumType;
	/** B601: RUC del emisor del documento fiscal referenciado */
	gRucEmDFRef: RucType;
}
export interface gDFRefType extends _gDFRefType { constructor: { new(): gDFRefType }; }
export var gDFRefType: { new(): gDFRefType };

type gDFRefTypeDNombEmRefType = string;
type _gDFRefTypeDNombEmRefType = Primitive._string;

interface _gDFRefTypeGDFRefNumType extends BaseType {
	/** B620: Infomración de Referencia a factura en papel */
	gDFRefFacIE: gDFRefTypeGDFRefNumTypeGDFRefFacIEType;
	/** B615: Información de Referencia a factura en papel */
	gDFRefFacPap: gDFRefTypeGDFRefNumTypeGDFRefFacPapType;
	/** B605: Infomracion de Referencia de la FE */
	gDFRefFE: gDFRefTypeGDFRefNumTypeGDFRefFEType;
}
interface gDFRefTypeGDFRefNumType extends _gDFRefTypeGDFRefNumType { constructor: { new(): gDFRefTypeGDFRefNumType }; }

interface _gDFRefTypeGDFRefNumTypeGDFRefFacIEType extends BaseType {
	/** B621: Número de factura emitida por impresora fiscal */
	dNroFacIE: string;
}
interface gDFRefTypeGDFRefNumTypeGDFRefFacIEType extends _gDFRefTypeGDFRefNumTypeGDFRefFacIEType { constructor: { new(): gDFRefTypeGDFRefNumTypeGDFRefFacIEType }; }

type gDFRefTypeGDFRefNumTypeGDFRefFacIETypeDNroFacIEType = string;
type _gDFRefTypeGDFRefNumTypeGDFRefFacIETypeDNroFacIEType = Primitive._string;

interface _gDFRefTypeGDFRefNumTypeGDFRefFacPapType extends BaseType {
	/** B616: Número de factura en papel */
	dNroFacPap: string;
}
interface gDFRefTypeGDFRefNumTypeGDFRefFacPapType extends _gDFRefTypeGDFRefNumTypeGDFRefFacPapType { constructor: { new(): gDFRefTypeGDFRefNumTypeGDFRefFacPapType }; }

type gDFRefTypeGDFRefNumTypeGDFRefFacPapTypeDNroFacPapType = string;
type _gDFRefTypeGDFRefNumTypeGDFRefFacPapTypeDNroFacPapType = Primitive._string;

interface _gDFRefTypeGDFRefNumTypeGDFRefFEType extends BaseType {
	/** B606: CUFE de FE referenciada */
	dCUFERef: string;
}
interface gDFRefTypeGDFRefNumTypeGDFRefFEType extends _gDFRefTypeGDFRefNumTypeGDFRefFEType { constructor: { new(): gDFRefTypeGDFRefNumTypeGDFRefFEType }; }

type gDFRefTypeGDFRefNumTypeGDFRefFETypeDCUFERefType = string;
type _gDFRefTypeGDFRefNumTypeGDFRefFETypeDCUFERefType = Primitive._string;

interface _gDGenType extends BaseType {
	/** B17: Envío del contenedor para el receptor */
	dEnvFE: gDGenTypeDEnvFEType;
	/** ID: B04 Fecha y hora de inicio de la operación en contingencia */
	dFechaCont?: Date;
	/** B10: Fecha de emisión del documento */
	dFechaEm: Date;
	/** B11: Fecha de salida de las mercancías. Informar cuando sea conocida */
	dFechaSalida?: Date;
	/** B29: Informaciones de interés del emitente con respecto a la FE */
	dInfEmFE?: string;
	dMotCont?: string;
	/** B07: Número del documento fiscal en la serie correspondiente, de 000000001 a 999999999, no siendo permitido el reinicio de la numeración. */
	dNroDF: string;
	/** B08: Punto de Facturación del documento fiscal. La serie sirve para permitir que existan secuencias independientes de numeración de facturas, con diversas finalidades, sea por libre elección del emisor, tales como puntos de facturación distintos (como cajas de un supermercado, o bodegas de un distribuidor), tipos de productos, especies de operación, etc., sea para finalidades que vengan  a ser determinadas por la DIRECCIÓN GENERAL DE INGRESOS. */
	dPtoFacDF: string;
	/** B09: Codigo de seguridad. */
	dSeg: string;
	/** B70: Grupo de datos que identifican al autorizado a descargar */
	gAutXML?: gDGenTypeGAutXMLType[];
	/** B40: Grupo de datos que identifican al receptor */
	gDatRec: gDatRecType;
	/** B60: Información de documento fiscal referenciado */
	gDFRef?: gDFRefType[];
	/** B30: Grupo de datos que identifican al emisor */
	gEmis: gEmisType;
	/** B50: Grupo de datos de facturas en caso de exportación */
	gFExp?: gFExpType;
	iAmb: gDGenTypeIAmbType;
	/** B14: Destino u origen de la operación */
	iDest: gDGenTypeIDestType;
	/** ID: B06 - Tipo de documento */
	iDoc: gDGenTypeIDocType;
	/** B16: Manera de entrea del CAFE al receptor */
	iEntCAFE: gDGenTypeIEntCAFEType;
	/** B15: Formato de generación del CAFE */
	iFormCAFE: gDGenTypeIFormCAFEType;
	/** B12: Naturaleza de la Operación */
	iNatOp: gDGenTypeINatOpType;
	/** B18: Proceso de generación de la FE */
	iProGen: gDGenTypeIProGenType;
	/** B13: Tipo de la operación */
	iTipoOp: gDGenTypeITipoOpType;
	/** B20: Tipo de Sucursal */
	iTipoSuc?: gDGenTypeITipoSucType;
	/** B19: Tipo de transacción de venta */
	iTipoTranVenta?: gDGenTypeITipoTranVentaType;
	iTpEmis: gDGenTypeITpEmisType;
}
export interface gDGenType extends _gDGenType { constructor: { new(): gDGenType }; }
export var gDGenType: { new(): gDGenType };

type gDGenTypeDEnvFEType = ("1" | "2");
interface _gDGenTypeDEnvFEType extends Primitive._number { content: gDGenTypeDEnvFEType; }

type gDGenTypeDInfEmFEType = string;
type _gDGenTypeDInfEmFEType = Primitive._string;

type gDGenTypeDMotContType = string;
type _gDGenTypeDMotContType = Primitive._string;

type gDGenTypeDNroDFType = string;
type _gDGenTypeDNroDFType = Primitive._string;

type gDGenTypeDPtoFacDFType = string;
type _gDGenTypeDPtoFacDFType = Primitive._string;

type gDGenTypeDSegType = string;
type _gDGenTypeDSegType = Primitive._string;

interface _gDGenTypeGAutXMLType extends BaseType {
	/** B701: RUC del autorizado a descargar */
	gRucAutXML: RucType;
}
interface gDGenTypeGAutXMLType extends _gDGenTypeGAutXMLType { constructor: { new(): gDGenTypeGAutXMLType }; }

type gDGenTypeIAmbType = ("1" | "2");
interface _gDGenTypeIAmbType extends Primitive._number { content: gDGenTypeIAmbType; }

type gDGenTypeIDestType = ("1" | "2");
interface _gDGenTypeIDestType extends Primitive._number { content: gDGenTypeIDestType; }

type gDGenTypeIDocType = ("01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09");
interface _gDGenTypeIDocType extends Primitive._string { content: gDGenTypeIDocType; }

type gDGenTypeIEntCAFEType = ("1" | "2" | "3");
interface _gDGenTypeIEntCAFEType extends Primitive._number { content: gDGenTypeIEntCAFEType; }

type gDGenTypeIFormCAFEType = ("1" | "2" | "3");
interface _gDGenTypeIFormCAFEType extends Primitive._number { content: gDGenTypeIFormCAFEType; }

type gDGenTypeINatOpType = ("01" | "02" | "10" | "11" | "12" | "13" | "14" | "20" | "21");
interface _gDGenTypeINatOpType extends Primitive._string { content: gDGenTypeINatOpType; }

type gDGenTypeIProGenType = ("1" | "2" | "3" | "4");
interface _gDGenTypeIProGenType extends Primitive._number { content: gDGenTypeIProGenType; }

type gDGenTypeITipoOpType = ("1" | "2");
interface _gDGenTypeITipoOpType extends Primitive._number { content: gDGenTypeITipoOpType; }

type gDGenTypeITipoSucType = ("1" | "2");
interface _gDGenTypeITipoSucType extends Primitive._number { content: gDGenTypeITipoSucType; }

type gDGenTypeITipoTranVentaType = ("1" | "2" | "3" | "4");
interface _gDGenTypeITipoTranVentaType extends Primitive._number { content: gDGenTypeITipoTranVentaType; }

type gDGenTypeITpEmisType = ("01" | "02" | "03" | "04");
interface _gDGenTypeITpEmisType extends Primitive._string { content: gDGenTypeITpEmisType; }

interface _gEmisType extends BaseType {
	/** B304: Coordenadas geográficas de la sucursal donde se ubica el punto de facturación */
	dCoordEm: string;
	/** B310: Correo electrónico del emisor */
	dCorElectEmi?: string[];
	/** B305: Dirección de la sucursal emisora, o de la persona física emisora */
	dDirecEm: string;
	/** B302: Razón Social (persona jurídica) o Nombre y Apellido (persona natural) del emisor de la FE */
	dNombEm: string;
	/** B303: Código de la sucursal desde donde se emite la factura */
	dSucEm: string;
	/** B309: Teléfono de contacto de la sucursal emisora o de la persona emisora */
	dTfnEm: string[];
	/** B301: Tipo, RUC y DV del Contribuyente Emisor */
	gRucEmi: RucType;
	/** B306: Codigo, Corregimiento, Distrito, Provincia donde se ubica el punto de facturación */
	gUbiEm: cCodUbicType;
}
export interface gEmisType extends _gEmisType { constructor: { new(): gEmisType }; }
export var gEmisType: { new(): gEmisType };

type gEmisTypeDCoordEmType = string;
type _gEmisTypeDCoordEmType = Primitive._string;

type gEmisTypeDDirecEmType = string;
type _gEmisTypeDDirecEmType = Primitive._string;

type gEmisTypeDNombEmType = string;
type _gEmisTypeDNombEmType = Primitive._string;

type gEmisTypeDSucEmType = string;
type _gEmisTypeDSucEmType = Primitive._string;

interface _gFExpType extends BaseType {
	/** B503: Moneda de la operación de exportación no existe en la tabla monedas */
	cMonedaDesc?: string;
	/** B504: Tipo de cambio a la fecha de la operación */
	dCambio?: number;
	/** B506: Puerto de embarque de la mercacía */
	dPuertoEmbarq?: string;
	/** B505: Monto en la moneda extranjera */
	dVTotEst?: number;
}
export interface gFExpType extends _gFExpType { constructor: { new(): gFExpType }; }
export var gFExpType: { new(): gFExpType };

type gFExpTypeCMonedaDescType = string;
type _gFExpTypeCMonedaDescType = Primitive._string;

type gFExpTypeDCambioType = number;
type _gFExpTypeDCambioType = Primitive._number;

type gFExpTypeDPuertoEmbarqType = string;
type _gFExpTypeDPuertoEmbarqType = Primitive._string;

type gFExpTypeDVTotEstType = number;
type _gFExpTypeDVTotEstType = Primitive._number;

export type gGtinType = number;
type _gGtinType = Primitive._number;

interface _gIdExtType extends BaseType {
	dIdExt: string;
	dPaisExt?: string;
}
export interface gIdExtType extends _gIdExtType { constructor: { new(): gIdExtType }; }
export var gIdExtType: { new(): gIdExtType };

type gIdExtTypeDIdExtType = string;
type _gIdExtTypeDIdExtType = Primitive._string;

type gIdExtTypeDPaisExtType = string;
type _gIdExtTypeDPaisExtType = Primitive._string;

/** Definición de tipo para el grupo:
  * F20: Grupo de informaciones de logística */
interface _gInfoLogType extends BaseType {
	/** F249: Informaciones de interés del emitente con respeto a logística */
	dInfEmLog?: string;
	/** F204: Licencia del vehículo de carga */
	dLicCamion?: string;
	/** F205: Nombre o Razón social del transportista */
	dNomTransp: string;
	/** F201: Número de volúmenes */
	dNroVols?: number;
	/** F202: Peso total de la carga */
	dPesoTot?: number;
	/** F203: Unidad del peso total */
	dUnPesoTot?: gInfoLogTypeDUnPesoTotType;
	/** F206: RUC del Transportista */
	gRucTransp: RucType;
}
export interface gInfoLogType extends _gInfoLogType { constructor: { new(): gInfoLogType }; }
export var gInfoLogType: { new(): gInfoLogType };

type gInfoLogTypeDInfEmLogType = string;
type _gInfoLogTypeDInfEmLogType = Primitive._string;

type gInfoLogTypeDLicCamionType = string;
type _gInfoLogTypeDLicCamionType = Primitive._string;

type gInfoLogTypeDNomTranspType = string;
type _gInfoLogTypeDNomTranspType = Primitive._string;

type gInfoLogTypeDNroVolsType = number;
type _gInfoLogTypeDNroVolsType = Primitive._number;

type gInfoLogTypeDPesoTotType = number;
type _gInfoLogTypeDPesoTotType = Primitive._number;

type gInfoLogTypeDUnPesoTotType = ("1" | "2" | "3" | "4");
interface _gInfoLogTypeDUnPesoTotType extends Primitive._number { content: gInfoLogTypeDUnPesoTotType; }

/** Definición de tipo para el grupo:
  * C01: Grupo de Campos Fuera de la Firma Digital de la FE */
interface _gItemType extends BaseType {
	/** C06:Cantidad del producto o servicio en la unidad de medida del código interno */
	dCantCodInt: number;
	/** C04:Código interno del Ítem */
	dCodProd?: string;
	/** C03:Descripción del producto o servicio */
	dDescProd: string;
	/** C08:Fecha de caducidad */
	dFechaCad?: Date;
	/** C07:Fecha de fabricación/elaboración */
	dFechaFab?: Date;
	/** C19:Informaciones de interés del emitente con respeto a un ítem de la FE */
	dInfEmFE?: string;
	/** C02:Número secuencial del ítem */
	dSecItem: number;
	gCodItem?: gItemTypeGCodItemType;
	/** C50:Grupo de ISC del ítem */
	gISCItem?: gItemTypeGISCItemType;
	/** C40:Grupo de ITBMS del ítem */
	gITBMSItem: gItemTypeGITBMSItemType;
	/** E10: Grupo de detalle de medicinas y materias primas farmacéuticas */
	gMedicina?: gMedicinaType;
	/** C60:Grupo de Otras Tasas o Impuestos (OTI) del ítem */
	gOTIItem?: gItemTypeGOTIItemType[];
	/** E15: Grupo de detalle de Pedido Comercial de ítem */
	gPedComIr?: gPedComIrType;
	/** C20:Grupo de precios del ítem */
	gPrecios: gItemTypeGPreciosType;
	/** E05: Grupo de detalle de vehículos nuevos */
	gVehicNuevo?: gVehicNuevoType;
}
export interface gItemType extends _gItemType { constructor: { new(): gItemType }; }
export var gItemType: { new(): gItemType };

type gItemTypeDCodProdType = string;
type _gItemTypeDCodProdType = Primitive._string;

type gItemTypeDDescProdType = string;
type _gItemTypeDDescProdType = Primitive._string;

type gItemTypeDInfEmFEType = string;
type _gItemTypeDInfEmFEType = Primitive._string;

type gItemTypeDSecItemType = number;
type _gItemTypeDSecItemType = Primitive._number;

interface _gItemTypeGCodItemType extends BaseType {
	/** C304:Cantidad del producto o servicio en el Código GTIN del ítem de inventario */
	dCantComInvent: number;
	/** C302:Cantidad del producto o servicio en el Código GTIN del ítem de comercialización */
	dCantGTINCom: number;
	/** C301:Código GTIN del ítem, para la unidad de comercialización */
	dGTINCom: number;
	/** C303:Código GTIN del ítem, para la unidad de inventario */
	dGTINInv: number;
}
interface gItemTypeGCodItemType extends _gItemTypeGCodItemType { constructor: { new(): gItemTypeGCodItemType }; }

interface _gItemTypeGISCItemType extends BaseType {
	/** C501:Tasa del ISC aplicable al ítem */
	dTasaISC?: gItemTypeGISCItemTypeDTasaISCType;
	/** C502:Monto del ISC del ítem */
	dValISC: number;
}
interface gItemTypeGISCItemType extends _gItemTypeGISCItemType { constructor: { new(): gItemTypeGISCItemType }; }

type gItemTypeGISCItemTypeDTasaISCType = ("0.05" | "0.06" | "0.00" | "0.1325" | "0.325" | "0.035" | "0.00");
interface _gItemTypeGISCItemTypeDTasaISCType extends Primitive._number { content: gItemTypeGISCItemTypeDTasaISCType; }

interface _gItemTypeGITBMSItemType extends BaseType {
	/** C401:Tasa del ITBMS aplicable al ítem */
	dTasaITBMS: gItemTypeGITBMSItemTypeDTasaITBMSType;
	/** C402:Monto del ITBMS del ítem */
	dValITBMS: number;
}
interface gItemTypeGITBMSItemType extends _gItemTypeGITBMSItemType { constructor: { new(): gItemTypeGITBMSItemType }; }

type gItemTypeGITBMSItemTypeDTasaITBMSType = ("00" | "01" | "02" | "03");
interface _gItemTypeGITBMSItemTypeDTasaITBMSType extends Primitive._string { content: gItemTypeGITBMSItemTypeDTasaITBMSType; }

interface _gItemTypeGOTIItemType extends BaseType {
	/** C601:Código de Otras Tasas o Impuesto del ítem */
	dCodOTI: gItemTypeGOTIItemTypeDCodOTIType;
	/** C602:Monto de Otras Tasas o Impuesto del ítem */
	dValOTI: number;
}
interface gItemTypeGOTIItemType extends _gItemTypeGOTIItemType { constructor: { new(): gItemTypeGOTIItemType }; }

type gItemTypeGOTIItemTypeDCodOTIType = ("01" | "02");
interface _gItemTypeGOTIItemTypeDCodOTIType extends Primitive._string { content: gItemTypeGOTIItemTypeDCodOTIType; }

interface _gItemTypeGPreciosType extends BaseType {
	/** C204:Precio del acarreo, para este ítem específico */
	dPrAcarItem?: number;
	/** C203:Precio del ítem */
	dPrItem: number;
	/** C205:Precio del seguro, para este ítem específico */
	dPrSegItem?: number;
	/** C201:Precio unitario de la transferencia del bien o servicio */
	dPrUnit: number;
	/** C202:Descuento en el precio del ítem */
	dPrUnitDesc?: number;
	/** C206:Suma del precio del ítem con los montos de los impuestos */
	dValTotItem: number;
}
interface gItemTypeGPreciosType extends _gItemTypeGPreciosType { constructor: { new(): gItemTypeGPreciosType }; }

/** Definición de tipo para el grupo:
  * F25: Grupo de datos que identifican el local de la entrega */
interface _gLcEntrType extends BaseType {
	/** F253: Dirección del local de la entrega */
	dDirecLcEntr: string;
	/** F252: Razón Social (Persona Jurídica) o Nombre y Apellido (Persona Natural) del local de la entrega */
	dNombLcEntr: string;
	/** F257: Teléfono de contacto adicional, o alterno del local de la entrega */
	dTfnAdLcEntr?: string;
	/** F256: Teléfono de contacto del local de la entrega */
	dTfnLcEntr?: string;
	/** F251: RUC del Contribuyente emisor */
	gRucLcEntr?: RucType;
	/** F254: Grupo que contiene o agrupo un código, corregimiento, distrito, provincia.
	  * Este campo es nuevo y se solicita incorporarlo en la Ficha Técnica. */
	gUbiLcEntr: cCodUbicType;
}
export interface gLcEntrType extends _gLcEntrType { constructor: { new(): gLcEntrType }; }
export var gLcEntrType: { new(): gLcEntrType };

type gLcEntrTypeDDirecLcEntrType = string;
type _gLcEntrTypeDDirecLcEntrType = Primitive._string;

type gLcEntrTypeDNombLcEntrType = string;
type _gLcEntrTypeDNombLcEntrType = Primitive._string;

interface _gMedicinaType extends BaseType {
	/** E102:Cantidad de productos en el lote de medicinas y materias primas farmacéuticas */
	dCtLote: number;
	/** E101:Número de lote de medicinas y materias primas farmacéuticas */
	dNroLote: string;
}
export interface gMedicinaType extends _gMedicinaType { constructor: { new(): gMedicinaType }; }
export var gMedicinaType: { new(): gMedicinaType };

type gMedicinaTypeDNroLoteType = string;
type _gMedicinaTypeDNroLoteType = Primitive._string;

/** Definición de tipo para el grupo:
  * G10: Grupo de Campos Fuera de la Firma Digital de la FE */
interface _gNoFirmType extends BaseType {
	/** G101: String correspondiente al QR code impreso en el CIFE */
	dQRCode: string;
}
export interface gNoFirmType extends _gNoFirmType { constructor: { new(): gNoFirmType }; }
export var gNoFirmType: { new(): gNoFirmType };

type gNoFirmTypeDQRCodeType = string;
type _gNoFirmTypeDQRCodeType = Primitive._string;

/** Definición de tipo para el grupo:
  * F10: Grupo de detalle de Pedido Comercial global */
interface _gPedComGlType extends BaseType {
	/** F119: Informaciones de interés del emitente con respeto al Pedido Comercial global */
	dInfEmPedGl?: string;
	/** F101: Número del pedido de compra */
	dNroPed: number;
	/** F102: Número de Aceptación de Pedido */
	dNumAcept?: string[];
}
export interface gPedComGlType extends _gPedComGlType { constructor: { new(): gPedComGlType }; }
export var gPedComGlType: { new(): gPedComGlType };

type gPedComGlTypeDInfEmPedGlType = string;
type _gPedComGlTypeDInfEmPedGlType = Primitive._string;

type gPedComGlTypeDNroPedType = number;
type _gPedComGlTypeDNroPedType = Primitive._number;

type gPedComGlTypeDNumAceptType = string;
type _gPedComGlTypeDNumAceptType = Primitive._string;

interface _gPedComIrType extends BaseType {
	/** E159:Informaciones de interés del emitente con respeto al Pedido Comercial, relacionadas con un ítem de la factura */
	dInfEmPedIt: string;
	/** E151:Número del pedido de compra */
	dNroPed: number;
	/** E152:Número secuencial del ítem en el pedido */
	dSecItemPed: number;
}
export interface gPedComIrType extends _gPedComIrType { constructor: { new(): gPedComIrType }; }
export var gPedComIrType: { new(): gPedComIrType };

type gPedComIrTypeDInfEmPedItType = string;
type _gPedComIrTypeDInfEmPedItType = Primitive._string;

type gPedComIrTypeDNroPedType = number;
type _gPedComIrTypeDNroPedType = Primitive._number;

type gPedComIrTypeDSecItemPedType = number;
type _gPedComIrTypeDSecItemPedType = Primitive._number;

/** Definición de tipo para el grupo:
  * D01: Grupo con información de subtotales y totales */
interface _gTotType extends BaseType {
	/** D13: Número total de ítems de la factura */
	dNroItems: number;
	/** D07: Valor del acarreo cobrado en el precio total */
	dTotAcar?: number;
	/** D06: Suma de los descuentos y bonificaciones concedidos sobre el valor total de la factura */
	dTotDesc?: number;
	/** D05: Suma total de monto gravado */
	dTotGravado: number;
	/** D04: Total del ISC */
	dTotISC?: number;
	/** D03: Total del ITBMS */
	dTotITBMS: number;
	/** D02: Suma de los precios antes de impuesto */
	dTotNeto: number;
	/** D10: Suma de los valores recibidos */
	dTotRec: number;
	/** D08: Valor del seguro cobrado en el precio total */
	dTotSeg?: number;
	/** D09: Valor total de la factura */
	dVTot: number;
	/** D14: Suma total de los ítems con los montos de los impuestos */
	dVTotItems: number;
	/** D11: Vuelto entregado al cliente */
	dVuelto?: number;
	/** Definición de tipo para el grupo:
	  * D20: Grupo de datos de que describen descuentos o bonificaciones adicionales aplicados a la factura */
	gDescBonif?: gTotTypeGDescBonifType[];
	/** Definición de tipo para el grupo:
	  * D30: Grupo de formas de pago de la factura */
	gFormaPago: gTotTypeGFormaPagoType[];
	/** D60:Grupo de Total Otras Tasas o Impuestos (OTI) del Item */
	gOTITotal?: gTotTypeGOTITotalType[];
	/** Definición de tipo para el grupo:
	  * D50: Grupo de informaciones de pago a plazo */
	gPagPlazo?: gTotTypeGPagPlazoType[];
	/** Definición de tipo para el grupo:
	  * D40: Grupo datos cuando a la factura aplican retenciones */
	gRetenc?: gTotTypeGRetencType;
	/** D12: Tiempo de pago */
	iPzPag: gTotTypeIPzPagType;
}
export interface gTotType extends _gTotType { constructor: { new(): gTotType }; }
export var gTotType: { new(): gTotType };

type gTotTypeDNroItemsType = number;
type _gTotTypeDNroItemsType = Primitive._number;

interface _gTotTypeGDescBonifType extends BaseType {
	/** D200: Descripción de descuentos o bonificaciones adicionales aplicados a la factura */
	dDetalDesc: string;
	/** D201: Monto Descuentos/Bonificaciones y otros ajustes */
	dValDesc: number;
}
interface gTotTypeGDescBonifType extends _gTotTypeGDescBonifType { constructor: { new(): gTotTypeGDescBonifType }; }

type gTotTypeGDescBonifTypeDDetalDescType = string;
type _gTotTypeGDescBonifTypeDDetalDescType = Primitive._string;

interface _gTotTypeGFormaPagoType extends BaseType {
	/** D302: Descripción de forma de pago no listada en el formato */
	dFormaPagoDesc?: string;
	/** D303: Valor de la fracción pagada utilizando esta forma de pago */
	dVlrCuota: number;
	/** D301: Forma de pago de la factura */
	iFormaPago: gTotTypeGFormaPagoTypeIFormaPagoType;
}
interface gTotTypeGFormaPagoType extends _gTotTypeGFormaPagoType { constructor: { new(): gTotTypeGFormaPagoType }; }

type gTotTypeGFormaPagoTypeDFormaPagoDescType = string;
type _gTotTypeGFormaPagoTypeDFormaPagoDescType = Primitive._string;

type gTotTypeGFormaPagoTypeIFormaPagoType = ("01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "99");
interface _gTotTypeGFormaPagoTypeIFormaPagoType extends Primitive._number { content: gTotTypeGFormaPagoTypeIFormaPagoType; }

interface _gTotTypeGOTITotalType extends BaseType {
	/** D601:Código de Otras Tasas o Impuesto del total del ítem */
	dCodOTITotal: gTotTypeGOTITotalTypeDCodOTITotalType;
	/** D602:Monto de Otras Tasas o Impuesto del total del ítem */
	dValOTITotal: number;
}
interface gTotTypeGOTITotalType extends _gTotTypeGOTITotalType { constructor: { new(): gTotTypeGOTITotalType }; }

type gTotTypeGOTITotalTypeDCodOTITotalType = ("01" | "02");
interface _gTotTypeGOTITotalTypeDCodOTITotalType extends Primitive._string { content: gTotTypeGOTITotalTypeDCodOTITotalType; }

interface _gTotTypeGPagPlazoType extends BaseType {
	/** D502: Fecha de vencimiento de la fracción */
	dFecItPlazo: Date;
	/** D504: Informaciones de interés del emitente con respeto a  esta fracción de pago */
	dInfPagPlazo?: string;
	/** D501: Número secuencial de cada fracción de pago a plazo */
	dSecItem: number;
	/** D503: Valor de la fracción */
	dValItPlazo: number;
}
interface gTotTypeGPagPlazoType extends _gTotTypeGPagPlazoType { constructor: { new(): gTotTypeGPagPlazoType }; }

type gTotTypeGPagPlazoTypeDInfPagPlazoType = string;
type _gTotTypeGPagPlazoTypeDInfPagPlazoType = Primitive._string;

type gTotTypeGPagPlazoTypeDSecItemType = number;
type _gTotTypeGPagPlazoTypeDSecItemType = Primitive._number;

interface _gTotTypeGRetencType extends BaseType {
	/** D401: Código de Retención a aplicar */
	cCodRetenc: gTotTypeGRetencTypeCCodRetencType;
	/** D402: Monto de la retención a aplicar */
	cValRetenc: number;
}
interface gTotTypeGRetencType extends _gTotTypeGRetencType { constructor: { new(): gTotTypeGRetencType }; }

type gTotTypeGRetencTypeCCodRetencType = ("1" | "2" | "3" | "4" | "7" | "8");
interface _gTotTypeGRetencTypeCCodRetencType extends Primitive._number { content: gTotTypeGRetencTypeCCodRetencType; }

type gTotTypeIPzPagType = ("1" | "2" | "3");
interface _gTotTypeIPzPagType extends Primitive._number { content: gTotTypeIPzPagType; }

interface _gVehicNuevoType extends BaseType {
	/** E070:Tipo del vehículo */
	cTipoVehic: gVehicNuevoTypeCTipoVehicType;
	/** E071:Uso de vehículo */
	cUsoVehic: gVehicNuevoTypeCUsoVehicType;
	/** E067:Año de fabricación */
	dAnoFab?: number;
	/** E065:Año del modelo de fabricación */
	dAnoMod?: number;
	/** E063:Capacidad máxima de tracción */
	dCapTracc?: number;
	/** E052:Chasis del vehículo */
	dChasi: string;
	/** E056:Capacidad del motor */
	dCilin?: number;
	/** E053:Color del vehículo */
	dColorCod: string;
	/** E054:Descripción del color del vehículo */
	dColorNomb?: string;
	/** E061:Tipo de combustible no listado en el formato */
	dCombustDesc?: string;
	/** E064:Distancia entre ejes */
	dEntreEj?: number;
	/** E073:Capacidad máxima de pasajeros */
	dLotac?: number;
	/** E051: Modalidad de la operación de venta de vehículos nuevos no listada en el formato */
	dModOpVNDesc?: string;
	/** E062:Número del motor */
	dNroMotor: string;
	/** E058:Peso Bruto */
	dPesoBruto?: number;
	/** E057:Peso Neto */
	dPesoNet?: number;
	/** E055:Potencia del motor (CV) */
	dPotVeh?: number;
	/** E069:Tipo de pintura no listada en el formato */
	dTipoPinturaDesc?: string;
	/** E060:Tipo de combustible */
	iCombust: gVehicNuevoTypeICombustType;
	/** E072:Condición del vehículo */
	iCondVehic?: gVehicNuevoTypeICondVehicType;
	/** E050: Modalidad de la operación de venta de vehículos nuevos */
	iModOpVN: gVehicNuevoTypeIModOpVNType;
	/** E068:Tipo de pintura */
	iTipoPintura?: gVehicNuevoTypeITipoPinturaType;
}
export interface gVehicNuevoType extends _gVehicNuevoType { constructor: { new(): gVehicNuevoType }; }
export var gVehicNuevoType: { new(): gVehicNuevoType };

type gVehicNuevoTypeCTipoVehicType = ("1" | "2" | "3" | "4" | "5" | "6");
interface _gVehicNuevoTypeCTipoVehicType extends Primitive._number { content: gVehicNuevoTypeCTipoVehicType; }

type gVehicNuevoTypeCUsoVehicType = ("1" | "2");
interface _gVehicNuevoTypeCUsoVehicType extends Primitive._number { content: gVehicNuevoTypeCUsoVehicType; }

type gVehicNuevoTypeDAnoFabType = number;
type _gVehicNuevoTypeDAnoFabType = Primitive._number;

type gVehicNuevoTypeDAnoModType = number;
type _gVehicNuevoTypeDAnoModType = Primitive._number;

type gVehicNuevoTypeDCapTraccType = number;
type _gVehicNuevoTypeDCapTraccType = Primitive._number;

type gVehicNuevoTypeDChasiType = string;
type _gVehicNuevoTypeDChasiType = Primitive._string;

type gVehicNuevoTypeDCilinType = number;
type _gVehicNuevoTypeDCilinType = Primitive._number;

type gVehicNuevoTypeDColorCodType = string;
type _gVehicNuevoTypeDColorCodType = Primitive._string;

type gVehicNuevoTypeDColorNombType = string;
type _gVehicNuevoTypeDColorNombType = Primitive._string;

type gVehicNuevoTypeDCombustDescType = string;
type _gVehicNuevoTypeDCombustDescType = Primitive._string;

type gVehicNuevoTypeDEntreEjType = number;
type _gVehicNuevoTypeDEntreEjType = Primitive._number;

type gVehicNuevoTypeDLotacType = number;
type _gVehicNuevoTypeDLotacType = Primitive._number;

type gVehicNuevoTypeDModOpVNDescType = string;
type _gVehicNuevoTypeDModOpVNDescType = Primitive._string;

type gVehicNuevoTypeDNroMotorType = string;
type _gVehicNuevoTypeDNroMotorType = Primitive._string;

type gVehicNuevoTypeDPotVehType = number;
type _gVehicNuevoTypeDPotVehType = Primitive._number;

type gVehicNuevoTypeDTipoPinturaDescType = string;
type _gVehicNuevoTypeDTipoPinturaDescType = Primitive._string;

type gVehicNuevoTypeICombustType = ("01" | "02" | "03" | "08" | "09" | "99");
interface _gVehicNuevoTypeICombustType extends Primitive._string { content: gVehicNuevoTypeICombustType; }

type gVehicNuevoTypeICondVehicType = ("1" | "2" | "3");
interface _gVehicNuevoTypeICondVehicType extends Primitive._number { content: gVehicNuevoTypeICondVehicType; }

type gVehicNuevoTypeIModOpVNType = ("01" | "02" | "03" | "04" | "99");
interface _gVehicNuevoTypeIModOpVNType extends Primitive._string { content: gVehicNuevoTypeIModOpVNType; }

type gVehicNuevoTypeITipoPinturaType = ("1" | "2" | "3" | "4" | "9");
interface _gVehicNuevoTypeITipoPinturaType extends Primitive._number { content: gVehicNuevoTypeITipoPinturaType; }

export type montoTipo01 = number;
type _montoTipo01 = Primitive._number;

export type montoTipo02 = number;
type _montoTipo02 = Primitive._number;

export type montoTipo03 = number;
type _montoTipo03 = Primitive._number;

export type montoTipo04 = number;
type _montoTipo04 = Primitive._number;

export type montoTipo05 = number;
type _montoTipo05 = Primitive._number;

export type montoTipo06 = number;
type _montoTipo06 = Primitive._number;

export type montoTipo31 = number;
type _montoTipo31 = Primitive._number;

export type pesoType = number;
type _pesoType = Primitive._number;

interface _RFEType extends BaseType {
	/** A03: Identificador para firma electrónica */
	dId: string;
	/** A02: Versión del formato */
	dVerForm: number;
	/** B01: Datos generales de la transacción documentada. */
	gDGen: gDGenType;
	/** F20: Grupo de informaciones de logística */
	gInfoLog?: gInfoLogType;
	/** C01: Grupo de datos que especifica cada ítem del detalle de la transacción */
	gItem: gItemType[];
	/** F25: Grupo de datos que identifican el local de la entrega */
	gLcEntr?: gLcEntrType;
	/** G101: String correspondiente al QR code impreso en el CIFE */
	gNoFirm: gNoFirmType;
	/** F10: Grupo de detalle de Pedido Comercial global */
	gPedComGl?: gPedComGlType;
	/** D01: Grupo con información de subtotales y totales */
	gTot: gTotType;
}
interface RFEType extends _RFEType { constructor: { new(): RFEType }; }

type RFETypeDIdType = string;
type _RFETypeDIdType = Primitive._string;

type RFETypeDVerFormType = number;
type _RFETypeDVerFormType = Primitive._number;

interface _RucRecType extends BaseType {
	dDV?: string;
	dRuc: string;
	dTipoRuc: RucRecTypeDTipoRucType;
}
export interface RucRecType extends _RucRecType { constructor: { new(): RucRecType }; }
export var RucRecType: { new(): RucRecType };

type RucRecTypeDDVType = string;
type _RucRecTypeDDVType = Primitive._string;

type RucRecTypeDRucType = string;
type _RucRecTypeDRucType = Primitive._string;

type RucRecTypeDTipoRucType = ("1" | "2");
interface _RucRecTypeDTipoRucType extends Primitive._number { content: RucRecTypeDTipoRucType; }

interface _RucType extends BaseType {
	dDV: string;
	dRuc: string;
	dTipoRuc: RucTypeDTipoRucType;
}
export interface RucType extends _RucType { constructor: { new(): RucType }; }
export var RucType: { new(): RucType };

type RucTypeDDVType = string;
type _RucTypeDDVType = Primitive._string;

type RucTypeDRucType = string;
type _RucTypeDRucType = Primitive._string;

type RucTypeDTipoRucType = ("1" | "2");
interface _RucTypeDTipoRucType extends Primitive._number { content: RucTypeDTipoRucType; }

export type telefonoType = string;
type _telefonoType = Primitive._string;

export interface document extends BaseType {
	/** A01: Factura Electrónica (raíz) */
	rFE: RFEType;
}
export var document: document;
