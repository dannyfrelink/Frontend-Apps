const countriesList = require('countries-list');
const countries = Object.values(countriesList.countries);

function getData() {
    return new Promise((resolve) => {
        // Fetch the data from API
        fetch('https://exchangerate-api.p.rapidapi.com/rapid/latest/EUR', {
            'method': 'GET',
            'headers': {
                'x-rapidapi-host': 'exchangerate-api.p.rapidapi.com',
                'x-rapidapi-key': 'd049923f05mshe1a2ad3cc776bebp102006jsnd2a7bbcc040d'
            }
        })
            .then(res => res.json())
            .then(data => cleanUpData(data))

        // Sort API per continent
        function filterContinents(data, continent) {
            return Object.keys(data.rates).map(key => {
                if (continent.has(key) && key !== 'EUR') {
                    return { currency: key, value: data.rates[key] };
                }
            });
        }

        function cleanUpData(data) {
            // Sort NPM package per continent
            function sortCurrencies(continent) {
                return countries
                    .filter(country => country.continent === continent)
                    .map(country => country.currency.split(',').shift())
                    .reduce((j, k) => j.add(k), new Set());
            }

            // Split NPM package into separate variables
            const europeanCurrencies = sortCurrencies('EU');
            const southAmericanCurrencies = sortCurrencies('SA');
            const northAmericanCurrencies = sortCurrencies('NA');
            const africanCurrencies = sortCurrencies('AF');
            const asianCurrencies = sortCurrencies('AS');
            const oceanianCurrencies = sortCurrencies('OC');

            // Resolve data from API per continent (without undefined)
            resolve({
                'EU': filterContinents(data, europeanCurrencies).filter(d => !!d),
                'SA': filterContinents(data, southAmericanCurrencies).filter(d => !!d),
                'NA': filterContinents(data, northAmericanCurrencies).filter(d => !!d),
                'AF': filterContinents(data, africanCurrencies).filter(d => !!d),
                'AS': filterContinents(data, asianCurrencies).filter(d => !!d),
                'OC': filterContinents(data, oceanianCurrencies).filter(d => !!d)
            })
        }
    })
}

export default getData;