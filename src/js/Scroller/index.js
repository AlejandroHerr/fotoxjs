/* global Children,Dimensions,Document,document,MouseEvent,SyntheticMouseEvent,SyntheticWheelEvent,SyntheticTouchEvent */
// @flow
import React, { PureComponent } from 'react';
import shallowEqualObjects from 'shallow-equal/objects';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import CSSModules from 'react-css-modules';
import Scroll from './Scroll';
import ScrollArea from './ScrollArea';
import * as actions from './actions';
import { getScrollWidth } from './helpers'; import stylesheet from './style.css';
import type { Dimensions, ScrollerState } from './types';

type ScrollerProps = {
  children: React.Children,
  damping?: number,
  document?: typeof document,
  precision?: number,
  stiffness?: number,
};

const scrollerDefaultProps = {
  children: null,
  document: (typeof document === 'object') ? document : undefined,
  damping: 26,
  precision: 0.01,
  stiffness: 170,
};

class Scroller extends PureComponent {
  mouseDown: (e: SyntheticMouseEvent) => void;
  mouseMove: (e: MouseEvent) => void;
  mouseUp: (e: MouseEvent) => void;
  wheel: (e: SyntheticWheelEvent) => void;
  touchStart: (e: SyntheticTouchEvent) => void;
  touchMove: (e: SyntheticTouchEvent) => void;
  touchEnd: (e: SyntheticTouchEvent) => void;
  setAreaWidth:(Dimensions) => void;
  setWindowSize: (Dimensions) => void;
  state: ScrollerState;
  props: ScrollerProps;
  static defaultProps: typeof scrollerDefaultProps;

  constructor(props: ScrollerProps) {
    super(props);
    this.state = {
      areaWidth: 0,
      position: 0,
      prevTouchX: 0,
      isScrolling: false,
      window: { height: 0, width: 0 },
    };
    this.mouseDown = actions.mouseDown.bind(this);
    this.mouseMove = actions.mouseMove.bind(this);
    this.mouseUp = actions.mouseUp.bind(this);
    this.wheel = actions.wheel.bind(this);
    this.touchStart = actions.touchStart.bind(this);
    this.touchMove = actions.touchMove.bind(this);
    this.touchEnd = actions.touchEnd.bind(this);
    this.setAreaWidth = actions.setAreaWidth.bind(this);
    this.setWindowSize = actions.setWindowSize.bind(this);
  }
  componentDidMount() {
    const { document: doc } = this.props;
    if (doc !== undefined && doc !== null) {
      doc.addEventListener('mousemove', this.mouseMove);
      doc.addEventListener('mouseup', this.mouseUp);
    }
  }
  shouldComponentUpdate(nextProps: ScrollerProps, nextState: ScrollerState) {
    const { isScrolling, ...cleanState } = this.state;
    const { isScrolling: nextIsScrolling, ...nextCleanState } = nextState;

    return !shallowEqualObjects(this.props, nextProps) ||
      !shallowEqualObjects(cleanState, nextCleanState);
  }
  componentWillUnmount() {
    const { document: doc } = this.props;
    if (doc !== undefined && doc !== null) {
      doc.removeEventListener('mousemove', this.mouseMove);
      doc.removeEventListener('mouseup', this.mouseUp);
    }
  }

  render() {
    const { areaWidth, position, window: { height, width } } = this.state;
    const { children, damping, precision, stiffness, styles } = this.props;

    const scrollWidth: number = getScrollWidth(this.state);
   // onst position: number = computePosition(width, scrollWidth, mouseX) || 0;

    return (
      <Measure whitelist={['height', 'width']} onMeasure={this.setWindowSize}>
        <div
          styleName="scroller"
          onTouchEnd={this.touchEnd}
          onTouchMove={this.touchMove}
          onTouchStart={this.touchStart}
          onWheel={this.wheel}
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
                  onMeasure={this.setAreaWidth}
                >
                  {children}
                </ScrollArea>
                <Scroll
                  position={scrollerPosition}
                  styles={styles}
                  width={scrollWidth}
                  onMouseDown={this.mouseDown}
                />
              </div>);
            }}
          </Motion>
        </div>
      </Measure>);
  }
}

Scroller.defaultProps = scrollerDefaultProps;

export default CSSModules(Scroller, stylesheet);
