import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { RiAdminFill } from "react-icons/ri";
import LoginForm from "../../Features/LoginForm";

const Login = () => {
  return (
    <Box>
      <Box
        component="div"
        sx={{
          position: "absolute",
          backgroundColor: "#5e17eb",
          height: "100vh",
          mt: 0,
          width: "35%",
          zIndex: "-1",
        }}
      ></Box>
      <Box width="100%" px="7%" py="7%">
        <Box
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
          height="70vh"
          bgcolor="transparent"
        >
          <Grid container>
            <Grid
              md={4}
              height="70vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap="20px"
              px={4}
              textAlign="center"
              zIndex={1000}
            >
              <RiAdminFill className="text-9xl" />
              <Typography fontWeight="bold" fontSize="24px">
                Admin Panel for Ecommerce Website
              </Typography>
            </Grid>
            <Grid
              md={8}
              px="10%"
              display="flex"
              flexDirection="column"
              gap="20px"
              pt={10}
              textAlign="center"
            >
              <Typography fontWeight="Bold" fontSize="20px">
                Admin Login
              </Typography>
              <LoginForm />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
