
console.log("node-env ->>>>", process.env.NODE_ENV)

// eslint-disable-next-line no-undef
const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://em2cmidpd9.execute-api.eu-central-1.amazonaws.com';
   
export default BASE_URL;
