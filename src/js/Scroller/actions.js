/* global MouseEvent,SyntheticMouseEvent,SyntheticWheelEvent,SyntheticTouchEvent */
// @flow
import { getPositionByClick, getPositionByTouch, getPositionByWheel } from './helpers';

import type { Dimensions } from './types';

export const mouseDown = ({ setState }) => (e: SyntheticMouseEvent): void => {
  e.persist();
  e.preventDefault();
  e.stopPropagation();
  if (e.button === 0) {
    setState(state => ({
      ...state,
      position: getPositionByClick(state, e.clientX),
      isScrolling: true,
    }));
  }
};

export const mouseMove = ({ state, setState }) => (e: MouseEvent): void => {
  if (state.isScrolling) {
    setState(prevState => ({
      ...prevState,
      position: getPositionByClick(prevState, e.clientX),
    }));
  }
};

export const mouseUp = ({ state, setState }) => (e: MouseEvent): void => {
  if (state.isScrolling) {
    setState(prevState => ({
      ...prevState,
      position: getPositionByClick(prevState, e.clientX),
      isScrolling: false,
    }));
  }
};

export const wheel = ({ setState }) => (e: SyntheticWheelEvent): void => {
  e.persist();
  setState(state => ({
    ...state,
    position: getPositionByWheel(state, e.deltaY > 0 ? 0.1 : -0.1),
  }));
};

export const touchStart = ({ setState }) => (e: SyntheticTouchEvent): void => {
  e.persist();

  setState(prevState => ({
    ...prevState,
    prevTouchX: e.touches[0].clientX,
    isScrolling: true,
  }));
};

export const touchMove = ({ state, setState }) => (e: SyntheticTouchEvent): void => {
  e.persist();

  if (state.isScrolling) {
    setState(prevState => ({
      ...prevState,
      position: getPositionByTouch(prevState, e.touches[0].clientX),
      prevTouchX: e.touches[0].clientX,
    }));
  }
};

export const touchEnd = ({ state, setState }) => (): void => {
  if (state.isScrolling) {
    setState(prevState => ({
      ...prevState,
      isScrolling: false,
    }));
  }
};

export const setAreaWidth = ({ setState }) => ({ width }: Dimensions) : void => {
  setState(prevState => ({
    ...prevState,
    areaWidth: width,
  }));
};
export const setWindowSize = ({ setState }) => ({ height, width }: Dimensions): void => {
  setState(prevState => ({
    ...prevState,
    window: { height, width },
  }));
};
