import { randomInt } from "node:crypto";

var Router = require("router");
var router = Router();
const ipfs = require("../../ipfs/index")
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
  });
router.post("/uploadfile", upload.single("file"), async (req:any, res:any) => {
  res.setHeader('Content-Type', 'multipart/form-data');
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  console.log(req.file)
  try {
    const data = await ipfs(req.file.buffer)
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    console.log(err);
    res.status(400).send("Tài khoản đã tồn tại");
  }
});
// router.post("/getTicket", async (req:any, res:any) => {
//   res.setHeader('Content-Type', 'multipart/form-data');
//   res.setHeader('Access-Control-Allow-Origin','*');
//   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//   try {
    
//       const data = await ipfs(JSON.stringify())
//       console.log(data)
//     // const data = await ipfs(JSON.stringify(data1))
//     res.status(200).json("test")
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Xảy ra lỗi");
//   }
// });
module.exports = router;