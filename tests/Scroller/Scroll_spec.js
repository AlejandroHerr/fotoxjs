import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { Mouse } from '../helpers';
import Scroll from '../../src/js/Scroller/Scroll';

test('Scroll.js', ({ equals, ok, end }) => {
  const mouse = new Mouse();
  const props = { styles: { scroll: 'sScroll', 'scroll-cursor': 'sScrollCursor' }, onMouseDown: mouse.onMouseDown };
  const mountedScroll = shallow(<Scroll {...props} />);
  const scrollDiV = mountedScroll.find('div').first();

  ok(scrollDiV.hasClass('sScroll'), 'Should have the style class \'scroll\'');
  scrollDiV.simulate('mouseDown');
  equals(mouse.downs, 1, 'Mouse down callback shoul\'ve been clicked once.');

  const scrollCursorDiV = scrollDiV.children().find('div').first();

  ok(scrollCursorDiV.hasClass('sScrollCursor'), 'Should have the style class \'scroll-cursor\'');
  scrollCursorDiV.simulate('mouseDown');
  equals(mouse.downs, 2, 'Mouse down callback shoul\'ve been clicked twice.');

  end();
});
