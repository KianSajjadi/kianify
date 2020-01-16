"use strict";
exports.__esModule = true;
require("isomorphic-fetch");
var koa_1 = require("koa");
var koa_session_1 = require("koa-session");
var koa_shopify_auth_1 = require("@shopify/koa-shopify-auth");
var config_1 = require("./config");
var shopifyAuth = koa_shopify_auth_1["default"]({
    apiKey: config_1.SHOPIFY_API_KEY,
    secret: config_1.SHOPIFY_API_SECRET,
    scopes: config_1.SCOPES,
    afterAuth: function (ctx) {
        var _a = ctx.session, shop = _a.shop, acessToken = _a.acessToken;
        ctx.redirect('/');
    }
});
function onServerListen() {
    console.log("Listening on: http://localhost:" + config_1.PORT);
}
var server = new koa_1["default"]();
server.keys = [config_1.SHOPIFY_API_SECRET];
server.use(koa_session_1["default"](server));
server.use(shopifyAuth);
server.use(koa_shopify_auth_1.verifyRequest());
server.listen(config_1.PORT, onServerListen);
