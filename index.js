const API_KEY = "4f3ac4ea3892475197af67d5fcee4e69"
const url ="https://newsapi.org/v2/everything?q="

window.addEventListener('load',() => fetchNews("India"));
async function fetchNews (query){
const res = await fetch (`${url}${query}&apikey=${API_KEY}`);
const data = await res.json();
console.log(data);
bindData(data.articles);

}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-coding-card');
    cardsContainer.innerHTML=" ";
    articles.forEach(articles => {
        if (!articles.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,articles);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,articles){
    const newImg = cardClone.querySelector('#coding-image');
    const newTitle = cardClone.querySelector('#coding-title');
    const newSource = cardClone.querySelector('#coding-source');
    const newDescription = cardClone.querySelector('#coding-desc');

    newImg.src = articles.urlToImage;
    newTitle.innerHTML = articles.title;
    newDescription.innerHTML=articles.description;
    const date = new Date(articles.publishedAt).toLocaleDateString("en-US", {
        timeZone:"Asia/Jakarta"
    });
    newSource.innerHTML = ` ${articles.source.name} ▫ ${date}`;
    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(articles.url,"_blank");
    })
}
let curSelectNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    curSelectNav.classList.add('active');
}
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');
searchButton.addEventListener ('click',() =>{
const query = searchText.value;
if(!query) return;
fetchNews(query);
curSelectNav?.classList.remove('active');
curSelectNav = null;
});


// Hamburger Icon 

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
});

