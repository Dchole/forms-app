import { makeStyles, createStyles } from "@material-ui/core/styles";

const useFormStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: "100vh",
      display: "grid",
      placeItems: "center",

      "& h1": {
        marginBottom: theme.spacing(3)
      },

      "& main.MuiPaper-root": {
        padding: theme.spacing(2),
        borderRadius: 8,
        width: "100%",
        height: "100vh",

        "& .MuiAvatar-root": {
          margin: theme.spacing(2, "auto"),
          backgroundColor: theme.palette.primary.main
        },

        [theme.breakpoints.up("sm")]: {
          height: "unset"
        }
      }
    },
    button: {
      margin: theme.spacing(2, 0)
    }
  })
);

export default useFormStyles;
