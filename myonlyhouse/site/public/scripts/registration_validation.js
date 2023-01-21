const password_repeat = document.getElementById("passwordR")
const password_og = document.getElementById("password")
const msg = document.getElementById("msg_password")
const button = document.getElementById("sbm_button")

password_repeat.addEventListener("input", (event) => {
  if (password_repeat.value !== password_og.value){
    msg.style.visibility = "visible"
    button.style.visibility = "hidden"
  }
  if(password_repeat.value === password_og.value){
    msg.style.visibility = "hidden"
    button.style.visibility = "visible"
  }
})

password_og.addEventListener("input", (event) => {
  if (password_repeat.value !== password_og.value){
    msg.style.visibility = "visible"
    button.style.visibility = "hidden"
  }
  if(password_repeat.value === password_og.value){
    msg.style.visibility = "hidden"
    button.style.visibility = "visible"
  }
})