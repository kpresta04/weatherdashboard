$(document).ready(function() {
  const iconCodes = [
    {
      id: 200 - 232,
      descrip: "thunderstorm",
      dayIcon_url: "http://openweathermap.org/img/wn/11d@2x.png",
      nightIcon_url: "http://openweathermap.org/img/wn/11n@2x.png"
    }
  ];

  function todaysWeather(cityName) {
    const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      const temp = response.main.temp.toFixed(1);
      console.log(response);
      const mainHTML = `<div class="card" style="width: 18rem;">
      <img src="http://openweathermap.org/img/wn/11d@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">${response.name} ${moment().format("l")}</h2>
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.main.humidity}%</h5>
      <h5>Wind speed: ${response.wind.speed} MPH</h5>
      <h5>${response.weather[0].main}</h5>
  </div>
</div>`;

      $("#mainRow").append(mainHTML);
    });
  }
  function fiveDayForecast(cityName) {
    const queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      let addDays = 1;
      for (let i = 0; i < 40; i += 9) {
        const temp = response.list[i].main.temp.toFixed(1);
        // console.log(response);
        console.log(i);
        const mainHTML = `<div class="card mx-2" style="width: 18rem;">
      <img src="http://openweathermap.org/img/wn/11d@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">${response.city.name} ${moment()
          .add(addDays, "days")
          .format("l")}</h2>
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.list[i].humidity}%</h5>
      <h5>Wind speed: ${response.list[i].wind.speed} MPH</h5>
      <h5>${response.list[i].weather[0].main}</h5>
  </div>
</div>`;
        addDays++;
        $("#5dayRow").append(mainHTML);
      }
    });
  }

  todaysWeather("Overland Park");
  fiveDayForecast("Overland Park");
});
