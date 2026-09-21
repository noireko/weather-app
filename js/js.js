const boton = document.getElementById("boton");
let weatherData;

function mostrarDatos() {
    const divGeneral = document.getElementById("contenedor-general");
    const miDiv = document.createElement("div");
    miDiv.setAttribute("id", "data-weather");
    divGeneral.appendChild(miDiv);
    miDiv.innerHTML = `
        <h2>${weatherData.ciudad}</h2>
        <p>Temperatura: ${weatherData.temp}°F</p>
        <p>Sensación térmica: ${weatherData.sensacion}°F</p>
        <p>Condición: ${weatherData.descripcion}</p>
        <p>Humedad: ${weatherData.humedad}%</p>
        <p>Viento: ${weatherData.viento} mph</p>
        <p>Amanecer: ${weatherData.amanecer}</p>
        <p>Atardecer: ${weatherData.atardecer}</p>
    `;
}


boton.addEventListener("click", function () {
    const valorInput = document.getElementById("ubicacion").value;
    async function weatherApp() {
        try {
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${valorInput}%2C?unitGroup=us&key=AD2XUC4M9DXJY3KNG5CFGBZU5`);
            const data = await res.json();
            const actual = data.currentConditions;
            weatherData = {
                ciudad: data.resolvedAddress,
                temp: Math.round(actual.temp),
                sensacion: Math.round(actual.feelslike),
                descripcion: actual.conditions,
                icono: actual.icon,
                humedad: actual.humidity,
                viento: actual.windspeed,
                amanecer: actual.sunrise,
                atardecer: actual.sunset,
            };

            console.log(weatherData);
            mostrarDatos();
        } catch (err) {
            console.log(err);
        };
    };
    weatherApp();
});


