import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 140;

const useStyles = makeStyles(() => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  listItem: {
    minWidth: "unset",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  logoutButton: {
    marginTop: "auto",
    color: "white",
    backgroundColor: "#f50057",
    "&:hover": {
      backgroundColor: "#d50000",
    },
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("userData");
    history.push("/login");
  };

  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem button component={Link} to="/dashboard" className={classes.listItem}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {userData && userData.userType === "ADMIN" && (
          <ListItem button component={Link} to="/registerUser" className={classes.listItem}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Register User" />
          </ListItem>
        )}
        <ListItem button component={Link} to="/registerPoint" className={classes.listItem}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Register Point" />
        </ListItem>
        <Divider />
      </List>
      <Button
        className={`${classes.logoutButton} ${classes.listItem}`}
        onClick={handleLogout}
        variant="contained"
        fullWidth
        startIcon={<LogoutIcon />}
      >
        Logout
      </Button>
      <ListItem button onClick={handleLogout} className={classes.listItem}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>

    </Drawer>
  );
};

export default Sidebar;
