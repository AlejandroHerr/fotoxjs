/* global Children,Dimensions,Document,document,MouseEvent,SyntheticMouseEvent,SyntheticWheelEvent,SyntheticTouchEvent */
// @flow
import React, { PureComponent } from 'react';
import { compose, withState, withHandlers } from 'recompose';
import throttle from 'lodash/throttle';
import shallowEqualObjects from 'shallow-equal/objects';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import CSSModules from 'react-css-modules';
import Scroll from './Scroll';
import ScrollArea from './ScrollArea';
import * as actions from './actions';
import { getScrollWidth } from './helpers'; import stylesheet from './style.css';
import type { Dimensions, ScrollerState } from './types';

class Scroller extends PureComponent {
  componentDidMount() {
    const { document: doc, onMouseMove, onMouseUp } = this.props;
    if (doc !== undefined && doc !== null) {
      doc.addEventListener('mousemove', onMouseMove);
      doc.addEventListener('mouseup', onMouseUp);
    }
  }
  shouldComponentUpdate(nextProps: ScrollerProps, nextState: ScrollerState) {
    return !shallowEqualObjects(this.props.state, nextProps.state);
  }
  componentWillUnmount() {
    const { document: doc, onMouseMove, onMouseUp } = this.props;
    if (doc !== undefined && doc !== null) {
      doc.removeEventListener('mousemove', onMouseMove);
      doc.removeEventListener('mouseup', onMouseUp);
    }
  }

  render() {
    const {
      children,
      damping,
      precision,
      state: {
        areaWidth,
        position,
        window: {
          height,
          width,
        },
      },
      setAreaWidth,
      setWindowSize,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      onMouseDown,
      onWheel,
      stiffness,
      styles } = this.props;

    const scrollWidth: number = getScrollWidth(this.props.state);
   // onst position: number = computePosition(width, scrollWidth, mouseX) || 0;
    return (
      <Measure whitelist={['height', 'width']} onMeasure={setWindowSize}>
        <div
          className={styles.scroller}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          onWheel={onWheel}
        >
          <Motion style={{ x: spring(position, { damping, precision, stiffness }) }}>
            {({ x }) => {
              const scrollAreaPosition = (100 * x * (areaWidth - width)) / areaWidth || 0;
              const scrollerPosition = (100 * x * (width - scrollWidth)) / scrollWidth || 0;

              return (<div>
                <ScrollArea
                  height={height}
                  position={scrollAreaPosition}
                  styles={styles}
                  onMeasure={setAreaWidth}
                >
                  {children}
                </ScrollArea>
                <Scroll
                  position={scrollerPosition}
                  styles={styles}
                  width={scrollWidth}
                  onMouseDown={onMouseDown}
                />
              </div>);
            }}
          </Motion>
        </div>
      </Measure>);
  }
}


const addState = compose(
  withState('state', 'setState', {
    areaWidth: 0,
    position: 0,
    prevTouchX: 0,
    isScrolling: false,
    window: { height: 0, width: 0 },
  }),
  withHandlers({
    onMouseDown: actions.mouseDown,
    onMouseMove: throttle(actions.mouseMove, 100),
    onMouseUp: actions.mouseUp,
    onWheel: throttle(actions.wheel, 100),
    onTouchStart: actions.touchStart,
    onTouchMove: actions.touchMove,
    onTouchEnd: actions.touchEnd,
    setAreaWidth: actions.setAreaWidth,
    setWindowSize: actions.setWindowSize,
  }),
);


export default addState(CSSModules(Scroller, stylesheet));
