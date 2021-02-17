//jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


//Display on ROOT
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

//To post Kanye Quotes
app.post("/kanye",function(req,res){
  const url="https://api.kanye.rest/";
  https.get(url,function(response){
      console.log("Network Code:"+response.statusCode);
      response.on("data",function(data){
      const kanye=JSON.parse(data);
      const quote=kanye.quote;
      console.log("KanyeQuote: "+quote);
      res.setHeader('Content-Type','text/html');
      res.write("<h2>A classic Kanye West Quote for You!</h2>");
      res.write("<p>"+quote+"</p>");
      res.send();
    });
  });
});

//To post Random joke
app.post("/joke",function(req,res){
  const url2="https://sv443.net/jokeapi/v2/joke/Any?type=single";
  https.get(url2,function(response){
      console.log("Network Code:"+response.statusCode);
      response.on("data",function(data){
      const jokeobj=JSON.parse(data);
      const joke=jokeobj.joke;
      console.log("Joke: "+joke);
      res.setHeader('Content-Type','text/html');
      res.write("<h2>A classic Joke for You!</h2>");
      res.write("<p>"+joke+"</p>");
      res.send();
      console.log("Joke: "+joke);
    });
  });
});

//To post info of Weather
app.post("/weather",function(req,res){
  console.log(req.body.cityName);
  console.log("Post request recieved.");
  const query=req.body.cityName;
  const apiKey="94ecaca7ab46d0a299fab5443555d197";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      //console.log(data);
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p>The weather is currently "+weatherDescription+"</p>");
      res.write("<h1>The Temperature in "+query+" is "+temp+" Degree Celcius</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
      console.log(temp);
      console.log(weatherDescription);
    });
  });

});

//Display on ROOT/contact
app.get("/contact",function(req,res){
  res.send("<h1>Contact me at:bikrantasarkar@gmail.com</h1>");
});







app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on port:3000.");
});
