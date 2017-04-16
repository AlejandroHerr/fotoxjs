/* global Children,Dimensions,Document,document,MouseEvent,SyntheticMouseEvent */
// @flow
import React, { PureComponent } from 'react';
import shallowEqualObjects from 'shallow-equal/objects';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import CSSModules from 'react-css-modules';
import Scroll from './Scroll';
import ScrollArea from './ScrollArea';
import * as actions from './actions';
import type { Dimensions } from './types';
import stylesheet from './style.css';

const computePosition = (width: number, scrollWidth: number, mouseX: number): number => {
  const position: number = (mouseX - (scrollWidth / 2)) / (width - scrollWidth);

  if (position < 0) return 0;

  return position > 1 ? 1 : position;
};

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

type ScrollerState = {
  areaWidth: number,
  mouseX: number,
  isScrolling: boolean,
  windowSize: { height: number, width: number },
};

class Scroller extends PureComponent {
  mouseDown: (e: SyntheticMouseEvent) => void;
  mouseMove: (e: MouseEvent) => void;
  mouseUp: (e: MouseEvent) => void;
  setAreaWidth:(Dimensions) => void;
  setWindowSize: (Dimensions) => void;
  state: ScrollerState;
  props: ScrollerProps;
  static defaultProps: typeof scrollerDefaultProps;

  constructor(props: ScrollerProps) {
    super(props);
    this.state = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    this.mouseDown = actions.mouseDown.bind(this);
    this.mouseMove = actions.mouseMove.bind(this);
    this.mouseUp = actions.mouseUp.bind(this);
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
    const { areaWidth, mouseX, windowSize: { height, width } } = this.state;
    const { children, damping, precision, stiffness, styles } = this.props;

    const scrollWidth: number = (width * width) / areaWidth || 0;
    const position: number = computePosition(width, scrollWidth, mouseX) || 0;

    return (
      <Measure whitelist={['height', 'width']} onMeasure={this.setWindowSize}>
        <div styleName="scroller">
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
