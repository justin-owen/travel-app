const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.left')
const rightArrow = document.querySelector('.right')

const europe = document.querySelector('.europeBtn')
const asia = document.querySelector('.asiaBtn')
const oceania = document.querySelector('.oceaniaBtn')
const northAmerica = document.querySelector('.naBtn')
const southAmerica = document.querySelector('.saBtn')
const centralAmerica = document.querySelector('.caBtn')
const caribbean = document.querySelector('.caribbeanBtn')
const africa = document.querySelector('.africaBtn')

const siteNameNav = document.querySelector('#site-name')

const linkedIn = document.getElementById('linked-in')
const gitHub = document.getElementById('git-hub')

linkedIn.addEventListener('click', function(){
    window.open('https://www.linkedin.com/in/justin-owen1/')
})
gitHub.addEventListener('click', function(){
    window.open('https://github.com/justin-owen')
})

//site name navigates to home page
siteNameNav.addEventListener('click', function(){
    location.href = "/"
})
europe.addEventListener('click', function(){
    location.href = "/countries/Europe"
})
asia.addEventListener('click', function(){
    location.href = "/countries/Asia"
})
oceania.addEventListener('click', function(){
    location.href = "/countries/Oceania"
})
northAmerica.addEventListener('click', function(){
    location.href = "/countries/North%20America"
})
southAmerica.addEventListener('click', function(){
    location.href = "/countries/South%20America"
})
centralAmerica.addEventListener('click', function(){
    location.href = "/countries/Central%20America"
})
africa.addEventListener('click', function(){
    location.href = "/countries/Africa"
})
caribbean.addEventListener('click', function(){
    location.href = "/countries/The%20Caribbean"
})
//carousel of popular regions
var sectionIndex = 0;
leftArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 7;
    slider.style.transform = 'translate(' + (sectionIndex) * -12.5 + `%)`
});

rightArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex < 7) ? sectionIndex + 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -12.5 + `%)`
});
// pop up login and registration
