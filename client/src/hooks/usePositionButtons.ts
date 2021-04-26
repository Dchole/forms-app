import transitions from "@material-ui/core/styles/transitions";
import { useEffect, useRef } from "react";
import { getElement, getElementYPosition } from "../utils/dom-queries";

interface IPositionButtonsProps {
  focusedField: { name: string; filled: boolean };
  buttonsRef: React.RefObject<HTMLDivElement>;
  dialogRef: React.RefObject<HTMLDivElement>;
}

const usePositionButtons = ({
  focusedField,
  buttonsRef,
  dialogRef
}: IPositionButtonsProps) => {
  const buttonsRelativePosition = useRef<number>(0);

  useEffect(() => {
    if (focusedField.name) {
      const buttons = buttonsRef.current;
      const focusedFieldElement = getElement(`#${focusedField.name}`);

      if (buttons && focusedFieldElement && dialogRef.current) {
        if (
          dialogRef.current
            .querySelector(".MuiDialog-scrollPaper")
            ?.getAnimations()[0]?.pending
        ) {
          buttonsRelativePosition.current = 0;
        }

        const buttonsYPosition = getElementYPosition(
          buttons,
          dialogRef.current
        );
        const focusedFieldYPosition = getElementYPosition(
          focusedFieldElement,
          dialogRef.current
        );

        const displacement = focusedFieldYPosition - buttonsYPosition;

        const newButtonsRelativePosition =
          buttonsRelativePosition.current + displacement;

        buttons.animate(
          [
            { transform: `translateY(${buttonsRelativePosition.current}px)` },
            { transform: `translateY(${newButtonsRelativePosition}px)` }
          ],
          {
            duration: transitions.duration.shortest,
            easing: transitions.easing.easeOut,
            fill: "forwards"
          }
        );

        buttonsRelativePosition.current = newButtonsRelativePosition;
      }
    }
  }, [focusedField.name, buttonsRef, dialogRef]);

  return true;
};

export default usePositionButtons;
