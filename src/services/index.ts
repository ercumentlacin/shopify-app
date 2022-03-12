import instance from 'lib/axios';

export default {
  getAllProducts: () => instance.get('/products'),
};
