import { MouseEvent, SyntheticMouseEvent, SyntheticWheelEvent, SyntheticTouchEvent, StatefullComponent } from '../helpers';
import * as actions from '../../src/js/Scroller/actions';
import * as helpers from '../../src/js/Scroller/helpers';

const state = {
  areaWidth: 400,
  position: 0,
  prevTouchX: 0,
  isScrolling: false,
  window: { height: 100, width: 100 },
};

const scrollState = {
  areaWidth: 400,
  position: 0,
  prevTouchX: 100,
  isScrolling: true,
  window: { height: 100, width: 100 },
};

export default ({ test: subtest }) => {
  subtest('--> mouseDown', (t) => {
    const component = new StatefullComponent(state, {});
    const mouseDown = actions.mouseDown.bind(component);

    const event = new SyntheticMouseEvent('mousemove', 0, 0, 0, 50, 0);
    mouseDown(event);
    t.ok(event.persisted, 'Should persiste event');
    t.ok(event.preventedDefault, ' Should prevent event\'s default');
    t.ok(event.stopedPropagation, 'Should stop event propagation');
    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, isScrolling: true, position: 0.5 }, 'Should set isScrolling and position');


    mouseDown(new SyntheticMouseEvent('mousemove', 1, 0, 0, 0, 0));
    t.deepEqual(component.state, { ...state, isScrolling: true, position: 0.5 }, 'Shouldn\'t react to non left clicks');

    t.end();
  });

  subtest('--> mouseMove', (t) => {
    const component = new StatefullComponent(state, {});
    const mouseMove = actions.mouseMove.bind(component);

    mouseMove(new SyntheticMouseEvent('mousemove', 0, 0, 0, 50, 0));
    t.equal(component.state, state, 'Shouldn\'t react if isScrolling is unset');

    component.state = scrollState;
    mouseMove(new SyntheticMouseEvent('mousemove', 0, 0, 0, 50, 0));
    t.notEqual(component.state, scrollState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...scrollState, position: 0.5 }, 'Should set position');

    t.end();
  });

  subtest('--> mouseUp', (t) => {
    const component = new StatefullComponent(state, {});
    const mouseUp = actions.mouseUp.bind(component);

    mouseUp(new SyntheticMouseEvent('mousemove', 0, 0, 0, 50, 0));
    t.equal(component.state, state, 'Shouldn\'t react if isScrolling is unset');

    component.state = scrollState;
    mouseUp(new SyntheticMouseEvent('mousemove', 0, 0, 0, 50, 0));
    t.notEqual(component.state, scrollState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...scrollState, isScrolling: false, position: 0.5 },
      'Should unset isScrolling and update position');

    t.end();
  });

  subtest('--> wheel', (t) => {
    const component = new StatefullComponent(state, {});
    const wheel = actions.wheel.bind(component);
    const event = new SyntheticWheelEvent(0, 1);

    wheel(event);

    t.ok(event.persisted, 'Should persiste event');
    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, position: 0.1 / 3 }, 'Should set position');

    t.end();
  });


  subtest('--> touchStart', (t) => {
    const component = new StatefullComponent(state, {});
    const touchStart = actions.touchStart.bind(component);

    const event = new SyntheticTouchEvent(10);
    touchStart(event);

    t.ok(event.persisted, 'Should persiste event');
    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, prevTouchX: 10, isScrolling: true }, 'Should set isScrolling and position');

    t.end();
  });

  subtest('--> touchMove', (t) => {
    const component = new StatefullComponent(state, {});
    const touchMove = actions.touchMove.bind(component);

    const event = new SyntheticTouchEvent(10);
    touchMove(event);
    t.equal(component.state, state, 'Shouldn\'t react if isScrolling is unset');

    component.state = scrollState;
    touchMove(new SyntheticTouchEvent(50));
    t.ok(event.persisted, 'Should persiste event');
    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, position: 0.25, prevTouchX: 50, isScrolling: true }, 'Should set isScrolling and position');

    t.end();
  });


  subtest('--> touchEnd', (t) => {
    const component = new StatefullComponent(state, {});
    const touchEnd = actions.touchEnd.bind(component);

    touchEnd(new SyntheticTouchEvent(10));
    t.equal(component.state, state, 'Shouldn\'t react if isScrolling is unset');

    component.state = scrollState;
    touchEnd(new SyntheticTouchEvent(10));
    t.notEqual(component.state, scrollState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...scrollState, isScrolling: false },
      'Should unset isScrolling and update position');

    t.end();
  });
/*


  subtest('--> touchStart', (t) => {
    const component = new StatefullComponent(initialState, {});
    const touchStart = actions.touchStart.bind(component);

    touchStart(new SyntheticTouchEvent(100));

    t.notEqual(component.state, initialState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...initialState, isScrolling: true, prevTouchX: 100 }, 'It doesn\'t do anything if isScrolling unset');

    t.end();
  });

  subtest('--> touchMove', (t) => {
    const component = new StatefullComponent(initialState, {});
    const touchMove = actions.touchMove.bind(component);

    touchMove(new SyntheticTouchEvent());

    t.equal(component.state, initialState, 'It doesn\'t do anything if isScrolling unset');

    const prevState = { ...initialState, isScrolling: true };
    component.state = prevState;
    touchMove(new SyntheticTouchEvent(100));
    t.notEqual(component.state, prevState, 'Should not mutate the state');

    t.deepEqual(component.state, {
      ...initialState,
      isScrolling: false,
      clientX: 100,
      prevTouchX: 100,
    }, 'Should set isScrolling and mouseX');


    touchMove(new SyntheticTouchEvent(250));

    t.deepEqual(component.state, {
      ...initialState,
      isScrolling: false,
      clientX: 200,
      prevTouchX: 200,
    }, 'Should set isScrolling and mouseX');

    t.end();
  });

  subtest('--> touchEnd', (t) => {
    const component = new StatefullComponent(initialState, {});
    const touchEnd = actions.touchEnd.bind(component);

    touchEnd(new SyntheticTouchEvent());

    t.equal(component.state, initialState, 'It doesn\'t do anything if isScrolling unset');

    const prevState = { ...initialState, isScrolling: true };
    component.state = prevState;
    touchEnd(new SyntheticTouchEvent(150));
    t.notEqual(component.state, prevState, 'Should not mutate the state');

    const { prevTouchX, areaWidth, windowSize: { width } } = initialState;
    const clientX = ((prevTouchX - 150) * width) / (areaWidth - width);

    t.deepEqual(component.state, {
      ...initialState,
      isScrolling: false,
      clientX: 50,
      prevTouchX: 150,
    }, 'Should set isScrolling and mouseX');

    t.end();
  });

  subtest('--> setAreaWidth', (t) => {
    const component = new StatefullComponent(initialState, {});
    const setAreaWidth = actions.setAreaWidth.bind(component);

    setAreaWidth({ width: 50 });


    t.notEqual(component.state, initialState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...initialState, areaWidth: 50 }, 'Should set areaWidth');

    t.end();
  });

  subtest('--> setWindowSize', (t) => {
    const component = new StatefullComponent(initialState, {});
    const setWindowSize = actions.setWindowSize.bind(component);

    setWindowSize({ height: 80, width: 50 });

    t.notEqual(component.state, initialState, 'Should not mutate the state');
    t.deepEqual(component.state, { ...initialState, windowSize: { height: 80, width: 50 } }, 'Should set areaWidth');

    t.end();
  });*/

  subtest('--> setAreaWidth', (t) => {
    const component = new StatefullComponent(state, {});
    const setAreaWidth = actions.setAreaWidth.bind(component);

    setAreaWidth({ width: 50 });

    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, areaWidth: 50 }, 'Should set areaWidth');

    t.end();
  });

  subtest('--> setWindowSize', (t) => {
    const component = new StatefullComponent(state, {});
    const setWindowSize = actions.setWindowSize.bind(component);

    setWindowSize({ height: 80, width: 50 });

    t.notEqual(component.state, state, 'Should not mutate the state');
    t.deepEqual(component.state, { ...state, window: { height: 80, width: 50 } }, 'Should set areaWidth');

    t.end();
  });
};
