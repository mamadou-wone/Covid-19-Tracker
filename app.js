const allCountries = 'https://disease.sh/v3/covid-19/countries/';
const word = 'https://disease.sh/v3/covid-19/all/';
let countrieInfo = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

let newCountrieInfo = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

let todayNew = document.querySelector('#todayNew');
let todayRecovered = document.querySelector('#todayRecovered');
let todayDeath = document.querySelector('#todayDeath');
let totalCases = document.querySelector('#totalCase');
let totalRecovered = document.querySelector('#totalRecovered');
let totalDeath = document.querySelector('#totalDeath');

function getWordStat() {
    let request = new XMLHttpRequest();
    request.open('GET', word);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                todayNew.textContent = new Intl.NumberFormat('ja-JP').format(response.todayCases) + ' today';
                todayRecovered.textContent = new Intl.NumberFormat('ja-JP').format(response.todayRecovered) + ' today';
                todayDeath.textContent = new Intl.NumberFormat('ja-JP').format(response.todayDeaths) + ' today';
                totalCases.textContent = suroundNumber(response.cases) + ' total';
                totalRecovered.textContent = suroundNumber(response.recovered) + ' total';
                totalDeath.textContent = suroundNumber(response.deaths) + ' total';

            } else {
                alert('Une erreur est survenue !');
            }
        }
    }
}


function getCaseByCountry() {
    let request = new XMLHttpRequest();
    request.open('GET', allCountries);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    newCountrieInfo[0].push(element.cases);
                    newCountrieInfo[1].push(element.country);
                    newCountrieInfo[2].push(element.countryInfo.flag);
                    newCountrieInfo[3].push(element.todayCases);
                    newCountrieInfo[4].push(element.deaths);
                    newCountrieInfo[5].push(element.todayDeaths);
                    newCountrieInfo[6].push(element.recovered);
                    newCountrieInfo[7].push(element.todayRecovered);
                    newCountrieInfo[8].push(element.countryInfo.lat); //26.countryInfo.lat
                    newCountrieInfo[9].push(element.countryInfo.long);
                    // Tableau Initial
                    countrieInfo[0].push(element.cases);
                    countrieInfo[1].push(element.country);
                    countrieInfo[2].push(element.countryInfo.flag);
                    countrieInfo[3].push(element.todayCases);
                    countrieInfo[4].push(element.deaths);
                    countrieInfo[5].push(element.todayDeaths);
                    countrieInfo[6].push(element.recovered);
                    countrieInfo[7].push(element.todayRecovered);
                    countrieInfo[8].push(element.countryInfo.lat);
                    countrieInfo[9].push(element.countryInfo.long);

                    let option = document.createElement('option');
                    option.style.backgroundImage = `url(${element.countryInfo.flag})`;
                    option.value = element.country;
                    option.textContent = element.country;
                    // console.log(option);
                    document.querySelector('#select').append(option);

                }
            } else {
                alert('Une erreur est survenue !');
            }
        }


        countrieInfo[0].sort(function(a, b) {
            return b - a;
        });
        console.log(countrieInfo);
        // console.log(countrieInfo[0][0], countrieInfo[1][newCountrieInfo[0].indexOf(countrieInfo[0][0])]);
        // console.log(countrieInfo);
        // console.log(newCountrieInfo[0].indexOf(countrieInfo[0][0]));

        for (let index = 0; index < countrieInfo[0].length; index++) {
            const element = countrieInfo[0][index];
            const indexCountry = countrieInfo[1][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexFlag = countrieInfo[2][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexTodayCases = countrieInfo[3][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexDeath = countrieInfo[4][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexTodayDeaths = countrieInfo[5][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexRecovered = countrieInfo[6][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexTodayRecovered = countrieInfo[7][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexLat = countrieInfo[8][newCountrieInfo[0].indexOf(countrieInfo[0][index])];
            const indexLong = countrieInfo[9][newCountrieInfo[0].indexOf(countrieInfo[0][index])];

            let tr = document.createElement('tr');
            let tdFlag = document.createElement('td');
            let flag = document.createElement('img');
            flag.src = indexFlag;
            flag.style.width = '30px';
            flag.style.borderRadius = '5px';
            tdFlag.append(flag);
            let tdCountrie = document.createElement('td');
            tdCountrie.textContent = indexCountry;
            let tdCase = document.createElement('td');
            tdCase.textContent = new Intl.NumberFormat('ja-JP').format(countrieInfo[0][index]);
            tr.append(tdFlag, tdCountrie, tdCase);
            document.querySelector('tbody').append(tr);
            tr.addEventListener('click', () => {
                getMap(indexLong, indexLat, indexFlag, indexCountry);
                document.querySelector('#totalCase').textContent = suroundNumber(countrieInfo[0][index]) + ' Total';
                document.querySelector("#todayNew").textContent = new Intl.NumberFormat('ja-JP').format(indexTodayCases) + ' Today';
                document.querySelector('#todayRecovered').textContent = new Intl.NumberFormat('ja-JP').format(indexTodayRecovered) + ' Today';
                document.querySelector('#totalRecovered').textContent = suroundNumber(indexRecovered) + ' Total';
                document.querySelector('#todayDeath').textContent = new Intl.NumberFormat('ja-JP').format(indexTodayDeaths) + ' Today';
                document.querySelector('#totalDeath').textContent = suroundNumber(indexDeath) + ' Total';
            })
        }


    }
}


function getMap(long = -14, lat = 14, flag = "https://disease.sh/assets/img/flags/sn.png", country = 'Senegal') {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXdvbmU0NzIiLCJhIjoiY2tjeGZ2N2kyMG5jdTJybWpoYjZjOW9oNiJ9.u3xPrAaEvDiaeqwH3wTHOg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [long, lat], // long/lat
        zoom: 5
    });
    var marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML("<img src = " + flag + " class = 'img'>" + '</img><p style= "font-weight = bold;">' + country + '</p>'))
        .addTo(map);
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    )
}

getMap();
getWordStat();
getCaseByCountry();