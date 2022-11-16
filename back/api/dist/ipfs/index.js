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
exports.ipfs = void 0;
const ipfs_http_client_1 = require("ipfs-http-client");
const id = "2CYTFYLUywX5yGeeIW3vuTGovWt";
const sercet = "fb6a1931dffcf3e35a2f361c888b5fca";
const INFURA_TOKEN = Buffer.from(`${id}:${sercet}`).toString("base64");
exports.ipfs = (0, ipfs_http_client_1.create)({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: "Basic " + INFURA_TOKEN,
    },
});
const uploadImageToIPFS = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const added = yield exports.ipfs.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
    });
    let v1CID = yield added.cid.toV1();
    console.log(added.path);
    return {
        path: added.path,
        CID: added.cid.toV1(),
        link: `https://nts-v3-test.infura-ipfs.io/ipfs/${v1CID}`
    };
});
module.exports = uploadImageToIPFS;
//# sourceMappingURL=index.js.map