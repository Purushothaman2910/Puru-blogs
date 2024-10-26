// import { Client } from 'appwrite';
// const client = new Client();
// client.setProject('671c803a0031e42c4d3e');

const conf = {
    appwriteUrl : String(process.env.REACT_APP_APPWRITE_URL),
    appwriteProjectId : String(process.env.REACT_APP_APPWRITE_PROJECT_ID) ,
    appwriteDataBaseId : String(process.env.REACT_APP_APPWRITE_DATABASE_ID) ,
    appwriteCollectionId : String(process.env.REACT_APP_APPWRITE_COLLECTION_ID) ,
    appwriteBucketId : String(process.env.REACT_APP_APPWRITE_BUCKET_ID) 
}

export default conf