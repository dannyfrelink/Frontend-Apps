import '../scss/App.scss';
import { useEffect, useState } from 'react';
import getData from './modules/currencyData.js';
import BarChart from './components/BarChart';
import WorldMap from './components/WorldMap';

function App() {
  const [currentId, setCurrentId] = useState(null);
  const onContinentChange = (id) => {
    setCurrentId(id)
  }

  const [json, setJson] = useState(null);
  useEffect(() => {
    getData().then(data => setJson(data))
  })

  const barData = json?.EU && currentId ? json[currentId] : null

  return (
    <div className='App'>
      <h1>Currencies compared to &euro;1</h1>
      {/* <div className='hidden' id='tooltip'>
        <p className='hidden' id='content'></p>
      </div> */}
      <WorldMap onContinentChange={onContinentChange} />

      {barData && <BarChart data={barData} />}
    </div>
  );
}

export default App;