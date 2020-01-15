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
  let ip = req.connection.remoteAddress

  if (ip==undefined)
    ip = req.query.HTTP_CF_CONNECTING_IP;

  if (ip==undefined)
    ip = req.query.HTTP_X_FORWARDED_FOR;

  if (ip==undefined)
    ip = req.query.REMOTE_ADDR;

  res.json(ipInt(ip).toInt());
  console.log(ip);
  var i;
  for(i=0; i<results.length; i++){
  }

 })
 .listen(PORT, () => console.log(`Listening on ${ PORT }`));