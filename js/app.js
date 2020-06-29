let btn = document.querySelector('.toggle_btn');
let nav = document.querySelector('.nav');

btn.onclick = function(){
    nav.classList.toggle('nav_open');
}

btn.addEventListener('click', () =>{
    btn.classList.toggle('nav_cross')
});



