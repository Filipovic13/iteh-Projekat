import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Country", "Popularity"],
  ["Japan", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["Australia", 600],
  ["RU", 700],
  ["Poland", 200],
];
  
function Stats() {
  return (
  
    <Chart
    

      chartEvents={[
        {
          eventName: "select",
          callback: ({ chartWrapper }) => {
            const chart = chartWrapper.getChart();
            const selection = chart.getSelection();
            if (selection.length === 0) return;
            const region = data[selection[0].row + 1];
            console.log("Selected : " + region);
          },
        },
      ]}
      chartType="GeoChart"
      width="1200px"
      height="860px"
      data={data}
    />
  
  );
}


  

  export default Stats
