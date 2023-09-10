import { displayError } from "./components/error.js";

const url = "https://api.noroff.dev/api/v1/gamehub/";

const trending = document.querySelector(".trending");

// fetches game images for trending on store page
async function getGameImagesStore() {
  try {
    const response = await fetch(url);
    const games = await response.json();

    trending.innerHTML = `<h1>Trending</h1>
                              <img src="/images/arrow-down.png" alt="arrow pointing down" class="arrow arrow-down" />`;

    for (let i = 0; i < games.length; i++) {
      if (i === 9) {
        break;
      }

      trending.innerHTML += `<a href="product.html?id=${games[i].id}"><img src="${games[i].image}">`;
    }
  } catch (error) {
    trending.innerHTML = displayError("An error occurred when calling the API");
  }
}

getGameImagesStore();
