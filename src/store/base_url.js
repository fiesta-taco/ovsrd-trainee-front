// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL = 'https://bilash-docker-api-dev.kozub.dev'; //'http://localhost:3003'
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://qau5hxxl75.execute-api.eu-central-1.amazonaws.com/main';
}else{
    BASE_URL = 'https://qau5hxxl75.execute-api.eu-central-1.amazonaws.com/dev';
}



export default BASE_URL;
