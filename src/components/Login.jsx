import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, colors } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Login = (props) => {
  let newVariable = "";

  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch(`https://weather-server-pi.vercel.app/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      window.alert(responseData.message);
      newVariable = values.email;
      props.onLogin(newVariable);
      navigate(`./dashboard`, { replace: true });
    } catch (error) {
      window.alert("enter valid email or password");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={"10rem"}
      p={"2rem"}
      mb={"auto"}
    >
      <Box
        border={"1px solid hsla(86, 8.47%, 88.43%, 0.85)"}
        p={"2rem"}
        sx={{ background: "#fff" }}
        borderRadius={"1rem"}
      >
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
                gap="1rem"
                width={350}
                mb ={'1rem'}
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <h2 style={{ fontWeight: "1000", marginLeft: "8.5rem" }}>
                  LOGIN
                </h2>
                <TextField
                  fullWidth
                  type="email"
                  label="EMAIL"
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
                  type="password"
                  label="PASSWORD"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              dont have an account?{" "}
              <Button
                component={Link}
                to="/signup"
                sx={{ marginTop: "0rem", fontWeight: "bold" }}
              > sign up</Button>
              <Box display="flex" justifyContent="center" mt="0rem">
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
                  Login
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
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
