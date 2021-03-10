import axios from 'axios';
import {environment} from '../environments/environment';

export class requestService {
    static async postSurvey(surveyName, questionText, surveyTyp, answerOptions){
        let answers = this.toAnswerOptionJson(answerOptions);
        let jsonBody = {
            "name": surveyName,
            "questionText": questionText,
            "mode": surveyTyp,
            "answerOptions": answers
        };
        return axios.post(environment.backEndUrl + "/survey",jsonBody,{headers: {"Accept": "application/json", "api_key": "test123"}});
        //auth token to be added 
    }

    static async postSubmisson(surveyId, selectedValue){
        let jsonBody = {
           "surveyId": surveyId,
           "ipAdress": null,
            "choices": [
                {
                  "id": 0,
                  "surveyId": surveyId,
                  "content": selectedValue
                }
              ]            
        }

        return axios.post(environment.backEndUrl +"/survey/" + surveyId + "/submisson",jsonBody,{headers: {"Accept": "application/json", "api_key": "test123"}});
    }

    static async getSurveyById(id) {
      return axios.get(environment.backEndUrl + "/survey/" + id, {headers: {"Accept": "application/json", "api_key": "test123"}});       
    }

    static async getSurveys() {
        return axios.get(environment.backEndUrl + "/surveys", {headers: {"Accept": "application/json", "api_key": "test123"}});       
    }

    static toAnswerOptionJson(list) {
        let list2 = [];
        list.forEach(function(element){
           list2.push({"content": element});
        });
       return list2;
    }

}
