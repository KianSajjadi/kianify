import { Context } from 'koa';
import { default as koaRouter, RouterContext } from 'koa-router';
import { verifyRequest } from '@shopify/koa-shopify-auth';

const router = new koaRouter();

router.get('/healthcheck', (ctx: RouterContext) => {
  ctx.res.statusCode = 200;
  ctx.body = 'ok';
});

// necessary to make Shopify's install flow possible
router.get('/auth/callback', verifyRequest(), async ctx => {
  ctx.res.statusCode = 200;
});
router.get('/auth/inline', verifyRequest(), async ctx => {
  ctx.res.statusCode = 200;
});
router.get('/', verifyRequest(), async ctx => {
  ctx.res.statusCode = 200;
});

export { router };