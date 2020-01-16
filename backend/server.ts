import "isomorphic-fetch";
import { default as koa } from 'koa';
import { default as koaSession } from 'koa-session';
import { default as createShopifyAuth, verifyRequest } from '@shopify/koa-shopify-auth';
import {
  PORT,
  SHOPIFY_API_SECRET,
  SHOPIFY_API_KEY,
  SCOPES
} from './config';
import { default as router } from './pages/routes';


const shopifyAuth = createShopifyAuth({
  apiKey: SHOPIFY_API_KEY,
  secret: SHOPIFY_API_SECRET,
  scopes: SCOPES,
  afterAuth(ctx) {
    const { shop, acessToken } = ctx.session;
    ctx.redirect('/');
  }
});



function onServerListen() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

const server = new koa();
server.keys = [SHOPIFY_API_SECRET];
server.use(koaSession(server));
server.use(shopifyAuth);
server.use(verifyRequest());
server.use(router.allowedMethods());
server.use(router.routes());
server.listen(PORT, onServerListen);
