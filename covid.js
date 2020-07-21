let select = document.getElementById('select');
let countryTable = document.querySelector('tbody');
let totalCase = document.getElementById('totalCases');
let recovered = document.getElementById('recovered');
let deaths = document.getElementById('deaths');




const apiUrl = 'https://disease.sh/v3/covid-19/countries/';
const allCaseApi = 'https://disease.sh/v3/covid-19/all/';

// const sortData = (data) => {

//     const sortedData = [...data];
//     sortData.sort((a, b) => {
//         if (a.cases > b.cases) {
//             return -1;
//         } else {
//             return 1;
//         }
//     });
//     return sortData;

// }


function surround(number) {
    if (number > 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else if (number > 10000000) {
        return ((number) / 1000000).toFixed(1) + 'M'
    } else {
        return number;
    }
}


function getAllCase() {
    let request = new XMLHttpRequest();
    request.open('GET', allCaseApi);
    request.responseType = 'json';
    request.send();


    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                document.querySelector('.totalCases').textContent = response.cases > 10000000 ? ((response.cases) / 1000000).toFixed(1) + 'M' : response.cases;
                document.querySelector('.recovered').textContent = response.recovered;
                document.querySelector('.deaths').textContent = response.deaths;
                document.querySelector('.plusCases').textContent = response.todayCases;
                document.querySelector('.plusRecovered').textContent = response.todayRecovered;
                document.querySelector('.plusDeath').textContent = response.todayDeaths;
            } else {
                alert('Une erreur est intervenue');
            }
        }
    }
}

getAllCase();

function getCountryCase() {
    let request = new XMLHttpRequest();
    request.open('GET', apiUrl);
    request.responseType = 'json';
    request.send();


    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    let option = document.createElement('option');
                    option.textContent = element.country;
                    select.append(option);

                    let trCountry = document.createElement('tr');
                    let tdCountry = document.createElement('td');
                    let tdCases = document.createElement('td');
                    tdCountry.textContent = element.country;
                    tdCases.textContent = element.cases;
                    trCountry.append(tdCountry);
                    trCountry.append(tdCases);
                    countryTable.append(trCountry);

                    trCountry.addEventListener('click', () => {
                        document.querySelector('.totalCases').textContent = element.cases;
                        document.querySelector('.recovered').textContent = element.recovered;
                        document.querySelector('.deaths').textContent = element.deaths;
                        document.querySelector('.plusCases').textContent = element.todayCases;
                        document.querySelector('.plusRecovered').textContent = element.todayRecovered;
                        document.querySelector('.plusDeath').textContent = element.todayDeaths;
                    })

                }
            } else {
                alert('Une erreur est intervenue');
            }
        }
    }
}

getCountryCase();