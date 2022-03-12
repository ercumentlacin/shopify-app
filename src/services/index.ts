/* eslint-disable import/prefer-default-export */
import instance from 'lib/axios';

export default {
  getAllProducts: () => instance.get('/products'),
};
