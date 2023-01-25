import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Ruleset", "Tournament"],
  ["BJJ", 21],
  ["Judo", 44],
  ["Sambo", 32],
  ["Wrestling", 40],
];

export const options = {
  title: "The percentage of rulesets in tournaments",
  is3D: true,
};

 function Stat3() {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"800px"}
      height={"900px"}
    />
  );
}
export default Stat3
