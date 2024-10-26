import conf from "../conf/conf";
import { Client , Databases , Storage , Query , ID } from "appwrite";

export class Service{
    client = new Client() ;
    dataBases ;
    bucket ;
    constructor(){
        this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId)
        this.dataBases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async getPost(slug){
        try {
           return await this.dataBases.getDocument(appwriteDataBaseId , appwriteCollectionId , slug) 
        } catch (error) {
            console.log("An error in :: getPost)() :: " , error)
        }
    }
    async getPosts(queries = [Query.equal("status" , ["active"])]){
        try {
            return await this.dataBases.listDocuments(appwriteDataBaseId , appwriteCollectionId , queries )
        } catch (error) {
            console.log("An error in :: getPosts() :: " , error)
        }
    }
    async createPost(title , slug , content , featuresImage ,  userId){
        try {
            return await this.dataBases.createDocument(conf.appwriteDataBaseId , conf.appwriteCollectionId , slug , { title , content , featuresImage , userId })
        } catch (error) {
            console.log("An error in :: createPost() :: " , error)
        }
    }
    async updatePost(data , slug){
        try {
            return await this.dataBases.updateDocument(conf.appwriteDataBaseId , conf.appwriteCollectionId , slug , data)
        } catch (error) {
            console.log("An error in :: updatePost() :: " , error)
        }
    }
    async deletePost(slug){
        try {
            await this.dataBases.deleteDocument(conf.appwriteDataBaseId , conf.appwriteCollectionId , slug)
            return true ;
        } catch (error) {
            console.log("An error in :: deletePost() :: " , error)
        }
    }
    //  using storage service 
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId , ID.unique() , file )
        } catch (error) {
            console.log("An error in :: uploadFile() :: " , error) 
        }
    }

    async deleteFile(id){
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId , id )
        } catch (error) {
            console.log("An error in :: deleteFile() :: " , error) 
        }
    }
    async getFilePreview(id){
        try {
            return await this.bucket.getFilePreview(conf.appwriteBucketId , id).href
        } catch (error) {
            console.log("An error in :: getFilePreview() :: " , error)
        }
    }
}

const service = new Service()

export default service ;