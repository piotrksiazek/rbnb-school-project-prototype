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