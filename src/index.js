


document.addEventListener("DOMContentLoaded", () => {

    let dogBar = document.getElementById("dog-bar")
    let dogFilterBtn = document.getElementById("good-dog-filter")
    dogFilterBtn.addEventListener("click", ()=>{

        if (dogFilterBtn.textContent === "Filter good dogs: OFF"){
            dogFilterBtn.textContent = "Filter good dogs: ON"
            dogBar.innerHTML = ""
            getDogs()


        }
        else {
            dogFilterBtn.textContent = "Filter good dogs: OFF"
            dogBar.innerHTML = ""
            getDogs()
        }
    });

    getDogs();

})
    



function getDogs (){
    fetch("http://localhost:3000/pups")
    .then((res)=>res.json())
    .then(function (pups){
        let dogFilterBtn = document.getElementById("good-dog-filter")
        if (dogFilterBtn.textContent === "Filter good dogs: OFF"){
            appendAllDogsToBar(pups)
        
        }
        else if (dogFilterBtn.textContent = "Filter good dogs: ON"){
            appendGoodDogsToBar(pups)
    }
})
}

function appendAllDogsToBar(pups){

    let pupsArr = Object.values(pups)

    pupsArr.forEach((pup)=>{
        let dogBar = document.getElementById("dog-bar");
        let nameSpan = document.createElement("span");
        nameSpan.textContent = pup.name
        nameSpan.className = "name-span"

        dogBar.append(nameSpan);
        
    })

    addDogClickListeners(pupsArr)

}


function appendGoodDogsToBar(pups){
    let pupsArr = Object.values(pups)

    pupsArr.forEach((pup)=>{
        let dogBar = document.getElementById("dog-bar");
        let nameSpan = document.createElement("span");

        if (pup.isGoodDog){
        nameSpan.textContent = pup.name
        nameSpan.className = "name-span"

        dogBar.append(nameSpan);}
        
    })

    addDogClickListeners(pupsArr)


}

function addDogClickListeners(pupsArr){
    let dogSpans = document.querySelectorAll('.name-span')

    
    for (span of dogSpans){
        span.addEventListener("click", (event)=>{
            let clickedPup = pupsArr.find((pup)=> pup.name == event.target.textContent)
            appendClickedPupToDOM(clickedPup)
        })
    }
}

function appendClickedPupToDOM(clickedPup){
    let dogInfo = document.getElementById('dog-info')
    dogInfo.innerHTML= ''

    let pupImg = document.createElement('img')
    pupImg.src = clickedPup.image
    let dogName = document.createElement("h2")
    dogName.textContent= clickedPup.name
    let goodOrBadDogBtn = document.createElement("button")
    if(clickedPup.isGoodDog){
        goodOrBadDogBtn.textContent = "Good Dog!"

    }
    else (goodOrBadDogBtn.textContent = "Bad Dog!")

    dogInfo.append(pupImg, dogName, goodOrBadDogBtn)

    goodOrBadDogBtn.addEventListener("click", ()=>{
        toggleGoodDogStatus(clickedPup, goodOrBadDogBtn)
    })

}


function toggleGoodDogStatus(clickedPup, button){
    let dogFilterBtn = document.getElementById("good-dog-filter")
    let dogBar = document.getElementById("dog-bar")
    if (button.textContent === "Good Dog!"){
        patchGoodDogStatus(clickedPup)
        button.textContent = "Bad Dog!"

    }

    else if (button.textContent === "Bad Dog!"){
        patchGoodDogStatus(clickedPup)
        button.textContent = "Good Dog!"
    }

    if (dogFilterBtn.textContent === "Filter good dogs: ON"){
        dogBar.innerHTML = ''
        getDogs()

    }

}

function patchGoodDogStatus(clickedPup){
    if (clickedPup.isGoodDog){
        clickedPup.isGoodDog = false;
    fetch (`http://localhost:3000/pups/${clickedPup.id}`, {
    method: "PATCH",
    body: JSON.stringify({
        
        isGoodDog: false,
}),
    headers:{
        "Content-type": "application/json"
    },
})
.then(res=> res.json())
.then(pup=> console.log(pup))

}

else if (clickedPup.isGoodDog === false){
    clickedPup.isGoodDog = true;
    fetch (`http://localhost:3000/pups/${clickedPup.id}`, {
    method: "PATCH",
    body: JSON.stringify({
        
        isGoodDog: true,
}),
    headers:{
        "Content-type": "application/json"
    },
})
.then(res=> res.json())
.then(pup=> console.log(pup))
}

}
/*

TOGGLE GOOD DOG

- When a user clicks the Good Dog/Bad Dog button:

    - The button's text changes from Good to Bad or opposite
    - The corresponding pup object should be updated to reflect the new isGoodDog value
                                                                        
FILTER GOOD DOGS


- When a user clicks on the Filter Good Dogs button:

    - The button's text should change from Filter good dogs: OFF to filter good dogs: ON or visa versa

    - If the button is on, then the Dog Bar should only show pups whose isGoodDog attribute is true.

    - If the button is off, the Dog Bar should show all ups like normal */