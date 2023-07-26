import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React from "react";
import SignUpForm from "../../src/components/Auth/SignUpForm";
import MainLayout from "../../src/layouts/main";

const signUp = () => {

  const ContentStyle = styled("div")(({ theme }) => ({
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.palette.background.default,
  }));

  return (

    <MainLayout>
      <Container maxWidth='md'>
        <div className="pt-40 mb-10">
          <SignUpForm />
        </div>
      </Container>

    </MainLayout>
  );
};

export default signUp;
