import { lazy, useState } from "react";
import Layout from "../components/Layout";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import HelpIcon from "@material-ui/icons/HelpOutline";
import useHomeStyles from "../styles/useHomeStyles";

const CreateTableForm = lazy(() => import("../components/CreateTableForm"));

const Homepage = () => {
  const classes = useHomeStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <CreateTableForm open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default Homepage;
