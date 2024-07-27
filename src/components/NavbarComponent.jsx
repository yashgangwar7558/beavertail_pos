import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { styled } from "@mui/material/styles";
import logo from "../assets/logo/greenCactusAi.png"; 
import { Typography } from "@mui/material";

const LogoWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center', 
});

const LogoImage = styled('img')({
  height: '45px', 
  marginRight: '0px',
});

const LogoLabelMain = styled(Typography)({
  color: '#ffffff', 
});

const NavbarComponent = () => {
  return (
    <Navbar 
      expand="lg" 
      className="fixed-top"
      style={{ backgroundColor: '#121B28', padding: '5px 0px' }}
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <LogoWrapper>
            <LogoImage src={logo} alt='logo' />
            <LogoLabelMain variant='body1' style={{ fontSize: '30px', color: '#9CFCD8', fontFamily: 'Helvetica' }}>
              cactus.ai
            </LogoLabelMain>
          </LogoWrapper>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Uncomment and add Nav items here if needed */}
            {/* <Nav.Link href="#home">Home</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
