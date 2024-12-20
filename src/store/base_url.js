// eslint-disable-next-line no-undef
const value = process.env.NODE_ENV;
let BASE_URL = '';

export const IMAGE_BACKEND_URL ='https://api-main.docker.devoops.click';
    
if(value === 'development'){
    BASE_URL = 'http://localhost:3000/dev';
}else if(value === 'main'){
    BASE_URL = 'https://dpn6vlw36c.execute-api.eu-central-1.amazonaws.com/main';
    
}else{
    BASE_URL = 'https://vu77hwfuh6.execute-api.eu-central-1.amazonaws.com/dev';
}

export default BASE_URL;
