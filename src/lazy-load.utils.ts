export function offset(element: HTMLElement) {
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!element || !element.getClientRects().length) {
    return {top: 0, left: 0};
  }

  let docElem: HTMLElement, rect: ClientRect, doc: Document;

  rect = element.getBoundingClientRect();

  // Make sure element is not hidden (display: none)
  if (rect.width || rect.height) {
    doc = element.ownerDocument;
    docElem = doc.documentElement;

    return {
      top: rect.top + window.pageYOffset - docElem.clientTop,
      left: rect.left + window.pageXOffset - docElem.clientLeft
    };
  }

  // Return zeros for disconnected and hidden elements (gh-2310)
  return rect;
}

export interface ViewportSettings {
  container?: HTMLElement | Window;
  threshold?: number;
}

export function aboveTheTop(element: HTMLElement, settings: ViewportSettings = {}) {
  if (!element) {
    return false;
  }

  let fold: number,
    container = settings.container || window,
    threshold = settings.threshold || 0;

  if (container instanceof HTMLElement) {
    fold = offset(container).top;
  } else {
    fold = window.scrollY;
  }

  return fold >= (offset(element).top + threshold + element.offsetHeight);
}

export function rightOfFold(element: HTMLElement, settings: ViewportSettings = {}) {
  if (!element) {
    return false;
  }

  let fold: number,
    container = settings.container || window,
    threshold = settings.threshold || 0;

  if (container instanceof HTMLElement) {
    fold = offset(container).left + container.offsetWidth;
  } else {
    fold = window.innerWidth + window.scrollX;
  }

  return fold <= offset(element).left - threshold;
}

export function belowTheFold(element: HTMLElement, settings: ViewportSettings = {}) {
  if (!element) {
    return false;
  }

  let fold: number,
    container = settings.container || window,
    threshold = settings.threshold || 0;

  if (container instanceof HTMLElement) {
    fold = offset(container).top + container.offsetHeight;
  } else {
    fold = window.innerHeight + window.scrollY;
  }

  return fold <= offset(element).top - threshold;
}

export function leftOfBegin(element: HTMLElement, settings: ViewportSettings = {}) {
  if (!element) {
    return false;
  }

  let fold: number,
    container = settings.container || window,
    threshold = settings.threshold || 0;

  if (container instanceof HTMLElement) {
    fold = offset(container).left;
  } else {
    fold = window.scrollX;
  }

  return fold >= offset(element).left + threshold + element.offsetWidth;
}

export function inViewport(element: HTMLElement, settings: ViewportSettings = {}) {
  return !belowTheFold(element, settings)
    && !aboveTheTop(element, settings)
    && !leftOfBegin(element, settings)
    && !rightOfFold(element, settings);
}
