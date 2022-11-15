import ReactEcharts from "echarts-for-react"

  const options = {
    grid: { top: 20, right: 40, bottom: 20, left: 40 },
    xAxis: {
      type: "category",
      data: ["Brazil", "USA", "UAE", "UK", "Australia", "Japan", "Poland"],
    },
    yAxis: {
      type: "value",

    },
    series: [
      {
        data: [1234, 875, 765, 563, 543, 540, 280],
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
            <h1>A list of countries where BJJ is most popular</h1>
            <h5>According to the number of professional grapplers</h5>
      <ReactEcharts
        option={options}
        style={{ width: "1200px", height: "700px" }}
      ></ReactEcharts>
      </div>
    )
  }

  

  export default Stats
