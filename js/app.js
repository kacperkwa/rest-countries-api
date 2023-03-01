const countryContainer = document.querySelector('.country-cards');
const searchInput = document.querySelector('#search-input');
const filter = document.querySelector('#filter');
const API_URL = 'data.json';
let countryName;
const sendHttpRequest = API_URL => {
	return fetch(API_URL).then(response => {
		return response.json();
	});
};

async function fetchCountries() {
	const responseData = await sendHttpRequest(API_URL);
	const listOfCountries = responseData;
	countryContainer.innerHTML = ``;
	listOfCountries.forEach(country => {
		if (country.region === filter.value) {
			countryContainer.innerHTML =
				countryContainer.innerHTML +
				`<div class="card">
			<img src="${country.flag}" class="card__img" alt="${country.name} flag">
			<div class="card__description">
         <h2 class="card__name">${country.name}</h2>
         <p class="card__population"><span>Population:</span> ${country.population}</p>
         <p class="card__region"><span>Region:</span> ${country.region}</p>
         <p class="card__capital"><span>Capital:</span> ${country.capital}</p>
			</div>
			</div>`;
		} else if (filter.value === 'all') {
			countryContainer.innerHTML =
				countryContainer.innerHTML +
				`<div class="card">
   <img src="${country.flag}" class="card__img" alt="${country.name} flag">
   <div class="card__description">
      <h2 class="card__name">${country.name}</h2>
      <p class="card__population"><span>Population:</span> ${country.population}</p>
      <p class="card__region"><span>Region:</span> ${country.region}</p>
      <p class="card__capital"><span>Capital:</span> ${country.capital}</p>
   </div>
   </div>`;
		}
	});
}
async function fetchByName() {
	const responseData = await sendHttpRequest(API_URL);
	const listOfCountries = responseData;
	const countryName = searchInput.value.toUpperCase().trim();
	countryContainer.innerHTML = ``;
	listOfCountries.forEach(country => {
		if (country.name.toUpperCase() === countryName) {
			countryContainer.innerHTML =
				countryContainer.innerHTML +
				`<div class="card">
	<img src="${country.flag}" class="card__img" alt="${country.name} flag">
	<div class="card__description">
		<h2 class="card__name">${country.name}</h2>
		<p class="card__population"><span>Population:</span> ${country.population}</p>
		<p class="card__region"><span>Region:</span> ${country.region}</p>
		<p class="card__capital"><span>Capital:</span> ${country.capital}</p>
	</div>
	</div>`;
		}
	});
}

async function modalHandler(target) {
	const responseData = await sendHttpRequest(API_URL);
	const listOfCountries = responseData;
	console.log(target.closest('.card__name'));
	
}

filter.addEventListener('change', fetchCountries, false);
searchInput.addEventListener('keyup', e => {
	if (e.key === 'Enter') {
		fetchByName();
	}
});
document.addEventListener('click', e => {
	const target = e.target.closest('.card');
	if (target) {
		modalHandler(target);
	}
});
