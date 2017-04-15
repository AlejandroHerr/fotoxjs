import React from 'react';
import 'basscss/css/basscss.css';
import Scroller from './Scroller';
import DemoContent from './containers/DemoContent';
import './root.css';

const Root = () => (
  <div>
    <header>
      <h1 className="h0 font--display text-shadow--mild">
        All Cats Are Beautiful
        </h1>
    </header>
    <Scroller
      damping={50}
      precision={0.01}
      stiffness={200}
    >
      {DemoContent}
    </Scroller>
    <footer className="absolute bottom-0 right-0">
      <p className="h5 m1 font--mono">
        The photos come from <a href="http://lorempixel.com/">lorempixel</a> and are under a CC BY-SA licence.
        </p>
    </footer>
  </div>);


export default Root;
