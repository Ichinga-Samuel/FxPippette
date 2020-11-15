
let eye = document.querySelectorAll('.eye')
for(let i of eye){
    i.onclick = showPassword
}

let pwd = document.getElementById('pwd')
let cpwd = document.getElementById('cpwd')
if(cpwd){
    cpwd.addEventListener('blur', event => {
        if(pwd.value!==cpwd.value){
            event.target.classList.toggle('invalid')
        }
    })
}

function showPassword() {
    let pwd = this.previousElementSibling
    let type = pwd.getAttribute('type') === 'password' ? 'text' : 'password'
    pwd.setAttribute('type', type)
    this.textContent = this.textContent === 'visibility' ? 'visibility_off': 'visibility'
}