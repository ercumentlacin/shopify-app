/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
// src/mocks/handlers.js
import { rest } from 'msw';
import modelProduct from 'assets/models/product.json';

export const handlers = [
  // prettier-ignore
  rest.get('/products', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      products: modelProduct,
    }),
  )),
];
