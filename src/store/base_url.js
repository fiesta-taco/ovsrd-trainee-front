
// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://af1vg5nbrf.execute-api.eu-central-1.amazonaws.com';

export default BASE_URL;
