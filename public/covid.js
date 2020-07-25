let select = document.getElementById('select');
let countryTable = document.querySelector('tbody');
let totalCase = document.getElementById('totalCases');
let recovered = document.getElementById('recovered');
let deaths = document.getElementById('deaths');
let divStatus = document.getElementById('status');

let todayDeath;
let longCountry = [];
let latCountry = [];
let countryName = [];
let countryFlag = [];


const apiUrl = 'https://disease.sh/v3/covid-19/countries/';
const allCaseApi = 'https://disease.sh/v3/covid-19/all/';

function suroundNumber(number) {
    if (number < 1000) {
        return number;
    } else if (number > 1000 && number < 1000000) {
        return (number / 1000).toFixed(1) + 'K';
    } else if (number > 1000000 && number < 10000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else {
        return (number / 1000000).toFixed(1) + 'M';
    }
}

function getPlus(number) {
    if (number == 0) {
        return '';
    } else {
        return '+';
    }
}


function addChart(todayCases, critical, totalDeaths, todayRecovered) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ['TodayCases', 'Critical', 'TotalDeath', 'Todayrecovered'],
            datasets: [{
                label: 'Worldwide State ',
                backgroundColor: [
                    'orange',
                    'rgb(255, 99, 132)',
                    'red',
                    '#63D267',

                    // '#CEA74D',
                    // 'orange',
                ],
                borderColor: 'rgb(255, 99, 132)',
                data: [todayCases, critical, totalDeaths, todayRecovered, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
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
                todayDeath = response.todayDeaths;
                addChart(response.todayCases, response.critical, todayDeath, response.todayRecovered);
                document.querySelector('.totalCases').textContent = getPlus(parseFloat(response.cases)) + suroundNumber(parseFloat(response.cases)) + 'total';
                document.querySelector('.recovered').textContent = getPlus(parseFloat(response.recovered)) + suroundNumber(parseFloat(response.recovered)) + 'total';
                document.querySelector('.deaths').textContent = getPlus(parseFloat(response.deaths)) + suroundNumber(parseFloat(response.deaths)) + 'total';
                document.querySelector('.plusCases').textContent = getPlus(parseFloat(response.todayCases)) + suroundNumber(parseFloat(response.todayCases));
                document.querySelector('.plusRecovered').textContent = getPlus(parseFloat(response.todayRecovered)) + suroundNumber(parseFloat(response.todayRecovered));
                document.querySelector('.plusDeath').textContent = getPlus(parseFloat(response.todayDeaths)) + suroundNumber(parseFloat(response.todayDeaths));
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
                    countryName.push(element.country);
                    longCountry.push(element.countryInfo.long);
                    latCountry.push(element.countryInfo.lat);
                    countryFlag.push(element.countryInfo.flag);




                    let trCountry = document.createElement('tr');
                    let tdCountry = document.createElement('td');
                    let tdCases = document.createElement('td');
                    tdCountry.textContent = element.country;
                    tdCases.textContent = element.cases;
                    trCountry.append(tdCountry);
                    trCountry.append(tdCases);
                    countryTable.append(trCountry);


                    trCountry.addEventListener('click', () => {

                        map(element.countryInfo.long, element.countryInfo.lat, element.countryInfo.flag, element.country);
                        document.querySelector('.totalCases').textContent = getPlus(parseFloat(element.cases)) + suroundNumber(parseFloat(element.cases)) + ' total';
                        document.querySelector('.recovered').textContent = getPlus(parseFloat(element.recovered)) + suroundNumber(parseFloat(element.recovered)) + ' total';
                        document.querySelector('.deaths').textContent = getPlus(parseFloat(element.deaths)) + suroundNumber(parseFloat(element.deaths)) + ' total';
                        document.querySelector('.plusCases').textContent = getPlus(parseFloat(element.todayCases)) + suroundNumber(parseFloat(element.todayCases));
                        document.querySelector('.plusRecovered').textContent = getPlus(parseFloat(element.todayRecovered)) + suroundNumber(parseFloat(element.todayRecovered));
                        document.querySelector('.plusDeath').textContent = getPlus(parseFloat(element.todayDeaths)) + suroundNumber(parseFloat(element.todayDeaths));
                    })

                }
            } else {
                alert('Une erreur est intervenue');
            }


            for (let index = 0; index < countryName.length; index++) {
                const element = countryName[index];
                let option = document.createElement('option');
                option.textContent = element;
                select.append(option);
                select.onchange = () => {
                    let indexNumber = countryName.indexOf(select.value);
                    let value = select.value;
                    let lat = latCountry[indexNumber];
                    let long = longCountry[indexNumber];
                    let flag = countryFlag[indexNumber];
                    map(long, lat, flag, value);

                }
            }
        }
    }
}



function map(lgn = -14, lat = 14, flag = 'https://disease.sh/assets/img/flags/sn.png', country = 'Senegal') {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXdvbmU0NzIiLCJhIjoiY2tjeGZ2N2kyMG5jdTJybWpoYjZjOW9oNiJ9.u3xPrAaEvDiaeqwH3wTHOg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lgn, lat], // starting position [lng, lat]
        zoom: 4 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    var marker = new mapboxgl.Marker()
        .setLngLat([lgn, lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML("<img src = " + flag + " class = 'img'>" + '</img><p>' + country + '</p>'))
        .addTo(map);

}



map();
getCountryCase();