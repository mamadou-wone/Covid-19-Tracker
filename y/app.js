const allCountries = 'https://disease.sh/v3/covid-19/countries/';
const word = 'https://disease.sh/v3/covid-19/all/';

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
                todayNew.textContent = '+' + new Intl.NumberFormat('ja-JP').format(response.todayCases) + ' today';
                todayRecovered.textContent = '+' + new Intl.NumberFormat('ja-JP').format(response.todayRecovered) + ' today';
                todayDeath.textContent = '+' + new Intl.NumberFormat('ja-JP').format(response.todayDeaths) + ' today';
                totalCases.textContent = '+' + suroundNumber(response.cases) + ' total';
                totalRecovered.textContent = '+' + suroundNumber(response.recovered) + ' total';
                totalDeath.textContent = '+' + suroundNumber(response.deaths) + ' total';
                myChart(response.todayCases, response.critical, response.todayDeaths, response.todayRecovered);
            } else {
                alert('Une erreur est survenue !');
            }
        }
    }
}

let displayCountryStat = (data) => {
    data.forEach(country => {
        let tr = document.createElement('tr');
        let tdFlag = document.createElement('td');
        let flag = document.createElement('img');
        flag.src = country['countryInfo']['flag'];
        flag.style.width = '30px';
        flag.style.borderRadius = '5px';
        tdFlag.append(flag);
        let tdCountry = document.createElement('td');
        tdCountry.textContent = country['country'];
        let tdCase = document.createElement('td');
        tdCase.textContent = new Intl.NumberFormat('ja-JP').format(country['cases']);
        tr.append(tdFlag, tdCountry, tdCase);
        document.querySelector('tbody').append(tr);

        tr.addEventListener('click', () => {
            getMap(country['countryInfo']['long'], country['countryInfo']['lat'], country['countryInfo']['flag'], country['country']);
            document.querySelector('#totalCase').textContent = '+' + suroundNumber(country['cases']) + ' Total';
            document.querySelector("#todayNew").textContent = '+' + new Intl.NumberFormat('ja-JP').format(country['todayCases']) + ' Today';
            document.querySelector('#todayRecovered').textContent = '+' + new Intl.NumberFormat('ja-JP').format(country['todayRecovered']) + ' Today';
            document.querySelector('#totalRecovered').textContent = '+' + suroundNumber(country['recovered']) + ' Total';
            document.querySelector('#todayDeath').textContent = '+' + new Intl.NumberFormat('ja-JP').format(country['todayDeaths']) + ' Today';
            document.querySelector('#totalDeath').textContent = '+' + suroundNumber(country['deaths']) + ' Total';
            myChart(country['todayCases'], country['critical'], country['todayDeaths'], country['todayRecovered']);
        });
    });

}

function getCaseByCountry() {
    let request = new XMLHttpRequest();
    request.open('GET', allCountries);
    request.responseType = 'json';
    request.send();
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let data = request.response.sort((a, b) => {
                    return b.cases - a.cases
                });
                displayCountryStat(data)
            } else {
                alert('Une erreur est survenue !');
            }
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

function myChart(todayCase, critical, todayDeath, totalRecovered) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['TodayCase', 'Critical', 'TodayDeath', 'TodayRecovered'],
            datasets: [{
                label: 'Today Live info',
                data: [todayCase, critical, todayDeath, totalRecovered],
                backgroundColor: [
                    'orange',
                    'rgb(255, 99, 132)',
                    'red',
                    '#63D267',

                ],
                borderColor: [
                    'orange',
                    'rgb(255, 99, 132)',
                    'red',
                    '#63D267',

                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

getMap();
getWordStat();
getCaseByCountry();