import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AuthInterceptor} from '../services/AuthInterceptor';
import {requestService} from '../services/requestService';
import {Chart, PieSeries, Title, Tooltip} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, Animation } from '@devexpress/dx-react-chart';

const useStyles = makeStyles((theme) => ({
    chartConainter: {
      //marginTop: "5%",
      display: "flex",
      justifyContent: "center"
    }
}));


export function ResultsChart(props) {
    const classes = useStyles();

    const [results, setResults] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [id, setId] = useState(props.id)

    const ToolTipContent = ({ text, targetItem, ...restProps }) => {
        const displayText = results[targetItem.point].option + ": " + results[targetItem.point].value;
        return (
          <Tooltip.Content
            {...restProps}
            text={displayText}
            targetItem={targetItem}
          />
        );
    };

    const toDataArray = (dataArray) => {
        let arr = [];
        for(const [key, value] of Object.entries(dataArray)) {
            arr.push({value: value, option: key});
        }
        return arr;
    }

    useEffect(() => {
        AuthInterceptor.intercept();
        requestService.getResults(id).then(res => {
            setResults(toDataArray(res.data.choices));
        }
            
            );   
    }, []);

    useEffect(() => {
        if(results.length > 0) {
            setLoaded(true);
        }
    }, [results])
      
    return (
        <div style={{marginTop: "5%"}}>
            {loaded && <div className={classes.chartConainter} >
                <Chart data={results} width={"250"} height={"250"}>
                    <PieSeries valueField="value" argumentField="option" innerRadius={0.4} />
                    <EventTracker/>
                    <Tooltip contentComponent={ToolTipContent}/>
                    <Animation/>
                </Chart>
            </div>}
        </div>
    );
}