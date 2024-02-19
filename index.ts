
const nextJoke = document.querySelector(".next-joke") as HTMLButtonElement
const printJoke = document.querySelector(".joke") as HTMLParagraphElement

const textWeather = document.querySelector(".weather span") as HTMLHtmlElement
const iconWeather = document.querySelector(".weather img") as HTMLHtmlElement
console.log(iconWeather)

let youVoted: boolean = false

const reportAcudits: {
    joke: string,
    score: number,
    date: string
} = {
    joke : "",
    score : 0,
    date : ""
}

let reportJokes: { joke: string; score: number; date: string }[] = []

const getWheater = async () => {
    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=7bc335c15ed64584a45120452241902&q=barcelona&aqi=no")
    const data = await response.json()
    textWeather.textContent=data.location.name
    iconWeather.setAttribute("src", data.current.condition.icon)
    console.log(data.location.name)

}

const getScore = (num: number) => {
    youVoted = true
    let date = new Date
    reportAcudits.score = num
    reportAcudits.date = date.toISOString()
  
}

const getJoke = async () => {
    getWheater()
    const result = await fetch("https://icanhazdadjoke.com/slack")
    const data = await result.json()
    const joke:string = data.attachments[0].fallback
    printJoke.innerHTML=joke
    reportAcudits.joke = joke
    youVoted = false
  
}

getJoke()

const saveAndNaextJoke = () => {
    if(!youVoted){
        reportAcudits.score = 0
        reportJokes.push({...reportAcudits})
    }else{
        reportJokes.push({...reportAcudits})
    }
    getJoke()
    console.log(reportJokes)
}






nextJoke.addEventListener('click',saveAndNaextJoke)