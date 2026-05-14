const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "BAA_1MKyI7NRA3WrPL3NM88_IZ2j-N_YHV9MZnbn2s0z4mgqewP9Wq9UYmFI3bIsQhMtGbr4ebD9NAs6rU",
  client_secret: "EMKYj7WdtBfIPvxd8C3k9UMcw6cMo5BR7jZDeNUWALurRqWOytTjCr_E8z1IuAJJE36Pj8tO-WszyUBF",
});

module.exports = paypal;
