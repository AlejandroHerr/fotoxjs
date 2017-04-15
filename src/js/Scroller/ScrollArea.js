import React from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

const ScrollArea = ({ children: Children, height, position, styles, onMeasure }) => (
  <Measure shouldMeasure={height !== 0} whitelist={['height', 'width']} onMeasure={onMeasure}>
    <div
      className={styles['scroll-area']}
      style={{ transform: `translateX(-${position}%)` }}
    >
      <Children height={height} /></div>
  </Measure>);

ScrollArea.propTypes = {
  children: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
  onMeasure: PropTypes.func.isRequired,
};

export default ScrollArea;
