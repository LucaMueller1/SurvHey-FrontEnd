import React, {useState, useEffect} from 'react';
import {AuthInterceptor} from '../services/AuthInterceptor';
import {requestService} from '../services/requestService';


  

export function ResultsChart(props) {

    const [results, setResults] = useState([]);
    const [resultSum, setResultSum] = useState(0);
    const [id, setId] = useState(props.id)

    useEffect(() => {
        AuthInterceptor.intercept();
        requestService.getResults(id).then(res => {
          console.log(res.data.choices);
            setResults(Object.entries(res.data.choices));
        }
            
            );
        getResultSum();
        console.log(results);
        console.log(resultSum);
        
    }, []);
      
    const getResultSum =async () => {
      await requestService.getAnalysis(id).then(res => {
          setResultSum(res.data.amount);
      }).catch( error => {
          console.log(error);
      });
    }

    return (
        <div>
            <p>Resultate + {id} </p>
            <h3>{"AntwortContent" + results[0][0] }</h3>
                <p>{"Anzahl:" + results[0][1]}</p>
                <p>{"Gesamte Antworten:" + resultSum}</p>
                <p>{"Antworten in Prozent:" + (results[0][1] / resultSum) * 100 + "%"}</p>
        </div>
    );
}