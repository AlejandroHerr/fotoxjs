// @flow
import type { ScrollerState } from './types';


export const getScrollWidth = ({ areaWidth, window: { width } }: ScrollerState): number => {
  if (areaWidth === 0) return 0; /* Avoid NaN situations */

  return (width * width) / areaWidth;
};

export const getPositionByDelta = (state: ScrollerState, delta: number) => {
  const visibleArea = (state.areaWidth - state.window.width);
  if (visibleArea <= 0) return 0; /* Avoid NaN situations */

  const positionX = state.position + (delta / visibleArea);

  if (positionX < 0) return 0;

  return positionX > 1 ? 1 : positionX;
};

export const getPositionByWheel = (state: ScrollerState, perc: number) =>
  getPositionByDelta(state, state.window.width * perc);
export const getPositionByTouch = (state: ScrollerState, clientX: number) =>
  getPositionByDelta(state, 1.5 * (state.prevTouchX - clientX));

export const getPositionByClick = (state: ScrollerState, clientX: number): number => {
  if (state.window.width <= 0) return 0; /* Avoid NaN situations */

  const scrollWidth = getScrollWidth(state);
  const position = (clientX - (scrollWidth / 2)) / (state.window.width - scrollWidth);

  if (position < 0) return 0;

  return position > 1 ? 1 : position;
};

