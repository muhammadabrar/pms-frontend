import React from 'react';
import Chart from "react-apexcharts";

const RadialBar = ({success_rating}) => {
      var options = {
            series: [success_rating],
            chart: {
              height: 350,
              type: "radialBar",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              radialBar: {
                startAngle: 0,
                endAngle: 360,
                
                hollow: {
                  margin: 0,
                  size: "80%",
                  background: "#fff",
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: "front",
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24,
                  },
                },
                track: {
                  background: "#eee",
                  strokeWidth: "90%",
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 4,
                    opacity: 0.35,
                  },
                },
        
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -6,
                    show: true,
                    color: "#888",
                    fontSize: "16px",
                  },
                  value: {
                    formatter: function (val) {
                      return val + "%";
                    },
                    offsetY: 3,
        
                    color: success_rating<50? "#d73600": success_rating<70? "#d77600" : "#007d00",
                    fontSize: "24px",
                    show: true,
                  },
                },
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#7700b3"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
              },
            },
            stroke: {
              lineCap: "round",
            },
            labels: ["success"],
          };
        
      return (
            <div className="radialBar ">
          <Chart options={options} series={options.series}
          type="radialBar" />
        </div>
      );
}

export default RadialBar;
