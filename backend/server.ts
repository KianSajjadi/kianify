import "isomorphic-fetch";
import { default as koa } from 'koa';
import { default as koaSession } from 'koa-session';
import { default as next } from 'next';
import { default as createShopifyAuth, verifyRequest } from '@shopify/koa-shopify-auth'
import { default as dotenv } from 'dotenv';
import {
  PORT,
  SHOPIFY_API_SECRET,
  SHOPIFY_API_KEY,
  SCOPES
} from './config';
import {
  default as koaShopifyGraphQlProxy,
  ApiVersion,
} from '@shopify/koa-shopify-graphql-proxy';
import Server from "next/dist/next-server/server/next-server";

const shopifyAuth = createShopifyAuth({
  apiKey: SHOPIFY_API_KEY,
  secret: SHOPIFY_API_SECRET,
  scopes: SCOPES,
  afterAuth(ctx) {
    const { shop, acessToken } = ctx.session;
    ctx.redirect('/');
  }
});

const koaGraphQLProxy = koaShopifyGraphQlProxy({
  version: ApiVersion.October19,
});

function onServerListen() {
  console.log(`Listening on: http://localhost:${PORT}`);
}

const server = new koa();
server.keys = [SHOPIFY_API_SECRET];
server.use(koaSession(server));
server.use(shopifyAuth);
server.use(koaGraphQLProxy);
server.use(verifyRequest());
server.listen(PORT, onServerListen);
