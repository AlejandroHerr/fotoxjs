// @flow
import React, { PureComponent } from 'react';
import CSSModules from 'react-css-modules';
import Image from '../components/Image';
import stylesheet from './demoContent_style.css';

const getImageUrl = (width: number, height: number, id: number): string => `http://lorempixel.com/${width}/${height}/cats/${id}/`;

const imagesUrl: Array<{ url: string, vertical: bool }> = Array
  .from(Array(10).keys())
  .map((idx) => {
    const vertical: bool = Math.random() > 0.75;
    return { url: vertical ? getImageUrl(400, 600, idx) : getImageUrl(600, 400, idx),
      vertical };
  });

type DemoContentProps = {
  height: number,
  styles: { [key: string]: string},
};

const demoContentDefaultProps = {
  height: 0,
};

class DemoContent extends PureComponent {
  images: Array<{ url: string, vertical: bool }>;
  props: DemoContentProps;
  static defaultProps: typeof demoContentDefaultProps;

  constructor(props: DemoContentProps) {
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
        {this.images.map(({ url, vertical }, idx) => (
          <Image height={height} idx={idx} key={`cat${idx}`} styles={styles} url={url} vertical={vertical} />))}
      </div>);
  }
}

DemoContent.defaultProps = demoContentDefaultProps;

export default CSSModules(DemoContent, stylesheet);
