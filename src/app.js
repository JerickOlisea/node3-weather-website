const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

//DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//SETUP HANDLEBARS ENGINE AND VIEWS LOCATION

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//SETUP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Emilia Clarke",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpMessage: "This is some helpful text.",
    title: "Help",
    name: "Andrew Mead",
  });
});
//app.com
//app.com/help
//app.com/about

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  // res.send({
  //   forecast: "Cloudy",
  //   location: "Manila, Philippines",
  //   address: req.query.address,
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found",
  });
});

/////404 Page
////always place at the bottom before app.listen
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
