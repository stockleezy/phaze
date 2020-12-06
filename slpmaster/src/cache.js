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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidityCache = void 0;
var fs_1 = __importDefault(require("fs"));
var slpjs_1 = require("slpjs");
var protons = require("protons");
var pb = protons("\n    syntax = \"proto3\";\n    message PersistedCache {\n        uint32 cacheVersion = 1;\n        repeated bytes validTxids = 2;\n        repeated bytes invalidTxids = 3;\n        repeated bytes txnCache = 4;\n    }\n");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var PersistedValidationCache = /** @class */ (function () {
    function PersistedValidationCache() {
        var e_1, _a, e_2, _b, e_3, _c;
        this.txnCache = new Map();
        this.utxoIds = new Set();
        this.cachedValidity = new Map();
        var file;
        try {
            fs_1.default.writeFileSync(".cache_lock", Buffer.from([0]));
            file = fs_1.default.readFileSync(".cache");
        }
        catch (_) {
            return;
        }
        finally {
            try {
                fs_1.default.unlinkSync(".cache_lock");
            }
            catch (_) { }
        }
        var validTxids = pb.PersistedCache.decode(file).getValidTxids();
        if (validTxids) {
            try {
                for (var validTxids_1 = __values(validTxids), validTxids_1_1 = validTxids_1.next(); !validTxids_1_1.done; validTxids_1_1 = validTxids_1.next()) {
                    var txidBuf = validTxids_1_1.value;
                    this.cachedValidity.set(txidBuf.toString("hex"), true);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (validTxids_1_1 && !validTxids_1_1.done && (_a = validTxids_1.return)) _a.call(validTxids_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var invalidTxids = pb.PersistedCache.decode(file).getInvalidTxids();
        if (invalidTxids) {
            try {
                for (var invalidTxids_1 = __values(invalidTxids), invalidTxids_1_1 = invalidTxids_1.next(); !invalidTxids_1_1.done; invalidTxids_1_1 = invalidTxids_1.next()) {
                    var txidBuf = invalidTxids_1_1.value;
                    this.cachedValidity.set(txidBuf.toString("hex"), false);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (invalidTxids_1_1 && !invalidTxids_1_1.done && (_b = invalidTxids_1.return)) _b.call(invalidTxids_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        var txns = pb.PersistedCache.decode(file).getTxnCache();
        if (this.txnCache) {
            try {
                for (var txns_1 = __values(txns), txns_1_1 = txns_1.next(); !txns_1_1.done; txns_1_1 = txns_1.next()) {
                    var txnBuf = txns_1_1.value;
                    var txid = slpjs_1.Crypto.txid(txnBuf).toString("hex");
                    this.txnCache.set(txid, txnBuf);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (txns_1_1 && !txns_1_1.done && (_c = txns_1.return)) _c.call(txns_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    }
    PersistedValidationCache.Instance = function () {
        return this._instance || (this._instance = new PersistedValidationCache());
    };
    PersistedValidationCache.prototype.write = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pbuf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pbuf = pb.PersistedCache.encode({
                            cacheVersion: 1,
                            validTxids: Array.from(PersistedValidationCache.Instance().cachedValidity)
                                .filter(function (validity) { return validity[1] === true; })
                                .map(function (validity) { return Buffer.from(validity[0], "hex"); }),
                            invalidTxids: Array.from(PersistedValidationCache.Instance().cachedValidity)
                                .filter(function (validity) { return validity[1] === false; })
                                .map(function (validity) { return Buffer.from(validity[0], "hex"); }),
                            txnCache: Array.from(PersistedValidationCache.Instance().txnCache) // We only want to store the txns in our UTXO set
                                .filter(function (txn) { return PersistedValidationCache.Instance()
                                .utxoIds.has(txn[0]) ? true : false; })
                                .map(function (txn) { return txn[1]; }),
                        });
                        if (!fs_1.default.existsSync(".cache_lock")) return [3 /*break*/, 3];
                        _a.label = 1;
                    case 1:
                        if (!fs_1.default.existsSync(".cache_lock")) return [3 /*break*/, 3];
                        return [4 /*yield*/, sleep(100)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        try {
                            fs_1.default.writeFileSync(".cache_lock", Buffer.from([0]));
                            try {
                                fs_1.default.unlinkSync(".cache");
                            }
                            catch (_) { }
                            fs_1.default.writeFileSync(".cache", pbuf);
                        }
                        catch (error) {
                            throw error;
                        }
                        finally {
                            try {
                                fs_1.default.unlinkSync(".cache_lock");
                            }
                            catch (_) { }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return PersistedValidationCache;
}());
exports.ValidityCache = PersistedValidationCache.Instance();
//# sourceMappingURL=cache.js.map