/* global MouseEvent,SyntheticMouseEvent */
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
