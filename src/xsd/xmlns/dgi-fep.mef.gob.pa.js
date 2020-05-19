var cxml = require("cxml");
var Primitive = require('./xml-primitives');

cxml.register('http://dgi-fep.mef.gob.pa', exports, [
	[Primitive, ['Date', 'number', 'string'], []]
], [
	'cCodUbicType',
	'emailType',
	'Fecha_num',
	'fechaTZ',
	'fechaYMD',
	'gDatRecType',
	'gDFRefType',
	'gDGenType',
	'gEmisType',
	'gFExpType',
	'gGtinType',
	'gIdExtType',
	'gInfoLogType',
	'gItemType',
	'gLcEntrType',
	'gMedicinaType',
	'gNoFirmType',
	'gPedComGlType',
	'gPedComIrType',
	'gTotType',
	'gVehicNuevoType',
	'montoTipo01',
	'montoTipo02',
	'montoTipo03',
	'montoTipo04',
	'montoTipo05',
	'montoTipo06',
	'montoTipo31',
	'pesoType',
	'RucRecType',
	'RucType',
	'telefonoType'
], [
	[0, 0, [[2, 0]], []],
	[0, 0, [[27, 0], [34, 0], [41, 0], [91, 0]], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 1, [], []],
	[3, 1, [], []],
	[0, 0, [[7, 0], [33, 3], [40, 1], [71, 1], [84, 1], [110, 3], [149, 1], [168, 1], [173, 1], [189, 0]], []],
	[0, 0, [[48, 0], [69, 0], [144, 0], [165, 0]], []],
	[0, 0, [[45, 0], [47, 1], [49, 0], [51, 1], [58, 1], [67, 1], [73, 0], [95, 0], [103, 0], [136, 3], [138, 0], [140, 3], [146, 0], [147, 1], [175, 0], [178, 0], [179, 0], [180, 0], [182, 0], [184, 0], [185, 0], [187, 0], [190, 1], [191, 1], [192, 0]], []],
	[0, 0, [[31, 0], [32, 3], [38, 0], [68, 0], [104, 0], [108, 2], [166, 0], [171, 0]], []],
	[0, 0, [[4, 0], [5, 1], [6, 1], [15, 1], [96, 1], [133, 1]], []],
	[3, 2, [], []],
	[0, 0, [[57, 0], [83, 1]], []],
	[0, 0, [[60, 1], [64, 1], [72, 0], [81, 1], [87, 1], [122, 1], [169, 0]], []],
	[0, 0, [[9, 1], [10, 1], [16, 0], [22, 1], [23, 1], [26, 1], [36, 0], [46, 1], [50, 1], [59, 1], [100, 0], [137, 1], [151, 1], [152, 0], [155, 1], [157, 3], [161, 1], [162, 0], [174, 1]], []],
	[0, 0, [[39, 0], [70, 0], [107, 1], [109, 1], [167, 1], [172, 0]], []],
	[0, 0, [[1, 0], [77, 0]], []],
	[0, 0, [[97, 0]], []],
	[0, 0, [[61, 1], [79, 0], [82, 3]], []],
	[0, 0, [[62, 0], [80, 0], [102, 0]], []],
	[0, 0, [[76, 0], [114, 1], [115, 1], [116, 0], [117, 1], [118, 0], [119, 0], [120, 0], [121, 1], [132, 0], [134, 0], [135, 1], [139, 3], [148, 2], [158, 3], [159, 3], [163, 1], [186, 0]], []],
	[0, 0, [[8, 0], [11, 0], [13, 1], [14, 1], [19, 1], [20, 0], [21, 1], [28, 0], [29, 1], [30, 1], [44, 1], [65, 1], [66, 1], [78, 0], [85, 1], [86, 1], [88, 1], [111, 1], [176, 0], [177, 1], [183, 0], [188, 1]], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[0, 0, [[42, 1], [99, 0], [112, 0]], []],
	[0, 0, [[43, 0], [98, 0], [113, 0]], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[0, 0, [[141, 0], [142, 0], [143, 0]], []],
	[0, 0, [[74, 0]], []],
	[3, 3, [], []],
	[0, 0, [[75, 0]], []],
	[3, 3, [], []],
	[0, 0, [[35, 0]], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[0, 0, [[164, 0]], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[0, 0, [[17, 0], [18, 0], [54, 0], [55, 0]], []],
	[0, 0, [[105, 1], [124, 0]], []],
	[3, 2, [], []],
	[0, 0, [[106, 0], [125, 0]], []],
	[3, 3, [], []],
	[0, 0, [[24, 0], [127, 0]], []],
	[3, 3, [], []],
	[0, 0, [[89, 1], [90, 0], [92, 1], [93, 0], [94, 1], [129, 0]], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[0, 0, [[37, 0], [123, 0]], []],
	[3, 3, [], []],
	[0, 0, [[53, 1], [131, 0], [181, 0]], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[0, 0, [[25, 0], [128, 0]], []],
	[3, 3, [], []],
	[0, 0, [[52, 0], [63, 1], [101, 0], [126, 0]], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[0, 0, [[3, 0], [12, 0]], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[0, 0, [[56, 0], [130, 0], [145, 0], [150, 1], [153, 2], [154, 1], [156, 0], [160, 1], [170, 0]], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []],
	[3, 3, [], []],
	[3, 3, [], []],
	[3, 2, [], []]
], [
	['dCtLote', [2], 0],
	['rFE', [141], 0],
	['cCodRetenc', [119], 0],
	['cCondEntr', [], 0],
	['cMoneda', [], 0],
	['cMonedaDesc', [73], 0],
	['cPaisRec', [], 0],
	['cTipoVehic', [121], 0],
	['cUnidad', [], 0],
	['cUnidadCPBS', [], 0],
	['cUsoVehic', [122], 0],
	['cValRetenc', [25], 0],
	['dAnoFab', [123], 0],
	['dAnoMod', [124], 0],
	['dCambio', [74], 0],
	['dCantCodInt', [31], 0],
	['dCantComInvent', [31], 0],
	['dCantGTINCom', [31], 0],
	['dCapTracc', [125], 0],
	['dChasi', [126], 0],
	['dCilin', [127], 0],
	['dCodCPBSabr', [], 0],
	['dCodCPBScmp', [], 0],
	['dCodOTI', [95], 0],
	['dCodOTITotal', [114], 0],
	['dCodProd', [85], 0],
	['dCodUbi', [], 0],
	['dColorCod', [128], 0],
	['dColorNomb', [129], 0],
	['dCombustDesc', [130], 0],
	['dCoordEm', [69], 0],
	['dCorElectEmi', [5], 0],
	['dCorElectRec', [5], 0],
	['dCorreg', [36], 0],
	['dCUFERef', [50], 0],
	['dDescProd', [86], 0],
	['dDetalDesc', [109], 0],
	['dDirecEm', [70], 0],
	['dDirecLcEntr', [97], 0],
	['dDirecRec', [39], 0],
	['dDistr', [37], 0],
	['dDV', [144], 0],
	['dDV', [147], 0],
	['dEntreEj', [131], 0],
	['dEnvFE', [51], 0],
	['dFechaCad', [8], 0],
	['dFechaCont', [7], 0],
	['dFechaDFRef', [7], 0],
	['dFechaEm', [7], 0],
	['dFechaFab', [8], 0],
	['dFechaSalida', [7], 0],
	['dFecItPlazo', [7], 0],
	['dFormaPagoDesc', [111], 0],
	['dGTINCom', [14], 0],
	['dGTINInv', [14], 0],
	['dId', [142], 0],
	['dIdExt', [77], 0],
	['dInfEmFE', [52], 0],
	['dInfEmFE', [87], 0],
	['dInfEmLog', [79], 0],
	['dInfEmPedGl', [101], 0],
	['dInfEmPedIt', [104], 0],
	['dInfPagPlazo', [116], 0],
	['dLicCamion', [80], 0],
	['dLotac', [132], 0],
	['dModOpVNDesc', [133], 0],
	['dMotCont', [53], 0],
	['dNombEm', [71], 0],
	['dNombEmRef', [43], 0],
	['dNombLcEntr', [98], 0],
	['dNombRec', [40], 0],
	['dNomTransp', [81], 0],
	['dNroDF', [54], 0],
	['dNroFacIE', [46], 0],
	['dNroFacPap', [48], 0],
	['dNroItems', [107], 0],
	['dNroLote', [99], 0],
	['dNroMotor', [134], 0],
	['dNroPed', [102], 0],
	['dNroPed', [105], 0],
	['dNroVols', [82], 0],
	['dNumAcept', [103], 0],
	['dPaisExt', [78], 0],
	['dPaisRecDesc', [41], 0],
	['dPesoBruto', [32], 0],
	['dPesoNet', [32], 0],
	['dPesoTot', [83], 0],
	['dPotVeh', [135], 0],
	['dPrAcarItem', [26], 0],
	['dPrItem', [30], 0],
	['dProv', [38], 0],
	['dPrSegItem', [26], 0],
	['dPrUnit', [30], 0],
	['dPrUnitDesc', [30], 0],
	['dPtoFacDF', [55], 0],
	['dPuertoEmbarq', [75], 0],
	['dQRCode', [100], 0],
	['dRuc', [148], 0],
	['dRuc', [145], 0],
	['dSecItem', [88], 0],
	['dSecItem', [117], 0],
	['dSecItemPed', [106], 0],
	['dSeg', [56], 0],
	['dSucEm', [72], 0],
	['dTasaISC', [91], 0],
	['dTasaITBMS', [93], 0],
	['dTfnAdLcEntr', [35], 0],
	['dTfnEm', [35], 0],
	['dTfnLcEntr', [35], 0],
	['dTfnRec', [35], 0],
	['dTipoPinturaDesc', [136], 0],
	['dTipoRuc', [146], 0],
	['dTipoRuc', [149], 0],
	['dTotAcar', [25], 0],
	['dTotDesc', [25], 0],
	['dTotGravado', [25], 0],
	['dTotISC', [25], 0],
	['dTotITBMS', [25], 0],
	['dTotNeto', [25], 0],
	['dTotRec', [25], 0],
	['dTotSeg', [25], 0],
	['dUnPesoTot', [84], 0],
	['dValDesc', [25], 0],
	['dValISC', [30], 0],
	['dValITBMS', [30], 0],
	['dValItPlazo', [25], 0],
	['dValOTI', [30], 0],
	['dValOTITotal', [25], 0],
	['dValTotItem', [30], 0],
	['dVerForm', [143], 0],
	['dVlrCuota', [25], 0],
	['dVTot', [25], 0],
	['dVTotEst', [76], 0],
	['dVTotItems', [25], 0],
	['dVuelto', [25], 0],
	['gAutXML', [57], 0],
	['gCodItem', [89], 0],
	['gDatRec', [9], 0],
	['gDescBonif', [108], 0],
	['gDFRef', [10], 0],
	['gDFRefFacIE', [45], 0],
	['gDFRefFacPap', [47], 0],
	['gDFRefFE', [49], 0],
	['gDFRefNum', [44], 0],
	['gDGen', [11], 0],
	['gEmis', [12], 0],
	['gFExp', [13], 0],
	['gFormaPago', [110], 0],
	['gIdExt', [15], 0],
	['gInfoLog', [16], 0],
	['gISCItem', [90], 0],
	['gITBMSItem', [92], 0],
	['gItem', [17], 0],
	['gLcEntr', [18], 0],
	['gMedicina', [19], 0],
	['gNoFirm', [20], 0],
	['gOTIItem', [94], 0],
	['gOTITotal', [113], 0],
	['gPagPlazo', [115], 0],
	['gPedComGl', [21], 0],
	['gPedComIr', [22], 0],
	['gPrecios', [96], 0],
	['gRetenc', [118], 0],
	['gRucAutXML', [34], 0],
	['gRucEmDFRef', [34], 0],
	['gRucEmi', [34], 0],
	['gRucLcEntr', [34], 0],
	['gRucRec', [33], 0],
	['gRucTransp', [34], 0],
	['gTot', [23], 0],
	['gUbiEm', [4], 0],
	['gUbiLcEntr', [4], 0],
	['gUbiRec', [4], 0],
	['gVehicNuevo', [24], 0],
	['iAmb', [58], 0],
	['iCombust', [137], 0],
	['iCondVehic', [138], 0],
	['iDest', [59], 0],
	['iDoc', [60], 0],
	['iEntCAFE', [61], 0],
	['iFormaPago', [112], 0],
	['iFormCAFE', [62], 0],
	['iModOpVN', [139], 0],
	['iNatOp', [63], 0],
	['iProGen', [64], 0],
	['iPzPag', [120], 0],
	['iTipoOp', [65], 0],
	['iTipoPintura', [140], 0],
	['iTipoRec', [42], 0],
	['iTipoSuc', [66], 0],
	['iTipoTranVenta', [67], 0],
	['iTpEmis', [68], 0]
]);