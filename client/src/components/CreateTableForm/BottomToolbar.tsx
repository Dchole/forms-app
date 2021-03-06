import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PreviewIcon from "@material-ui/icons/Visibility";
import useTableFormStyles from "../../styles/useTableFormStyles";

interface IBottomToolbarProps {
  handleClose: () => void;
}

const BottomToolbar: React.FC<IBottomToolbarProps> = ({ handleClose }) => {
  const classes = useTableFormStyles();

  return (
    <Toolbar disableGutters>
      <IconButton aria-label="set deadline" className={classes.previewBtn}>
        <PreviewIcon />
      </IconButton>
      <div className={classes.actions}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="primary" variant="contained" type="submit">
          Create Table
        </Button>
      </div>
    </Toolbar>
  );
};

export default BottomToolbar;
