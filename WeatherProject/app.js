const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  const apiKey = "31f7a18bb43d7e021a3130bbb5278f64";
  const city = req.body.cityName;
  const unit = req.body.unit;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + apiKey;

  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<h1>Temperature in " + city + " is " + temp + " in " + unit + "</h1>");
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<img src=" + iconUrl + ">");
      res.send();
  });
  });

});


app.listen(3000,function(){
  console.log("Server is listening on port 3000");
});
