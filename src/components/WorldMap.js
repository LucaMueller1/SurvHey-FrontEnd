import React, {Component, useState, useEffect, useLayoutEffect} from 'react';
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
maxWidth: "100%",
margin: "0 auto",
}

const geoUrl =
"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const customScale = scaleLinear([0,15], ["#fff33b","#e93e3a"])

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState();
  let {id} = useParams();


  useLayoutEffect(() => {
    AuthInterceptor.intercept();
    requestService.getAnalysis(id).then(res => {
            setData(Object.entries(res.data.countries));
            console.log("done")
        }).catch(error => {
          console.log(error);
      });
  }, []);

  if (data !== undefined) {return (
    <div style={wrapperStyles}>
      <ComposableMap  data-tip=""
          style={{
            width: "100%",
            height: "100%"
          }}>
        <ZoomableGroup>
        <Geographies geography={geoUrl}>
            { ({ geographies, proj }) =>
             geographies.map( (geo, i) =>  {

                const country = data.find(d => d[0] === geo.properties.NAME)

                return (
                  <Geography
                    key={geo.properties.ISO_A3 + i}
                    cacheid={geo.properties.ISO_A3 + i}
                    geography={ geo }
                    projection={ proj }
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      setTooltipContent(country ? `${NAME}: ${country[1]}` : "");
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: country ? customScale(country[1]) : "#f0f0f0",
                        stroke: "#FFF",
                        strokeWidth: 0.75,
                        outline: "none",
                      },
                      hover: {
                        fill: country ? customScale(country[1]) : "#dbdbdb",
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
  );}

  return (<div>loading</div>);

  
};

export default MapChart;