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
Object.defineProperty(exports, "__esModule", { value: true });
/***
 *
 * init.ts
 *
 * Purpose: This script computes the address to manually send the mint baton after Genesis
 *
 ***/
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var bitbox_sdk_1 = require("bitbox-sdk");
var slpjs_1 = require("slpjs");
var bitbox = new bitbox_sdk_1.BITBOX();
var contractStateT0 = "00000000";
var vaultHexTail = process.env.MINER_COVENANT_V1;
var encodeAsHex = function (n) {
    return bitbox.Script.encode([bitbox.Script.encodeNumber(n)]).toString("hex");
};
var initialMintAmount = encodeAsHex(parseInt(process.env.TOKEN_INIT_REWARD_V1, 10));
var difficultyLeadingZeroBytes = encodeAsHex(parseInt(process.env.MINER_DIFFICULTY_V1, 10));
var halvingInterval = encodeAsHex(parseInt(process.env.TOKEN_HALVING_INTERVAL_V1, 10));
var startingBlockHeight = encodeAsHex(parseInt(process.env.TOKEN_START_BLOCK_V1, 10));
var vaultHexT0 = "04" + contractStateT0 + "20" + process.env.TOKEN_ID_V1 + initialMintAmount + difficultyLeadingZeroBytes + halvingInterval + startingBlockHeight + vaultHexTail;
var redeemScriptBufT0 = Buffer.from(vaultHexT0, "hex");
var vaultHash160 = bitbox.Crypto.hash160(redeemScriptBufT0);
var vaultAddressT0 = slpjs_1.Utils.slpAddressFromHash160(vaultHash160, "mainnet", "p2sh");
console.log("****************");
console.log("****************");
console.log("Send baton here to create mining vault -> " + vaultAddressT0);
console.log("****************");
console.log("****************");
//# sourceMappingURL=init.js.map