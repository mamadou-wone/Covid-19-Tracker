var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
        // console.log(this.responseText);
        // document.body.textContent = this.responseText;
    }
});

xhr.open("GET", "https://coronavirus-map.p.rapidapi.com/api/v1/regions");
xhr.setRequestHeader("x-rapidapi-host", "coronavirus-map.p.rapidapi.com");
xhr.setRequestHeader("x-rapidapi-key", "0f7a7ada68msh267bc5e330be523p1a6bd2jsn584183b3a9ee");

xhr.send(data);

fetch("https://coronavirus-map.p.rapidapi.com/api/v1/regions", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-map.p.rapidapi.com",
            "x-rapidapi-key": "0f7a7ada68msh267bc5e330be523p1a6bd2jsn584183b3a9ee"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });