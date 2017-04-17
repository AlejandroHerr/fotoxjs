import test from 'tape';
import scrollAreaSpec from './ScrollArea_spec';
import scrollSpec from './Scroll_spec';
import scrollerSpec from './Scroller_spec';
import actionsSpec from './actions_spec';

test('+ Scroller', ({ test: subtest }) => {
  subtest('-> ScrollArea', scrollAreaSpec);
  subtest('-> Scroll', scrollSpec);
  subtest('-> Scroller', scrollerSpec);
  subtest('-> actions', actionsSpec);
});
