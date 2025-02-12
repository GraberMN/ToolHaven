import logo from './logo.svg';
import settingsIcon from './Images/Settings Icon.svg'
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <Calculator settingsIcon={settingsIcon} />
    </div>
  );
}

export default App;
