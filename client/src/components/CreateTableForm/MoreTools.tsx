import { useContext, useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TimerIcon from "@material-ui/icons/Timer";
import TargetIcon from "@material-ui/icons/MyLocation";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { CreateTableContext } from "./CreateTableContext";

interface IMoreToolsProps {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    infoIcon: {
      display: "flex",
      alignItems: "center",
      marginLeft: 50
    },
    picker: {
      display: "none"
    }
  })
);

const MoreTools: React.FC<IMoreToolsProps> = ({ anchorEl, handleClose }) => {
  const classes = useStyles();
  const { values, setDeadline } = useContext(CreateTableContext);

  const [isDateSettingOpen, setIsDateSettingOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(values.deadline);

  const handleDate = (date: MaterialUiPickersDate) => {
    const newDate = date?.toDateString();
    setSelectedDate(newDate);
    setDeadline(newDate);
  };

  const handleSettingOpen = () => setIsDateSettingOpen(true);
  const handleSettingClose = () => setIsDateSettingOpen(false);

  useEffect(() => {
    document
      .getElementById("set-deadline")
      ?.parentElement?.parentElement?.remove();
  }, []);

  return (
    <Menu
      id="more-tools-menu"
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      <MenuItem onClick={handleSettingOpen}>
        <ListItemIcon>
          <TimerIcon />
        </ListItemIcon>
        <ListItemText primary="Set Deadline" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <TargetIcon />
        </ListItemIcon>
        <ListItemText primary="Set Target" />
        <div className={classes.infoIcon}>
          <InfoIcon fontSize="small" color="action" />
        </div>
      </MenuItem>
      <DatePicker
        variant="dialog"
        id="set-deadline"
        className={classes.picker}
        open={isDateSettingOpen}
        onOpen={handleSettingOpen}
        onClose={handleSettingClose}
        format="d MMM yyyy"
        value={selectedDate}
        onChange={handleDate}
        onAccept={handleDate}
        showTodayButton
        clearable
        disablePast
      />
    </Menu>
  );
};

export default MoreTools;
