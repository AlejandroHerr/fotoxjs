function onMouseDown() { this.downs += 1; }
export function Mouse() {
  const mouse = {
    downs: 0,
  };
  mouse.onMouseDown = onMouseDown.bind(mouse);

  return mouse;
}

function preventDefault() { this.preventedDefault = true; }
function stopPropagation() { this.stopedPropagation = true; }

export function Event() {
  const event = {
    preventedDefault: false,
    stopedPropagation: false,
  };
  event.preventDefault = preventDefault.bind(event);
  event.stopPropagation = stopPropagation.bind(event);

  return event;
}

export function MouseEvent(type, button, sx, sy, cx, cy) {
  const event = new Event();

  event.bubbles = true;
  event.cancelable = (type !== 'mousemove');
  event.view = false;
  event.detail = 0;
  event.screenX = sx;
  event.screenY = sy;
  event.clientX = cx;
  event.clientY = cy;
  event.ctrlKey = false;
  event.altKey = false;
  event.shiftKey = false;
  event.metaKey = false;
  event.button = button;
  event.relatedTarget = undefined;

  return event;
}

function persist() { this.persisted = true; }

export function SyntheticMouseEvent(type, button, sx, sy, cx, cy) {
  const event = new MouseEvent(type, button, sx, sy, cx, cy);

  event.persisted = false;
  event.persist = persist.bind(event);

  return event;
}

export function WheelEvent(deltaX = 0, deltaY = 0, deltaZ = 0) {
  const event = new Event();

  event.deltaX = deltaX;
  event.deltaY = deltaY;
  event.deltaZ = deltaZ;

  return event;
}
export function SyntheticWheelEvent(deltaX = 0, deltaY = 0, deltaZ = 0) {
  const event = new WheelEvent(deltaX, deltaY, deltaZ);

  event.persisted = false;
  event.persist = persist.bind(event);

  return event;
}
export function TouchEvent(clientX = 0, clientY = 0) {
  const event = new Event();

  event.touches[0] = {
    clientX,
    clientY,
  };

  return event;
}

export function SyntheticTouchEvent(clientX = 0, clientY = 0) {
  const event = new TouchEvent(clientY, clientY);

  event.persisted = false;
  event.persist = persist.bind(event);

  return event;
}

export function StatefullComponent(initialState = {}, initialProps = {}) {
  this.props = initialProps;
  this.state = initialState;
  this.setState = (updater) => {
    this.state = typeof updater === 'function' ? updater(this.state, this.props) : updater;
  };
}

function addEventListener(type, cb) {
  if (!Array.isArray(this.listeners[type])) {
    this.listeners[type] = [];
  }
  this.listeners[type].push(cb);
}
function removeEventListener(type, cb) {
  if (Array.isArray(this.listeners[type])) {
    const idx = this.listeners[type].indexOf(cb);
    if (idx > -1) {
      this.listeners[type].splice(idx, 1);
    }
  }
  this.listeners[type].push(cb);
}
export function Document() {
  const document = {
    listners: {},
  };

  document.addEventListener = addEventListener.bind(document);
  document.removeEventListener = removeEventListener.bind(document);

  return document;
}
