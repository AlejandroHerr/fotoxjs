export function mouseDown(e) {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
  if (e.button === 0) {
    this.setState(state => ({
      ...state,
      mouseX: e.clientX,
      isScrolling: true,
    }));
  }
}
export function mouseMove(e) {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      mouseX: e.clientX }));
  }
}
export function mouseUp(e) {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      mouseX: e.clientX,
      isScrolling: false,
    }));
  }
}
export function setAreaWidth(measure) {
  this.setState(state => ({
    ...state,
    areaWidth: measure.width,
  }));
}
export function setWindowSize(measure) {
  this.setState(state => ({
    ...state,
    windowSize: { height: measure.height, width: measure.width },
  }));
}
