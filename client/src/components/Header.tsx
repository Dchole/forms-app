import { useState, lazy } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import useHeaderStyles from "../styles/useHeaderStyles";

const PopupMenu = lazy(() => import("./PopupMenu"));

const Header = () => {
  const classes = useHeaderStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title}>Lorem</Typography>
        <IconButton aria-label="menu" onClick={handleOpen}>
          <Avatar />
        </IconButton>
        <PopupMenu anchorEl={anchorEl} handleClose={handleClose} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
