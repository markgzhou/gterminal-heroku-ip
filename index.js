var express = require("express");
var app = express();
const ipInt = require("ip-to-int");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

// fs.createReadStream('resources/lite-db-202001.csv')
//   .pipe(csv())
//   .on('data', (data) => results.push(data))
//   .on('end', () => {
//   console.log("CSV loading completed!!!")
// });


app.listen(8081, () => {
 console.log("Server running on port 8081");
});

app.get("/", (req, res, next) => {
  let ip = req.query.HTTP_CF_CONNECTING_IP;
  if (ip==undefined)
    ip = req.query.HTTP_X_FORWARDED_FOR;

  if (ip==undefined)
    ip = req.query.REMOTE_ADDR;

  // res.json(ipInt(ip).toInt());
  res.json(ip);
  console.log(ip);
  // var i;
  // for(i=0; i<results.length; i++){
  // }
  console.log(results.length);
 });