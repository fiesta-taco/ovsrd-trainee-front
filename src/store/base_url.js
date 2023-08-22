// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';
export const IMAGE_BACKEND_URL = 'http://ServiceLBE9A1ADBC-N7f7RsvupFKZ-1466839129.eu-central-1.elb.amazonaws.com';
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://qau5hxxl75.execute-api.eu-central-1.amazonaws.com/main';
}else{
    BASE_URL = 'https://qau5hxxl75.execute-api.eu-central-1.amazonaws.com/dev';
}



export default BASE_URL;
