import { useState } from 'react';
import calculatorThumbnail from './Images/CalculatorThumbnail.jpg';
import rulerThumbnail from './Images/RulerThumbnail.jpg';
import timerThumbnail from './Images/TimerThumbnail.jpg';
import aiChatbotThumbnail from './Images/AIChatbotThumbnail.jpg';
import imgIdentifierThumbnail from './Images/ImgIdentifierThumbnail.jpg';
import bioPic from './Images/Linkedin Bio Pic.jpg';
import mateosPortfolio from './Images/MateosPortfolio.png';
import gitHub from './Images/GitHub.png';
import linkedIn from './Images/LinkedIn.png';
import gmail from './Images/Gmail.png';
import instagram from './Images/Instagram.png';
import facebook from './Images/Facebook.png';
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
import bedsideCountdownAlarm from './Images/bedsideCountdownAlarm.mp3';
import digitalCountdownAlarm from './Images/digitalCountdownAlarm.mp3';
import chaoticCountdownAlarm from './Images/chaoticCountdownAlarm.mp3';
import coinStopwatchLapSound from './Images/coinStopwatchLapSound.mp3';
import joyousStopwatchLapSound from './Images/happyStopwatchLapSound.mp3';
import notifStopwatchLapSound from './Images/notifStopwatchLapSound.mp3';
import pinkRightArrow from './Images/PinkRightArrow.png';
import aiChatbotThumbnailTransparent from './Images/AIChatbotThumbnailTransparent.png';
import redRightArrow from './Images/RedRightArrow.png';
import imgIdentifierThumbnailTransparent from './Images/ImgIdentifierThumbnailTransparent.png';
import homeButton from './Images/HomeButton.png';
import './App.css';
import Home from './components/Home';
import Calculator from './components/Calculator';
import Rulers from './components/Rulers';
import Timers from './components/Timers';
import AIChatbot from './components/AIChatbot';
import ImgIdentifier from './components/ImgIdentifier';

function App() {
  const homeImagesArray = [calculatorThumbnail, rulerThumbnail, timerThumbnail, aiChatbotThumbnail, imgIdentifierThumbnail, bioPic, mateosPortfolio, gitHub, linkedIn, gmail, instagram, facebook, greenRightArrow];
  const calcImagesArray = [settingsIcon, historyIcon, rulesIcon, blueRightArrow, homeButton];
  const rulersImagesArray = [inchesRuler, centimetersRuler, picasRuler, pixelsRuler, settingsIcon, rulesIcon, orangeRightArrow, homeButton];
  const timersImagesArray = [settingsIcon, rulesIcon, bedsideCountdownAlarm, digitalCountdownAlarm, chaoticCountdownAlarm, coinStopwatchLapSound, joyousStopwatchLapSound, notifStopwatchLapSound, pinkRightArrow, homeButton];
  const aiChatbotImagesArray = [settingsIcon, rulesIcon, aiChatbotThumbnailTransparent, redRightArrow, homeButton];
  const imgIdentifierImagesArray = [settingsIcon, rulesIcon, imgIdentifierThumbnailTransparent, homeButton];
  const [moveToCalc, setMoveToCalc] = useState(false);
  const [moveToRulers, setMoveToRulers] = useState(false);
  const [moveToTimers, setMoveToTimers] = useState(false);
  const [moveToAIChatbot, setMoveToAIChatbot] = useState(false);
  const [moveToImgIdentifier, setMoveToImgIdentifier] = useState(false);
  return (
    <div className="App">
      <Home homeImagesArray={homeImagesArray} moveToCalc={moveToCalc} setMoveToCalc={setMoveToCalc} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} moveToAIChatbot={moveToAIChatbot} setMoveToAIChatbot={setMoveToAIChatbot} moveToImgIdentifier={moveToImgIdentifier} setMoveToImgIdentifier={setMoveToImgIdentifier} />
      <Calculator calcImagesArray={calcImagesArray} moveToCalc={moveToCalc} setMoveToCalc={setMoveToCalc} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} />
      <Rulers rulersImagesArray={rulersImagesArray} moveToRulers={moveToRulers} setMoveToRulers={setMoveToRulers} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} />
      <Timers timersImagesArray={timersImagesArray} moveToTimers={moveToTimers} setMoveToTimers={setMoveToTimers} moveToAIChatbot={moveToAIChatbot} setMoveToAIChatbot={setMoveToAIChatbot} />
      <AIChatbot aiChatbotImagesArray={aiChatbotImagesArray} moveToAIChatbot={moveToAIChatbot} setMoveToAIChatbot={setMoveToAIChatbot} moveToImgIdentifier={moveToImgIdentifier} setMoveToImgIdentifier={setMoveToImgIdentifier} />
      <ImgIdentifier imgIdentifierImagesArray={imgIdentifierImagesArray} moveToImgIdentifier={moveToImgIdentifier} setMoveToImgIdentifier={setMoveToImgIdentifier} />
    </div>
  );
}

export default App;
