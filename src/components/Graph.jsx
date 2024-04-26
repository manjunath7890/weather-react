import React from "react";
import Chart from "react-apexcharts";

function ForecastChart({ forecastData }) {
  const chartData = forecastData.days.map((day) => ({
    x: new Date(day.datetime).toISOString().slice(0, 10),
    y: (day.precip),
  }));

  const options = {
    chart: {
      id: "forecast-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (val) {
          return new Date(val).toLocaleDateString();
        },
      },
    },
    yaxis: {
      title: {
        text: "rain fall (mm)",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy",
      },
    },
  };

  return (
    <div style={{background: '#fff', padding:'1rem'}}>
      <h2>Daily Rain fall Forecast</h2>
      <Chart options={options} series={[{ name: "Rain fall", data: chartData }]} type="area" height={350} />
    </div>
  );
}

export default ForecastChart;
