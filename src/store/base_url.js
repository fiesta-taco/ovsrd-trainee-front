// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL ='https://docker-servi-o5mjq444uvyi-1908431374.us-east-1.elb.amazonaws.com';// 'https://bilash-docker-api-dev.kozub.dev'; //'http://localhost:3003'
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://5mhmqfwuvc.execute-api.us-east-1.amazonaws.com/main';
}else{
    BASE_URL = 'https://mgabky167b.execute-api.us-east-1.amazonaws.com/dev';
}


export default BASE_URL;
