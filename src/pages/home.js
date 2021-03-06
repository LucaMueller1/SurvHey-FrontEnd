import React from 'react';
import logo from '../SurvHeyLogo.png';
import Survey from '../components/Survey';



 export function Home() {
     return (
         <div>
             <div className="Greetings">
                <h1>Welcome to SurvHey</h1>
                <img className="HomeLogo"src={logo} alt="SurvHeyLogo"/>
             </div>
             <div className="SurveyBlocks">
             <Survey/>
             </div>
         </div>
        
     );
 }


export default Home;