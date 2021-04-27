import axios from 'axios';
import {environment} from "../environments/environment";
import { requestService } from './requestService';

export class AuthService {

  static async authenticate(email, password) {
      return requestService.loginUser(email, password);
  }

  static logout() {
    requestService.logoutUser().then(res => {
      this.removeToken();
    }).catch(error => {
      console.log("Error during authentication");
    })
}

  static isToken() {
    return !!(localStorage.getItem("api_key"));
  }

  static setToken(api_key) {
    localStorage.setItem("api_key", api_key);
  }

  static getToken() {
    return localStorage.getItem("api_key");
  }

  static setUserName(userName) {
    localStorage.setItem("user_name", userName);
  }

  static getUserName() {
    return localStorage.getItem("user_name");
  }

  static removeToken() {
    localStorage.removeItem("api_key");
  }

}