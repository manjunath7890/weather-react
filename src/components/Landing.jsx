import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import GetApp from "@mui/icons-material/Search";
import DataBox from "./DataBox";
import LocationComponent from "./Location";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForecastChart from "./Graph";

function Landing() {
  const styles = {
    container: {
      textAlign: "center",
      background: "hsla(86, 8.47%, 88.43%, 0.85)",
    },
    forecastContainer: {
      display: "flex",
      textAlign: "left",
      padding: "20px",
    },
    header: {
      marginTop: "1.5rem",
      marginBottom: "0rem",
    },
    subheader: {
      marginTop: "0.8rem",
      marginBottom: "0rem",
      fontWeight: '500'
    },
    rowEven: {
      backgroundColor: "#fafafa",
      padding: "10px",
    },
    rowOdd: {
      backgroundColor: "#eeeeee",
      padding: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0px 4px 6px -2px #00000008, 0px 12px 16px -4px #00000014",
    },
    tableHeader: {
      padding: "1.5rem",
      border: "1px solid #ddd",
      backgroundColor: "#f2f2f2",
      width: '9rem'
    },
    tableDataTime: {
      padding: "0.5rem",
      border: "1px solid #ddd",
      fontSize: "0.9rem",
      fontWeight: "600",
      paddingLeft: "1rem",
    },
    tableData: {
      padding: "0.5rem",
      border: "1px solid #ddd",
      fontSize: "0.9rem",
      paddingLeft: "1rem",
    },
    error: {
      color: "red",
      marginTop: "1rem",
    }
  };

  const [forecastData, setForecastData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleIdSubmit = (event) => {
    event.preventDefault();
    const userId = document.getElementById("vehicle-id").value;
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userId}?unitGroup=uk&key=Q7HM8YAQJGBX4HF65DF42PV4N&contentType=json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid place name. Please try again.");
        }
      })
      .then((data) => {
        setForecastData(data);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bengaluru?unitGroup=uk&key=Q7HM8YAQJGBX4HF65DF42PV4N&contentType=json`

    )
      .then((response) => response.json())
      .then((data) => {
        setForecastData(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);


  return (
    <div style={styles.container}>
      {forecastData ? (
        <div>
        <div style={styles.forecastContainer}>
          <Box width={"40rem"} paddingX={"0rem"}>
            <form onSubmit={handleIdSubmit}>
              <Box display={"flex"} alignContent={"center"} mt={"1rem"}>
                <TextField
                  id="vehicle-id"
                  label="Search"
                  variant="outlined"
                  size="small"
                  sx={{ width: "12rem" }}
                />
                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    border: `1px solid #fff`,
                    marginLeft: "1rem",
                    background: "#000",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      background: "#222",
                      border: "0px",
                    },
                  }}
                >
                  <GetApp style={{ fontSize: "1.7rem" }} />
                </Button>

                <Button
                  component={Link}
                  to="/verify"
                  sx={{
                    color: "#000",
                    border: `1px solid #000`,
                    marginLeft: "1rem",
                    background: "#fff",
                    borderRadius: "0.5rem",
                    fontWeight:'bold',
                    "&:hover": {
                      background: "#fff",
                    },
                  }}
                >
                  <AccountCircleIcon style={{ fontSize: "1.7rem", marginRight:'0.3rem' }}/>  login
                </Button>
              </Box>
            </form>
            <LocationComponent />
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            <h1 style={styles.header}>{forecastData.resolvedAddress}</h1>
            <h4 style={styles.subheader}>
              {forecastData.latitude}, {forecastData.longitude}
            </h4>
            <Box display={"flex"}>
              <DataBox
                heading={"Temperature"}
                data={`${(forecastData.currentConditions.temp).toFixed(1)} °C`}
              />
              <DataBox
                heading={"Humidity"}
                data={`${forecastData.currentConditions.humidity} %`}
              />
            </Box>
            <Box display={"flex"}>
              <DataBox
                heading={"Rain fall"}
                data={`${forecastData.currentConditions.precip} mm`}
              />
              <DataBox
                heading={"cloud coverage"}
                data={`${forecastData.currentConditions.cloudcover} %`}
              />
            </Box>
            <Box display={"flex"}>
              <DataBox
                heading={"wind speed"}
                data={`${forecastData.currentConditions.windspeed} km/h`}
              />
              <DataBox
                heading={"Atmospheric pressure"}
                data={`${forecastData.currentConditions.pressure} hPa`}
              />
            </Box>
            <Box display={"flex"}>
              <DataBox
                heading={"Alerts"}
                data={forecastData.description}
                color={"#ff0000"}
                height={'11rem'}
              />
            </Box>
          </Box>
          <div>
            <h2 style={{ marginTop: "0rem" }}>Dialy Forecast:</h2>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Temperature (°C)</th>
                  <th style={styles.tableHeader}>Humidity (%)</th>
                  <th style={styles.tableHeader}>Rain fall (mm)</th>
                  <th style={styles.tableHeader}>Wind Speed (km/h)</th>
                  <th style={styles.tableHeader}>Conditions </th>
                </tr>
              </thead>
              <tbody>
                {forecastData.days.map((day, index) => (
                  <tr
                    key={day.datetime}
                    style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                  >
                    <td style={styles.tableData}>{day.datetime}</td>
                    <td style={styles.tableData}>
                      {(day.tempmin).toFixed(1)} -{" "}
                      {(day.tempmax).toFixed(1)}
                    </td>
                    <td style={styles.tableData}>{day.humidity}</td>
                    <td style={styles.tableData}>{day.precip}</td>
                    <td style={styles.tableData}>{day.windspeed}</td>
                    <td style={styles.tableData}>{day.conditions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ForecastChart forecastData={forecastData} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Landing;
