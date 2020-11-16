///////// WITH OBJECT DESTRUCTURING:

const request = require("request");

const forecast = (lat, long, callback) => {
  url =
    "http://api.weatherstack.com/current?access_key=645e9aa3ff2804f1e2bbe5c46144220f&query=" +
    encodeURIComponent(lat).toString() +
    "," +
    encodeURIComponent(long).toString() +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services.", undefined);
    } else if (body.error) {
      callback("Unable to find location.");
    } else {
      console.log(body.current);
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " farenheit, but it feels like " +
          body.current.feelslike +
          " farenheit. Humidity is " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;

//// WITHOUT OBJECT DESTRUCTURING:

// const request = require("request");

// const forecast = (lat, long, callback) => {
//   url =
//     "http://api.weatherstack.com/current?access_key=645e9aa3ff2804f1e2bbe5c46144220f&query=" +
//     encodeURIComponent(lat).toString() +
//     "," +
//     encodeURIComponent(long).toString() +
//     "&units=f";

//   request({ url, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect to weather services.", undefined);
//     } else if (response.body.error) {
//       callback("Unable to find location.");
//     } else {
//       callback(
//         undefined,
//         response.body.current.weather_descriptions[0] +
//           ". It is currently " +
//           response.body.current.temperature +
//           " farenheit, but it feels like " +
//           response.body.current.feelslike +
//           " farenheit."
//       );
//     }
//   });
// };

// module.exports = forecast;
