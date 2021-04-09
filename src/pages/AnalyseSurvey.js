import React, {useState} from 'react';
import SliderBar from '../components/SliderBar';
import MapChart from '../components/WorldMap';
import ReactTooltip from "react-tooltip";

 export function AnalyseSurvey() {
     const [content, setContent] = useState("");
     return (
         <div>
             <div>
             <h2>SurvHey Submissions</h2>
             <MapChart setTooltipContent={setContent}/>
             <ReactTooltip>{content}</ReactTooltip>
             <h2>SurvHey Result</h2>
             </div>
             <div>
                <SliderBar/>
             </div>
         </div>

     );
 }

export default AnalyseSurvey;