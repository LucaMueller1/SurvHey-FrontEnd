import React, { useState, useEffect} from 'react';
import { useParams } from "react-router";
import $ from "jquery";
import styles from './SliderBar.css';
import { requestService } from '../services/requestService';
import { AuthInterceptor } from '../services/AuthInterceptor';




function SliderBar() {
    const [answerOptions, setAnswerOptions] = useState([]);
    const [results, setResults] = useState([]);
    const [resultSum, setResultSum] = useState(0);
    let {id} = useParams();
    

    useEffect(() => {
        AuthInterceptor.intercept();
        requestService.getResults(id).then(res => {
            setResults(Object.entries(res.data.choices));
            getResultSum();
        }).catch(error => {
            console.log(error);
        });
        
        
    }, []);

    useEffect( () => {
        query();
      }, [resultSum]);

     function query() {
        $('.skill-per').each(function(){
            var $this = $(this);
            var per = $this.attr('per');
            $this.css("width",per+'%');
            $({animatedValue: 0}).animate({animatedValue: per},{
            duration: 1000,
            step: function(){
                $this.attr('per', Math.floor(this.animatedValue) + '%');
            },
            complete: function(){
                $this.attr('per', Math.floor(this.animatedValue) + '%');
            }
            });
        }); 
     }

      const getResultSum =async () => {
        requestService.getAnalysis(id).then(res => {
            setResultSum(res.data.amount);
            console.log(res.data.amount);
        }).catch( error => {
            console.log(error);
        });
     }

     const sliderBars = results.map((choice, index) => {
         console.log(results);
        return (
            <div key={index} className="skills">
                    <div className="skill">
                        <div className="skill-name">{choice[0]}</div>
                        <div className="skill-bar">
                        <div className="skill-per" per={(choice[1] / resultSum) * 100}></div>
                        </div>
                    </div>
            </div>
          );
        });
     
     //map trough results array --> for each choice we want to return a skills object with custom per and Name
        return (
            <div className="sliderContainer">
                    <div>{sliderBars}</div>
            </div>
        );
        
}

export default SliderBar;