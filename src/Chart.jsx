import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Chart from "react-google-charts";
import Loading from "./Loading";
const Charts = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [regionFilter, setRegionFilter] = useState("All");
  useEffect(() => {
    setIsLoading(true);
    const fetchChartInfo = async () => {
      let res = await axios.get(`${process.env.REACT_API_CALL}/chart`, {
        params: {
          region: regionFilter
        }
      });
      if (res) {
        let chartInfo = res.data.data;
        chartInfo.unshift(["Month", "Sales"]);
        setChartData(chartInfo);
        setIsLoading(false);
      }
    };
    fetchChartInfo();
  }, [regionFilter]);

  const handleChange = (e) => {
    console.log("0000", e.target.value);
    setRegionFilter(e.target.value);
  };
  return (
    <>
      <div className="home-link">
        <Link to="/">Home</Link>
      </div>
      {!isLoading ? (
        <>
          <select
            name="fuel"
            value={regionFilter}
            onChange={(e) => handleChange(e)}
          >
            <option value="All">All</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
          <Chart
            width={"100%"}
            height={"500px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={chartData}
            options={{
              // Material design options
              title: "Policy Performance 2018",
              subtitle: "Policy sales month wise",
              is3D: true,
              backgroundColor: { fill: "transparent" },

              hAxis: {
                title: "Sales",
                minValue: 0
              }
            }}
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Charts;
