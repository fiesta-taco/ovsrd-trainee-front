
// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://vcu42752j8.execute-api.eu-central-1.amazonaws.com';

export default BASE_URL;
