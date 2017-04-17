import { MouseEvent, SyntheticMouseEvent, StatefullComponent } from '../helpers';
import * as actions from '../../src/js/Scroller/actions';

export default ({ test: subtest }) => {
  subtest('--> mouseDown', (t) => {
    const initialState = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    const component = new StatefullComponent(initialState, {});
    const mouseDown = actions.mouseDown.bind(component);

    let event = new SyntheticMouseEvent('mousemove', 0, 0, 0, 100, 200);
    mouseDown(event);
    let nextState = component.state;

    t.ok(event.persisted, 'Should persiste event');
    t.ok(event.preventedDefault, ' Should prevent event\'s default');
    t.ok(event.stopedPropagation, 'Should stop event propagation');
    t.notEqual(nextState, initialState, 'Should not mutate the state');
    t.deepEqual(nextState, { ...initialState, isScrolling: true, mouseX: 100 }, 'Should set isScrolling and mouseX');

    component.state = initialState;
    event = new SyntheticMouseEvent('mousemove', 1, 0, 0, 100, 200);
    mouseDown(event);
    nextState = component.state;

    t.equal(nextState, initialState, 'If button 0 is not press should do nothin');

    t.end();
  });

  subtest('--> mouseMove', (t) => {
    const initialState = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    const component = new StatefullComponent(initialState, {});
    const mouseMove = actions.mouseMove.bind(component);

    const event = new MouseEvent('mousemove', 0, 0, 0, 100, 200);
    mouseMove(event);
    let nextState = component.state;

    t.equal(nextState, initialState, 'It doesn\'t do anything if isScrolling unset');

    const prevState = { ...initialState, isScrolling: true };
    component.state = prevState;
    mouseMove(event);
    nextState = component.state;

    t.notEqual(nextState, prevState, 'Should not mutate the state');
    t.deepEqual(nextState, { ...prevState, mouseX: 100 }, 'Should set mouseX');

    t.end();
  });
  subtest('--> mouseUp', (t) => {
    const initialState = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    const component = new StatefullComponent(initialState, {});
    const mouseUp = actions.mouseUp.bind(component);

    const event = new MouseEvent('mousemove', 0, 0, 0, 100, 200);
    mouseUp(event);
    let nextState = component.state;

    t.equal(nextState, initialState, 'It doesn\'t do anything if isScrolling unset');

    const prevState = { ...initialState, isScrolling: true };
    component.state = prevState;
    mouseUp(event);
    nextState = component.state;

    t.notEqual(nextState, prevState, 'Should not mutate the state');
    t.deepEqual(nextState, { ...prevState, isScrolling: false, mouseX: 100 }, 'Should set isScrolling and mouseX');

    t.end();
  });

  subtest('--> setAreaWidth', (t) => {
    const initialState = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    const component = new StatefullComponent(initialState, {});
    const setAreaWidth = actions.setAreaWidth.bind(component);

    setAreaWidth({ width: 50 });


    t.notEqual(component.state, initialState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...initialState, areaWidth: 50 }, 'Should set areaWidth');

    t.end();
  });

  subtest('--> setWindowSize', (t) => {
    const initialState = {
      areaWidth: 0,
      mouseX: 0,
      isScrolling: false,
      windowSize: { height: 0, width: 0 },
    };
    const component = new StatefullComponent(initialState, {});
    const setWindowSize = actions.setWindowSize.bind(component);

    setWindowSize({ height: 80, width: 50 });

    t.notEqual(component.state, initialState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...initialState, windowSize: { height: 80, width: 50 } }, 'Should set areaWidth');

    t.end();
  });
};
