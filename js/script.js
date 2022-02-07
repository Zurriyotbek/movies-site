// API key

const API_KEY = "72ec5480";

// selecting html elements
const elInput = document.querySelector(".search__input");
const elList = document.querySelector(".movie__list");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let elPagination = document.querySelector(".pagination");
let page = 1;
let totalResults = 0;
let arrOfNumbers = [];
var totalPagesNumber = 0;
let pagesArray = [];

// temporary
let input = "avengers";

// Render movies

function renderMovies(arr, elem) {
    elem.innerHTML = null;
    arr.forEach((film) => {
        let card = document.createElement("div");
        card.innerHTML = `<div class="movie__item">
        <img class="movie__img" src="${film.Poster}" alt="" />
        <div class="movie__body">
        <h3 class="movie__title">${film.Title}</h3>
        <p class="movie__year">${film.Year}</p>
        <p class="movie__category">${film.Type}</p>
        </div>
        </div>`;

        elem.appendChild(card);
    });
}

// pagination create
function paginate(array, page_size, page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

// console.log(paginate(arrOfNumbers, 10, 1));
// console.log(paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4, 1));

// fetch api and render movies
async function getMovies() {
    const promise = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${input}&page=${page}`
    );

    const response = await promise.json();

    elPagination.innerHTML = null;

    totalResults = response.totalResults;

    totalPagesNumber = Math.ceil(totalResults / 10);

    for (let i = 1; i <= totalPagesNumber; i++) {
        pagesArray.push(i);

        let pageNumber = document.createElement("p");
        pageNumber.setAttribute("class", "page");

        pageNumber.textContent = i;

        elPagination.appendChild(pageNumber);
    }

    // console.log(pagesArray);

    // console.log(paginate(pagesArray, 10, page));

    renderMovies(response.Search, elList);
}

getMovies();
let elPageNum = document.querySelector(".page");
// console.log(elPage);

// user value form input

elInput.addEventListener("change", () => {
    input = elInput.value;
    elInput.value = null;
    getMovies();
});

// Pages previous and next

prevButton.addEventListener("click", () => {
    if (page >= 2) {
        page--;
        getMovies();
    }
});
nextButton.addEventListener("click", () => {
    page++;
    getMovies();
});
let elPage = document.querySelector(".page");
console.log(elPage);

elPagination.addEventListener("click", (evt) => {
    evt.target.matches();
});
// create page buttons

// function createPages() {
//     for (let i = 1; i <= totalPagesNumber; i++) {
//         arrOfNumbers.push(i);
//     }

//     arrOfNumbers.forEach((item) => {
//         let pageNumber = document.createElement("p");
//         pageNumber.classList.add("page");

//         pageNumber.textContent = item;

//         elPagination.appendChild(pageNumber);
//     });
// }

// console.log(createPages());

// console.log(totalPagesNumber);

//////////////////////////////////
////////////////////////////////////
////////////////////////////////////////
function createPaginate(totalItems, currentPage, pageSize, maxPages) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
        currentPage = 1;
    } else if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    let startPage = 1,
        endPage = 14;

    if (totalPages <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = totalPages;
    } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (currentPage <= maxPagesBeforeCurrentPage) {
            // current page near the start
            startPage = 1;
            endPage = maxPages;
        } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
            // current page near the end
            startPage = totalPages - maxPages + 1;
            endPage = totalPages;
        } else {
            // current page somewhere in the middle
            startPage = currentPage - maxPagesBeforeCurrentPage;
            endPage = currentPage + maxPagesAfterCurrentPage;
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
        (i) => startPage + i
    );

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages,
    };
}

// totalItems, currentPage, pageSize, maxPages
page = createPaginate(132, 4, 10, 14).currentPage;
getMovies();