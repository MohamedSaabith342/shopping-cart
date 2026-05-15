const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "BAAI9ZlHTTKHFDI8Xv8X7Bc8kuFqlxvW7VKturbXEitAW0A_ec02El7FvvvLffn9bDc8IZq5C4HRzeoqHA",
  client_secret: "EPYmO_cA9nsKBrHTvAtrQdUtQLk1ufSWXFS3MDw0UUK_ZJQvRhzV3v2SgNtHdHI1-s6oD8SycrwX4pit",
});

module.exports = paypal;
