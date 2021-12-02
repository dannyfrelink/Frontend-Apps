import '../scss/App.scss';
import { useEffect, useState } from 'react';
import getData from './modules/currencyData.js';
import BarChart from './components/BarChart';
import WorldMap from './components/WorldMap';

function App() {
  // Activated on click continent (activated in component WorldMap)
  const [currentId, setCurrentId] = useState(null);
  function onContinentChange(id) {
    setCurrentId(id);
  }

  // Gets the data from function getData (module currencyData)
  const [json, setJson] = useState(null);
  useEffect(() => {
    getData().then(data => setJson(data));
  })

  return (
    <div className='App'>
      <h1>Currencies compared to &euro;1</h1>
      <div className='hidden' id='tooltip'>
        <p className='hidden' id='content'></p>
      </div>

      {/* Shows WorldMap if json is loaded */}
      {json ? <WorldMap onContinentChange={onContinentChange} data={json} /> : null}

      {/* Creates anchor for close button overlay */}
      <a href="/" class="close"></a>

      {/* Shows BarChart if json and currentId is loaded */}
      {json && currentId ? <BarChart data={json[currentId]} /> : null}
    </div>
  );
}

export default App;