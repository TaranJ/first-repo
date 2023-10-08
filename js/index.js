import { displayError } from "./components/error.js";

const url = "https://api.noroff.dev/api/v1/gamehub/";

const newReleases = document.querySelector(".new-releases");
const specialOffers = document.querySelector(".game-list");

// only displayes games that are on sale
async function getGamesOnSale() {
  try {
    const response = await fetch(url);
    const games = await response.json();

    specialOffers.innerHTML = `<h1>Special offers</h1>
                              <div class="view-more">View more</div>`;

    for (let i = 0; i < games.length; i++) {
      if (games[i].onSale === false) {
        continue;
      }
      if (i === 8) {
        break;
      }

      specialOffers.innerHTML += ` <div class="pricing"><a href="product.html?id=${games[i].id}"><img src="${games[i].image}" alt="cover of ${games[i].title}"></a>
                                <p class="sale">Sale</p>
                                <p class="old-price">€${games[i].price}</p>
                                <p class="sale-price">€${games[i].discountedPrice}</p></div>`;
    }
  } catch (error) {
    specialOffers.innerHTML = displayError("An error occurred when calling the API");
  }
}

getGamesOnSale();

// fetches game images for new releases on home page
// error-message is not included here because it would already be handled by the function above
async function getGameImagesHome() {
  const response = await fetch(url);
  const games = await response.json();

  for (let i = 0; i < games.length; i++) {
    if (i === 5) {
      break;
    }

    newReleases.innerHTML += `<a href="product.html?id=${games[i].id}"><img src="${games[i].image}" alt="cover of ${games[i].title}">`;
  }
}

getGameImagesHome();
