export const getElement = <ElementType extends Element>(selector: string) =>
  document.querySelector<ElementType>(selector);

export const getElementYPosition = (element: Element, parent: Element) =>
  element.getBoundingClientRect().y +
  parent.querySelector(".MuiDialog-paperFullScreen")!.scrollTop;
