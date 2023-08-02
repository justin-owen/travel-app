const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left')
const rightArrow = document.querySelector('.right')
const loginNav = document.querySelector('#login')
const registerNav = document.querySelector('#register')
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link')
const registerLink = document.querySelector('.register-link')
const iconclose = document.querySelector('.icon-close')
var sectionIndex = 0;
leftArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + `%)`
});

rightArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex < 3) ? sectionIndex + 1 : 3;
    slider.style.transform = 'translate(' + (sectionIndex) * -25 + `%)`
});

loginNav.addEventListener('click', function(){
    wrapper.classList.remove('active-popup')
    wrapper.classList.add('login')
    wrapper.classList.remove('register')
    wrapper.classList.add('active-popup')
})
iconclose.addEventListener('click', function(){
    wrapper.classList.remove('active-popup')
    wrapper.classList.remove('login')
    wrapper.classList.remove('register')
})
loginLink.addEventListener('click', function(){
    wrapper.classList.remove('active-popup')
    wrapper.classList.add('login')
    wrapper.classList.remove('register')
    wrapper.classList.add('active-popup')
})
registerNav.addEventListener('click', function(){
    wrapper.classList.remove('active-popup')
    wrapper.classList.add('register')
    wrapper.classList.remove('login')
    wrapper.classList.add('active-popup')
})
registerLink.addEventListener('click', function(){
    wrapper.classList.remove('active-popup')
    wrapper.classList.add('register')
    wrapper.classList.remove('login')
    wrapper.classList.add('active-popup')
})
