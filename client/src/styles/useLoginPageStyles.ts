import { makeStyles, createStyles } from "@material-ui/core/styles";

const useLoginPageStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100vh",
      display: "grid",
      placeItems: "center"
    },
    paper: {
      padding: theme.spacing(2)
    }
  })
);

export default useLoginPageStyles;
