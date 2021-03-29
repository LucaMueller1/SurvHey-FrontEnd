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

const customScale = scaleLinear([0,1000], ["#fff33b","#e93e3a"])

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState();
  let {id} = useParams();

  useEffect(() => {

    AuthInterceptor.intercept();
        requestService.getAnalysis(id).then(res => {
            setData(Object.entries(res.data.countries));
        });
  }, []);

  return (
    <div style={wrapperStyles}>
      <ComposableMap  data-tip="" width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto"
          }}>
        <ZoomableGroup>
        <Geographies geography={geoUrl}>
            {({ geographies, proj }) =>
            geographies.map((geo, i) =>  {

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
  );
};

export default MapChart;