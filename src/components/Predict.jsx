import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Predict = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [predictedWeather, setPredictedWeather] = useState("");

  const handleFormSubmit = (values) => {
    // Extracting feature values
    const { precipitation, tempMax, tempMin, wind } = values;

    // Coefficients
    const intercept = 1.70;
    const coefPrecip = -0.04;
    const coefTempMax = 0.11;
    const coefTempMin = -0.11;
    const coefWind = 0.06;

    // Calculate linear combination
    const linearCombination =
      intercept +
      coefPrecip * precipitation +
      coefTempMax * tempMax +
      coefTempMin * tempMin +
      coefWind * wind;

    // Calculate probability using logistic function
    const probability = 1 / (1 + Math.exp(linearCombination));

    // Determine predicted weather
    const predictedWeather = probability > 0.5 ? "rain" : "sun";

    // Set predicted weather state
    setPredictedWeather(predictedWeather);
  };

  return (
    <Box display="flex" justifyContent="center" p={"2rem"} mb={"auto"}>
      <Box
        border={`1px solid hsla(86, 8.47%, 88.43%, 0.85)`}
        p={"2rem"}
        sx={{ background: "#fff" }}
        borderRadius={"1rem"}
      >
        <Button
          component={Link}
          to="/verify/dashboard"
          sx={{ margin: "-0.5rem", fontWeight: "bold" }}
        >
          <ArrowBackIosIcon /> dashboard
        </Button>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={{
            precipitation: "",
            tempMax: "",
            tempMin: "",
            wind: "",
          }}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="0.7rem"
                width={350}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <h1
                  style={{
                    fontWeight: "bold",
                    width: "25rem",
                  }}
                >
                  Prediction Analysis
                </h1>
                {Object.keys(values).map((field, index) => (
                  <TextField
                    key={index}
                    fullWidth
                    type="text"
                    label={field.replace(/([A-Z])/g, " $1").toLowerCase()}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values[field]}
                    name={field}
                    error={!!touched[field] && !!errors[field]}
                    helperText={touched[field] && errors[field]}
                    sx={{ gridColumn: "span 4" }}
                  />
                ))}
              </Box>
              <Box display="flex" justifyContent="center" mt="20px">
                <Button
                  type="submit"
                  sx={{
                    color: "#fff",
                    backgroundColor: "#000",
                    "&:hover": {
                      backgroundColor: "#222",
                    },
                    width: "100%",
                    height: "2.8rem",
                    borderRadius: "0.5rem",
                    fontSize: "1rem",
                  }}
                  variant="contained"
                >
                  Predict
                </Button>
              </Box>
              {predictedWeather && (
                <Box
                  display="flex"
                  justifyContent="center"
                  mt="20px"
                  fontWeight="bold"
                >
                  Predicted Weather: {predictedWeather}
                </Box>
              )}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  precipitation: yup.string().required("required"),
  tempMax: yup.string().required("required"),
  tempMin: yup.string().required("required"),
  wind: yup.string().required("required"),
});

export default Predict;
