const API_KEY = "[API_KEY_GOES_HERE]";

const formElement = document.querySelector("form");
const inputElement = document.getElementById("search");
const searchedResultsElement = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more");
const searchBtn = document.getElementById("btn");

let inputData = "";
let page = 1;

const searchImages = async () => {
  inputData = inputElement.value;
  const urlLink = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
  const response = await fetch(urlLink);
  const data = await response.json();
  if (page === 1) {
    searchedResultsElement.innerHTML = "";
  }

  const results = data.results;
  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const imageElement = document.createElement("img");
    imageElement.src = result.urls.small;
    imageElement.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(imageElement);
    imageWrapper.appendChild(imageLink);
    searchedResultsElement.appendChild(imageWrapper);
  });
  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
};

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
