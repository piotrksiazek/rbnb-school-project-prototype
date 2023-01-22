const zam = document.getElementById("zameldowanie")
const wym = document.getElementById("wymeldowanie")
const old = document.getElementById("error_old")
const button = document.getElementById("home_button")

let flag1 = false
let flag2 = false

let act_date = new Date()
act_date.setDate(act_date.getDate() - 1)

wym.addEventListener("input", () => {
    const wym_date = new Date(wym.value)
    const zam_date = new Date(zam.value)
    if ((wym_date < act_date) || (zam_date < act_date)) {
        old.style.visibility = "visible"
    } else {
        old.style.visibility = "hidden"
    }
    if (wym_date < zam_date) {
        old.innerHTML = "Data wymeldowania jest starsza niż zameldowania"
        old.style.visibility = "visible"
    } else {
        old.innerHTML = "Wprowadzono date z przeszłości"
    }
})

zam.addEventListener("input", () => {
    const zam_date = new Date(zam.value)
    const wym_date = new Date(wym.value)
    if ((wym_date < act_date) || (zam_date < act_date)) {
        old.style.visibility = "visible"
    } else {
        old.style.visibility = "hidden"
    }
    if (wym_date < zam_date) {
        old.innerHTML = "Data wymeldowania jest starsza niż zameldowania"
        old.style.visibility = "visible"
    } else {
        old.innerHTML = "Wprowadzono date z przeszłości"
    }
})
