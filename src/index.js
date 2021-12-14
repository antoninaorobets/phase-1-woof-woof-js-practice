document.addEventListener('DOMContentLoaded', init)

function init() {
    fetch('http://localhost:3000/pups')
        .then(resp => resp.json())
        .then(addPups)
        .catch(error => console.error(error))

    document.querySelector("#good-dog-filter").addEventListener('click', filterDogs)
    document.querySelector("#good-dog-filter").dataset.filter = "OFF"
}

function addPups(data) {
    const dogBar = document.querySelector('#dog-bar')
    data.forEach(element => {
        const dog = document.createElement('span')
        dog.addEventListener('click', getDogInfo)
        dog.textContent = element.name
        dog.dataset.id = element.id  // alternative ways?
        dogBar.appendChild(dog)
    });
}

function getDogInfo(event) {
    fetch(`http://localhost:3000/pups/${event.target.dataset.id}`)
        .then(resp => resp.json())
        .then(showDogInfo)
        .catch(error => console.error(error))
}

function showDogInfo(data) {
    const dogInfo = document.querySelector('#dog-info')
    dogInfo.innerHTML = ''
    const name = document.createElement('h2')
    name.textContent = data.name
    dogInfo.appendChild(name)
    const img = document.createElement('img')
    img.src = data.image
    dogInfo.appendChild(img)
    const button = document.createElement('button')
    button.dataset.isgood = data.isGoodDog
    button.dataset.id = data.id
    button.id = "good-bad"
    if (data.isGoodDog) { button.textContent = "Good Dog!" }
    else { button.textContent = "Bad Dog!" }
    button.addEventListener('click', changeButton)
    dogInfo.appendChild(button)
}

function changeButton(event) {
    const btn = event.target
    const initialState = (btn.dataset.isgood === 'true')
    const newState = !initialState

    fetch(`http://localhost:3000/pups/${btn.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newState
        })
    })
        .then(resp => resp.json())
        .then(updateBtn)
        .catch(error => console.error(error))
}

function updateBtn(data) {
    const btn = document.getElementById('good-bad')
    const newState = data.isGoodDog
    btn.dataset.isgood = newState
    if (newState) {
        btn.textContent = "Good Dog!"
    }
    else {
        btn.textContent = "Bad Dog!"
    }
}

console.log('hi')

function filterDogs(event){
    const btn = event.target
    console.log(event.target)
    if (btn.dataset.filter === "ON") {
        //change to false
        console.log( 'if  true to false')
        btn.textContent = "Filter good dogs: OFF"
        btn.dataset.filter = "OFF"
    }
    else {
        //chanhe to true
        console.log( 'esle  false to true')
        btn.textContent = "Filter good dogs: ON"
        btn.dataset.filter = "ON"
    }
}