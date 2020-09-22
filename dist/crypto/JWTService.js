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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    static decodeWithSignature(jwt) {
        const jwtDecoded = jsonwebtoken_1.default.decode(jwt, { 'complete': true });
        const decoded = Object.assign(Object.assign({}, jwtDecoded), { data: `${jwt.split('.')[0]}.${jwt.split('.')[1]}` });
        return decoded;
    }
    static sign(key, payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign(payload, key, {
                audience: options.aud,
                issuer: options.iss,
                subject: options.sub,
            });
        });
    }
    static verify(key, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(signature, key, { algorithms: ['HS256'] });
        });
    }
}
exports.JWTService = JWTService;
