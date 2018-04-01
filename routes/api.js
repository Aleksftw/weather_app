'use strict';

const express = require("express");
const router = express.Router();
const axios = require("axios");
const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&cnt=5&q=";
const API_KEY = "&appid=9707b52f8f85bd74e43bd798e8770a7d";

router.get("/forecast/:city", function(req, res, next) {
    axios.get(BASE_URL + req.params.city + API_KEY)
    .then(response => response.data)
    .then(fullData => handleData(fullData))
    .then(data => {
        res.append('Access-Control-Allow-Origin', '*');
        res.send(data);
    }).catch(error => console.log(error));

});

function handleData(data){
    let allMinTemps = [];
    let allMaxTemps = [];
    let result = {};
    result.city = data.city.name;
    result.country = data.city.country;
    result.forecasts = [];
    data.list.forEach(day => {
        let dayObj = {};
        dayObj.date = convertDate(day.dt);
        dayObj.weatherDesc = day.weather[0].description;
        dayObj.weatherIcon = day.weather[0].icon;
        dayObj.minDailyTemp = day.temp.min;
        dayObj.maxDailyTemp = day.temp.max;
        result.forecasts.push(dayObj);

        allMinTemps.push(day.temp.min);
        allMaxTemps.push(day.temp.max);
    });
    result.maxPeriodTemp = getHighestTemp(allMaxTemps);
    result.minPeriodTemp = getLowestTemp(allMinTemps);


    return result;
}

function convertDate(unixDate){
    let newDate = new Date(unixDate*1000);
    let options = { weekday: "long", year: "numeric", month: "numeric", day: "numeric" };
    return newDate.toLocaleDateString("en-GB", options);

}

function getHighestTemp(temps){
    return Math.max(...temps);
}

function getLowestTemp(temps){
    return Math.min(...temps);
}

module.exports = router;
