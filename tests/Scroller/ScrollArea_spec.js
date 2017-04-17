import React from 'react';
import { shallow } from 'enzyme';
import Measure from 'react-measure';
import ScrollArea from '../../src/js/Scroller/ScrollArea';

export default (t) => {
  const height = 100;
  const defProps = { height, styles: { 'scroll-area': 'scrollArea' } };
  const Element = props => (<p {...props} />);
  const mountedScroll = shallow(<ScrollArea {...defProps}>{Element}</ScrollArea>);

  const measure = mountedScroll.find(Measure);
  t.equals(measure.length, 1, 'Should render Measure element.');

  const div = measure.find('div');
  t.equals(div.length, 1, 'Should render Div inside.');
  t.ok(div.hasClass('scrollArea'), 'Should have the style class \'scroll-area\'');

  const mountedChildren = div.find(Element);
  t.equals(mountedChildren.length, 1, 'Should render children inside Measure.');
  t.equals(mountedChildren.first().prop('height'), height, 'Should pass \'height\' prop to children.');

  t.end();
};
