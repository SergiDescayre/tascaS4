"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nextJoke = document.querySelector(".next-joke");
const printJoke = document.querySelector(".joke");
const textWeather = document.querySelector(".weather span");
const iconWeather = document.querySelector(".weather img");
const degrees = document.querySelector(".degrees");
const urlWeather = "http://api.weatherapi.com/v1/current.json?key=7bc335c15ed64584a45120452241902&q=barcelona&aqi=no";
const urlJokes = "https://icanhazdadjoke.com/slack";
const urlNorris = "https://api.chucknorris.io/jokes/random";
let youVoted = false;
const reportAcudits = {
    joke: "",
    score: 0,
    date: ""
};
let reportJokes = [];
const getWheater = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(urlWeather);
    const data = yield response.json();
    textWeather.textContent = data.location.name;
    iconWeather.setAttribute("src", data.current.condition.icon);
    degrees.textContent = `${data.current.temp_c} °C`;
});
const getScore = (num) => {
    youVoted = true;
    reportAcudits.score = num;
};
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    getWheater();
    let date = new Date;
    const result = yield fetch(urlNorris);
    const data = yield result.json();
    const joke = data.value;
    printJoke.innerHTML = joke;
    reportAcudits.joke = joke;
    reportAcudits.date = date.toISOString();
    youVoted = false;
    console.log(joke);
});
getJoke();
const saveAndNaextJoke = () => {
    if (!youVoted) {
        reportAcudits.score = "No votat";
        reportJokes.push(Object.assign({}, reportAcudits));
    }
    else {
        reportJokes.push(Object.assign({}, reportAcudits));
    }
    getJoke();
    console.log(reportJokes);
};
nextJoke.addEventListener('click', saveAndNaextJoke);
