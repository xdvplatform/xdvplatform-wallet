import * as Primitive from './xml-primitives';

// Source files:
// http://localhost:8080/totales.xsd


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
}
export var document: document;
