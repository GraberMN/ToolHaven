import logo from './logo.svg';
import settingsIcon from './Images/Settings Icon.svg'
import historyIcon from './Images/History Icon.svg'
import rulesIcon from './Images/Rules Icon.svg'
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <Calculator settingsIcon={settingsIcon} historyIcon={historyIcon} rulesIcon={rulesIcon} />
    </div>
  );
}

export default App;
