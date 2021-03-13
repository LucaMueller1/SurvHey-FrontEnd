import axios from 'axios';
import {environment} from '../environments/environment';
import { trackingService } from './trackingService';

export class requestService {

    static async loginUser(email, password) {
        let jsonBody = {
            "email": email,
            "password": password
        }
        return axios.post(environment.backEndUrl + "/user/login", jsonBody, {headers: {"Accept": "application/json"}})
    }

    static async createUser(email, password, lastName, firstName) {
        let jsonBody = {
            "email": email,
            "password": password,
            "lastName": lastName,
            "firstName": firstName
        }
        return axios.post(environment.backEndUrl + "/user", jsonBody, {headers: {"Accept": "application/json"}})
    }

    static async postSurvey(surveyName, questionText, surveyTyp, answerOptions){
        let answers = this.toAnswerOptionJson(answerOptions);
        let jsonBody = {
            "name": surveyName,
            "questionText": questionText,
            "mode": surveyTyp,
            "answerOptions": answers
        };
        return axios.post(environment.backEndUrl + "/survey",jsonBody,{headers: {"Accept": "application/json"}});
        //auth token to be added 
    }

    static async postSubmisson(surveyId, selectedAnswerId){
        let ip = await trackingService.getClientIp();

        let jsonBody = {
           "surveyId": surveyId,
           "ipAddress": ip,
            "choices": [
                {
                  "id": selectedAnswerId
                }
              ]
        }
        console.log(jsonBody);
        return axios.post(environment.backEndUrl + "/survey/" + surveyId + "/submission", jsonBody, {headers: {"Content-Type": "application/json"}});
        
    }
    static async getResults(id) {
        return axios.get(environment.backEndUrl + "/survey/" + id + "/results", {headers: {"Accept": "application/json"}});       
      }

    static async getSurveyById(id) {
      return axios.get(environment.backEndUrl + "/survey/" + id, {headers: {"Accept": "application/json"}});       
    }

    static async getSurveys() {
        return axios.get(environment.backEndUrl + "/surveys", {headers: {"Accept": "application/json"}});       
    }

    static toAnswerOptionJson(list) {
        let list2 = [];
        list.forEach(function(element){
           list2.push({"content": element});
        });
       return list2;
    }

}
