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
        
    }

    static async postSubmisson(surveyId, selectedAnswerIDs){
        let ip = await trackingService.getClientIp();
        let trackingToken = trackingService.getTrackingToken();
        //let answerOptionIDs = this.toAnswerOptionIDs(selectedAnswerIDs);

        let jsonBody = {
           "surveyId": surveyId,
           "participant": {
                "IP": ip,
                "Cookie": trackingToken
           },
            "choices": selectedAnswerIDs
        }

        console.log(jsonBody);
        return axios.post(environment.backEndUrl + "/survey/" + surveyId + "/submission", jsonBody, {headers: {"Content-Type": "application/json"}}).then(res => {
            if(res.data) {
                console.log("Setting trackingToken to: " + res.data.participant.Cookie);
                trackingService.setTrackingToken(res.data.participant.Cookie);
            }
        }).catch(error => {
            console.log("Failed send submission");
        });
        
    }
    static async getResults(id) {
        return axios.get(environment.backEndUrl + "/survey/" + id + "/results", {headers: {"Accept": "application/json"}});       
      }

      static async getAnalysis(id) {
        return axios.get(environment.backEndUrl + "/survey/" + id + "/analysis", {headers: {"Accept": "application/json"}});       
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

    static toAnswerOptionIDs(list) {
        let rList = [];
        list.forEach(function(element){
            rList.push({"id": element});
        });
        return rList;
    }

}
