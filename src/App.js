import { useState } from 'react';
import logo from './logo.svg';
import settingsIcon from './Images/Settings Icon.svg';
import historyIcon from './Images/History Icon.svg';
import rulesIcon from './Images/Rules Icon.svg';
import blueRightArrow from './Images/BlueRightArrow.png';
import inchesRuler from './Images/inchesRuler.PNG';
import centimetersRuler from './Images/centimetersRuler.PNG';
import picasRuler from './Images/picasRuler.PNG';
import pixelsRuler from './Images/pixelsRuler.PNG';
import orangeRightArrow from './Images/OrangeRightArrow.png';
import './App.css';
import Calculator from './components/Calculator';
import Rulers from './components/Rulers';
import Timers from './components/Timers';

function App() {
  const calcImagesArray = [settingsIcon, historyIcon, rulesIcon, blueRightArrow];
  const rulersImagesArray = [inchesRuler, centimetersRuler, picasRuler, pixelsRuler, settingsIcon, rulesIcon, orangeRightArrow];
  const timersImagesArray = [settingsIcon, rulesIcon];
  const [moveToRulers, setMoveToRulers] = useState(false);
  const [moveToTimers, setMoveToTimers] = useState(false);
  return (
    <div className="App">
      <Calculator calcImagesArray={calcImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} />
      <Rulers rulersImagesArray={rulersImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
      <Timers timersImagesArray={timersImagesArray} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
    </div>
  );
}

export default App;
