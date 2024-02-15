console.log('holas')
const nextJoke = document.querySelector(".next-joke")

const getData = async () => {
    const printJoke = document.querySelector(".joke")
    const result = await fetch("https://icanhazdadjoke.com/slack")
    const data = await result.json()
    const joke = data.attachments[0].fallback
    printJoke.textContent=joke
    console.log(joke)
}

getData()

nextJoke.addEventListener('click',getData)


