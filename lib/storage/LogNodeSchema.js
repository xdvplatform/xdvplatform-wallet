"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogNodeSchema = exports.EventType = void 0;
const class_validator_1 = require("class-validator");
var EventType;
(function (EventType) {
    EventType[EventType["add"] = 0] = "add";
    EventType[EventType["update"] = 1] = "update";
    EventType[EventType["share"] = 2] = "share";
    EventType[EventType["sign"] = 3] = "sign";
    EventType[EventType["encrypt"] = 4] = "encrypt";
    EventType[EventType["tag"] = 5] = "tag";
})(EventType = exports.EventType || (exports.EventType = {}));
let LogNodeSchema = /** @class */ (() => {
    class LogNodeSchema {
    }
    __decorate([
        class_validator_1.IsNumber(),
        class_validator_1.IsDefined()
    ], LogNodeSchema.prototype, "timestamp", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], LogNodeSchema.prototype, "eventType", void 0);
    __decorate([
        class_validator_1.IsDefined()
    ], LogNodeSchema.prototype, "userDid", void 0);
    return LogNodeSchema;
})();
exports.LogNodeSchema = LogNodeSchema;
//# sourceMappingURL=LogNodeSchema.js.map