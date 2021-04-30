import { useContext, useRef, useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Close";
import MoreIcon from "@material-ui/icons/MoreVert";
import TimerIcon from "@material-ui/icons/Timer";
import TargetIcon from "@material-ui/icons/MyLocation";
import ComboBox from "./ComboBox";
import BottomToolbar from "./BottomToolbar";
import MoreTools from "./MoreTools";
import { CreateTableContext } from "./CreateTableContext";
import useTableFormStyles from "../../styles/useTableFormStyles";
import usePositionButtons from "../../hooks/usePositionButtons";
import { getElement } from "../../utils/dom-queries";
import getIdFromFieldId from "../../utils/get-id-from-field-id";

const CreateTableForm = () => {
  const { breakpoints } = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useTableFormStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [disableUnderline, setDisableUnderline] = useState(true);
  const [focusedField, setFocusedField] = useState({ name: "", filled: false });

  const {
    values,
    setTitle,
    setFieldName,
    addField,
    removeField,
    handleSubmit
  } = useContext(CreateTableContext);

  usePositionButtons({ focusedField, buttonsRef, dialogRef });

  const handleAddField = () => {
    addField(getIdFromFieldId(focusedField.name));
  };

  const handleRemoveField = () => {
    const id = getIdFromFieldId(focusedField.name);

    const fieldContainer = getElement(`#${id}`);

    values.fields.length > 1 && removeField(id);

    fieldContainer?.previousElementSibling
      ?.querySelector<HTMLInputElement>("input")
      ?.focus();

    fieldContainer?.nextElementSibling
      ?.querySelector<HTMLInputElement>("input")
      ?.focus();
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleFocus = (event: React.FocusEvent<HTMLFormElement>) => {};

  const handleInput = (event: React.ChangeEvent<HTMLFormElement>) => {
    setFieldName(getIdFromFieldId(event.target.id), event.target.value);
  };

  return (
    <Container
      maxWidth="sm"
      disableGutters={mobile}
      className={classes.container}
    >
      <div
        ref={buttonsRef}
        className="inc-dec-buttons"
        style={!focusedField.name ? { visibility: "hidden" } : undefined}
      >
        <IconButton
          size="small"
          aria-label="remove field"
          onClick={handleRemoveField}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          size="small"
          aria-label="add new field"
          onClick={handleAddField}
          className={!focusedField.filled ? classes.hideBtn : undefined}
        >
          <AddIcon />
        </IconButton>
      </div>
      <Paper variant="outlined" className={classes.paper}>
        <Toolbar disableGutters>
          <Input
            id="title"
            name="title"
            value={values.title}
            disableUnderline={disableUnderline}
            onChange={event => setTitle(event.target.value)}
            onFocus={() => setDisableUnderline(false)}
            onBlur={() => setDisableUnderline(true)}
          />
          <IconButton aria-label="more options" onClick={handleOpenMenu}>
            <MoreIcon />
          </IconButton>
          <MoreTools anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </Toolbar>
        <form
          onFocus={handleFocus}
          onChange={handleInput}
          onSubmit={handleSubmit}
        >
          {values.fields.map(({ _id, name, type }) => (
            <div id={_id} className={classes.fields} key={_id}>
              <TextField
                id={`field-name-${_id}`}
                name={`field-name-${_id}`}
                label="Field Name"
                value={name}
                placeholder="ex. Full Name"
                variant="outlined"
                size="small"
                margin="normal"
                autoComplete="off"
                autoCapitalize="word"
                aria-required
                autoFocus
                fullWidth
              />
              <ComboBox type={type} fieldID={_id} mobile={mobile} />
            </div>
          ))}
          <BottomToolbar />
        </form>
      </Paper>
      <div className={classes.options}>
        {values.deadline && (
          <Typography variant="caption" component="p">
            <TimerIcon fontSize="small" color="action" />
            <span>
              Deadline set to&nbsp;
              <span className="values">{values.deadline}</span>
            </span>
          </Typography>
        )}
        {values.target && (
          <Typography variant="caption" component="p">
            <TargetIcon fontSize="small" color="action" />
            <span>
              Target set to&nbsp;
              <span className="values">{values.target}</span>
            </span>
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default CreateTableForm;
