/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
