// @flow
import React from 'react';

type ImageProps = {
  height: number,
  styles: { [key: string]: string},
  url: string,
  vertical: bool,
};

const Image = ({ height, styles, url, vertical }: ImageProps) => (
  <div className={styles['image-frame']}>
    <p className={styles['image-frame']}>
      <img alt={'cat'} src={url} style={{ height: `${height}px`, width: `${vertical ? (height * 2) / 3 : (height * 3) / 2}px` }} />
    </p>
  </div>);

export default Image;
