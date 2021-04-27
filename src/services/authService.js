import axios from 'axios';
import {environment} from "../environments/environment";
import { requestService } from './requestService';

export class AuthService {

  static async authenticate(email, password) {
      requestService.loginUser(email, password).then(res => {
          if(res.data) {
              console.log("Setting auth-token");
              this.setToken(res.data.authKey);
              this.setUserName(res.data.user.firstName);
              document.location.href = "/";
              return Promise.resolve(true);
          }
      }).catch(error => {
        console.log("Error during authentication");
        if(error.response && error.response.status === 403) {
          console.log("Wrong username or password");
          return Promise.resolve(false);
        }
      })
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