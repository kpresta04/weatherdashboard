$(document).ready(function() {
  //hide 5 day forecast label until ready
  $("#5dayLabel").hide();
  $("#sideForm").hide();

  $(document).on("click", listClick);

  //click event only runs if tagname is LI

  //array of cities that have been searched for

  let searchHistory = [];

  //add anything that's been saved to local storage to searchHistory

  let getObj = JSON.parse(localStorage.getItem("storeObj"));
  if (getObj !== null) {
    $("#sideForm").show();

    // console.log(getObj);
    searchHistory = getObj;
    searchHistory.forEach(function(entry) {
      $("#cityListItems").append(`<li class="list-group-item">${entry}</li>`);
    });
  }

  // function that removes duplicates from an array
  function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }

  function listClick(e) {
    if (e.target.tagName === "LI") {
      // console.log($(e.target).text());
      todaysWeather($(e.target).text());
      fiveDayForecast($(e.target).text());
    }
  }

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
  $("#submitBtn1").on("click", submitClick);
  $("#searchForm").on("submit", submitClick);
  $("#searchForm1").on("submit", submitClick);
  let targ;

  $(document).ajaxError(function(event, request, settings) {
    // console.log(settings.url);

    let citySubstring = settings.url.substring(
      settings.url.lastIndexOf("q=") + 2,
      settings.url.lastIndexOf("&") - 15
    );
    // console.log(citySubstring);
    if (searchHistory.includes(citySubstring)) {
      searchHistory.pop(citySubstring);
      localStorage.setItem("storeObj", JSON.stringify(searchHistory));
      $("#cityListItems").empty();
      searchHistory.forEach(function(entry) {
        $("#cityListItems").append(`<li class="list-group-item">${entry}</li>`);
      });
    }
    $("#TodayLabel").text("City not found. Try again.");
    $("#mainCard").empty();
    $("#form1").empty();
    $("#5dayRow").empty();
    $("#5dayLabel").hide();

    $("#form1").append(`<div class="w-100">
    <h3 id="landingTitle">
      Search for a city to display the current weather and a 5 day
      forecast.
    </h3>
  </div>
  <label class="sr-only" for="inlineFormInputGroupUsername2"
    >Name of City</label
  >
  <div class="input-group mb-2 mr-sm-2 w-100">
    <div class="input-group-prepend">
      <!-- <div class="input-group-text">Hey</div> -->
      <button type="submit" id="submitBtn1"></button>
    </div>
    <input
      type="text"
      class="form-control"
      id="searchForm1"
      placeholder="City name"
    />
  </div>`);
  });

  function submitClick(e) {
    e.preventDefault();
    // console.log(e.target.id.includes("1"));

    if (e.target.id.includes("1")) {
      targ = $("#searchForm1");
    } else {
      targ = $("#searchForm");
    }

    if ($(targ).val() !== "") {
      $("#sideForm").show();

      //add city name to search history

      searchHistory.push($(targ).val());

      // delete any duplicates from search history
      searchHistory = removeDups(searchHistory);

      // console.log(searchHistory);

      //clear saved cities list and add one list item for city in search history

      localStorage.setItem("storeObj", JSON.stringify(searchHistory));

      $("#cityListItems").empty();

      searchHistory.forEach(function(entry) {
        $("#cityListItems").append(`<li class="list-group-item">${entry}</li>`);
      });

      todaysWeather($(targ).val());
      fiveDayForecast($(targ).val());
      $(targ).val("");
    }
  }

  function todaysWeather(cityName) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=0635f6cc93f851c62608a2c527a89527`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      const uvURL = `https://api.openweathermap.org/data/2.5/uvi?APPID=0635f6cc93f851c62608a2c527a89527&lat=${response.coord.lat}&lon=${response.coord.lon}`;
      $("#mainCard").empty();
      $("#form1").empty();
      //second ajax call for UV index api
      // console.log(response);
      $.ajax({
        url: uvURL,
        method: "GET"
      }).then(function(response) {
        // console.log(response.value);
        $("#UVLabel").text(`${response.value}`);
        //color code background based on UV index
        if (response.value < 3) {
          $("#UVLabel").css("background-color", "green");
        } else if (response.value >= 3 && response.value < 6) {
          $("#UVLabel").css("background-color", "yellow");
        } else if (response.value >= 6 && response.value < 8) {
          $("#UVLabel").css("background-color", "orange");
        } else if (response.value >= 8 && response.value < 11) {
          $("#UVLabel").css("background-color", "red");
        } else {
          $("#UVLabel").css("background-color", "violet");
        }
      });
      $("#TodayLabel").text(`${response.name} ${moment().format("l")}`);
      const temp = response.main.temp.toFixed(1);
      // console.log(response);
      // console.log(response.coord.lon, response.coord.lat);
      // console.log(response.weather[0].id);
      // console.log(iconCodes[803]);
      const mainHTML = `
      <div class="picBg card text-center mx-auto shadow-lg p-3 mb-5 bg-white rounded">
      <img src="https://openweathermap.org/img/wn/${
        iconCodes[response.weather[0].id]
      }@2x.png" class="card-img-top" id="topImg" alt="...">
  <div class="card-body">
    
    <h5>Temperature: ${temp}°F</h5>
      <h5>Humidity: ${response.main.humidity}%</h5>
      <h5>Wind speed: ${response.wind.speed} MPH</h5>
      <h5>UV Index: <p id="UVLabel"></p></h5>
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
      $("#5dayLabel").show();

      $("#5dayRow").empty();
      let addDays = 1;

      for (let i = 1; i < 40; i += 9) {
        const temp = response.list[i].main.temp.toFixed(1);
        // console.log(response);
        // console.log(response.list[i].weather[0].id);
        const mainHTML = `<div class=" picBg card mx-1 shadow p-3 mb-5 bg-white rounded" style="width: 18rem;">
      <img src="https://openweathermap.org/img/wn/${
        iconCodes[response.list[i].weather[0].id]
      }@2x.png" class="card-img-top FiveDayImg"  alt="...">
  <div class="card-body text-center">
    <h3 class="card-title"> ${moment()
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

  // todaysWeather("Overland Park");
  // fiveDayForecast("Overland Park");
});
