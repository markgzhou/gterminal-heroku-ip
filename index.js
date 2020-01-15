var express = require("express");
var app = express();
const ipInt = require('ip-to-int');
const csv = require('csv-parser');
const fs = require('fs');
const zlib = require('zlib');
const gunzip = zlib.createGunzip();
const PORT = process.env.PORT || 5000
var ip_location_data = [];
var is_data_loaded = false;

if (ip_location_data.length < 1) {
  fs.createReadStream('resources/lite-db-202001.csv.gz')
    .pipe(zlib.createGunzip())
    .pipe(csv())
    .on('data', (data) => ip_location_data.push(data))
    .on('end', () => {
      console.log("CSV loading completed!");
      is_data_loaded = true;
    })
}

app.get("/", (req, res, next) => {

  var ipAddr = req.query.ip;
  if (!ipAddr)
    ipAddr = req.query.HTTP_CF_CONNECTING_IP;

  if (!ipAddr)
    ipAddr = req.query.HTTP_X_FORWARDED_FOR;

  if (!ipAddr)
    ipAddr = req.query.REMOTE_ADDR;

  if (!ipAddr)
    ipAddr = req.headers["x-forwarded-for"];
  if (ipAddr) {
    var list = ipAddr.split(",");
    ipAddr = list[list.length - 1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }

  var result = {};
  result["ip"] = ipAddr;
  result["area_code"] = "-";
  result["area_name"] = "Unknown";
  result["state_name"] = "Unknown";
  result["city_name"] = "Unknown";


  function findLocation(result, ip_addr_int) {
    if (!is_data_loaded) {
      var status = {};
      status["ip"] = result["ip"];
      status["description"] = "System booting.Please wait for 5 seconds and try...";
      return status;
    }
    else {
      var i;
      for (i = 0; i < ip_location_data.length; i++) {
        if (ip_location_data[i]["start_ip"] <= ip_addr_int && ip_location_data[i]["end_ip"] >= ip_addr_int) {
          result["area_code"] = ip_location_data[i]["country_code"];
          result["area_name"] = ip_location_data[i]["country_name"];
          result["state_name"] = ip_location_data[i]["state_name"];
          result["city_name"] = ip_location_data[i]["city_name"];
          console.log(result)
        }
      }
    }
    return result;
  }

  let ip_addr_int
  try {
    ip_addr_int = ipInt(ipAddr).toInt();
  }
  catch (e) {
    result["description"] = "The given IP address is invalid.";
    console.log(e);
  }
  res.json(findLocation(result, ip_addr_int));

})
  .listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });