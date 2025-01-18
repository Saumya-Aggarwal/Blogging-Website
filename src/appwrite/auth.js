import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;

  constructor(params) {
    //it will be called whenever an object od this class is made
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password, name }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null; // if we couldnt get any accout then we dont want an error thats why
  }
  async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
