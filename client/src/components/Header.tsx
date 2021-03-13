import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import useHeaderStyles from "../styles/useHeaderStyles";

const Header = () => {
  const classes = useHeaderStyles();

  return (
    <AppBar>
      <Toolbar>
        <Typography className={classes.title}>Lorem</Typography>
        {/* @ts-ignore */}
        <IconButton component={Link} aria-label="<username>">
          <Avatar />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
