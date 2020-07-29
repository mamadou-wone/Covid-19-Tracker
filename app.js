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
                console.log(response);
            } else {
                alert('Une erreur est survenue !');
            }
        }
    }
}




// getWordStat();