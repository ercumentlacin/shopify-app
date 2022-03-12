import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-Access-Token': process.env.REACT_APP_TOKEN as string,
  },
});

export default instance;
