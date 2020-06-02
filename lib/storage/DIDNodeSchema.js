"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIDNodeSchema = void 0;
const did_1 = require("../did");
class DIDNodeSchema extends did_1.DIDDocument {
    static create(did, tag) {
        return Object.assign(Object.assign({}, did), { tag });
    }
}
exports.DIDNodeSchema = DIDNodeSchema;
//# sourceMappingURL=DIDNodeSchema.js.map