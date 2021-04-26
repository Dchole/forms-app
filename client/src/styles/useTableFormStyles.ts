import { makeStyles, createStyles } from "@material-ui/core/styles";

const useTableFormStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default
    },
    container: {
      height: "100vh",
      position: "relative",

      [theme.breakpoints.up("sm")]: {
        marginTop: 100
      },

      "& .inc-dec-buttons": {
        position: "relative",

        "& .MuiIconButton-root": {
          border: `2px solid ${theme.palette.divider}`,
          position: "absolute",
          top: 2,
          opacity: 1,
          transition: `${theme.transitions.create("opacity", {
            duration: theme.transitions.duration.shortest,
            easing: theme.transitions.easing.easeOut
          })}, ${theme.transitions.create("display", {
            delay: theme.transitions.duration.shortest
          })}`,

          "&:first-child": {
            left: "0",
            transform: "translateX(-140%)"
          },

          "&:nth-child(2)": {
            right: "0",
            transform: "translateX(140%)"
          }
        }
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
    },
    previewBtn: {
      transform: "translateY(24%)"
    },
    options: {
      marginTop: theme.spacing(2),

      "& .MuiTypography-root": {
        display: "flex",
        gap: theme.spacing(1),
        marginBottom: theme.spacing(0.5),
        alignItems: "center",

        "& .values": {
          color: theme.palette.secondary.dark,
          fontWeight: 500
        }
      }
    },
    hideBtn: {
      opacity: 0,
      display: "none"
    }
  })
);

export default useTableFormStyles;
