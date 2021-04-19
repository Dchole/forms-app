import { makeStyles, createStyles } from "@material-ui/core/styles";

const useTableFormStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    },
    container: {
      height: "100vh",

      [theme.breakpoints.up("sm")]: {
        marginTop: 100
      }
    },
    paper: {
      width: "100%",
      height: "100vh",
      padding: theme.spacing(2),
      transition: theme.transitions.create("box-shadow", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.short
      }),

      [theme.breakpoints.up("sm")]: {
        height: "unset",
        width: "unset"
      },

      "&:focus-within": {
        boxShadow: theme.shadows[1]
      },

      "& .MuiToolbar-root": {
        minHeight: "fit-content",
        justifyContent: "space-between",
        alignItems: "center",

        "& input": {
          fontSize: "xx-large"
        }
      }
    },
    fields: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(2),
      flexDirection: "column",

      [theme.breakpoints.up("sm")]: {
        flexDirection: "row"
      }
    },
    actions: {
      display: "flex",
      gap: theme.spacing(2),
      justifyContent: "flex-end",
      marginTop: theme.spacing(2)
    }
  })
);

export default useTableFormStyles;
