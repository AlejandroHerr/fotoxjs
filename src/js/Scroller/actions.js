/* global MouseEvent,SyntheticMouseEvent,SyntheticWheelEvent */
// @flow
import type { Dimensions } from './types';

export function mouseDown(e: SyntheticMouseEvent): void {
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
export function mouseMove(e: MouseEvent): void {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      mouseX: e.clientX }));
  }
}
export function mouseUp(e: MouseEvent): void {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      mouseX: e.clientX,
      isScrolling: false,
    }));
  }
}

export function wheel(e: SyntheticWheelEvent): void {
  e.persist();
  const { mouseX, windowSize: { width } } = this.state;
  const sign = e.deltaY > 0 ? 1 : -1;
  const delta = mouseX + (sign * (0.05 * width));
  const diff = delta > width ? width : (delta < 0 ? 0 : delta);

  this.setState(state => ({
    ...state,
    mouseX: diff,
  }));
}

export function setAreaWidth({ width }: Dimensions) : void {
  this.setState(state => ({
    ...state,
    areaWidth: width,
  }));
}
export function setWindowSize({ height, width }: Dimensions): void {
  this.setState(state => ({
    ...state,
    windowSize: { height, width },
  }));
}
