document.addEventListener('DOMContentLoaded', init)

function init(){
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(addPups)
    .catch(error => console.error(error))
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

function showDogInfo(data){
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
    if (data.isGoodDog){button.textContent = "Good Dog!"}
        else {button.textContent = "Bad Dog!"}
    button.addEventListener('click', changeButton)
    dogInfo.appendChild(button)
}

function changeButton(event){
    console.log('changeButton')
//     console.log(event.target.parentNode)
//     const currentState = event.target.dataset.isGoodDog

// //     fetch(`http://localhost:3000/pups/${event.target.parentNode.dataset.id}`, {
// //         method: 'PATCH',
// //         headers: {
// //             "Content-Type": "application/json",
// //             Accept: "application/json"
// //         },
// //         body: JSON.stringify({
// //             isGoodDog : "true"
// //         })
// //     })
// //     .then(resp => resp.json())
// //     .then(data => console.log(data))
// //     .catch(error => console.error(error))
}


console.log('hi')