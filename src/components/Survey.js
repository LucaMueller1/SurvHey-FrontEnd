import React from 'react';
import { requestService } from '../services/requestService';
import { Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';


class Survey extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      selectedValue: "",
      id: props.id
    };
    this.openSurvey = this.openSurvey.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  openSurvey(event){
    this.setState({
      toggle: event.target = true
    });
  }

  onValueChange = e => {
    this.setState({
      selectedValue: e.target.value
    })
  }

  getResults = e => {
    const results1 = requestService.getResults(this.state.id);
    const Results = results1.data;
    console.log(Results);
  }


  formSubmit = event => {
    alert("answer submitted");
    event.preventDefault();
    console.log(this.state.id);
    requestService.postSubmisson(this.props.id, this.state.selectedValue);
    console.log("submisson posted")
    
  }

    render() {
    
    const answers = this.props.answerOptions.map((answer, index) => {
        return (
          <label key={index}>
             <input key={index} id={index} type="radio" value={answer.content} checked={this.state.selectedValue === answer.content} onChange={this.onValueChange}/>
          {answer.content}
           <br></br>
          </label>
        );
        });

      if(this.state.toggle === false){
        return(
          <div>
            <h3>{this.props.surveyName}</h3>
            <Button variant="contained" onClick={this.openSurvey}>Show full Survey</Button>
          </div>
        );
      }
       else { return(
            <form onSubmit={this.formSubmit}>
              <h3>{this.props.surveyName}</h3>
              <h4>{this.props.questionText}</h4>
              <div>
                {answers}
                <p>Your answer is: {this.state.selectedValue}</p>
              </div>
              <Button variant="contained" color="primary" type="submit">Send Answer</Button>
              <Button variant="contained" onClick={this.getResults}>Show Results</Button>
          </form>
        )
      }
    }

  }
  

  export default Survey;