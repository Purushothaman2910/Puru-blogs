import { Client, Account, ID } from "appwrite";
import conf from '../conf/conf'

export class AuthService{
    client = new Client();
    account ;
    constructor(){
        this.client.setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }
    async createAccount({email , password , name}){
        try {
            let createAccount = await this.account.create( ID.unique , email , password , name )
            if(createAccount){
                return this.login({email , password})
            } else {
                return createAccount ;
            }
        } catch (error) {
            console.log("Appwite error :: createAccount() ::" , error );                       
        }
    }
    async login({email , password}){
        try {
           return await this.account.createEmailPasswordSession(email , password)
        } catch (error) {
            console.log("Appwite error :: login() ::" , error );                       
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwite error :: getCurrentUser() ::" , error );                       
        }
        return null
    }
    async logout(){
        try {
            return await this.account.deleteSession()
        } catch (error) {
            console.log("Appwite error :: logout() ::" , error );
        }
    }
}

const authService = new AuthService()

export default authService