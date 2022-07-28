const express = require("express");
const bodyParser = require("body-parser");
var http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
http.createServer(function (req:any, res:any) {
  res.writeHead(200, { "Contet-Type": "text/plain" });

  // res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  res.end("helo word");
});
app.get("/hello", async (req: any, res: any) => {
  return res.json({
    hello: "world",
  });
});
app.use("/statistic",require('./router/statistic/statistic_bought'))
app.use("/statistic",require('./router/statistic/statistic_sold'))
app.use("/",require('./router/upload/index'))
app.use("/",require('./router/account/index'))
app.use("/qr",require('./router/qrcode/index'))
app.use("/event",require('./router/event/index'))
app.use("/ticket",require('./router/ticket/index'))
app.use("/currency",require("./router/rateconvention/index"))
app.listen(PORT);
