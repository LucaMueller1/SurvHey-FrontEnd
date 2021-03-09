import React from 'react';

class Survey extends React.Component {

  constructor(props) {
    super();
    this.state = {
      toggle: false,
      selectedValue: ""
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


  formSubmit(event){
    console.log("submit");
  }
  
                /* <h3>{this.props.questionText}</h3>
              {this.props.answerOptions.map(opt => {
                return (
                  <div>
                    <input key={opt} id={opt} type={this.props.surveyTyp} value={opt} onChange={this.onValueChange} />
                    <label for="opt">{opt}</label>
                  </div>
                )
              })}
              */

    render() {
      const answers = this.props.answerOptions.map((answer, index) => {
        return (
          <label key={index}>
             <input key={index} id={index} type="radio" value={answer.content} checked={this.state.selectedValue === answer.content} onChange={this.onValueChange}/>
          {answer.content}</label>
        );
        });

      if(this.state.toggle === false){
        return(
          <div>
            <h3>{this.props.surveyName}</h3>
            <button onClick={this.openSurvey}>openSurvey</button>
          </div>
        );
      }
       else { return(
            <form>
              <h3>{this.props.surveyName}</h3>
              <h4>{this.props.questionText}</h4>
              <div>
                {answers}
                <p>Your answer is: {this.state.selectedValue}</p>
              </div>
              <button className="btn btn-default" type="submit" onClick={this.formSubmit}>
              Send Answer
              </button>
          </form>
        )
      }
    }

  }
  

  export default Survey;