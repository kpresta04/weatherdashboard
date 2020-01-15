$(document).ready(function() {
  const iconCodes = {
    200: "11d",
    201: "11d",
    202: "11d",
    210: "11d",
    211: "11d",
    212: "11d",
    221: "11d",
    230: "11d",
    231: "11d",
    232: "11d",
    300: "09d",
    301: "09d",
    302: "09d",
    310: "09d",
    311: "09d",
    312: "09d",
    313: "09d",
    314: "09d",
    321: "09d",
    500: "10d",
    501: "10d",
    502: "10d",
    503: "10d",
    504: "10d",
    511: "13d",
    520: "09d",
    521: "09d",
    522: "09d",
    531: "09d",
    600: "13d",
    601: "13d",
    602: "13d",
    611: "13d",
    612: "13d",
    613: "13d",
    615: "13d",
    616: "13d",
    620: "13d",
    621: "13d",
    622: "13d",
    701: "50d",
    711: "50d",
    721: "50d",
    731: "50d",
    741: "50d",
    751: "50d",
    761: "50d",
    762: "50d",
    771: "50d",
    781: "50d",
    800: "01d",
    801: "02d",
    802: "03d",
    803: "04d",
    804: "04d"
  };

  $("#submitBtn").on("click", submitClick);
  $("#searchForm").on("submit", submitClick);

  function submitClick(e) {
    e.preventDefault();

    if ($("#searchForm").val() !== "") {
      todaysWeather($("#searchForm").val());
      fiveDayForecast($("#searchForm").val());
    }
  }

  function todaysWeather(cityName) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#mainCard").empty();

      const temp = response.main.temp.toFixed(1);
      // console.log(response);
      // console.log(response.weather[0].id);
      // console.log(iconCodes[803]);
      const mainHTML = `<div class="picBg card text-center mx-auto shadow-lg p-3 mb-5 bg-white rounded" style="width: 18rem;">
      <img src="https://openweathermap.org/img/wn/${
        iconCodes[response.weather[0].id]
      }@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${response.name} ${moment().format("l")}</h3>
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.main.humidity}%</h5>
      <h5>Wind speed: ${response.wind.speed} MPH</h5>
      <h5>${response.weather[0].main}</h5>
  </div>
</div>`;

      $("#mainCard").prepend(mainHTML);
    });
  }
  function fiveDayForecast(cityName) {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      $("#5dayRow").empty();
      let addDays = 1;
      for (let i = 1; i < 40; i += 9) {
        const temp = response.list[i].main.temp.toFixed(1);
        // console.log(response);
        // console.log(response.list[i].weather[0].id);
        const mainHTML = `<div class=" picBg card mx-1 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
      <img src="https://openweathermap.org/img/wn/${
        iconCodes[response.list[i].weather[0].id]
      }@2x.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h3 class="card-title">${response.city.name} ${moment()
          .add(addDays, "days")
          .format("l")}</h3>
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.list[i].main.humidity}%</h5>
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
