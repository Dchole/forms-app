import { lazy, useRef, useState } from "react";
import Layout from "../components/Layout";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import HelpIcon from "@material-ui/icons/HelpOutline";
import useHomeStyles from "../styles/useHomeStyles";
import CreateTableProvider from "../components/CreateTableForm/CreateTableContext";
import { useHistory } from "react-router-dom";
import generateId from "../utils/generate-id";
import Dialog from "../components/CreateTableForm/Dialog";

const CreateTableForm = lazy(() => import("../components/CreateTableForm"));

const Homepage = () => {
  const draftId = useRef(generateId());
  const { goBack } = useHistory();
  const classes = useHomeStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    window.history.pushState(
      "homepage",
      "prevPage",
      `/create-form/${draftId.current}`
    );
    setOpen(true);
  };
  const handleClose = () => {
    goBack();
    setOpen(false);
  };

  return (
    <Layout>
      <Typography variant="srOnly" component="h1">
        Something here
      </Typography>
      <Container className={classes.root}>
        <Paper component="main" className={classes.main}>
          <Typography variant="body1" align="center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            ipsam architecto itaque, nihil pariatur labore porro ad,
            consequuntur soluta necessitatibus nobis aperiam odit ipsa
            temporibus vero. Molestiae officia veritatis adipisci.
          </Typography>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Create new table
          </Button>
        </Paper>
        <Fab
          color="secondary"
          aria-label="Quick tutorial"
          className={classes.fab}
        >
          <HelpIcon />
        </Fab>
      </Container>
      <CreateTableProvider>
        <Dialog open={open} handleClose={handleClose}>
          <CreateTableForm />
        </Dialog>
      </CreateTableProvider>
    </Layout>
  );
};

export default Homepage;
