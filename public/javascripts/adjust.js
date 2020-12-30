
document.addEventListener('DomContentLoaded', () =>{
    let els = document.querySelectorAll('header, main, footer');
    console.log(els.length)
    els.forEach(i => i.style.paddingLeft = '300px')
})

