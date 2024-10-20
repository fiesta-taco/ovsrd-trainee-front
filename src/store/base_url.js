// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL ='docker-Servi-obJOoDdgehRm-789589824.eu-central-1.elb.amazonaws.com';// 'https://bilash-docker-api-dev.kozub.dev'; //'http://localhost:3003'
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://5la0oavkn6.execute-api.eu-central-1.amazonaws.com/main';
}else{
    BASE_URL = 'https://vu77hwfuh6.execute-api.eu-central-1.amazonaws.com/dev';
}



export default BASE_URL;
