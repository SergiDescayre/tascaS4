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
const iconWeather = document.querySelector(".weather img");
const degrees = document.querySelector(".degrees");
const main_container = document.querySelector(".main_container");
const images = ['../images/fondo.svg', '../images/fondo2.svg', '../images/fondo3.svg', '../images/fondo4.svg', '../images/fondo5.svg', '../images/fondo6.svg'];
const urlWeather = "http://api.weatherapi.com/v1/current.json?key=7bc335c15ed64584a45120452241902&q=barcelona&aqi=no";
const urlJokes = ["https://icanhazdadjoke.com/slack", "https://api.chucknorris.io/jokes/random", "https://v2.jokeapi.dev/joke/Any?type=single"];
let youVoted = false;
const reportAcudits = {
    joke: "",
    score: 0,
    date: ""
};
let reportJokes = [];
let imageToShow = -1;
const generateRandom = () => {
    let numRandom = 0;
    do {
        numRandom = Math.floor(Math.random() * images.length);
    } while (numRandom === imageToShow);
    imageToShow = numRandom;
    return imageToShow;
};
const getWheater = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(urlWeather);
    const data = yield response.json();
    iconWeather.setAttribute("src", data.current.condition.icon);
    degrees.textContent = `${data.current.temp_c} °C`;
});
const getScore = (num) => {
    youVoted = true;
    reportAcudits.score = num;
};
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    let joke = "";
    let urlRandom = Math.floor(Math.random() * 3);
    let date = new Date;
    const result = yield fetch(urlJokes[urlRandom]);
    const data = yield result.json();
    if (urlRandom === 0) {
        joke = data.attachments[0].fallback;
    }
    if (urlRandom === 1) {
        joke = data.value;
    }
    if (urlRandom === 2) {
        joke = data.joke;
    }
    printJoke.innerHTML = joke;
    reportAcudits.joke = joke;
    reportAcudits.date = date.toISOString();
    youVoted = false;
    console.log(joke);
});
const saveAndNextJoke = () => {
    main_container.style.backgroundImage = `url(${images[generateRandom()]})`;
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
getJoke();
getWheater();
nextJoke.addEventListener('click', saveAndNextJoke);
