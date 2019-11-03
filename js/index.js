// - When the page loads, show the first 50 monsters.Each monster's name, age, and
// description should be shown.
const monsterContainer = document.querySelector("#monster-container")
let page = 1

function fetchMonsters() {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(r => r.json())
        .then(resObj => {
            resObj.forEach(monster => {
                turnJSONintoHTML(monster)
            })
        })
}
fetchMonsters()


function turnJSONintoHTML(monster) {

    const nameTag = document.createElement("h2")
    const ageTag = document.createElement("h3")
    const descriptionP = document.createElement("p")

    nameTag.innerText = `Name: ${monster.name}`
    ageTag.innerText = `Age: ${monster.age}`
    descriptionP.innerText = `Description: ${monster.description}`

    monsterContainer.append(nameTag, ageTag, descriptionP)
}
// - Above your list of monsters, you should have a form to create a new monster.
// You should have fields for name, age, and description, and a 'Create Monster
// Button'. When you click the button, the monster should be added to the list
// and saved in the API.

const createMonster = document.querySelector("#create-monster")

const monsterForm = document.createElement("form")
const monsterName = document.createElement("input")
const monsterAge = document.createElement("input")
const monsterDescription = document.createElement("input")
const submitMonster = document.createElement("input")

monsterName.placeholder = "Name"
monsterAge.placeholder = "Age"
monsterDescription.placeholder = "Description"
submitMonster.type = "submit"
submitMonster.value = "Create Monster Button"

monsterForm.append(monsterName, monsterAge, monsterDescription, submitMonster)
createMonster.append(monsterForm)

submitMonster.addEventListener("click", (event) => {
    event.preventDefault()

    fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: monsterName.value,
            age: monsterAge.value,
            description: monsterDescription.value
        })
    })
    .then(r => r.json())
    .then(resObj => {
        turnJSONintoHTML(resObj)
    })
})
// - At the end of the list of monsters, show a button.When clicked, the button
// should load the next 50 monsters and show them.

const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")

backButton.addEventListener("click", (event) => {
    monsterContainer.innerHTML = ""
    page -= 1
    if(page < 1){
        page = 1
    }
    fetchMonsters()
})

forwardButton.addEventListener("click", (event) => {
    monsterContainer.innerHTML = ""
    page += 1
    fetchMonsters()
})

