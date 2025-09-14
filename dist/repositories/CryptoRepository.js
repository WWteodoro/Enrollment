"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.CryptoRepository = void 0;
const crypto = __importStar(require("crypto"));
const config_1 = __importDefault(require("../config/config"));
const getKeys_1 = require("../utills/getKeys");
class CryptoRepository {
    encrypt(text) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config_1.default.security.key || !config_1.default.security.iv || !config_1.default.security.method) {
                throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
            }
            const key = crypto.createHash('sha512').update(config_1.default.security.key).digest('hex').substring(0, 32);
            const encryptionIV = crypto.createHash('sha512').update(config_1.default.security.key).digest('hex').substring(0, 16);
            const cipher = crypto.createCipheriv(config_1.default.security.method, key, encryptionIV);
            return Buffer.from(cipher.update(text, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
        });
    }
    decrypt(encryptedData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!config_1.default.security.key || !config_1.default.security.iv || !config_1.default.security.method) {
                throw new Error('secretKey, secretIV, and ecnryptionMethod are required');
            }
            const key = crypto.createHash('sha512').update(config_1.default.security.key).digest('hex').substring(0, 32);
            const encryptionIV = crypto.createHash('sha512').update(config_1.default.security.key).digest('hex').substring(0, 16);
            const buff = Buffer.from(encryptedData, 'base64');
            const decipher = crypto.createDecipheriv(config_1.default.security.method, key, encryptionIV);
            return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8'));
        });
    }
    useDecryptoUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const prop of (0, getKeys_1.getUserKeys)()) {
                if (prop === 'createdAt' || prop === 'updatedAt')
                    continue;
                else
                    props[prop] = yield this.decrypt(props[prop]);
            }
            return props;
        });
    }
    useEncryptoUser(props) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const prop of (0, getKeys_1.getUserKeys)()) {
                if (prop === 'createdAt' || prop === 'updatedAt')
                    continue;
                props[prop] = yield this.encrypt(props[prop]);
            }
            return props;
        });
    }
}
exports.CryptoRepository = CryptoRepository;
