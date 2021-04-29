import { forwardRef, useRef, useState } from "react";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import useTableFormStyles from "../../styles/useTableFormStyles";
import usePositionButtons from "../../hooks/usePositionButtons";

interface ICreateTableFormProps {
  open: boolean;
  handleClose: () => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateFormDialog: React.FC<ICreateTableFormProps> = ({
  open,
  children,
  handleClose
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const classes = useTableFormStyles();

  const [focusedField, setFocusedField] = useState({ name: "", filled: false });

  usePositionButtons({ focusedField, buttonsRef, dialogRef });

  const handleClick = () => {
    if (
      document.activeElement?.classList.value.includes("MuiDialog") ||
      document.activeElement?.id === "title"
    ) {
      setFocusedField(f => ({ ...f, name: "" }));
    }
  };

  return (
    <Dialog
      ref={dialogRef}
      classes={{ paperFullScreen: classes.root }}
      open={open}
      onClose={handleClose}
      onClick={handleClick}
      TransitionComponent={Transition}
      fullScreen
    >
      {children}
    </Dialog>
  );
};

export default CreateFormDialog;
