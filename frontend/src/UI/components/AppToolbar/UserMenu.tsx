import React from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {Avatar, Box, Button, SwipeableDrawer} from "@mui/material";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../features/Users/usersThunks";

const UserMenu: React.FC = () => {
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
    <Box sx={{ width: 250, paddingLeft: 2}} role="presentation" onClick={toggleDrawer(false)}>
      <List>

      </List>
      <Divider />
      <List>
        <Button color="inherit" onClick={handelLogout}>
          Logout
        </Button>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><Avatar src="/broken-image.jpg" /></Button>
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
