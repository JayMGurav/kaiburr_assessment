// import { useMemo } from "react";
import { Chart } from "react-google-charts";

function PieChart ({data}) {
    const cdata = [["Category", "products"]];
    Object.keys(data)?.forEach((key) => {
        cdata.push([key, data[key]])
    })

    return (
      <Chart
        chartType="PieChart"
        data={cdata}
        options={{title:"Product category sold"}}
        width={"100%"}
        height={"400px"}
      />
    );
  }
  

export default PieChart;