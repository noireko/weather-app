const boton = document.getElementById("boton");

boton.addEventListener("click", function () {
    const valorInput = document.getElementById("ubicacion").value;
    async function weatherApp() {
        try {
            const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${valorInput}%2C?unitGroup=us&key=AD2XUC4M9DXJY3KNG5CFGBZU5`);
            const data = await res.json()
            console.log(data.timezone)
        } catch (err) {
            console.log(err);
        };
    };
    weatherApp();
});


