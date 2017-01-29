$(document).ready(function(){
  var apiKey = "32fd231b6abb27c5dc1db12d81aa2bae"
  var coordAPI = "http://www.geoplugin.net/json.gp?jsoncallback=?"
  var lat;
  var lon;

  $.getJSON(coordAPI, function(data) {
    lat = data.geoplugin_latitude;
    lon = data.geoplugin_longitude;
    $("#location-div").html("<p>" + data.geoplugin_region + ", " + data.geoplugin_countryName + "</p>")
    $("#calendar-div").html(Date());

    var myAPI = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +  "&APPID=" + apiKey + "&units=metric";

    $.getJSON(myAPI, function(data){
      whatWeather(data);
    });

    var whatWeather = function(conditions) {
      var tempe = "<p>" + conditions.main.temp + "</p>";
      var mainWeather = "<p>" + conditions.weather[0].main + "</p> <br> <p>" + conditions.weather[0].description + "</p>";
      $("#temp-div").html(tempe);
      $("#display-div").html(mainWeather);
    };
  });

});
