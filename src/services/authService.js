import axios from 'axios';
import {environment} from "../environments/environment";
import { requestService } from './requestService';

export class AuthService {

  static authenticate(email, password) {
      requestService.loginUser(email, password).then(res => {
          if(res.data) {
              console.log("Setting auth-token");
              this.setToken(res.data.authKey);
          }
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

  static removeToken() {
    localStorage.removeItem("api_key");
  }

}