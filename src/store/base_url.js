// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL ='http://docker-Servi-fH6129ePRXND-783403714.eu-central-1.elb.amazonaws.com';// 'https://bilash-docker-api-dev.kozub.dev'; //'http://localhost:3003'
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://5mhmqfwuvc.execute-api.new region.amazonaws.com/main';
}else{
    BASE_URL = 'https://5mhmqfwuvc.execute-api.new region.amazonaws.com/dev';
}


export default BASE_URL;
