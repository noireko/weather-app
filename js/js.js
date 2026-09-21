const boton = document.getElementById("boton");
let weatherData;

function mostrarDatos() {
    const divGeneral = document.getElementById("contenedor-general");
    const miDiv = document.createElement("div");
    miDiv.setAttribute("id", "data-weather");
    divGeneral.appendChild(miDiv);
    miDiv.innerHTML = weatherData;
}

boton.addEventListener("click", function () {
    const valorInput = document.getElementById("ubicacion").value;
    async function weatherApp() {
        try {
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${valorInput}%2C?unitGroup=us&key=AD2XUC4M9DXJY3KNG5CFGBZU5`);
            const data = await res.json();
            weatherData = data.timezone;
            console.log(weatherData);
            mostrarDatos();
        } catch (err) {
            console.log(err);
        };
    };
    weatherApp();
});


