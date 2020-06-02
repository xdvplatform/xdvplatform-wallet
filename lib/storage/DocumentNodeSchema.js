"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentNodeSchema = void 0;
class DocumentNodeSchema {
    static create(did, document, tag) {
        return Object.assign(new DocumentNodeSchema(), Object.assign(Object.assign({}, document), { '$did': did, tag }));
    }
}
exports.DocumentNodeSchema = DocumentNodeSchema;
//# sourceMappingURL=DocumentNodeSchema.js.map