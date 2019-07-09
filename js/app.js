// API variable

const weatherAPI = "https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/45165/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ5b3ZpcmluY0BnbWFpbC5jb20iLCJqdGkiOiJjZGU3YmYxYi1hODNhLTRhMTktYmYxOS0yZTQ3MWQzNmNhOTQiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTU2MjU4MTU2OSwidXNlcklkIjoiY2RlN2JmMWItYTgzYS00YTE5LWJmMTktMmU0NzFkMzZjYTk0Iiwicm9sZSI6IiJ9.FR23V5Ck5S78LeIsaYjiNywNR6oXP18JdvBeSFeElvw";

// primero API fetch init function

init(weatherAPI);

function init(weatherAPI) {
    fetch(weatherAPI).then(response => response.json())
    .then(data => {
        cargarDatos(data.datos);
    });
}

// segunda fetch function y manipular los datos

function cargarDatos(tiempo){
    fetch(tiempo).then(response => response.json())
    .then(data => {

        // seleccionar los elementos
        const body = document.querySelector("body");
        const date = document.querySelector(".date");
        const location = document.querySelector(".location");
        const cielo = document.querySelector(".cielo");
        const icon = document.querySelector(".icon");
        const temp = document.querySelector(".temp");
        const wind = document.querySelector(".wind");
        const humidity = document.querySelector(".humidity");
        const uv = document.querySelector(".uv");

        // ############# pintar los datos #############

        // fecha y local
        const DATA = data[0].prediccion.dia[0];
        date.innerHTML = DATA.fecha;
        location.innerHTML = `temperatura maxima de hoy - ${data[0].nombre}, ${data[0].provincia}`;

        // poner el icono depende de estado cielo
        if(DATA.estadoCielo[0].descripcion === "") {
            cielo.innerHTML = "";
        }else {
            cielo.innerHTML = DATA.estadoCielo[0].descripcion;
        }
        

        const CIELO = data[0].prediccion.dia[0].estadoCielo[0].descripcion;
        if(CIELO === "" || CIELO === "Nublado" || CIELO === "Poco nuboso"
        || CIELO === "Nubes altas"){
            icon.innerHTML = `<i class="wi wi-cloud"></i>`;
            body.style.backgroundImage = "url(./img/nublado.jpg)";
        }else if(CIELO === "Despejado" || CIELO === "Soleado") {
            icon.innerHTML = `<i class="wi wi-day-sunny"></i>`;
            body.style.backgroundImage = "url(./img/despejado.jpg)";
        }else if(CIELO === "Lloviendo" || CIELO === "Nuboso con lluvia escasa") {
            icon.innerHTML = `<i class="wi wi-day-rain"></i>`;
            body.style.backgroundImage = "url(./img/rain.jpg)";
        }else{
            icon.innerHTML = `No hay datos`;
        }

        // maxima temperatura
        temp.innerHTML = `${DATA.temperatura.maxima}<span>&#8451</span>`;
         
        // viento
        if(DATA.viento[0].direccion === "") {
            wind.innerHTML = `-, ${DATA.viento[0].velocidad}`;
        }else{
            wind.innerHTML = `${DATA.viento[0].direccion}, ${DATA.viento[0].velocidad}`;
        }
        
        // media de la humedad
        humidity.innerHTML = (DATA.humedadRelativa.maxima + DATA.humedadRelativa.minima) / 2;
        
        // ultra violeta
        uv.innerHTML = DATA.uvMax;

    });
}


