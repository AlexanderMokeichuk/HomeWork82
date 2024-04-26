import React from "react";
import {Container, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
      <header style={{background: "#A9A9A9"}}>
        <Container>
          <Link to={"/"} style={{
            textDecoration: "none",
            fontSize: 20,
            fontWeight: 600,
            color: "black"
          }}
          >
            Music
          </Link>
        </Container>
      </header>
      <Grid
        container
        minHeight={"100vh"}
        direction={"column"}
        sx={{background: "black"}}
      >
        <Container>
          {children}
        </Container>
      </Grid>
    </>
  );
};

export default Layout;