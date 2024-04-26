import React from "react";
import {Container, Grid} from "@mui/material";

const Layout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
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
  );
};

export default Layout;