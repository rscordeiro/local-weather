$(document).ready(function(){
  var apiKey = "32fd231b6abb27c5dc1db12d81aa2bae"
  var coordAPI = "http://www.geoplugin.net/json.gp?jsoncallback=?"
  var lat;
  var lon;

  $.getJSON(coordAPI, function(data) {
    lat = data.geoplugin_latitude;
    lon = data.geoplugin_longitude;
    $("#location-div").html("<p>" + data.geoplugin_region + ", " + data.geoplugin_countryName + "</p>");

    var myAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +  "&APPID=" + apiKey;

    $.getJSON(myAPI, function(data){
      whatWeather(data);
    });

    var whatWeather = function(conditions) {
      var tempe = conditions.main.temp;
      var mainWeather = "<p id='p-cond'>" + conditions.weather[0].description + "</p>";
      var icon = conditions.weather[0].icon;

      var tempF = Math.floor(((tempe - 273.15) * 1.8 + 32));
      var tempC = Math.floor((tempe - 273.15));

      var toCelcius = function() {
        $("#p-temp").html(tempC);
      }

      var toFahrenheit = function() {
        $("#p-temp").html(tempF);
      }

      $("#p-temp").html(toCelcius());

      $("#c-btn").click(function(){
        $("#p-temp").html(toCelcius());
        $("#c-btn").addClass("active");
        $("#f-btn").removeClass("active");
      });

      $("#f-btn").click(function(){
        $("#p-temp").html(toFahrenheit());
        $("#f-btn").addClass("active");
        $("#c-btn").removeClass("active");
      });

      switch(icon) {
        case "01d":
            $("#display-div").html("<a href='' class='icon' data-icon='1'></a>" + mainWeather);
            break;
        case "01n":
            $("#display-div").html("<a href='' class='icon' data-icon='2'></a>" + mainWeather);
            break;
        case "02d":
            $("#display-div").html("<a href='' class='icon' data-icon='3'></a>" + mainWeather);
            break;
        case "02n":
            $("#display-div").html("<a href='' class='icon' data-icon='4'></a>" + mainWeather);
            break;
        case "03d":
        case "03n":
            $("#display-div").html("<a href='' class='icon' data-icon='5'></a>" + mainWeather);
            break;
        case "04d":
        case "04n":
            $("#display-div").html("<a href='' class='icon' data-icon='%'></a>" + mainWeather);
            break;
        case "09d":
        case "09n":
            $("#display-div").html("<a href='' class='icon' data-icon='7'></a>" + mainWeather);
            break;
        case "10d":
        case "10n":
            $("#display-div").html("<a href='' class='icon' data-icon='8'></a>" + mainWeather);
            break;
        case "11d":
        case "11n":
            $("#display-div").html("<a href='' class='icon' data-icon='6'></a>" + mainWeather);
            break;
        case "13d":
        case "13n":
            $("#display-div").html("<a href='' class='icon' data-icon='#'></a>" + mainWeather);
            break;
        case "50d":
        case "50n":
            $("#display-div").html("<a href='' class='icon' data-icon='M'></a>" + mainWeather);
            break;
      }
    };
  });

});
