"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDocumentTree = void 0;
const did_1 = require("../did");
const DocumentNodeSchema_1 = require("./DocumentNodeSchema");
const LogNodeSchema_1 = require("./LogNodeSchema");
function myDocumentTree() {
    return __awaiter(this, void 0, void 0, function* () {
        const did = yield did_1.DIDDocumentBuilder
            .createDID({
            issuer: 'idsomething',
            verificationKeys: [],
            authenticationKeys: []
        });
        // initial tree
        const me = Object.assign(Object.assign({}, did), { tag: 'My RSA Key' });
        const meCid = 'Qw1';
        // create document
        const document = DocumentNodeSchema_1.DocumentNodeSchema.create(meCid, {
            items: {
                item1: 'a',
                item2: 'b'
            }
        });
        // create log
        const log = LogNodeSchema_1.LogNodeSchema.create(document, LogNodeSchema_1.EventType.add, 'Added document node');
    });
}
exports.myDocumentTree = myDocumentTree;
//# sourceMappingURL=ExampleTree.js.map