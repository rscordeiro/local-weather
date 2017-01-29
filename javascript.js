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
      var mainWeather = "<p>" + conditions.weather[0].main + "</p> <br> <p>" + conditions.weather[0].description + "</p>";
      $("#display-div").html(mainWeather);


      var tempF = ((tempe - 273.15) * 1.8 + 32);
      var tempC = (tempe - 273.15);

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

    };
  });

});
