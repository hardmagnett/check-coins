import axios from 'axios'


const coinApi = axios.create({
  baseURL: 'https://api.coincap.io/v2/',
});

export default coinApi
