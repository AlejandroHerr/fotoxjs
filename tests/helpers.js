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

export function MouseEvent(type, button, sx, sy, cx, cy) {
  const event = {
    bubbles: true,
    cancelable: (type !== 'mousemove'),
    view: false,
    detail: 0,
    screenX: sx,
    screenY: sy,
    clientX: cx,
    clientY: cy,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button,
    relatedTarget: undefined,
    preventedDefault: false,
    stopedPropagation: false,
  };
  event.preventDefault = preventDefault.bind(event);
  event.stopPropagation = stopPropagation.bind(event);

  return event;
}

function persist() { this.persisted = true; }

export function SyntheticMouseEvent(type, button, sx, sy, cx, cy) {
  const event = new MouseEvent(type, button, sx, sy, cx, cy);

  event.persisted = false;
  event.persist = persist.bind(event);

  return event;
}

export function SyntheticWheelEvent(deltaY = 1) {
  const event = new SyntheticMouseEvent('type', 0, 0, 0, 0, 0);
  event.deltaY = deltaY;

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
