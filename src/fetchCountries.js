const ENDPOINT = "https://restcountries.com/v3.1/name/";
const FILTERS = "name.official,capital,population,flags.svg,languages";

export function fetchCountries(name) {
    const url = `${ENDPOINT}${name}&${FILTERS}`;

    return fetch(url).then(response => {
        return response.json();
    });
};