
const nextJoke = document.querySelector(".next-joke") as HTMLButtonElement
const printJoke = document.querySelector(".joke") as HTMLParagraphElement

const textWeather = document.querySelector(".weather span") as HTMLHtmlElement
const iconWeather = document.querySelector(".weather img") as HTMLHtmlElement
const degrees = document.querySelector(".degrees") as HTMLHtmlElement

const urlWeather: string = "http://api.weatherapi.com/v1/current.json?key=7bc335c15ed64584a45120452241902&q=barcelona&aqi=no"
const urlJokes: string = "https://icanhazdadjoke.com/slack"
const urlNorris = "https://api.chucknorris.io/jokes/random"

let youVoted: boolean = false

const reportAcudits: {
    joke: string,
    score: number | string,
    date: string
} = {
    joke : "",
    score : 0,
    date : ""
}

let reportJokes: { joke: string; score: number | string; date: string }[] = []

const getWheater = async () => {
    const response = await fetch(urlWeather)
    const data = await response.json()
    textWeather.textContent=data.location.name
    iconWeather.setAttribute("src", data.current.condition.icon)
    degrees.textContent=`${data.current.temp_c} °C`

}

const getScore = (num: number): void => {
    youVoted = true
    reportAcudits.score = num
}

const getJoke = async () => {
    getWheater()
    let date = new Date
    const result = await fetch(urlNorris)
    const data = await result.json()
    const joke:string = data.value
    printJoke.innerHTML=joke
    reportAcudits.joke = joke
    reportAcudits.date = date.toISOString()
    youVoted = false
    console.log(joke)
}

getJoke()

const saveAndNaextJoke = () => {
    if(!youVoted){
        reportAcudits.score = "No votat"
        reportJokes.push({...reportAcudits})
    }else{
        reportJokes.push({...reportAcudits})
    }
    getJoke()
    console.log(reportJokes)
}






nextJoke.addEventListener('click',saveAndNaextJoke)