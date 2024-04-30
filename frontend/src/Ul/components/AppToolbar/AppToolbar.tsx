import {Button, Toolbar} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const AppToolbar: React.FC = () => {
  return (
    <Toolbar >
      <Button size={"small"} color="inherit">
        <Link to={"/register"} style={{textDecoration: "none"}}>Sign up</Link>
      </Button>

      <Button size={"small"} color="inherit">
        <Link to={"/login"} style={{textDecoration: "none"}}>Sign In</Link>
      </Button>
    </Toolbar>
  );
};

export default AppToolbar;