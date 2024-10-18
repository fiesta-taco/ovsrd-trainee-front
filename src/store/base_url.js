// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL ='http://docker-Servi-fH6129ePRXND-783403714.us-east-1.elb.amazonaws.com';// 'https://bilash-docker-api-dev.kozub.dev'; //'http://localhost:3003'
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://5mhmqfwuvc.execute-api.us-east-1.amazonaws.com/main';
}else{
    BASE_URL = 'https://mgabky167b.execute-api.us-east-1.amazonaws.com/dev';
}


export default BASE_URL;
