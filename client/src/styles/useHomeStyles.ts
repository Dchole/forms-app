import { makeStyles, createStyles } from "@material-ui/core/styles";

const useHomeStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    main: {
      padding: theme.spacing(3),
      width: "min(360px, 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: theme.spacing(3)
    },
    fab: {
      position: "absolute",
      bottom: 40,
      right: theme.spacing(2)
    }
  })
);

export default useHomeStyles;
