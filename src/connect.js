var KiteConnect = require("kiteconnect").KiteConnect;

var access_token = "5jEbWDSAuZvx23NgxB7yYMwDUIe4DK6j";
var api_key = "tg48gdykr12ezopp";

var kc = new KiteConnect({
  api_key: "tg48gdykr12ezopp",
});

kc.setAccessToken(access_token);
kc.getInstruments("NFO");

function getInstruments(exchange) {
  kc.getInstruments(exchange)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}