import logo from './logo.svg';
import settingsIcon from './Images/Settings Icon.svg';
import historyIcon from './Images/History Icon.svg';
import rulesIcon from './Images/Rules Icon.svg';
import blueRightArrow from './Images/BlueRightArrow.png'
import './App.css';
import Calculator from './components/Calculator';

function App() {
  const imagesArray = [settingsIcon, historyIcon, rulesIcon, blueRightArrow]
  return (
    <div className="App">
      <Calculator imagesArray={imagesArray} />
    </div>
  );
}

export default App;
