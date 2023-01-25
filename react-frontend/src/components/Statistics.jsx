import ReactEcharts from "echarts-for-react"
import { Outlet, Link } from "react-router-dom";

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: ["Judo", "Freestyle", "Wrestling", "Greco-Roman Wrestling", "Brazilian Jiu-jitsu", "Sambo"],
    },
    yAxis: {
      type: "value",

    },
    series: [
      {
        data: [1234, 875, 765, 563, 543, 240, 280],
        type: "bar",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  }
  
  function Stats() {
    return (
        <div>
            <h1>Most popular grappling sport</h1>
            <h5>According to the number of professional grapplers</h5>
      <ReactEcharts
        option={options}
        style={{ width: "1200px", height: "700px" }}
      ></ReactEcharts>
      <Link className="nav-link" aria-current="page" to="/stats">
      According to countries
                     </Link>
                     <Link className="nav-link" aria-current="page" to="/stat3">
                     The percentage of rulesets in tournaments
                     </Link>

      </div>
      
    )
  }

  

  export default Stats