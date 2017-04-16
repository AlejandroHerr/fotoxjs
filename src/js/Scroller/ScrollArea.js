// @flow
import React from 'react';
import Measure from 'react-measure';

import type { Dimensions } from './types';

type ScrollAreaProps = {
  children: typeof React.Component,
  height: number,
  position: number,
  styles: { [key: string]: string },
  onMeasure: (Dimensions) => void,
};

const ScrollArea = ({
  children: Children,
  height,
  position,
  styles,
  onMeasure }: ScrollAreaProps) => (
    <Measure shouldMeasure={height !== 0} whitelist={['height', 'width']} onMeasure={onMeasure}>
      <div
        className={styles['scroll-area']}
        style={{ transform: `translateX(-${position}%)` }}
      >
        <Children height={height} /></div>
    </Measure>);

export default ScrollArea;
