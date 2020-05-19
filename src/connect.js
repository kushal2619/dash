import React from 'react'

function connect() {

  let KiteConnect = require("kiteconnect").KiteConnect;

  let access_token = "5jEbWDSAuZvx23NgxB7yYMwDUIe4DK6j";
  let api_key = "tg48gdykr12ezopp";

  let kc = new KiteConnect({
    api_key: api_key,
  });

  kc.setAccessToken(access_token);

  const getInstruments = (exchange) => {
    kc.getInstruments(exchange)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  module.exports = {
  externals: [KiteConnect()],
};

  return (
    <div>
      {this.getInstruments("NFO")}
    </div>
  )
}

export default connect

