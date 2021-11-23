import logo from '.././logo.svg';
import '../scss/App.scss';
import { useEffect, useState } from 'react';
import getData from './components/currencyData.js';

function App() {
  const [json, setJson] = useState(null);
  useEffect(() => {
    getData().then(data => setJson(data))
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <pre>
          {JSON.stringify(json, null, 3)}
        </pre>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
