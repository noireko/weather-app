const ubicacion = document.getElementById("ubicacion").value;

async function weatherAppAPI() {
    try {
        const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${ubicacion}%2C?unitGroup=us&key=AD2XUC4M9DXJY3KNG5CFGBZU5`);
        const data = await res.json();
        console.log(data.timezone);
    } catch (err) {
        console.log(err);
    }   
}

weatherAppAPI();

