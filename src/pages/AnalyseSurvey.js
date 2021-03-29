import React, {useState} from 'react';
import SliderBar from '../components/SliderBar';
import MapChart from '../components/WorldMap';
import ReactTooltip from "react-tooltip";

 export function AnalyseSurvey() {
     const [content, setContent] = useState("");
     return (
         <div>
             <h2>Survey Results:</h2>
             <SliderBar/>
             <MapChart setTooltipContent={setContent}/>
             <ReactTooltip>{content}</ReactTooltip>
         </div>

     );
 }

export default AnalyseSurvey;