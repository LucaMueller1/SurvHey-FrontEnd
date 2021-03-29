import React, {Component, useState, useEffect} from 'react';
import { requestService } from '../services/requestService';
import { AuthInterceptor } from '../services/AuthInterceptor';
import { useParams } from "react-router";
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
  } from "react-simple-maps"
  import { scaleLinear } from "d3-scale"


const wrapperStyles = {
width: "100%",
maxWidth: "70%",
margin: "0 auto",
}

const geoUrl =
"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const customScale = scaleLinear().domain([5,100]).range(["#adedff","#ff0000"])

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState([
    { id: "DEU", name: "Germany", val: 100 },
    { id: "CAN", name: "Canada", val: 1000 },
    { id: "ISR", name: "Israel", val: 5 },
    ]);
  let {id} = useParams();

  // useEffect(() => {
  //   // https://www.bls.gov/lau/
  //   AuthInterceptor.intercept();
  //       requestService.getAnalysis(id).then(res => {
  //           //console.log(res.data.countries);
  //           //setData(Object.entries(res.data.countries));
  //           setData(data);
  //           console.log("DATA:");
  //           console.log(data);
  //       });
  // }, []);

  return (
    <div style={wrapperStyles}>
      <ComposableMap  data-tip="" width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}>
        <ZoomableGroup>
        <Geographies geography={geoUrl}>
            {({ geographies, proj }) =>
            geographies.map((geo, i) =>  {

                console.log(data[0].id)
                const country = data.find(d => d.id  === geo.properties.ISO_A3)
                console.log("country:"+country);
                //country = "Germany";

                return (
                  <Geography
                    key={geo.properties.ISO_A3 + i}
                    cacheid={geo.properties.ISO_A3 + i}
                    geography={ geo }
                    projection={ proj }
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties;
                      setTooltipContent(country ? `${NAME} — ${country.val}` : "");
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: country ? customScale(country.val) : "#f0f0f0",
                        stroke: "#FFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: "#dbdbdb",
                        stroke: "#FFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#263238",
                        stroke: "#FFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      }
                    }}
                  />
                )
              })}
            </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;