import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {Box, Button, IconButton, SwipeableDrawer} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/Users/usersThunks";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link as NavLink, Link} from "react-router-dom";
import {User} from "../../../type";

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handelLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      dispatch(logout());
    }
  };


  const DrawerList = (
    <Box
      sx={{
        backgroundColor: "black",
        border: 2,
        borderColor: "white",
        width: 250,
        padding: 2,
        height: "100%",
        paddingLeft: 2,
        display: "flex",
        flexDirection: "column"
    }}
         role="presentation"
         onClick={toggleDrawer(false)}
    >
      <List>
        <div style={{
          color: "white",
          display: "flex",
          gap: 3,
        }}
        >
          <strong>Role:</strong>
          <span>{user.role}</span>
        </div>
      </List>
      <List sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        <Link to={"/track_history"} style={{textDecoration: "none", color: "#FFF"}}>
          <Button color="inherit">
            History tracks
          </Button>
        </Link>

        <Link to={"/addNewArtist"} style={{textDecoration: "none", color: "#FFF"}}>
          <Button color="inherit">
            Add artist
          </Button>
        </Link>

        <Link to={"/addNewAlbum"} style={{textDecoration: "none", color: "#FFF"}}>
          <Button color="inherit">
            Add album
          </Button>
        </Link>

        <Link to={"/addNewTrack"} style={{textDecoration: "none", color: "#FFF"}}>
          <Button color="inherit">
            Add track
          </Button>
        </Link>
      </List>
      <Divider />
      <List sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "auto",
        padding: 2
      }}
      >
        <Button
          component={NavLink}
          to="/login"
          color="inherit"
          style={{color: "white"}}
        >
          Change account
        </Button>

        <Button color="warning" onClick={handelLogout}>
          Logout
        </Button>
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <span style={{fontSize: 14}}>{user.username}</span>
        <AccountCircleIcon/>
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {DrawerList}
      </SwipeableDrawer>
    </div>
  );
};

export default UserMenu;
