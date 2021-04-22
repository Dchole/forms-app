import { forwardRef, useEffect, useRef, useState } from "react";
import { customAlphabet } from "nanoid";
import { lowercase } from "nanoid-dictionary";
import { Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import PreviewIcon from "@material-ui/icons/Visibility";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Close";
import ComboBox from "./ComboBox";
import useTableFormStyles from "../../styles/useTableFormStyles";
import { getElement, getElementYPosition } from "../../utils/dom-queries";

interface ICreateTableFormProps {
  open: boolean;
  handleClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTableForm: React.FC<ICreateTableFormProps> = ({
  open,
  handleClose
}) => {
  const { breakpoints, transitions } = useTheme();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const buttonsRelativePosition = useRef<number>(0);
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useTableFormStyles();

  const nanoid = customAlphabet(lowercase, 10);
  const [fields, setFields] = useState([nanoid()]);
  const [disableUnderline, setDisableUnderline] = useState(true);
  const [focusedField, setFocusedField] = useState({ name: "", filled: false });

  const addField = () => {
    setFields(f => [...f, nanoid()]);
  };

  const removeField = () => {
    if (fields.length > 1) {
      const copyFields = fields.filter(field => field !== focusedField.name);

      setFields(copyFields);

      const lastField = copyFields[copyFields.length - 1];

      setFocusedField(f => ({
        ...f,
        name: lastField
      }));

      getElement<HTMLInputElement>(`#${lastField}`)?.focus();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLFormElement>) => {
    setFocusedField(f => ({ ...f, name: event.target.id }));

    // Check if field has value
    Boolean(event.target.value)
      ? setFocusedField(f => ({ ...f, filled: true }))
      : setFocusedField(f => ({ ...f, filled: false }));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    Boolean(event.target.value)
      ? setFocusedField(f => ({ ...f, filled: true }))
      : setFocusedField(f => ({ ...f, filled: false }));
  };

  useEffect(() => {
    if (focusedField.name) {
      const buttons = buttonsRef.current;
      const focusedFieldElement = getElement<HTMLInputElement>(
        `#${focusedField.name}`
      );

      if (buttons && focusedFieldElement && dialogRef.current) {
        const buttonsYPosition = getElementYPosition(
          buttons,
          dialogRef.current
        );
        const focusedFieldYPosition = getElementYPosition(
          focusedFieldElement,
          dialogRef.current
        );

        const displacement = focusedFieldYPosition - buttonsYPosition;

        console.log(buttonsYPosition, focusedFieldYPosition, displacement);

        const newButtonsRelativePosition =
          buttonsRelativePosition.current + displacement;

        buttons.animate(
          [
            { transform: `translateY(${buttonsRelativePosition.current}px)` },
            { transform: `translateY(${newButtonsRelativePosition}px)` }
          ],
          {
            duration: transitions.duration.shortest,
            easing: transitions.easing.easeOut,
            fill: "forwards"
          }
        );

        buttonsRelativePosition.current = newButtonsRelativePosition;

        if (!open) buttonsRelativePosition.current = 0.5;
      }
    }
  }, [focusedField.name, transitions, open]);

  return (
    <Dialog
      ref={dialogRef}
      classes={{ paperFullScreen: classes.root }}
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen
    >
      <Container
        maxWidth="sm"
        disableGutters={mobile}
        className={classes.container}
      >
        <div ref={buttonsRef} className="inc-dec-buttons">
          <IconButton
            size="small"
            aria-label="remove field"
            onClick={removeField}
            style={
              fields.length > 1 && focusedField
                ? undefined
                : { visibility: "hidden" }
            }
          >
            <RemoveIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="add new field"
            onClick={addField}
            style={focusedField.filled ? undefined : { visibility: "hidden" }}
          >
            <AddIcon />
          </IconButton>
        </div>
        <Paper variant="outlined" className={classes.paper}>
          <Toolbar disableGutters>
            <Input
              ref={titleRef}
              defaultValue="Untitled Table"
              disableUnderline={disableUnderline}
              onFocus={() => setDisableUnderline(false)}
              onBlur={() => setDisableUnderline(true)}
            />
            <IconButton
              component={Link}
              to="/preview?slug"
              aria-label="show preview"
              role={undefined}
            >
              <PreviewIcon />
            </IconButton>
          </Toolbar>
          <form onFocus={handleFocus}>
            {fields.map(field => (
              <div className={classes.fields} key={field}>
                <TextField
                  id={`field-name-${field}`}
                  name={`field-name-${field}`}
                  label="Field Name"
                  placeholder="ex. Full Name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  autoComplete="off"
                  autoCapitalize="word"
                  onChange={handleInput}
                  aria-required
                  autoFocus
                  fullWidth
                />
                <ComboBox mobile={mobile} fieldID={field} />
              </div>
            ))}
            <div className={classes.actions}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button color="primary" variant="contained" type="submit">
                Create Table
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </Dialog>
  );
};

export default CreateTableForm;
