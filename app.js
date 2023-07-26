const carousels = document.querySelectorAll(".carousel");
const exit = document.querySelector(".exit");
const sign_in_btn = document.getElementById("sign_in_btn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

carousels.forEach((carousel) => {
  const moviesContainer = carousel.querySelector(".movies");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  let translateValue = 0;

  prevBtn.addEventListener("click", () => {
    if (translateValue < 0) {
      translateValue += 320; 
      moviesContainer.style.transform = `translateX(${translateValue}px)`;
    }
  });

  nextBtn.addEventListener("click", () => {
    const containerWidth = moviesContainer.clientWidth;
    const totalWidth = moviesContainer.scrollWidth;
    if (
      containerWidth < totalWidth &&
      translateValue > containerWidth - totalWidth
    ) {
      translateValue -= 320; 
      moviesContainer.style.transform = `translateX(${translateValue}px)`;
    }
  });
});

sign_in_btn.addEventListener("click", () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  const signInModal = document.querySelector(".sign_in_modal");
  modalOverlay.style.display = "block";
  signInModal.style.display = "block";
});

exit.addEventListener("click", () => {
  const modalOverlay = document.querySelector(".modal-overlay");
  const signInModal = document.querySelector(".sign_in_modal");
  modalOverlay.style.display = "none";
  signInModal.style.display = "none";
});

emailInput.addEventListener("input", function () {
  if (emailInput.value.trim() !== "") {
    emailInput.style.background = "#fff";
  } else {
    emailInput.style.background = "transparent";
  }
});

passwordInput.addEventListener("input", function () {
  if (passwordInput.value.trim() !== "") {
    passwordInput.style.background = "#fff";
  } else {
    passwordInput.style.background = "0d0d0d";
  }
});

function changeLanguage(language) {
  const languageDropdown = document.getElementById("languageDropdown");
  languageDropdown.firstChild.textContent = language.toUpperCase();

  localStorage.setItem("selectedLanguage", language);

  populateCarousel("movieContainer1", fetchCarousel1Data, language);
  populateCarousel("movieContainer2", fetchCarousel2Data, language);
}

function getSelectedLanguage() {
  const storedLanguage = localStorage.getItem("selectedLanguage");
  return storedLanguage ? storedLanguage : "en";
}

async function fetchCarousel1Data(language) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=1c107ac0fc3773c6b752c2fb2bb7c62f&page=1&language=${language}`
  );
  const data = await response.json();
  return data.results;
}

async function fetchCarousel2Data(language) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=1c107ac0fc3773c6b752c2fb2bb7c62f&page=2&language=${language}`
  );
  const data = await response.json();
  return data.results;
}

async function populateCarousel(containerId, fetchFunction, language) {
  const movies = await fetchFunction(language);
  const movieContainer = document.getElementById(containerId);

  movieContainer.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    const movieHTML = `
      <div class="none">
        <img class="movie_img" src="https://image.tmdb.org/t/p/w300${
          movie.poster_path
        }" alt="${movie.title}" />
        <h3>${movie.title}</h3>
      </div>
      <div class="movie_over">
        <img class="movie_img" src="https://image.tmdb.org/t/p/w300${
          movie.poster_path
        }" alt="${movie.title}" />
        <div class="movie_text">
          <h3>${movie.title}</h3>
          <div>
            <p>${movie.release_date.substring(0, 4)}</p>
            <span>.</span>
            <p>${movie.popularity}m</p>
          </div>
        </div>
        <div class="movie_btn">
        <button class="like" data-movie-id="${movie.id}">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.01653 8.90536C0.257977 6.56063 0.844161 3.04352 3.77508 1.87116C6.706 0.698788 8.46455 3.04352 9.05074 4.21589C9.63692 3.04352 11.9817 0.698788 14.9126 1.87116C17.8435 3.04352 17.8435 6.56063 16.0849 8.90536C14.3264 11.2501 9.05074 15.9396 9.05074 15.9396C9.05074 15.9396 3.77508 11.2501 2.01653 8.90536Z"
              stroke="white"
              stroke-width="1.17237"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="play">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.5334 9.13859L12.5089 6.1631L2.89819 0.761554C2.26123 0.417417 1.66452 0.369117 1.14127 0.745455L9.5334 9.13859ZM13.016 12.6222L16.1092 10.8824C16.713 10.5443 17.044 10.0653 17.044 9.53404C17.044 9.00375 16.713 8.52377 16.1102 8.18567L13.3099 6.6129L10.1573 9.76447L13.016 12.6222ZM0.624062 1.477C0.559662 1.67523 0.523438 1.8966 0.523438 2.13911V16.936C0.523438 17.3194 0.607963 17.6494 0.760913 17.9121L8.90852 9.76347L0.624062 1.477ZM9.5334 10.3873L1.43107 18.4907C1.58604 18.55 1.75307 18.5812 1.92917 18.5812C2.24312 18.5812 2.57015 18.4887 2.90322 18.3035L12.2161 13.074L9.5334 10.3873Z"
              fill="white"
            />
          </svg>
        </button>
        <button class="unlike" data-movie-id="${movie.id}">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.0597 20.3659C18.9684 20.3661 18.8779 20.3481 18.7935 20.313C18.7092 20.2779 18.6326 20.2265 18.5683 20.1616L2.72827 4.22714C2.59874 4.09681 2.52629 3.92035 2.52686 3.7366C2.52743 3.55285 2.60097 3.37685 2.7313 3.24732C2.86164 3.11778 3.03809 3.04533 3.22184 3.0459C3.4056 3.04647 3.5816 3.12001 3.71113 3.25035L19.5507 19.1839C19.6475 19.2809 19.7133 19.4044 19.7399 19.5388C19.7665 19.6731 19.7526 19.8124 19.7 19.9389C19.6475 20.0654 19.5586 20.1735 19.4446 20.2495C19.3307 20.3255 19.1967 20.366 19.0597 20.3659Z"
              fill="white"
            />
            <path
              d="M16.7697 4.43237C14.6875 4.43237 13.3059 5.71182 12.5733 6.64056C11.8424 5.71052 10.4591 4.43237 8.3769 4.43237C7.92226 4.43206 7.47004 4.49843 7.03467 4.62938L8.24354 5.8179C9.20735 5.8179 10.227 6.20758 11.012 6.97265C11.3844 7.33538 11.7017 7.75068 11.9537 8.20533C12.0113 8.32016 12.0998 8.4167 12.2091 8.48416C12.3185 8.55162 12.4444 8.58735 12.5729 8.58735C12.7014 8.58735 12.8273 8.55162 12.9366 8.48416C13.046 8.4167 13.1344 8.32016 13.192 8.20533C13.4442 7.75001 13.7618 7.33412 14.1346 6.97092C14.9196 6.20758 15.8059 5.8179 16.7697 5.8179C18.638 5.8179 20.1738 7.3909 20.1933 9.32501C20.2166 11.6497 19.2082 13.6353 17.7088 15.3659L18.6887 16.3518C18.8186 16.2028 18.9355 16.0643 19.0411 15.9361C20.773 13.8254 21.6022 11.6583 21.5788 9.31159C21.5519 6.61977 19.3944 4.43237 16.7697 4.43237Z"
              fill="white"
            />
            <path
              d="M12.5721 19.6731C8.77833 17.0973 4.90838 13.8539 4.95168 9.32494C4.95444 9.05675 4.98697 8.7897 5.04867 8.5287L3.95583 7.4259C3.70493 8.02233 3.57257 8.6619 3.56615 9.30892C3.54277 11.6565 4.37279 13.8236 6.10383 15.9335C6.91653 16.9237 8.38995 18.5075 11.7927 20.8174C12.0222 20.9747 12.2939 21.0589 12.5721 21.0589C12.8503 21.0589 13.122 20.9747 13.3514 20.8174C14.2325 20.2195 14.9838 19.6701 15.628 19.1674L14.6469 18.1798C13.9684 18.7032 13.2687 19.199 12.5721 19.6731Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      </div>
    `;

    movieElement.innerHTML = movieHTML;
    movieContainer.appendChild(movieElement);

    const watchlist = getWatchlist();
    const likeButton = movieElement.querySelector(".like");
    const unlikeButton = movieElement.querySelector(".unlike");

    if (watchlist.includes(movie.id)) {
      likeButton.style.display = "none";
      unlikeButton.style.display = "block";
    } else {
      likeButton.style.display = "block";
      unlikeButton.style.display = "none";
    }

    likeButton.addEventListener("click", () => addToWatchlist(movie.id));

    unlikeButton.addEventListener("click", () => removeFromWatchlist(movie.id));
  });
}

async function displayWatchlist() {
  const watchlist = getWatchlist();
  const watchlistContainer = document.getElementById("watchlistContainer");
  watchlistContainer.innerHTML = "";

  const exit_list = `<section style="display: block;" class="exit_list">
    <i class="fa-solid fa-xmark exit_icon"></i>
  </section>
  
  `;
  watchlistContainer.insertAdjacentHTML("beforeend", exit_list);

  const exitListSection = document.querySelector(".exit_list");
  exitListSection.addEventListener("click", () => {
    const watchlistContainer = document.getElementById("watchlistContainer");
    watchlistContainer.style.display = "none";
  });

  for (const movieId of watchlist) {
    try {
      const movieData = await fetchMovieData(movieId, getSelectedLanguage());
      const movieElement = createMovieElement(movieData, movieId);

      watchlistContainer.appendChild(movieElement);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  }
}

function createMovieElement(movieData, movieId) {
  const movieElement = document.createElement("div");
  movieElement.classList.add("watchlist-movie");

  const movieHTML = `
    <img class="watchlist-movie-poster" src="https://image.tmdb.org/t/p/w300${movieData.poster_path}" alt="${movieData.title}" />
    <h3>${movieData.title}</h3>
    <button class="remove-movie-btn" data-movie-id="${movieId}">
      <span>&times;</span>
    </button>
  `;

  movieElement.innerHTML = movieHTML;

  const removeButton = movieElement.querySelector(".remove-movie-btn");
  removeButton.addEventListener("click", () => {
    removeFromWatchlist(movieId);
    watchlistContainer.removeChild(movieElement); 
  });

  return movieElement;
}
async function fetchMovieData(movieId, language) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=1c107ac0fc3773c6b752c2fb2bb7c62f&language=${language}`
  );
  const data = await response.json();
  return data;
}
populateCarousel("movieContainer1", fetchCarousel1Data);
populateCarousel("movieContainer2", fetchCarousel2Data);

document.addEventListener("DOMContentLoaded", async () => {
  const selectedLanguage = getSelectedLanguage();
  await changeLanguage(selectedLanguage);
  displayWatchlist();
});

function addToWatchlist(movieId) {
  let watchlist = getWatchlist();
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    setWatchlist(watchlist);

    populateCarousel(
      "movieContainer1",
      fetchCarousel1Data,
      getSelectedLanguage()
    );
    populateCarousel(
      "movieContainer2",
      fetchCarousel2Data,
      getSelectedLanguage()
    );

    displayWatchlist();
  }
}

function removeFromWatchlist(movieId) {
  let watchlist = getWatchlist();
  watchlist = watchlist.filter((id) => id !== movieId);
  setWatchlist(watchlist);

  populateCarousel(
    "movieContainer1",
    fetchCarousel1Data,
    getSelectedLanguage()
  );
  populateCarousel(
    "movieContainer2",
    fetchCarousel2Data,
    getSelectedLanguage()
  );

  displayWatchlist(); 
}

function getWatchlist() {
  const watchlist = localStorage.getItem("watchlist");
  return watchlist ? JSON.parse(watchlist) : [];
}

function setWatchlist(watchlist) {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function toggleWatchlistContainer() {
  const watchlistContainer = document.getElementById("watchlistContainer");
  if (watchlistContainer.style.display === "none") {
    watchlistContainer.style.display = "block";
  } else {
    watchlistContainer.style.display = "none";
  }
}

const exitList = document.querySelector(".exit_list");
exitList.addEventListener("click", () => {
  const watchlistContainer = document.getElementById("watchlistContainer");
  watchlistContainer.style.display = "none";
});

const watchlistButton = document.getElementById("list");
watchlistButton.addEventListener("click", toggleWatchlistContainer);


const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");
hamburgerBtn.addEventListener("click", () => {

  sidebar.classList.toggle("open")
});
