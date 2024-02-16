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
const getJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetch("https://icanhazdadjoke.com/slack");
    const data = yield result.json();
    const joke = data.attachments[0].fallback;
    printJoke.innerHTML = joke;
    console.log(data);
});
getJoke();
nextJoke.addEventListener('click', getJoke);
