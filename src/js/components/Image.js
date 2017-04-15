import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ height, styles, url, vertical }) => (
  <div className={styles['image-frame']}>
    <p className={styles['image-frame']}>
      <img alt={'cat'} src={url} style={{ height: `${height}px`, width: `${vertical ? (height * 2) / 3 : (height * 3) / 2}px` }} />
    </p>
  </div>);

Image.propTypes = {
  height: PropTypes.number.isRequired,
  styles: PropTypes.objectOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
  vertical: PropTypes.bool.isRequired,
};

export default Image;
