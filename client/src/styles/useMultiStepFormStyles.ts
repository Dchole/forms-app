import { makeStyles, createStyles } from "@material-ui/core/styles";

const useMultiStepFormStyles = makeStyles(theme =>
  createStyles({
    stepper: {
      padding: theme.spacing(0, 3, 3)
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: theme.spacing(2),

      "& .MuiButton-root": {
        margin: theme.spacing(2, 0)
      }
    }
  })
);

export default useMultiStepFormStyles;
