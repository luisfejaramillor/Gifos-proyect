////GROUP OF VAR THAT HAVE TO BE DECLARED AS GLOBAL SCOPE FOR SWITCHING TABS PORPUSE/////
let tabContents = document.querySelectorAll('[data-tab-content]')
let container = document.querySelector(".container")
let searchResults = document.querySelector(".search-results")
let trendingSection = document.querySelector(".trending-section")
let footer = document.querySelector(".footer")
let dropMenu = document.querySelector(".drop-menu")
let searchSection = document.querySelector(".search-section")
let favoriteSection = document.querySelector(".favorite-section")
let logo = document.querySelector(".logo")
let burguerButton = document.querySelector(".burguer-button")
let nightMode = document.querySelector(".night-mode")
let nightModeDesk = document.querySelector(".night-mode-desk")
let createButton = document.querySelector(".create-button")

/// The code below is use to switch between tabs in the mobile and desktop version
let getTabs = () => {
    setTimeout(() => {
        let tabs = document.querySelectorAll('[data-tab-target]')
        callSwitcher(tabs)
    }, 1000);
}
getTabs()
let callSwitcher = (tabs) => {
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            let target = document.querySelectorAll(tab.dataset.tabTarget)
            tabContents.forEach(tabContent => {
                tabContent.classList.add("inactive")
            })
            target.forEach(content => {
                content.classList.remove("inactive")
            })
            if (burguerButton.src === "http://127.0.0.1:5500/resources/burger.svg") {
                burguerButton.src = "http://127.0.0.1:5500/resources/close.svg"
            } else {
                burguerButton.src = "http://127.0.0.1:5500/resources/burger.svg"
                dropMenu.classList.add("inactive")
                trendingSection.classList.remove("inactive")
                footer.classList.remove("inactive")
            }
        })
        logo.addEventListener("click", () => {
            burguerButton.src = "http://127.0.0.1:5500/resources/burger.svg"
        })
    })
}


/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
///    The code below is use to switch between light and dark mode ////
nightMode.addEventListener("click", () => {
    if (nightMode.innerHTML === "Modo Nocturno") {
        nightMode.innerHTML = "Modo Diurno"
        container.classList.toggle("dark")
    } else {
        nightMode.innerHTML = "Modo Nocturno"
        container.classList.toggle("dark")
    }

})

nightModeDesk.addEventListener("click", () => {
    if (nightModeDesk.innerHTML === "MODO NOCTURNO") {
        nightModeDesk.innerHTML = "MODO DIURNO"
        container.classList.toggle("dark")
    } else {
        nightModeDesk.innerHTML = "MODO NOCTURNO"
        container.classList.toggle("dark")
    }

})

createButton.addEventListener("click", () => {
    trendingSection.classList.add("inactive")
})


/////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//// The code below is use to operate the carousel of the trending section ////

let gifKey = "Kgtc3PtS5s0QmceWRa7YZEb3CAR82e95"
let containerCarousel = document.querySelector(".gifs-trending-wrapper")
let buttonSlider = document.querySelectorAll(".button-slider")
let numberOfGifs = 30
let imageIndex = 1
let translateX = 0
buttonSlider.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.className === "button-slider left") {
            if (imageIndex !== 1) {
                imageIndex--
                translateX += 200
            }
        } else if (imageIndex !== numberOfGifs) {
            imageIndex++
            translateX -= 200
        }
        containerCarousel.style.transform = `translateX(${translateX}px)`
    })
})

/*
function displayWindowSize() {
    var width = document.documentElement.clientWidth;
    console.log(width)
    if (width < 700) {
        numberOfGifs = 3
        return 250
    }
}
window.addEventListener("resize", displayWindowSize);
displayWindowSize();
*/



//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///// The code below is use to pull gifs from giphy trendings endpoint ////


let getTrendingGifs = async (number) => {
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${gifKey}&limit=${number}`
    let response = await fetch(url)
    let json = await response.json()
    let data = json.data
    return data
}

let getUrlsAndDrawGifs = () => {
    let data = getTrendingGifs(30)
    data.then(res => {
        res.forEach(gif => {
            let url = gif.images.original.url
            let title = gif.title
            createDivTrending(url, gif.username, title)
        })
    }).catch((err) => {
        console.log(err)
    })
}

let createDivTrending = (url, user, title) => {
    let div = document.createElement("div")
    div.classList.add("gifs-trending")
    containerCarousel.appendChild(div)
    createImgTrending(div, url, user, title)
}

let createImgTrending = (div, url, user, title) => {
    let img = document.createElement("img")
    img.setAttribute("src", url)
    div.appendChild(img)
    createDivOverlay(div, user, title)
}

let createDivOverlay = (div, user, title) => {
    let divOverlay = document.createElement("div")
    divOverlay.classList.add("overlay")
    div.appendChild(divOverlay)
    createDivsChildrenOverlay(divOverlay, user, title)
}

let createDivsChildrenOverlay = (divFather, user, title) => {
    let divChildren1 = document.createElement("div")
    divChildren1.classList.add("children1")
    let divChildren2 = document.createElement("div")
    divChildren2.classList.add("children2")
    divFather.appendChild(divChildren1)
    divFather.appendChild(divChildren2)
    createUserTitle(divChildren1, user, title)
    createButtonGifs(divChildren2)
}

let createUserTitle = (childre1, user, title) => {
    let username = document.createElement("h3")
    username.innerHTML = user
    let titleGif = document.createElement("h2")
    titleGif.innerHTML = title
    childre1.appendChild(username)
    childre1.appendChild(titleGif)
}

let createButtonGifs = (children2) => {
    let favorite = document.createElement("img")
    favorite.setAttribute("src", "http://127.0.0.1:5500/resources/icon-fav.svg")
    favorite.setAttribute("class", "add-favorite")

    let download = document.createElement("img")
    download.setAttribute("src", "http://127.0.0.1:5500/resources/icon-download.svg")
    download.setAttribute("class", "download")

    let expand = document.createElement("img")
    expand.setAttribute("src", "http://127.0.0.1:5500/resources/icon-max-hover.svg")
    expand.setAttribute("class", "expandButton")
    expand.setAttribute("data-tab-target", ".refExpand")

    children2.appendChild(favorite)
    children2.appendChild(download)
    children2.appendChild(expand)
}

getUrlsAndDrawGifs()

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

let expandContainer = document.querySelector(".expand-gif")

setTimeout(() => {
    let expandButton = document.querySelectorAll(".expandButton")
    expandButton.forEach(button => {
        button.addEventListener("click", (e) => {
            console.log(e.path[3].childNodes)
            expandContainer.innerHTML = ""
            let cardDivGif = e.path[3].childNodes[0]
            let cardDivOverlay = e.path[3].childNodes[1]
            let cloneGif = cardDivGif.cloneNode(true)
            let cloneOverlay = cardDivOverlay.cloneNode(true)
            expandContainer.appendChild(cloneGif)
            expandContainer.appendChild(cloneOverlay)
        })
    })
}, 1000);



/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

let inputSearch = document.querySelector(".input")
let divInputContainer = document.querySelector(".div-input-container")
let searchButton = document.querySelector(".icon-search")
let searchButtonHidden = document.querySelector(".icon-search-hidden")
let suggestionList = document.querySelector(".suggestion-list")
let shapper = document.querySelector(".shapper")
inputSearch.addEventListener("keyup",()=>{

    if(inputSearch.value !== ""){
        suggestionList.innerHTML = ""
        searchButton.src = "/resources/close-input.svg"
        searchButtonHidden.classList.remove("inactive")
        divInputContainer.style.height = `182.97px`
        searchSuggestions(inputSearch.value)
    }else{
        divInputContainer.style.height = ``
        searchButton.src = "/resources/icon-search.svg"
        searchButtonHidden.classList.add("inactive")
        suggestionList.innerHTML = ""
    }
})

divInputContainer.addEventListener("click",(e)=>{
    if(e.target.src === "http://127.0.0.1:5500/resources/close-input.svg"){
        divInputContainer.style.height = ``
        searchButton.src = "/resources/icon-search.svg"
        searchButtonHidden.classList.add("inactive")
        inputSearch.value = ""
        suggestionList.innerHTML = ""
    }
})


////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

let searchSuggestions = async (input)=>{
    let url = `https://api.giphy.com/v1/gifs/search/tags?api_key=${gifKey}&q=${input}`
    let result = await fetch(url)
    let json = await result.json()
    json.data.forEach(sugges =>{
        createDivSuggestion(sugges.name)
    })
}

let createDivSuggestion = (name)=>{
    let div = document.createElement("div")
    createLiImgSuggestion(div, name)
    suggestionList.appendChild(div)
}

let createLiImgSuggestion = (div, name)=>{
    let img = document.createElement("img")
    let li = document.createElement("li")
    li.innerHTML = name
    img.setAttribute("src", "http://127.0.0.1:5500/resources/icon-search.svg")
    div.appendChild(img)
    div.appendChild(li)
}