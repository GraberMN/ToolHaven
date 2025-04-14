import { useState } from 'react';
import logo from './logo.svg';
import calculatorThumbnail from './Images/CalculatorThumbnail.jpg';
import rulerThumbnail from './Images/RulerThumbnail.jpg';
import timerThumbnail from './Images/TimerThumbnail.jpg'
import greenRightArrow from './Images/GreenRightArrow.png';
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
import Home from './components/Home';
import Calculator from './components/Calculator';
import Rulers from './components/Rulers';
import Timers from './components/Timers';

function App() {
  const homeImagesArray = [calculatorThumbnail, rulerThumbnail, timerThumbnail, greenRightArrow];
  const calcImagesArray = [settingsIcon, historyIcon, rulesIcon, blueRightArrow];
  const rulersImagesArray = [inchesRuler, centimetersRuler, picasRuler, pixelsRuler, settingsIcon, rulesIcon, orangeRightArrow];
  const timersImagesArray = [settingsIcon, rulesIcon];
  const [moveToCalc, setMoveToCalc] = useState(false);
  const [moveToRulers, setMoveToRulers] = useState(false);
  const [moveToTimers, setMoveToTimers] = useState(false);
  return (
    <div className="App">
      <Home homeImagesArray={homeImagesArray} moveToCalc={moveToCalc} setMoveToCalc={setMoveToCalc} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
      <Calculator calcImagesArray={calcImagesArray} moveToCalc={moveToCalc} setMoveToCalc={setMoveToCalc} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} />
      <Rulers rulersImagesArray={rulersImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
      <Timers timersImagesArray={timersImagesArray} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
    </div>
  );
}

export default App;
