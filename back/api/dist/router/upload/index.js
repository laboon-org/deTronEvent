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
var Router = require("router");
var router = Router();
const ipfs = require("../../ipfs/index");
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
});
router.post("/uploadfile", upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', 'multipart/form-data');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    console.log(req.file);
    try {
        const data = yield ipfs(req.file.buffer);
        console.log(data);
        res.status(200).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(400).send("Tài khoản đã tồn tại");
    }
}));
// router.post("/ticket", async (req:any, res:any) => {
//   res.setHeader('Content-Type', 'multipart/form-data');
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//   try {
//     for(let i =0;i<10;i++){
//       const data1 = {
//         "id": Math.random(),
//         "abcd":"acd4"
//       }
//       const data = await ipfs(JSON.stringify(data1))
//       console.log(data)
//     }
//     // const data = await ipfs(JSON.stringify(data1))
//     res.status(200).json("test")
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Xảy ra lỗi");
//   }
// });
module.exports = router;
//# sourceMappingURL=index.js.map