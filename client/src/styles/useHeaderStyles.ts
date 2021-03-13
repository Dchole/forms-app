import { makeStyles, createStyles } from "@material-ui/core/styles";

const useHeaderStyles = makeStyles(theme =>
  createStyles({
    title: {
      flexGrow: 1
    }
  })
);

export default useHeaderStyles;
