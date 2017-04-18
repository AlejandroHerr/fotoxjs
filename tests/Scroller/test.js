import test from 'tape';
import scrollAreaSpec from './ScrollArea_spec';
import scrollSpec from './Scroll_spec';
import actionsSpec from './actions_spec';
import helpersSpec from './helpers_spec';

test('+ Scroller', ({ test: subtest }) => {
  subtest('-> ScrollArea', scrollAreaSpec);
  subtest('-> Scroll', scrollSpec);
  subtest('-> actions', actionsSpec);
  subtest('-> helpers', helpersSpec);
});
