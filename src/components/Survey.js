import React from 'react';

class Survey extends React.Component {

  constructor() {
    super();
    this.state = {
      toggle: "false",
      selectedValue: ""
    };
    this.toggleSurvey = this.toggleSurvey.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }

  toggleSurvey(event){
    this.setState({
      toggle: this.event.target = "true"
    });
  }

  onValueChange(event){
    this.setState({
      selectedValue: this.event.target
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
             <input key={index} id={index} type={this.props.surveyType} value={answer} onChange={this.onValueChange}/>
        );
      }

      )

      if(this.state.toggle === false){
        return(
          <div>
            <h3>{this.props.surveyName}</h3>
            <button onClick={this.toggleSurvey}>openSurvey</button>
          </div>
        );
      }
       else { return(
            <form>
              <h3>{this.props.surveyName}</h3>
              <h4>{this.props.questionText}</h4>
              {answers}
              <button className="btn btn-default" type="submit" onClick={this.formSubmit}>
              Submit Survey
              </button>
          </form>
        )
      }
    }

  }
  

  export default Survey;