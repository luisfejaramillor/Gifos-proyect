let tabs = document.querySelectorAll('[data-tab-target]')
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

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        let target = document.querySelectorAll(tab.dataset.tabTarget)
        tabContents.forEach(tabContent => {
            tabContent.classList.add("inactive")
        })
        target.forEach(content =>{
            content.classList.remove("inactive")
        })
        if(burguerButton.src==="http://127.0.0.1:5500/resources/burger.svg"){
            burguerButton.src = "http://127.0.0.1:5500/resources/close.svg"
        }
        else{
            burguerButton.src = "http://127.0.0.1:5500/resources/burger.svg"
            dropMenu.classList.add("inactive")   
            trendingSection.classList.remove("inactive")
            footer.classList.remove("inactive")
        }
    })
})

logo.addEventListener("click", ()=>{
    burguerButton.src = "http://127.0.0.1:5500/resources/burger.svg"
})

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
nightMode.addEventListener("click", ()=>{
        container.classList.toggle("dark")
})



