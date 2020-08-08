const allCountries = 'https://disease.sh/v3/covid-19/countries/';
const word = 'https://disease.sh/v3/covid-19/all/';
let caseTab = [
    [],
    [],
    []
];

let newCaseTab = [
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
                    newCaseTab[0].push(element.cases);
                    newCaseTab[1].push(element.country);
                    newCaseTab[2].push(element.countryInfo.flag);
                    caseTab[0].push(element.cases);
                    caseTab[1].push(element.country);
                    caseTab[2].push(element.countryInfo.flag);


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


        caseTab[0].sort(function(a, b) {
            return b - a;
        });
        // console.log(caseTab[0][0], caseTab[1][newCaseTab[0].indexOf(caseTab[0][0])]);
        // console.log(caseTab);
        // console.log(newCaseTab[0].indexOf(caseTab[0][0]));

        for (let index = 0; index < caseTab[0].length; index++) {
            const element = caseTab[0][index];
            const indexCountry = caseTab[1][newCaseTab[0].indexOf(caseTab[0][index])];
            const indexFlag = caseTab[2][newCaseTab[0].indexOf(caseTab[0][index])];
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
            tdCase.textContent = new Intl.NumberFormat('ja-JP').format(caseTab[0][index]);
            tr.append(tdFlag, tdCountrie, tdCase);
            document.querySelector('tbody').append(tr);
            tr.addEventListener('click', () => {
                console.log('click');
            })
        }


    }
}

getWordStat();
getCaseByCountry();