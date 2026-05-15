const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "Adop-JVtwLc2vg6xLTtDSZCmywjKv_eJCY8bK8dxvG5LWpeQ3eRHihBfU20T6nE5f9goV1rWB9PrrJZP",
  client_secret: "EGsgUz7DVhfsAGI9HsYQNclMbIabVGgfejDYfCQ910pHXh-AFICT0PorIbRuPUyyrAw40VMZY9Nueq48",
});

module.exports = paypal;
