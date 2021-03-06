/*class Survey extends React.Component {
    constructor() {
      super();
      this.state = {
        foreName: "foreName",
        lastName: "lastName",
        age: "age",
        selectedOption: ""
      };
      this.onValueChange = this.onValueChange.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
      this.onChangeFirstName = this.onChangeFirstName.bind(this);
      this.onChangeLastName = this.onChangeLastName.bind(this);
      this.onChangeAge = this.onChangeAge.bind(this);
    }
    onChangeFirstName(event) {
        this.setState({
            foreName: event.target.value
           
        })
    }
    onChangeLastName(event) {
      this.setState({
          lastName: event.target.value
      })
  }
  
  onChangeAge(event) {
      this.setState({
          age: event.target.value
      })
  }
  
    //updates the Surveys props on user selection of radio button
    onValueChange(event) {
      this.setState({
        selectedOption: event.target.value
      });
    }
  
    //gets called when submitting the form
    formSubmit(event) {
      event.preventDefault();
      console.log(this.state.selectedOption)
      alert("Survey was Submited sucessfull")
      //Post Data to API in here
      //exportSurveyData();
    }
  
    render() {
      return (
        <form onSubmit={this.formSubmit}>
          <div>What is your favorite Ice-Cream?</div>
          <div className="UserData">
              <label>
              Enter your Data:  
                  <input 
                      type="text" 
                      value={this.state.foreName}
                      onChange={this.onChangeFirstName}
                  />
                  <input 
                      type="text" 
                      value={this.state.lastName}
                      onChange={this.onChangeLastName}
                  />
                  <input 
                      type="text" 
                      value={this.state.age}
                      onChange={this.onChangeAge}
                  />
                 
              </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Vanilla"
                checked={this.state.selectedOption === "Vanilla"}
                onChange={this.onValueChange}
              />
              Vanilla
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Choclate"
                checked={this.state.selectedOption === "Choclate"}
                onChange={this.onValueChange}
              />
              Choclate
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Other"
                checked={this.state.selectedOption === "Other"}
                onChange={this.onValueChange}
              />
              Other
            </label>
          </div>
          <div>
            Selected option is : {this.state.selectedOption}
          </div>
          <button className="btn btn-default" type="submit">
            Submit Survey
          </button>
        </form>
      );
    }
  }
  
  
  export default Survey;
  */