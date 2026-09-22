const boton = document.getElementById("boton");
let weatherData;
let unidadActual = "F";

function mostrarDatos() {
    const divGeneral = document.getElementById("contenedor-general");

    let miDiv = document.getElementById("data-weather");
    if (!miDiv) {
        miDiv = document.createElement("div");
        miDiv.setAttribute("id", "data-weather");
        divGeneral.appendChild(miDiv);
    }

    const temp = unidadActual === "F"
        ? weatherData.temp
        : Math.round((weatherData.temp - 32) * 5 / 9);

    const sensacion = unidadActual === "F"
        ? weatherData.sensacion
        : Math.round((weatherData.sensacion - 32) * 5 / 9);

    miDiv.innerHTML = `
        <h2>${weatherData.ciudad}</h2>
        <p>Temperatura: ${temp}°${unidadActual}</p>
        <p>Sensación térmica: ${sensacion}°${unidadActual}</p>
        <p>Condición: ${weatherData.descripcion}</p>
        <p>Humedad: ${weatherData.humedad}%</p>
        <p>Viento: ${weatherData.viento} mph</p>
        <p>Amanecer: ${weatherData.amanecer}</p>
        <p>Atardecer: ${weatherData.atardecer}</p>
        <div id="toggle-unidad">
            <button id="btn-f" ${unidadActual === "F" ? "disabled" : ""}>°F</button>
            <button id="btn-c" ${unidadActual === "C" ? "disabled" : ""}>°C</button>
        </div>
    `;

    document.getElementById("btn-f").addEventListener("click", () => {
        unidadActual = "F";
        mostrarDatos();
    });
    document.getElementById("btn-c").addEventListener("click", () => {
        unidadActual = "C";
        mostrarDatos();
    });
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
        }
    }

    weatherApp();
});