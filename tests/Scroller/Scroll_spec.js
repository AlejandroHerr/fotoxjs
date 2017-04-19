import React from 'react';
import { shallow } from 'enzyme';
import { Mouse } from '../helpers';
import Scroll from '../../src/js/Scroller/Scroll';

export default (t) => {
  const mouse = new Mouse();
  const props = { styles: { scroll: 'sScroll', 'scroll-cursor': 'sScrollCursor' }, onMouseDown: mouse.onMouseDown };
  const mountedScroll = shallow(<Scroll {...props} />);
  const scrollDiV = mountedScroll.find('div').first();

  t.ok(scrollDiV.hasClass('sScroll'), 'Should have the style class \'scroll\'');
  scrollDiV.simulate('mouseDown');
  t.equals(mouse.downs, 1, 'Mouse down callback shoul\'ve been clicked once.');

  const scrollCursorDiV = scrollDiV.children().find('div').first();

  t.ok(scrollCursorDiV.hasClass('sScrollCursor'), 'Should have the style class \'scroll-cursor\'');
  scrollCursorDiV.simulate('mouseDown');
  t.equals(mouse.downs, 2, 'Mouse down callback shoul\'ve been clicked twice.');

  t.end();
};
