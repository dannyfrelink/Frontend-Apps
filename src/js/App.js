import '../scss/App.scss';
import { useEffect, useState } from 'react';
import getData from './modules/currencyData.js';
// import BarChart from './components/BarChart';
import WorldMap from './components/WorldMap';

function App() {
  const [json, setJson] = useState(null);
  useEffect(() => {
    getData().then(data => setJson(data))
  })

  // const [selectedFilter, setselectedFilter] = useState('EU')
  // function onRadioButtonChange(e) {
  //   setselectedFilter(e.currentTarget.value)
  // }

  return (
    <div className='App'>
      {/* <h1>Currencies compared to &euro;1</h1>
        <p>Filter on continent:</p>
        <form>
          <label><input type='radio' name='filter' value='EU' id='filter' checked={selectedFilter === 'EU'} onChange={onRadioButtonChange} />Europe</label>
          <label><input type='radio' name='filter' value='NA' id='filter' checked={selectedFilter === 'NA'} onChange={onRadioButtonChange} />North America</label>
          <label><input type='radio' name='filter' value='SA' id='filter' checked={selectedFilter === 'SA'} onChange={onRadioButtonChange} />South America</label>
          <label><input type='radio' name='filter' value='AF' id='filter' checked={selectedFilter === 'AF'} onChange={onRadioButtonChange} />Africa</label>
          <label><input type='radio' name='filter' value='AS' id='filter' checked={selectedFilter === 'AS'} onChange={onRadioButtonChange} />Asia</label>
          <label><input type='radio' name='filter' value='OC' id='filter' checked={selectedFilter === 'OC'} onChange={onRadioButtonChange} />Oceania</label>
        </form> */}
      <div className='hidden' id='tooltip'>
        <p className='hidden' id='content'></p>
      </div>
      {/* {json?.EU && <BarChart data={json[selectedFilter]} />} */}

      <WorldMap />
    </div>
  );
}

export default App;