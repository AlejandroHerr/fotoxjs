/* global MouseEvent,SyntheticMouseEvent,SyntheticWheelEvent,SyntheticTouchEvent */
// @flow
import { getPositionByClick, getPositionByTouch, getPositionByWheel } from './helpers';

import type { Dimensions } from './types';

export function mouseDown(e: SyntheticMouseEvent): void {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
  if (e.button === 0) {
    this.setState(state => ({
      ...state,
      position: getPositionByClick(this.state, e.clientX),
      isScrolling: true,
    }));
  }
}
export function mouseMove(e: MouseEvent): void {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      position: getPositionByClick(this.state, e.clientX),
    }));
  }
}
export function mouseUp(e: MouseEvent): void {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      position: getPositionByClick(this.state, e.clientX),
      isScrolling: false,
    }));
  }
}

export function wheel(e: SyntheticWheelEvent): void {
  e.persist();
  this.setState(state => ({
    ...state,
    position: getPositionByWheel(this.state, e.deltaY > 0 ? 0.1 : -0.1),
  }));
}

export function touchStart(e: SyntheticTouchEvent): void {
  e.persist();

  this.setState(state => ({
    ...state,
    prevTouchX: e.touches[0].clientX,
    isScrolling: true,
  }));
}

export function touchMove(e: SyntheticTouchEvent): void {
  e.persist();

  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
      position: getPositionByTouch(this.state, e.touches[0].clientX),
      prevTouchX: e.touches[0].clientX,
    }));
  }
}

export function touchEnd(): void {
  if (this.state.isScrolling) {
    this.setState(state => ({
      ...state,
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
    window: { height, width },
  }));
}
