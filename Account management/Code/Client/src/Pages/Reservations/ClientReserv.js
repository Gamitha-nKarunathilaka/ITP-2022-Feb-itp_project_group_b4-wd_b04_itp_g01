import { Container } from "@mui/material";
import React from "react";
import Header from "../../component/Menu/Header";
import Form from "./ReservationForm";
export default function ClientReserv() {
  return (
    <>
      <Header />
      <Container>
        <Form />
      </Container>
    </>
  );
}
