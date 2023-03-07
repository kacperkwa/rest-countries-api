const countryContainer = document.querySelector('.country-cards');
const searchInput = document.querySelector('#search-input');
const filter = document.getElementById('filter');
const wrapper = document.querySelector('.wrapper');
const backBtn = document.getElementsByClassName('back-btn');
const modalSection = document.querySelector('.modal');
const themeBtn = document.querySelector('.navigation__theme-btn');

const main = document.querySelector('.main');
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
         <p class="card__population"><span>Population:</span> ${country.population.toLocaleString()}</p>
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
      <p class="card__population"><span>Population:</span> ${country.population.toLocaleString()}</p>
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
		<p class="card__population"><span>Population:</span> ${country.population.toLocaleString()}</p>
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
	const card = target.closest('.card');
	const cardName = card.querySelector('.card__name').textContent;
	modalSection.style.display = 'flex';
	main.style.display = 'none';
	listOfCountries.forEach(country => {
		if (country.name === cardName) {
			modalSection.innerHTML =
				modalSection.innerHTML +
				`
				<div class="modal__container">
				<button class="back-btn">Back</button> 
            <div class="countries-description">
               <img src="${country.flag}" alt="${country.name} flag">
               <h2 class="name">${country.name}</h2>
               <p class="native-name"><span>Native Name:</span> ${
						country.nativeName
					}</p>
               <p class="population"><span>Population:</span> ${country.population.toLocaleString()}</p>
               <p class="region"><span>Region:</span> ${country.region}</p>
               <p class="sub-region"><span>Sub Region:</span> ${
						country.subregion
					}</p>
               <p class="capital"><span>Capital:</span> ${country.capital}</p>
               <p class="domain"><span>Top level Domain:</span> ${
						country.topLevelDomain
					}</p>
               <p class="currencies"><span>Currencies:</span> ${country.currencies.map(
						el => el.name
					)}</p>
               <p class="Languages"><span>Languages:</span> ${country.languages.map(
						el => el.name
					)}</p>
            </div>
         </div>`;
		}
	});
}
const closeModal = () => {
	const modalContainer = modalSection.querySelector('.modal__container');
	main.style.display = 'block';
	modalSection.style.display = 'none';
	modalContainer.remove();
};

const themeSwitcher = () => {
	const body = document.querySelector('body');
	const nav = document.querySelector('.navigation');
	const cards = document.querySelectorAll('.card');
	body.classList.toggle('dark');
	nav.classList.toggle('dark-element');
	modalSection.classList.toggle('dark');
	// cards.forEach(card => {
	// 	card.classList.toggle('dark-element');
	// });
};

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
document.addEventListener('click', e => {
	const target = e.target.closest('.back-btn');
	if (target) {
		closeModal(target);
	}
});
themeBtn.addEventListener('click', themeSwitcher);
