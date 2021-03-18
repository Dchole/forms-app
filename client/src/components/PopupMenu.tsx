import { Link, useHistory } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

interface IPopupMenuProps {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}

const PopupMenu: React.FC<IPopupMenuProps> = ({ anchorEl, handleClose }) => {
  const { replace } = useHistory();

  const handleLogout = () => {
    replace("/login");
    handleClose();
  };

  return (
    <Menu
      id="menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      keepMounted
    >
      <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText>Dashboard</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default PopupMenu;
