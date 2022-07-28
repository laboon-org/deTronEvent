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
const express = require("express");
const bodyParser = require("body-parser");
var http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
http.createServer(function (req, res) {
    res.writeHead(200, { "Contet-Type": "text/plain" });
    // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    res.end("helo word");
});
app.get("/hello", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({
        hello: "world",
    });
}));
app.use("/statistic", require('./router/statistic/statistic_bought'));
app.use("/statistic", require('./router/statistic/statistic_sold'));
app.use("/", require('./router/upload/index'));
app.use("/", require('./router/account/index'));
app.use("/qr", require('./router/qrcode/index'));
app.use("/event", require('./router/event/index'));
app.use("/ticket", require('./router/ticket/index'));
app.use("/currency", require("./router/rateconvention/index"));
app.listen(PORT);
//# sourceMappingURL=server.js.map