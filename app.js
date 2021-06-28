const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');


const app = express();
// app.use(bodÒyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
  console.log(__dirname);
})


app.post("/", function(req, res) {
  // console.log("post request recived");
  // console.log(req.body);
  const query = req.body.cityName
  const appiID = "95c302bf429b9df20368199f3c4a5175";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appiID

  https.get(url, (response) => {
    // console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon
      const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p> The weather is currently " + description + "</p>")
      res.write("<h1>The temperature in " + query + " is: " + temp + " degrees celcius</h1>")
      res.write("<img src=" + imageUrl + ">")
      res.send()

      res.send(weatherData)
    })
  })

})




app.listen(3000, () => {
  console.log("Server started on port 3000!");
})
