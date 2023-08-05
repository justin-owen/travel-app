const siteNameNavUser = document.querySelector('#site-name')


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



siteNameNavUser.addEventListener('click',function(){
    location.href = '/user'
})

europe.addEventListener('click', function(){
    location.href = "/user/countries/Europe"
})
asia.addEventListener('click', function(){
    location.href = "/user/countries/Asia"
})
oceania.addEventListener('click', function(){
    location.href = "/user/countries/Oceania"
})
northAmerica.addEventListener('click', function(){
    location.href = "/user/countries/North%20America"
})
southAmerica.addEventListener('click', function(){
    location.href = "/user/countries/South%20America"
})
centralAmerica.addEventListener('click', function(){
    location.href = "/user/countries/Central%20America"
})
africa.addEventListener('click', function(){
    location.href = "/user/countries/Africa"
})
caribbean.addEventListener('click', function(){
    location.href = "/user/countries/The%20Caribbean"
})



var sectionIndex = 0;
leftArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 7;
    slider.style.transform = 'translate(' + (sectionIndex) * -12.5 + `%)`
});

rightArrow.addEventListener('click', function(){
    sectionIndex = (sectionIndex < 7) ? sectionIndex + 1 : 0;
    slider.style.transform = 'translate(' + (sectionIndex) * -12.5 + `%)`
});