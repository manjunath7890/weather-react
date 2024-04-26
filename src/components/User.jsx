import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch('https://weather-server-pi.vercel.app/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(values);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      window.alert(responseData.message);
      console.log("Data sent successfully:", responseData);
    } catch (error) {
      console.error("Error sending data:", error);
      window.alert("user already exist");
    }
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
          initialValues={initialValues}
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
                    width: "15rem",
                  }}
                >
                  SIGN UP
                </h1>
                <TextField
                  fullWidth
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  name="userName"
                  error={!!touched.userName && !!errors.userName}
                  helperText={touched.userName && errors.userName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Email Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                />
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
                  Create New User
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  userName: "",
  email: "",
  password: "",
};

export default Form;
