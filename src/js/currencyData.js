// import { useState, setState } from 'react';
import { countriesList } from 'countries-list';
const countries = Object.values(countriesList.countries);
import { init } from './init.js';
import { filterChangeChart } from './filter.js';
import { cleanUpData } from './cleanData.js';

fetch('https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR', {
    'method': 'GET',
    'headers': {
        'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
        'x-rapidapi-key': 'd049923f05mshe1a2ad3cc776bebp102006jsnd2a7bbcc040d'
    }
})
    .then(res => res.json())
    .then(data => cleanUpData(data, countries))
    .then(init)
    .then(filterChangeChart);




// const [data, currencyData] = useState(null)

// const test = setState('test')

// export default test