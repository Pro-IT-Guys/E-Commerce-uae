import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";
import React from "react";
import LoginForm from "../../src/components/Auth/LoginForm";
import MainLayout from "../../src/layouts/main";




export default function login() {

  return (

    <MainLayout>
      <Container maxWidth='md'>
        <div className="pt-40 mb-10">
          <LoginForm />
        </div>
      </Container>

    </MainLayout>
  );
};


