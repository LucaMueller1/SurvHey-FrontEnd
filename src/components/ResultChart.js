import React, {useState, useEffect} from 'react';
import {AuthInterceptor} from '../services/AuthInterceptor';
import {requestService} from '../services/requestService';
import Chart from 'react-google-charts';


  

export function ResultsChart(props) {

    const [results, setResults] = useState([]);
    const [id, setId] = useState(props.id)

    useEffect(() => {
        AuthInterceptor.intercept();
        requestService.getResults(id).then(res => {
            setResults(res.data.choices);
        }
            
            );   
    }, []);

    let arr = [['AnswerOption', 'Submitted Answers'], ]
    for(const [key, value] of Object.entries(results)) {
        arr.push([key, value]);
      }
    console.log(arr);
      
    return (
        <div className="pieChartContainer" >
            <Chart
                className="resultPieChart"
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Results...</div>}
                data={arr}
                options={{
                    title: 'Survey Results:',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    );
}