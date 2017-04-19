/* global SyntheticMouseEvent */
// @flow
import React from 'react';

type ScrollProps = {
  position: number,
  styles: { [key: string]: string },
  width: number,
  onMouseDown: (e: SyntheticMouseEvent) => void,
};

const Scroll = ({ position, styles, width, onMouseDown }: ScrollProps) => (
  <div className={styles.scroll} onMouseDown={onMouseDown}>
    <div
      className={styles['scroll-cursor']}
      style={{ width: `${width}px`, transform: `translateX(${position}%)` }}
      onMouseDown={onMouseDown}
    />
  </div>);

export default Scroll;
