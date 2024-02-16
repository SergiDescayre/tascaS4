
const nextJoke = document.querySelector(".next-joke") as HTMLButtonElement
const printJoke = document.querySelector(".joke") as HTMLParagraphElement

interface Response {
    attachments: ResponseAttachments[],
    response_type: String,
    username: String
    }

interface ResponseAttachments{
    fallback: Number,
    footer: String,
    text: String
}

const getJoke = async () => {
    const result:Response = await fetch("https://icanhazdadjoke.com/slack")
    const data = await result.json()
    const joke:string = data.attachments[0].fallback
    printJoke.innerHTML=joke
    console.log(data)
}


getJoke()
nextJoke.addEventListener('click',getJoke)