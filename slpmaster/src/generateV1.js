"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateV1 = void 0;
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var bitbox_sdk_1 = require("bitbox-sdk");
var crypto = __importStar(require("crypto"));
var grpc_bchrpc_node_1 = require("grpc-bchrpc-node");
var slpjs_1 = require("slpjs");
var cache_1 = require("./cache");
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var childProcess = require("child_process");
var execute = function (command) {
    return new Promise(function (resolve, reject) {
        childProcess.exec(command, function (error, standardOutput, standardError) {
            if (error) {
                reject();
                return;
            }
            if (standardError) {
                reject(standardError);
                return;
            }
            resolve(standardOutput);
        });
    });
};
var BITBOX = new bitbox_sdk_1.BITBOX();
var slp = new slpjs_1.Slp(BITBOX);
var txnHelpers = new slpjs_1.TransactionHelpers(slp);
var bchaddrjs_slp_1 = __importDefault(require("bchaddrjs-slp"));
var Bitcore = require("bitcoincashjs-lib-p2sh");
var client;
if (process.env.BCHD_GRPC_CERT) {
    client = new grpc_bchrpc_node_1.GrpcClient({ url: process.env.BCHD_GRPC_URL, rootCertPath: process.env.BCHD_GRPC_CERT });
}
else {
    client = new grpc_bchrpc_node_1.GrpcClient({ url: process.env.BCHD_GRPC_URL });
}
var minerWif = process.env.WIF;
var minerPubKey = (new bitbox_sdk_1.ECPair().fromWIF(minerWif)).getPublicKeyBuffer();
var minerBchAddress = slpjs_1.Utils.toCashAddress((new bitbox_sdk_1.ECPair().fromWIF(minerWif)).getAddress());
var minerSlpAddress = slpjs_1.Utils.toSlpAddress(minerBchAddress);
var vaultHexTail = process.env.MINER_COVENANT_V1;
var tokenStartBlock = parseInt(process.env.TOKEN_START_BLOCK_V1, 10);
var sp = require("synchronized-promise");
// method to get transactions
var getRawTransactions = function (txids) { return __awaiter(void 0, void 0, void 0, function () {
    var txnBuf, res, _1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (txids.length !== 1) {
                    throw Error("only supporting a single transaction");
                }
                if (cache_1.ValidityCache.txnCache.has(txids[0])) {
                    console.log("Cache txid: " + txids[0]);
                    return [2 /*return*/, [cache_1.ValidityCache.txnCache.get(txids[0]).toString("hex")]];
                }
                console.log("Downloading txid: " + txids[0]);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.getRawTransaction({ hash: txids[0], reversedHashOrder: true })];
            case 2:
                res = _a.sent();
                console.log("Downloaded from BCHD");
                txnBuf = Buffer.from(res.getTransaction_asU8());
                return [3 /*break*/, 4];
            case 3:
                _1 = _a.sent();
                throw Error("[ERROR] Could not get transaction " + txids[0]);
            case 4:
                cache_1.ValidityCache.txnCache.set(txids[0], txnBuf);
                return [2 /*return*/, [txnBuf.toString("hex")]];
        }
    });
}); };
// setup a new local SLP validator
var validator = new slpjs_1.LocalValidator(BITBOX, getRawTransactions);
var network = new slpjs_1.BchdNetwork({ BITBOX: BITBOX, client: client, validator: validator });
var getRewardAmount = function (block) {
    var initReward = parseInt(process.env.TOKEN_INIT_REWARD_V1, 10);
    var halveningInterval = parseInt(process.env.TOKEN_HALVING_INTERVAL_V1, 10);
    var double = initReward / (Math.floor(block / halveningInterval) + 1);
    return parseInt(double.toString(), 10);
};
var defaultState = {
    bchdMintTxnSeen: false,
    bestBlockchainHeight: 0,
    bestTokenHeight: 0,
    hasSeenAtLeastOneBlock: false,
    lastBatonTxid: "",
};
var state = JSON.parse(JSON.stringify(defaultState));
var minerTags = new Map();
var streams = {
    bchdBlocks: null,
    bchdTransactions: null,
};
// get current block height and listen for new blocks
streams.bchdBlocks = sp(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.subscribeBlocks({
                    includeSerializedBlock: false, includeTxnData: true, includeTxnHashes: false
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); })();
streams.bchdBlocks.on("data", function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        state.bestBlockchainHeight = data.getBlockInfo().getHeight();
        console.log("Block found: " + state.bestBlockchainHeight + ".");
        return [2 /*return*/];
    });
}); });
streams.bchdTransactions = sp(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.subscribeTransactions({
                    includeBlockAcceptance: false, includeMempoolAcceptance: true, includeSerializedTxn: false,
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); })();
streams.bchdTransactions.on("data", function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var type, txn, outs, ins, asm, tokenHeight, scriptSig, scriptSigAsm;
    return __generator(this, function (_a) {
        type = data.getType();
        txn = data.getUnconfirmedTransaction().getTransaction();
        outs = txn.getOutputsList();
        if (Buffer.from(outs[0].getPubkeyScript_asU8()).toString("hex").includes("044d494e5420d6876f0fce603be43f15d34348bb1de1a8d688e1152596543da033a060cff798")) {
            ins = txn.getInputsList();
            asm = BITBOX.Script.toASM(Buffer.from(ins[0].getSignatureScript_asU8())).split(" ");
            try {
                tokenHeight = Buffer.from(asm[0], "hex").readUInt32LE();
                if (tokenHeight > state.bestTokenHeight) {
                    state.bchdMintTxnSeen = true;
                    state.lastBatonTxid = Buffer.from(txn.getHash_asU8()).toString("hex");
                }
                scriptSig = Buffer.from(txn.getInputsList()[0].getSignatureScript_asU8());
                scriptSigAsm = BITBOX.Script.toASM(scriptSig).split(" ");
                minerTags.set(tokenHeight, {
                    conf: txn.getConfirmations(),
                    tag: Buffer.from(scriptSigAsm[6], "hex").toString("utf-8"),
                    txid: Buffer.from(txn.getHash_asU8().slice().reverse()).toString("hex"),
                });
                minerTags.delete(tokenHeight - 10);
            }
            catch (_) { }
        }
        return [2 /*return*/];
    });
}); });
var waitForNextBlock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var block0;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                block0 = state.bestBlockchainHeight;
                _a.label = 1;
            case 1:
                if (!(block0 === state.bestBlockchainHeight)) return [3 /*break*/, 3];
                return [4 /*yield*/, sleep(20)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3:
                state.bestBlockchainHeight = state.bestBlockchainHeight;
                console.log("Blockchain height: " + state.bestBlockchainHeight);
                console.log("Mist token height: " + state.bestTokenHeight);
                minerTags.forEach(function (o) { return o.conf++; });
                return [2 /*return*/];
        }
    });
}); };
var processTxnList = function (txnDataList) { return __awaiter(void 0, void 0, void 0, function () {
    var txnDataList_1, txnDataList_1_1, txnData, outputs, slpMsg, scriptSig, scriptSigAsm, lastTokenBlockBuf, lastTokenBlock;
    var e_1, _a;
    return __generator(this, function (_b) {
        try {
            for (txnDataList_1 = __values(txnDataList), txnDataList_1_1 = txnDataList_1.next(); !txnDataList_1_1.done; txnDataList_1_1 = txnDataList_1.next()) {
                txnData = txnDataList_1_1.value;
                outputs = txnData.getTransaction().getOutputsList();
                slpMsg = void 0;
                try {
                    slpMsg = slp.parseSlpOutputScript(Buffer.from(outputs[0].getPubkeyScript_asU8()));
                }
                catch (_) {
                    continue;
                }
                if (slpMsg.tokenIdHex === process.env.TOKEN_ID_V1 &&
                    slpMsg.transactionType === slpjs_1.SlpTransactionType.MINT) {
                    scriptSig = Buffer.from(txnData.getTransaction().getInputsList()[0].getSignatureScript_asU8());
                    scriptSigAsm = BITBOX.Script.toASM(scriptSig).split(" ");
                    lastTokenBlockBuf = Buffer.from(scriptSigAsm[0], "hex");
                    if (lastTokenBlockBuf.length !== 4) {
                        continue;
                    }
                    lastTokenBlock = lastTokenBlockBuf.readInt32LE();
                    if (lastTokenBlock > state.bestTokenHeight) {
                        state.bestTokenHeight = lastTokenBlock;
                        state.lastBatonTxid = Buffer.from(txnData.getTransaction().getHash_asU8().slice().reverse()).toString("hex");
                    }
                    // add miner tag
                    minerTags.set(lastTokenBlock, {
                        conf: txnData.getTransaction().getConfirmations(),
                        tag: Buffer.from(scriptSigAsm[6], "hex").toString("utf-8"),
                        txid: Buffer.from(txnData.getTransaction().getHash_asU8().slice().reverse()).toString("hex"),
                    });
                    minerTags.delete(lastTokenBlock - 10);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (txnDataList_1_1 && !txnDataList_1_1.done && (_a = txnDataList_1.return)) _a.call(txnDataList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return [2 /*return*/];
    });
}); };
exports.generateV1 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, blockHeight, block, mempool, error_1, _b, _c, _d, txid, validity, unspent, txos, utxos, txnInputs, encodeAsHex, stateT0Buf, stateT0, initialMintAmount, difficultyLeadingZeroBytes, halvingInterval, startingBlockHeight, mintVaultHexT0, redeemScriptBufT0, vaultHash160, vaultAddressT0, scriptPubKeyHexT0, stateT1Buf, stateT1, mintVaultHexT1, redeemScriptBufT1, vaultHash160T1, vaultAddressT1, scriptPubKeyHexT1, txo, baton, txid, _e, _f, _g, txid, _2, extraFee, rewardAmount, unsignedMintHex, batonTxo, batonTxoInputIndex, sigObj, tx, scriptPreImage, difficulty, prehash, solhash, keepTrying, cmd, content, lines, lines_1, lines_1_1, line, bytes, count, mintAmountLE, scriptSigsP2sh, scriptSigsP2pkh, scriptSigs, signedTxn, txres, error_2;
    var e_2, _h, e_3, _j, e_4, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                // clear list of txn ids persisted txn bufs
                cache_1.ValidityCache.utxoIds.clear();
                state = JSON.parse(JSON.stringify(defaultState));
                _a = state;
                return [4 /*yield*/, client.getBlockchainInfo()];
            case 1:
                _a.bestBlockchainHeight = (_l.sent()).getBestHeight();
                if (!!state.lastBatonTxid) return [3 /*break*/, 6];
                return [4 /*yield*/, client.getBlockchainInfo()];
            case 2:
                blockHeight = (_l.sent()).getBestHeight();
                _l.label = 3;
            case 3:
                if (!!state.lastBatonTxid) return [3 /*break*/, 6];
                return [4 /*yield*/, client.getBlock({ index: blockHeight, fullTransactions: true })];
            case 4:
                block = _l.sent();
                return [4 /*yield*/, processTxnList(block.getBlock().getTransactionDataList())];
            case 5:
                _l.sent();
                blockHeight--;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, client.getRawMempool({ fullTransactions: true })];
            case 7:
                mempool = _l.sent();
                return [4 /*yield*/, processTxnList(mempool.getTransactionDataList())];
            case 8:
                _l.sent();
                if (!state.lastBatonTxid) return [3 /*break*/, 13];
                _l.label = 9;
            case 9:
                _l.trys.push([9, 11, , 13]);
                return [4 /*yield*/, client.getUnspentOutput({
                        hash: state.lastBatonTxid, vout: 2,
                        reversedHashOrder: true, includeMempool: true
                    })];
            case 10:
                _l.sent();
                return [3 /*break*/, 13];
            case 11:
                error_1 = _l.sent();
                console.log("Cannot find contract tip.");
                return [4 /*yield*/, sleep(1000)];
            case 12:
                _l.sent();
                return [2 /*return*/];
            case 13:
                console.log("Generate instatiated with a current token height of " + state.bestTokenHeight + " and blockchain height of " + state.bestBlockchainHeight + ".");
                try {
                    // pre-load slpjs validator from the persisted cache
                    for (_b = __values(cache_1.ValidityCache.cachedValidity), _c = _b.next(); !_c.done; _c = _b.next()) {
                        _d = __read(_c.value, 2), txid = _d[0], validity = _d[1];
                        validator.cachedValidations[txid] = { validity: validity };
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_h = _b.return)) _h.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                console.log("Current baton location: " + state.lastBatonTxid + ":2");
                console.log("Blockchain height: " + state.bestBlockchainHeight);
                console.log("Reward txo: " + state.lastBatonTxid + ":2");
                // get miner's address unspent UTXOs
                console.log("Getting unspent txos for " + minerBchAddress);
                return [4 /*yield*/, client.getAddressUtxos({ address: minerBchAddress, includeMempool: true })];
            case 14:
                unspent = _l.sent();
                txos = unspent.getOutputsList().map(function (o) {
                    return {
                        cashAddress: minerBchAddress,
                        satoshis: o.getValue(),
                        txid: Buffer.from(o.getOutpoint().getHash_asU8().slice().reverse()).toString("hex"),
                        vout: o.getOutpoint().getIndex(),
                        wif: process.env.WIF,
                        scriptPubKey: Buffer.from(o.getPubkeyScript_asU8()).toString("hex"),
                        txBuf: cache_1.ValidityCache.txnCache.has(Buffer.from(o.getOutpoint().getHash_asU8().slice().reverse()).toString("hex")) ?
                            cache_1.ValidityCache.txnCache.get(Buffer.from(o.getOutpoint().getHash_asU8().slice().reverse()).toString("hex")) :
                            null,
                    };
                });
                console.log("Completed fetching txos for " + minerBchAddress);
                // add current utxo txids to cache so that we store the txns in our persisted cache to speed up local validation
                // ValidityCache.utxoIds.clear();
                txos.forEach(function (txo) { return cache_1.ValidityCache.utxoIds.add(txo.txid); });
                // validate and categorize unspent TXOs
                // @ts-ignore
                console.log("Validating unspent SLP txos in miner's wallet...");
                return [4 /*yield*/, network.processUtxosForSlp(txos)];
            case 15:
                utxos = _l.sent();
                console.log("Finished validating SLP txos in miner's wallet.");
                txnInputs = utxos.nonSlpUtxos;
                if (txnInputs.length === 0) {
                    throw Error("There are no non-SLP inputs available to pay for gas");
                }
                encodeAsHex = function (n) {
                    return BITBOX.Script.encode([BITBOX.Script.encodeNumber(n)]).toString("hex");
                };
                stateT0Buf = Buffer.alloc(4);
                stateT0Buf.writeInt32LE(state.bestTokenHeight, 0);
                stateT0 = stateT0Buf.toString("hex");
                initialMintAmount = encodeAsHex(parseInt(process.env.TOKEN_INIT_REWARD_V1, 10));
                difficultyLeadingZeroBytes = encodeAsHex(parseInt(process.env.MINER_DIFFICULTY_V1, 10));
                halvingInterval = encodeAsHex(parseInt(process.env.TOKEN_HALVING_INTERVAL_V1, 10));
                startingBlockHeight = encodeAsHex(parseInt(process.env.TOKEN_START_BLOCK_V1, 10));
                mintVaultHexT0 = "04" + stateT0 + "20" + process.env.TOKEN_ID_V1 + initialMintAmount + difficultyLeadingZeroBytes + halvingInterval + startingBlockHeight + vaultHexTail;
                redeemScriptBufT0 = Buffer.from(mintVaultHexT0, "hex");
                vaultHash160 = BITBOX.Crypto.hash160(redeemScriptBufT0);
                vaultAddressT0 = slpjs_1.Utils.slpAddressFromHash160(vaultHash160, "mainnet", "p2sh");
                console.log("T0 redeemScript:\n" + mintVaultHexT0);
                scriptPubKeyHexT0 = "a914" + Buffer.from(bchaddrjs_slp_1.default.decodeAddress(vaultAddressT0).hash).toString("hex") + "87";
                console.log("T0 scriptPubKey:\n" + scriptPubKeyHexT0);
                stateT1Buf = Buffer.alloc(4);
                stateT1Buf.writeInt32LE(state.bestTokenHeight + 1, 0);
                stateT1 = stateT1Buf.toString("hex");
                mintVaultHexT1 = "04" + stateT1 + "20" + process.env.TOKEN_ID_V1 + initialMintAmount + difficultyLeadingZeroBytes + halvingInterval + startingBlockHeight + vaultHexTail;
                redeemScriptBufT1 = Buffer.from(mintVaultHexT1, "hex");
                vaultHash160T1 = BITBOX.Crypto.hash160(redeemScriptBufT1);
                vaultAddressT1 = slpjs_1.Utils.slpAddressFromHash160(vaultHash160T1, "mainnet", "p2sh");
                console.log("T1 redeemScript:\n" + mintVaultHexT1);
                scriptPubKeyHexT1 = "a914" + Buffer.from(bchaddrjs_slp_1.default.decodeAddress(vaultAddressT1).hash).toString("hex") + "87";
                console.log("T1 scriptPubKey:\n" + scriptPubKeyHexT1);
                txo = {
                    txid: state.lastBatonTxid,
                    vout: 2,
                    satoshis: 546,
                };
                return [4 /*yield*/, network.processUtxosForSlp([txo])];
            case 16:
                baton = _l.sent();
                // save true validations to cache
                for (txid in validator.cachedValidations) {
                    if (txid.length === 64 && typeof validator.cachedValidations[txid].validity === "boolean") {
                        cache_1.ValidityCache.cachedValidity.set(txid, validator.cachedValidations[txid].validity);
                    }
                }
                try {
                    // save false validations to cache
                    for (_e = __values(cache_1.ValidityCache.txnCache), _f = _e.next(); !_f.done; _f = _e.next()) {
                        _g = __read(_f.value, 2), txid = _g[0], _2 = _g[1];
                        if (!validator.cachedValidations[txid]) {
                            cache_1.ValidityCache.cachedValidity.set(txid, false);
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [4 /*yield*/, cache_1.ValidityCache.write()];
            case 17:
                _l.sent();
                // select the inputs for transaction
                txnInputs = __spread(baton.slpBatonUtxos[process.env.TOKEN_ID_V1], [utxos.nonSlpUtxos[0]]);
                extraFee = redeemScriptBufT0.length + 8 + 32 + 8 + 8 + 72 + 100;
                rewardAmount = getRewardAmount(state.bestTokenHeight);
                unsignedMintHex = txnHelpers.simpleTokenMint({
                    tokenId: process.env.TOKEN_ID_V1,
                    mintAmount: new bignumber_js_1.default(rewardAmount),
                    inputUtxos: txnInputs,
                    tokenReceiverAddress: minerSlpAddress,
                    batonReceiverAddress: vaultAddressT1,
                    changeReceiverAddress: minerSlpAddress,
                    extraFee: extraFee,
                    disableBchChangeOutput: true,
                });
                // set nSequence to enable CLTV for all inputs, and set transaction Locktime
                unsignedMintHex = txnHelpers.enableInputsCLTV(unsignedMintHex);
                console.log("Blockchain height: " + state.bestBlockchainHeight);
                console.log("Mist height: " + state.bestTokenHeight);
                if (state.bestTokenHeight >= (state.bestBlockchainHeight - tokenStartBlock)) {
                    console.log("Token height is synchronized with blockchain height, after solution is mined will wait for block before submitting solution.");
                    unsignedMintHex = txnHelpers.setTxnLocktime(unsignedMintHex, state.bestBlockchainHeight + 1);
                }
                else {
                    unsignedMintHex = txnHelpers.setTxnLocktime(unsignedMintHex, state.bestBlockchainHeight);
                }
                batonTxo = baton.slpBatonUtxos[process.env.TOKEN_ID_V1][0];
                batonTxoInputIndex = 0;
                sigObj = txnHelpers.get_transaction_sig_p2sh(unsignedMintHex, minerWif, batonTxoInputIndex, batonTxo.satoshis, redeemScriptBufT0, redeemScriptBufT0);
                tx = Bitcore.Transaction.fromHex(unsignedMintHex);
                console.log("Preimage:");
                scriptPreImage = tx.sigHashPreimageBuf(0, redeemScriptBufT0, 546, 0x41);
                difficulty = parseInt(process.env.MINER_DIFFICULTY_V1, 10);
                prehash = Buffer.concat([scriptPreImage, crypto.randomBytes(4)]);
                solhash = BITBOX.Crypto.hash256(prehash);
                console.log("Mining height: " + (state.bestTokenHeight + 1) + " (baton txid: " + state.lastBatonTxid + ")");
                if (!(process.env.USE_FASTMINE === "yes")) return [3 /*break*/, 21];
                keepTrying = true;
                _l.label = 18;
            case 18:
                if (!keepTrying) return [3 /*break*/, 20];
                // exit so we can try again
                if (state.bchdMintTxnSeen) {
                    console.log("Miner exited early since token reward has been found.");
                    return [2 /*return*/, false];
                }
                console.log("Please wait, mining for Mistcoin (using fastmine)...");
                cmd = process.cwd() + "/fastmine/fastmine " + scriptPreImage.toString("hex") + " " + difficulty;
                return [4 /*yield*/, execute(cmd)];
            case 19:
                content = _l.sent();
                lines = content.split("\n");
                if (lines.length === 0) {
                    return [3 /*break*/, 18];
                }
                try {
                    for (lines_1 = (e_4 = void 0, __values(lines)), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                        line = lines_1_1.value;
                        if (line.split(" ")[0] !== "FOUND") {
                            console.log(line);
                            continue;
                        }
                        bytes = Buffer.from(line.split(" ")[1], "hex");
                        prehash[prehash.length - 4] = bytes[0];
                        prehash[prehash.length - 3] = bytes[1];
                        prehash[prehash.length - 2] = bytes[2];
                        prehash[prehash.length - 1] = bytes[3];
                        solhash = BITBOX.Crypto.hash256(prehash);
                        if (solhash[0] !== 0x00 || solhash[1] !== 0x00 || solhash[2] !== 0x00) {
                            console.log("Something went wrong with fastmine");
                            continue;
                        }
                        else {
                            console.log("Found!");
                            keepTrying = false;
                            break;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (lines_1_1 && !lines_1_1.done && (_k = lines_1.return)) _k.call(lines_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return [3 /*break*/, 18];
            case 20: return [3 /*break*/, 25];
            case 21:
                console.log("Please wait, mining for Mistcoin (not using fastmine)...");
                count = 0;
                _l.label = 22;
            case 22:
                if (!!solhash.slice(0, difficulty).toString("hex").split("").every(function (s) { return s === "0"; })) return [3 /*break*/, 25];
                prehash[0 + scriptPreImage.length] = Math.floor(Math.random() * 255);
                prehash[1 + scriptPreImage.length] = Math.floor(Math.random() * 255);
                prehash[2 + scriptPreImage.length] = Math.floor(Math.random() * 255);
                prehash[3 + scriptPreImage.length] = Math.floor(Math.random() * 255);
                solhash = BITBOX.Crypto.hash256(prehash);
                // we must sleep in order to allow sse async call to be processed
                count++;
                if (!(count % 100000 === 0)) return [3 /*break*/, 24];
                return [4 /*yield*/, sleep(1)];
            case 23:
                _l.sent();
                count = 0;
                _l.label = 24;
            case 24:
                // check if mintFound flag set by sse
                if (state.bchdMintTxnSeen) {
                    console.log("Token reward has been found, solution forfeited for " + state.lastBatonTxid + " (on bchd mint txn seen).");
                    return [2 /*return*/];
                }
                return [3 /*break*/, 22];
            case 25:
                mintAmountLE = Buffer.alloc(4);
                mintAmountLE.writeUInt32LE(rewardAmount, 0);
                scriptSigsP2sh = {
                    index: batonTxoInputIndex,
                    lockingScriptBuf: redeemScriptBufT0,
                    unlockingScriptBufArray: [
                        stateT1Buf,
                        prehash.slice(scriptPreImage.length),
                        mintAmountLE,
                        sigObj.signatureBuf,
                        minerPubKey,
                        scriptPreImage,
                        Buffer.from(process.env.MINER_UTF8, "utf8"),
                    ],
                };
                // Build p2pkh scriptSigs
                txnInputs[1].wif = process.env.WIF;
                scriptSigsP2pkh = txnHelpers.get_transaction_sig_p2pkh(unsignedMintHex, minerWif, 1, txnInputs[1].satoshis);
                scriptSigs = [scriptSigsP2sh, scriptSigsP2pkh];
                signedTxn = txnHelpers.addScriptSigs(unsignedMintHex, scriptSigs);
                console.log("scriptPubKeyHex T0:\n" + scriptPubKeyHexT0);
                console.log("redeem Script Buf T0:\n" + redeemScriptBufT0.toString("hex"));
                console.log("scriptPubKeyHex T1:\n" + scriptPubKeyHexT1);
                console.log("redeem Script Buf T1:\n" + redeemScriptBufT1.toString("hex"));
                console.log("solution embedded in this txn:\n" + signedTxn);
                if (!(state.bestTokenHeight >= (state.bestBlockchainHeight - tokenStartBlock))) return [3 /*break*/, 27];
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Recent Miner Tags:");
                minerTags.forEach(function (info, height) {
                    console.log("height: " + height + ", tx: " + info.txid + ", conf: " + info.conf + " ==> \"" + info.tag + "\"");
                });
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Current baton location: " + state.lastBatonTxid + ", height: " + state.bestTokenHeight);
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("Token height is synchronized with blockchain height, waiting for next block " + (state.bestBlockchainHeight + 1) + " to submit the mined token height " + (state.bestTokenHeight + 1) + " solution...");
                return [4 /*yield*/, waitForNextBlock()];
            case 26:
                _l.sent();
                _l.label = 27;
            case 27:
                _l.trys.push([27, 29, , 30]);
                return [4 /*yield*/, client.submitTransaction({ txnHex: signedTxn })];
            case 28:
                txres = _l.sent();
                console.log("Submitted solution in txid: " + state.lastBatonTxid + " (via BCHD)");
                return [2 /*return*/];
            case 29:
                error_2 = _l.sent();
                if (!error_2.message.includes("already spent by transaction") &&
                    !error_2.message.includes("tx rejected: orphan transaction")) {
                    throw error_2;
                }
                else if (error_2.message.includes("has insufficient priority")) {
                    throw Error("Transaction fee too low");
                }
                else {
                    console.log("BCHD submit failed: " + error_2.message);
                }
                return [3 /*break*/, 30];
            case 30:
                console.log("Token reward has been found, solution forfeited for " + state.lastBatonTxid + " (failed submit txn).");
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=generateV1.js.map