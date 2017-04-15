import React from 'react';
import PropTypes from 'prop-types';

const Scroll = ({ position, styles, width, onMouseDown }) => (
  <div className={styles.scroll} onMouseDown={onMouseDown}>
    <div
      className={styles['scroll-cursor']}
      style={{ width: `${width}px`, transform: `translateX(${position}%)` }}
      onMouseDown={onMouseDown}
    />
  </div>);

Scroll.propTypes = {
  position: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
  width: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func.isRequired,
};

export default Scroll;
