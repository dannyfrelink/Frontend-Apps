import logo from '.././logo.svg';
import '../scss/App.scss';
import { useEffect, useState } from 'react';
import getData from './components/currencyData.js';
import BarChart from './components/barChart';

function App() {
  const [json, setJson] = useState(null);
  useEffect(() => {
    getData().then(data => setJson(data))
  })

  // const currenciesEU = json?.EU.map(d => d.currency)
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Currencies compared to &euro;1</h1>
        <p>Filter on continent:</p>
        <form>
          <label><input type='radio' name='filter' value='EU' id='filter' checked />Europe</label>
          <label><input type='radio' name='filter' value='NA' id='filter' />North America</label>
          <label><input type='radio' name='filter' value='SA' id='filter' />South America</label>
          <label><input type='radio' name='filter' value='AF' id='filter' />Africa</label>
          <label><input type='radio' name='filter' value='AS' id='filter' />Asia</label>
          <label><input type='radio' name='filter' value='OC' id='filter' />Oceania</label>
        </form>
        {json?.EU && <BarChart data={json?.AS} />}
      </header>
    </div>
  );
}

export default App;
