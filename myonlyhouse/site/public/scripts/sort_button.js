const toggleButton = document.getElementsByClassName("standard-button")[0]
const sortLinks = document.getElementsByClassName("sort-links")[0]

toggleButton.addEventListener("click", () => {
    sortLinks.style.display = "flex"
    toggleButton.style.display = "none"
})

sortLinks.addEventListener("click", () =>{
    sortLinks.style.display = "none"
    toggleButton.style.display = "inline"
})

const hi_price = document.getElementById("hi-price")
const lo_price = document.getElementById("lo-price")
const hi_rate = document.getElementById("hi-rate")
const lo_rate = document.getElementById("lo-rate")

hi_price.addEventListener('click', () => {
    let list = []
    const divs = document.getElementsByClassName("search-results-single")
    for (let element of divs){
        let price = element.querySelectorAll("#price")[0].innerHTML
        console.log(price.split(" ")[0])
        list.push({'div': element, 'price': price.split(" ")[0]})
    }
    list.sort((a, b) => {
        return b.price - a.price
    })
    const root = document.getElementsByClassName("search-results-over")[0]
    while(root.firstChild){
        root.removeChild(root.lastChild)
    }
    for (let element of list){
        root.append(element['div'])
    }
})

lo_price.addEventListener('click', () => {
    let list = []
    const divs = document.getElementsByClassName("search-results-single")
    for (let element of divs){
        let price = element.querySelectorAll("#price")[0].innerHTML
        console.log(price.split(" ")[0])
        list.push({'div': element, 'price': price.split(" ")[0]})
    }
    list.sort((a, b) => {
        return a.price - b.price
    })
    const root = document.getElementsByClassName("search-results-over")[0]
    while(root.firstChild){
        root.removeChild(root.lastChild)
    }
    for (let element of list){
        root.append(element['div'])
    }
})

hi_rate.addEventListener('click', () => {
    let list = []
    const divs = document.getElementsByClassName("search-results-single")
    for (let element of divs){
        let price = element.querySelectorAll("#review")[0].innerHTML
        console.log(price.split(" ")[0])
        list.push({'div': element, 'price': price.split(" ")[0]})
    }
    list.sort((a, b) => {
        return b.price - a.price
    })
    const root = document.getElementsByClassName("search-results-over")[0]
    while(root.firstChild){
        root.removeChild(root.lastChild)
    }
    for (let element of list){
        root.append(element['div'])
    }
})

lo_rate.addEventListener('click', () => {
    let list = []
    const divs = document.getElementsByClassName("search-results-single")
    for (let element of divs){
        let price = element.querySelectorAll("#review")[0].innerHTML
        console.log(price.split(" ")[0])
        list.push({'div': element, 'price': price.split(" ")[0]})
    }
    list.sort((a, b) => {
        return a.price - b.price
    })
    const root = document.getElementsByClassName("search-results-over")[0]
    while(root.firstChild){
        root.removeChild(root.lastChild)
    }
    for (let element of list){
        root.append(element['div'])
    }
})