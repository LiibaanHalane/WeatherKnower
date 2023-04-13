//  //make button which retrives the input from the user and stores it in a variable
// $(document).ready(function(){
// //      //clear local storage
// //      window.localStorage.clear();
// //      const searches = JSON.parse(window.localStorage.getItem("search")) || [];
// //      function storeList(){          
// //           searches.push($('#city').val());
// //           window.localStorage.setItem("search", JSON.stringify(searches));
// //           console.log(searches);         
// //      }
//      //create a function to display the list of cities searched
//      for (let i=1; i < 6; i++) {
//           console.log(data.list[i]);
//           var temp = data.list[i].main.temp;
//           var humidity = data.list[i].main.humidity;
//           var icon = data.list[i].weather[0].icon;
//           var date = data.list[i].dt_txt;
//           var wind = data.list[i].wind.speed;
//           var html = "<div class='card'><div class='card-body'><h5 class='card-title'>"+date+"</h5><p class='card-text'>Temp: "+temp+"</p><p class='card-text'>Humidity: "+humidity+"</p><p class='card-text'>Wind: "+wind+"</p><img src='http://openweathermap.org/img/w/"+icon+".png'></div></div>";
//      }
//      //display the data
//      $(".weather").html(html);}

// $("#submit-btn").on("click", function() {

//    var city = $('#city').val();
// //    storeList();
// //    displayList();
// function search(){
//    fetch ("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=35a46edc3209c6eda738166e5238d55e");
// }});
// });


$(document).ready(function () {
  //window.localStorage.clear();
  // Get the previous search results from local storage
  const cities = new Set(JSON.parse(localStorage.getItem("results")));
  console.log(cities);
  //Render the previous search results on the page
  function history(cities) {
    $(".search-history").empty();
    for (let value of cities) {
      var listItem = "<li class='list-group-item'>" + value + "</li>";
      $(".search-history").append(listItem);
    };
  }

  history(cities)

  // When the search button is clicked, search for the city
  $("#submit-btn").on("click", function () {
    var city = $('#city').val();
    search(city);
  });

  $(".5day-btn").on("click", function () {
    var city = $('#city').val();
    get5DayForecast(city);
    });

  // When a list item is clicked, search for the city
  $(document).on("click", ".list-group-item", function () {
    var city = $(this).text();
    console.log(city);
    search(city);
  })

  // Search for a city
  async function search(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35a46edc3209c6eda738166e5238d55e`);
    const data = await response.json();
    console.log(data);
    var temp = Math.round(data.main.temp - 273.15);
    var humidity = data.main.humidity;
    var icon = data.weather[0].icon;
    var wind = data.wind.speed;
    var html = "<div class='card'><div class='card-body'><h5 class='card-title'>" + city + "</h5><p class='card-text'>Temp: " + temp + " C</p><p class='card-text'>Humidity: " + humidity + "%</p><p class='card-text'>Wind: " + wind + "kph</p><img src='http://openweathermap.org/img/w/" + icon + ".png'></div></div>" + "<button class='5day-btn'>5 Day Forecast</button>";
    $(".weather").html(html);

    // Check if the city has already been searched for
    cities.has(city) ? console.log("already there") : console.log("not there");
    cities.add(city);
    localStorage.setItem("results", JSON.stringify(Array.from(cities)));
    console.log(cities);
    history(cities)
    get5DayForecast(city);
  }

  async function get5DayForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=35a46edc3209c6eda738166e5238d55e`);
    const data = await response.json();
    console.log(data);
  
    // Extract the relevant information from the data
    var forecasts = [];
    for (let i = 0; i < data.list.length; i++) {
      var date = data.list[i].dt_txt;
      var temp = Math.round(data.list[i].main.temp - 273.15);
      var humidity = data.list[i].main.humidity;
      var wind = data.list[i].wind.speed;
      var forecast = {
        date: date,
        temp: temp,
        humidity: humidity,
        wind: wind
      };
      forecasts.push(forecast);
    }
         // Render the forecast data on the page
         var html = "";
         for (let forecast of forecasts) {
           html += "<div class='card'><div class='card-body'><h5 class='card-title'>" + forecast.date + "</h5><p class='card-text'>Temp: " + forecast.temp + " C</p><p class='card-text'>Humidity: " + forecast.humidity + "%</p><p class='card-text'>Wind: " + forecast.wind + "kph</p></div></div>";
         }
         $(".forecast").html(html);  
    }

});

// fetch("https://api.github.com/repos/ValeriiKryshtal/ChatGPT_telegram_chatbot/readme", {
//   headers: {
//     Accept: "application/vnd.github+json"
//   }
// })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error("Failed to retrieve README content");
//     }
//   })
//   .then(data => {
//     const content = data.content;
    
//     console.log(content);
//   })
//   .catch(error => {
//     console.error(error);
//   });
accessToken = "51f7454ab22927b3d350"
async function getUserId(accessToken) {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`
      }
    });
  
    const user = await response.json();
    console.log (user.id);
  }
getUserId(accessToken);