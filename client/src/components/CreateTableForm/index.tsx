import { forwardRef, useState } from "react";
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
import ComboBox from "./ComboBox";
import useTableFormStyles from "../../styles/useTableFormStyles";
import { Field, Form, Formik } from "formik";
import { handleSubmit, initialValues } from "../../lib/create-table-config";

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
  const mobile = useMediaQuery(breakpoints.down("xs"));
  const classes = useTableFormStyles();

  const [disableUnderline, setDisableUnderline] = useState(true);

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
        <Paper variant="outlined" className={classes.paper}>
          <Toolbar disableGutters>
            <Input
              value="Untitled Table"
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
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <div className={classes.fields}>
                <Field
                  component={TextField}
                  id="field"
                  name="field"
                  label="Field Name"
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
                <ComboBox mobile={mobile} />
              </div>
              <div className={classes.actions}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="primary" variant="contained" type="submit">
                  Create Table
                </Button>
              </div>
            </Form>
          </Formik>
        </Paper>
      </Container>
    </Dialog>
  );
};

export default CreateTableForm;
