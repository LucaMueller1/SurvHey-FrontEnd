import axios from 'axios';
import { AuthService } from './authService';

export class AuthInterceptor {

    static intercept() {
        
        console.log("Request Interceptor start");
        axios.interceptors.response.use(function (response) {
            //everything is ok. Response Code: 2XX
            return(response);
        }, (error) => {

            if (error.response && error.response.status) {
                if(error.response.status === 401) {
                    console.log("Auth_Key not valid. Removing key...")
                    AuthService.removeToken();
                    document.location.href = "/login";
                }
            } else {
                console.log(error.message);
            }

            return(error);
        });

        //automatically add access_token to header for each request
        axios.interceptors.request.use(function (config) {
            if(config.headers) {
                config.headers.api_key = AuthService.getToken();
            } else {
                console.log("Failed to attach token to request!");
            }

            return config;
          }, function (error) {
            console.log("Failed to attach token to request!");
            return Promise.reject(error);
        });
    }

}