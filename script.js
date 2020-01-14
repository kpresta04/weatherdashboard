$(document).ready(function() {
  function todaysWeather(cityName) {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      let temp = response.main.temp;
      temp = temp.toFixed(1);
      console.log(response);
      const mainHTML = `
      
      
      <div class="card" style="width: 18rem;">
  <div class="card-body">
    <h2 class="card-title">${response.name} ${moment().format("l")}</h2>
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.main.humidity}%</h5>
      <h5>Wind speed: ${response.wind.speed} MPH</h5>
      <h5>${response.weather[0].main}</h5>
  </div>
</div>`;

      $("#mainCol").append(mainHTML);
    });
  }
  function fiveDayForecast(cityName) {
    const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
    });
  }

  todaysWeather("Overland Park");
  fiveDayForecast("Overland Park");
});
