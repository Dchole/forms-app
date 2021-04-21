export const getElement = <ElementType extends Element>(selector: string) =>
  document.querySelector<ElementType>(selector);

export const getElementYPosition = (element: Element) =>
  element.getBoundingClientRect().y;
