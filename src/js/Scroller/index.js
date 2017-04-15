/* global document */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowEqualObjects from 'shallow-equal/objects';
import Measure from 'react-measure';
import { Motion, spring } from 'react-motion';
import CSSModules from 'react-css-modules';
import Scroll from './Scroll';
import ScrollArea from './ScrollArea';
import * as actions from './actions';
import stylesheet from './style.css';

const computePosition = (width, scrollWidth, mouseX) => {
  const position = (mouseX - (scrollWidth / 2)) / (width - scrollWidth);

  if (position < 0) return 0;

  return position > 1 ? 1 : position;
};

class Scroller extends PureComponent {
  constructor(props) {
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
    if (this.props.document) {
      this.props.document.addEventListener('mousemove', this.mouseMove);
      this.props.document.addEventListener('mouseup', this.mouseUp);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { styles, ...cleanProps } = this.props;
    const { styles: nextStyles, ...nextCleanProps } = nextProps;
    const { isScrolling, ...cleanState } = this.state;
    const { isScrolling: nextIsScrolling, ...nextCleanState } = nextState;

    return !shallowEqualObjects(cleanProps, nextCleanProps) ||
      !shallowEqualObjects(cleanState, nextCleanState);
  }
  componentWillUnmount() {
    if (this.props.document) {
      this.props.document.removeEventListener('mousemove', this.mouseMove);
      this.props.document.removeEventListener('mouseup', this.mouseUp);
    }
  }

  render() {
    const { areaWidth, mouseX, windowSize: { height, width } } = this.state;
    const { children, damping, precision, stiffness, styles } = this.props;

    const scrollWidth = (width * width) / areaWidth || 0;
    const position = computePosition(width, scrollWidth, mouseX) || 0;

    return (
      <Measure whitelist={['height', 'width']} onMeasure={this.setWindowSize}>
        <Motion style={{ x: spring(position, { damping, precision, stiffness }) }}>
          {({ x }) => {
            const scrollAreaPosition = (100 * x * (areaWidth - width)) / areaWidth || 0;
            const scrollerPosition = (100 * x * (width - scrollWidth)) / scrollWidth || 0;

            return (
              <div className={styles.scroller}>
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
      </Measure>);
  }
}

Scroller.defaultProps = {
  document: (typeof document === 'object') ? document : undefined,
  damping: 26,
  precision: 0.01,
  stiffness: 170,
  styles: null,
};

Scroller.propTypes = {
  children: PropTypes.func.isRequired,
  damping: PropTypes.number,
  document: PropTypes.object,
  precision: PropTypes.number,
  stiffness: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default CSSModules(Scroller, stylesheet);
