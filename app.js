const allCountries = 'https://disease.sh/v3/covid-19/countries/';
const word = 'https://disease.sh/v3/covid-19/all/';

function getWordStat() {
    let request = new XMLHttpRequest();
    request.open('GET', word);
    request.responseType = 'json';
    request.send();

    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let response = request.response;
                console.log(response);
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
                    let tr = document.createElement('tr');
                    let tdFlag = document.createElement('td');
                    let flag = document.createElement('img');
                    flag.src = element.countryInfo.flag;
                    flag.style.width = '30px';
                    flag.style.borderRadius = '5px';
                    tdFlag.append(flag);
                    let tdCountrie = document.createElement('td');
                    tdCountrie.textContent = element.country;
                    let tdCase = document.createElement('td');
                    tdCase.textContent = element.cases;
                    tr.append(tdFlag, tdCountrie, tdCase);
                    document.querySelector('tbody').append(tr);

                }
            } else {
                alert('Une erreur est survenue !');
            }
        }
    }
}

getCaseByCountry();