import React, {useState, useEffect} from 'react';
import { requestService } from '../services/requestService';
import { AuthInterceptor } from '../services/AuthInterceptor';
import { useParams } from "react-router";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    paper: {
      justifyContent: "center",
      alignItems: "center",
      background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
    }
}));

export default function ResultTable() {
    const [data, setData] = useState();
    let {id} = useParams();
    const classes = useStyles();

  
    useEffect(() => {
      AuthInterceptor.intercept();
      requestService.getResults(id).then(res => {
              setData(Object.entries(res.data.choices));
          }).catch(error => {
            console.log(error);
        });
    }, []);

    console.log(data);

    if (data === undefined) {return <div>henlo</div>};

    return (
        <TableContainer component={Paper} className={classes.paper}>
          <Table aria-label="result table">
            <TableHead>
              <TableRow>
                <TableCell><h3>Option</h3></TableCell>
                <TableCell align="right"><h3>Number of Submissions</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {data.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row" style={{fontWeight: "bold"}}>
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right" style={{fontWeight: "bold"}}>{entry[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
              }