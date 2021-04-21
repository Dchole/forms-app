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
  const { breakpoints } = useTheme();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const buttonsYPosition = useRef<number>(0);
  const yDistance = useRef<number>(0);
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useTableFormStyles();

  const nanoid = customAlphabet(lowercase, 10);
  const [fields, setFields] = useState([nanoid()]);
  const [disableUnderline, setDisableUnderline] = useState(true);
  const [focusedField, setFocusedField] = useState({ name: "", filled: false });
  const [incremented, setIncremented] = useState(false);
  const [decremented, setDecremented] = useState(false);

  const addField = () => {
    setFields(f => [...f, nanoid()]);
    setIncremented(true);
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

      setDecremented(true);

      getElement<HTMLInputElement>(`#${lastField}`)?.focus();
    }
  };

  const handleFocused = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocusedField(f => ({ ...f, name: event.target.name }));

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
  };

  useEffect(() => {
    const lastField = fields[fields.length - 1];
    const prevField = fields[fields.length - 2];

    const prevFieldElement = getElement<HTMLInputElement>(`#${prevField}`);
    const lastFieldElement = getElement<HTMLInputElement>(`#${lastField}`);
    const buttons = getElement<HTMLButtonElement>(".inc-dec-buttons");

    if (prevFieldElement && lastFieldElement) {
      yDistance.current =
        getElementYPosition(lastFieldElement) -
        getElementYPosition(prevFieldElement);
    }

    const newButtonsYPosition = incremented
      ? buttonsYPosition.current + yDistance.current
      : decremented
      ? buttonsYPosition.current - yDistance.current
      : 0;

    if (incremented || decremented) {
      buttons?.animate(
        [
          { transform: `translateY(${buttonsYPosition.current}px)` },
          { transform: `translateY(${newButtonsYPosition}px)` }
        ],
        {
          duration: 150,
          easing: "ease-out",
          fill: "forwards"
        }
      );

      buttonsYPosition.current = newButtonsYPosition;
    }

    setIncremented(false);
    setDecremented(false);
  }, [fields, decremented, incremented]);

  return (
    <Dialog
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
        <div className="inc-dec-buttons">
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
          <form onSubmit={handleSubmit}>
            {fields.map(field => (
              <div className={classes.fields} key={field}>
                <TextField
                  id={field}
                  name={field}
                  label="Field Name"
                  placeholder="ex. Full Name"
                  variant="outlined"
                  size="small"
                  margin="normal"
                  autoComplete="off"
                  autoCapitalize="word"
                  onFocus={handleFocused}
                  onChange={handleInput}
                  aria-required
                  autoFocus
                  fullWidth
                />
                <ComboBox mobile={mobile} />
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
