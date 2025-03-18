import { useState } from 'react'
import logo from './logo.svg';
import settingsIcon from './Images/Settings Icon.svg';
import historyIcon from './Images/History Icon.svg';
import rulesIcon from './Images/Rules Icon.svg';
import blueRightArrow from './Images/BlueRightArrow.png'
import inchesRuler from './Images/inchesRuler.PNG'
import './App.css';
import Calculator from './components/Calculator';
import Rulers from './components/Rulers';

function App() {
  const calcImagesArray = [settingsIcon, historyIcon, rulesIcon, blueRightArrow]
  const rulersImagesArray = [inchesRuler]
  const [moveToRulers, setMoveToRulers] = useState(false)
  return (
    <div className="App">
      <Calculator calcImagesArray={calcImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} />
      <Rulers rulersImagesArray={rulersImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} />
    </div>
  );
}

export default App;
