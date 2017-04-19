import * as helpers from '../../src/js/Scroller/helpers';


export default ({ test: subtest }) => {
  subtest('--> getScrollWidth', (t) => {
    let state = {
      areaWidth: 0,
      window: { height: 100, width: 175 },
    };
    t.equals(helpers.getScrollWidth(state), 0, 'Scrollwidth 0 if areaWidth is 0');

    state = {
      areaWidth: 200,
      window: { height: 100, width: 100 },
    };
    t.equals(helpers.getScrollWidth(state), 50, 'Computes right scrollWdith');

    t.end();
  });

  subtest('--> getPositionWidth', (t) => {
    let state = {
      areaWidth: 0,
      position: 0,
      window: { height: 100, width: 175 },
    };
    t.equals(helpers.getPositionByDelta(state, 40), 0, 'Scrollwidth 0 if areaWidth is 0');

    state = {
      areaWidth: 500,
      position: 0.5,
      window: { height: 100, width: 100 },
    };
    t.equals(helpers.getPositionByDelta(state, 100), 0.75, 'Computes right position');
    t.equals(helpers.getPositionByDelta(state, 400), 1, 'Doesn\'t exceeds max value');
    t.equals(helpers.getPositionByDelta(state, -500), 0, 'Doesn\'t exceeds min value');

    t.end();
  });

  subtest('--> getPositionWidth', (t) => {
    let state = {
      position: 0,
      window: { height: 100, width: 0 },
    };
    t.equals(helpers.getPositionByClick(state, 40), 0, 'Value is 0 if window.width is 0');

    state = {
      areaWidth: 500,
      position: 0.25,
      window: { height: 100, width: 100 },
    };
    t.equals(helpers.getPositionByClick(state, 50), 0.5, 'Computes right position');
    t.equals(helpers.getPositionByClick(state, 91), 1, 'Doesn\'t exceeds max value');
    t.equals(helpers.getPositionByClick(state, 9), 0, 'Doesn\'t exceeds min value');

    t.end();
  });
};
