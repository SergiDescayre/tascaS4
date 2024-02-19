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
console.log(iconWeather);
let youVoted = false;
const reportAcudits = {
    joke: "",
    score: 0,
    date: ""
};
let reportJokes = [];
const getWheater = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch("http://api.weatherapi.com/v1/current.json?key=7bc335c15ed64584a45120452241902&q=barcelona&aqi=no");
    const data = yield response.json();
    textWeather.textContent = data.location.name;
    iconWeather.setAttribute("src", data.current.condition.icon);
    console.log(data.location.name);
});
const getScore = (num) => {
    youVoted = true;
    let date = new Date;
    reportAcudits.score = num;
    reportAcudits.date = date.toISOString();
};
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    getWheater();
    const result = yield fetch("https://icanhazdadjoke.com/slack");
    const data = yield result.json();
    const joke = data.attachments[0].fallback;
    printJoke.innerHTML = joke;
    reportAcudits.joke = joke;
    youVoted = false;
});
getJoke();
const saveAndNaextJoke = () => {
    if (!youVoted) {
        reportAcudits.score = 0;
        reportJokes.push(Object.assign({}, reportAcudits));
    }
    else {
        reportJokes.push(Object.assign({}, reportAcudits));
    }
    getJoke();
    console.log(reportJokes);
};
nextJoke.addEventListener('click', saveAndNaextJoke);
