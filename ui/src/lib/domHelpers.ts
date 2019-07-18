export function classOnElement(domElement, className) {
  const classes = domElement.classList.value.split(" ");
  return classes.includes(className);
}

export function classInAncestry(domElement, className) {
  const onElement = classOnElement(domElement, className);

  if (onElement) {
    return true;
  }

  const hasParent = !!domElement.parentElement;

  if (hasParent) {
    return classInAncestry(domElement.parentElement, className);
  }

  return false;
}

export const onEnter = cb => e => {
  if (e.keyCode === 13) {
    cb();
  }
};

export const onSpace = cb => e => {
  if (e.keyCode === 32) {
    cb();
  }
};

export const onEnterOrSpace = cb => e => {
  if (e.keyCode === 13 || e.keyCode === 32) {
    cb();
  }
};
