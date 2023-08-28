import AWS from 'aws-sdk';


AWS.config.update({
    region: 'eu-central-1',
});

const s3 = new AWS.S3();
export default s3;


export const getObjectParam = {
    Bucket: 'yakov-s3-docker-dev-qefh312u',
    Key: 'key',
    Expires: 120,
};