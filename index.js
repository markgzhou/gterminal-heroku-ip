var express = require("express");
var app = express();
const ipInt = require("ip-to-int");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const PORT = process.env.PORT || 5000
// fs.createReadStream('resources/lite-db-202001.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//   console.log("CSV loading completed!!!")
// });



app.get("/", (req, res, next) => {

  ipAddr = req.query.ip;

  if (!ipAddr)
    ipAddr = req.query.HTTP_CF_CONNECTING_IP;

  if (!ipAddr)
    ipAddr = req.query.HTTP_X_FORWARDED_FOR;

  if (!ipAddr)
    ipAddr = req.query.REMOTE_ADDR;

  if (!ipAddr)
    ipAddr = req.headers["x-forwarded-for"];

  if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  res.json(ipInt(ipAddr).toInt());
  console.log(ipAddr);


 })
 .listen(PORT, () => console.log(`Listening on ${ PORT }`));