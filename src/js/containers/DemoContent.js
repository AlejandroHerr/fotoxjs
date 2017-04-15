import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import Image from '../components/Image';
import stylesheet from './demoContent_style.css';

const getImageUrl = (width, height, id) => `http://lorempixel.com/${width}/${height}/cats/${id}/`;

const imagesUrl = Array
  .from(Array(10).keys())
  .map((idx) => {
    const vertical = Math.random() > 0.75;
    return { url: vertical ? getImageUrl(400, 600, idx) : getImageUrl(600, 400, idx),
      vertical };
  });


class DemoContent extends PureComponent {
  constructor(props) {
    super(props);
    this.images = imagesUrl;
  }
  render() {
    const { height, styles } = this.props;

    if (height === 0) {
      return null;
    }

    return (
      <div style={{ display: 'inherit' }}>
        {this.images.map(({ url, vertical }, idx) => <Image height={height} idx={idx} key={`cat${idx}`} styles={styles} url={url} vertical={vertical} />)}
      </div>);
  }
}

DemoContent.defaultProps = {
  height: 0,
  styles: null,
};

DemoContent.propTypes = {
  height: PropTypes.number,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default CSSModules(DemoContent, stylesheet);
