// @flow
export type Dimensions = {
  width: number,
  height: number,
  top: number,
  right: number,
  bottom: number,
  left: number,
};

export type ScrollerState = {
  areaWidth: number,
  position: number,
  prevTouchX: number,
  isScrolling: boolean,
  window: { height: number, width: number },
};
