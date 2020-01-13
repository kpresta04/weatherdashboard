$(document).ready(function() {
  function todaysWeather(cityName) {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      let temp = (response.main.temp - 273.15) * 1.8 + 32;
      temp = temp.toFixed(1);
      console.log(response);
      const mainHTML = `<h2>${response.name} ${moment().format("l")}
      <h3>Temperature: ${temp}°F</h3>
      <h3>Humidity: ${response.main.humidity}%</h3>
      <h3>Wind speed: ${response.wind.speed} m/s</h3>
      <h3>${response.weather[0].main}</h3>`;

      $("#mainCol").append(mainHTML);
    });
  }

  todaysWeather("Overland Park");
});
