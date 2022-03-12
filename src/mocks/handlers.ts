import { rest } from 'msw';
import modelProduct from 'assets/models/product.json';

export const handlers = [
  rest.get('/products', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      products: modelProduct,
    }),
  )),
];
