import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    
    }
    async createAccount({email,password,name}){
        try {
            const userAccount =  await this.account.create(ID.unique(),email,password,name);
            if (userAccount) {
                // call another method
                return this.loginIn({email,password})
            } else {
                throw new Error("Failed to create user account");
            }
        } catch (error) {
            throw error;
        }
    }

    async loginIn({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;   
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Apppwrite service :: getCurrentUser :: error",error);
            return null;
        }
    }

    async logOut(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Apppwrite service :: logOut :: error",error); 
            return null;
        }
    }
}

const authService = new AuthService();


export default authService;
