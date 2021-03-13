import { makeStyles, createStyles } from "@material-ui/core/styles";

const useFormStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100vh",
      display: "grid",
      placeItems: "center",

      "& .MuiPaper-root": {
        padding: theme.spacing(2),
        borderRadius: 8,

        "& .MuiAvatar-root": {
          margin: theme.spacing(2, "auto"),
          backgroundColor: theme.palette.primary.main
        }
      }
    },
    button: {
      margin: theme.spacing(2, 0)
    }
  })
);

export default useFormStyles;
