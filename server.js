
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine","hbs");

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log("Unable to append server.log");
    }
  });
  next();
});

// app.use((req,res) => {
//   res.render('maintenance.hbs',{
//     maintenanceText : 'Site Under Maintenance sorry for inconvienience'
//   });
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear",() => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt",(text) => {
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  //res.send("<h1>Hello World through express</h1>");
  res.render('home.hbs',{
    pageTitle : "Home Page",
    welcomeText : "Hey Baby how are you ! :)",
    currentYear : new Date().getFullYear()
  });
});

app.get("/about",(req,res) => {
  res.render('about.hbs',{
    pageTitle : "About Page",
    currentYear : new Date().getFullYear()
  });
});

app.get("/portfolio",(req,res) => {
  res.render('portfolio.hbs',{
    pageTitle : "Portfolio Page",
    portfolioText : 'This is portfolio page'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:"This is the error message"
  });
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
