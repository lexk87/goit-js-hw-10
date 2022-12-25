import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const elements = {
    inputEl: document.querySelector("#search-box"),
    countryListEl: document.querySelector(".country-list"),
    countryInfoEl: document.querySelector(".country-info"),
};
const { inputEl, countryListEl, countryInfoEl } = elements;

function searchCountry(e) {
    const query = e.target.value.trim();

    clearMarkup();

    if (!query) {
        return;
    }

    fetchCountries(query)
        .then(renderSearchResult)
        .catch(fetchError);
};

function renderSearchResult(countries) {
    clearMarkup();

    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length > 1) {
        renderCountriesList(countries);
    } else {
        renderCountryInfo(countries);
    };
};

function renderCountriesList(countries) {
    countryListEl.innerHTML = countries.map(({name, flags}) => {
        return `<li class="country-list_item"><img src="${flags.svg}" alt="${name.official}" class="country-list_img" width="70"><h2 class="country-list_name">${name.official}</h2></li>`
    }).join("");
};

function renderCountryInfo(countries) {
    countryInfoEl.innerHTML = countries.map(({name, capital, population, flags, languages}) => {
        return `<img src="${flags.svg}" alt="${name.official}" class="country-info_img" width="100"><h2 class="country-info_name">${name.official}</h2><p class="country-info_capital"><span style="font-weight: 800;">Capital: </span>${capital}</p><p class="country-info_population"><span style="font-weight: 800;">Population: </span>${population}</p><p class="country-info_languages"><span style="font-weight: 800;">Languages: </span>${Object.values(languages).join(", ")}</p>`
    }).join("");
};

function fetchError() {
    Notify.failure("Oops, there is no country with that name");
};

function clearMarkup() {
    countryListEl.innerHTML = "";
    countryInfoEl.innerHTML = "";
};

inputEl.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));