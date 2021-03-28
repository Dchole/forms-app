import { forwardRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      fullScreen
    >
      <Container
        maxWidth="xs"
        disableGutters={mobile}
        className={classes.container}
      >
        <Paper variant="outlined" className={classes.paper}>
          <Typography
            variant="h5"
            component="h2"
            align={mobile ? "center" : "left"}
          >
            Enter Table Data
          </Typography>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form>
              <Field
                component={TextField}
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                margin="normal"
                autoComplete="off"
                autoCapitalize="word"
                autoFocus
                fullWidth
              />
              <Field
                component={TextField}
                id="fields"
                helperText="Separate fields with comma"
                name="fields"
                label="Fields"
                placeholder="Name, Email, Tel, etc..."
                variant="outlined"
                margin="normal"
                autoComplete="off"
                fullWidth
              />
              <div className={classes.actions}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="primary" variant="contained" type="submit">
                  Save & Continue
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
