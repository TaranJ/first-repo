import { displayError } from "./components/error.js";

const url = "http://gamehub.local/wp-json/wc/store/products";

const newReleases = document.querySelector(".new-releases");
const specialOffers = document.querySelector(".game-list");

// only displayes games that are on sale
async function getGamesOnSale() {
  try {
    const response = await fetch(url);
    const games = await response.json();

    console.log(games);

    specialOffers.innerHTML = `<h1>Special offers</h1>
                              <div class="view-more">View more</div>`;

    for (let i = 0; i < games.length; i++) {
      if (games[i].on_sale === false) {
        continue;
      }
      if (i === 8) {
        break;
      }

      specialOffers.innerHTML += ` <div class="pricing"><a href="product.html?id=${games[i].id}"><img src="${games[i].images[0].src}" alt="cover of ${games[i].name}"></a>
                                <p class="sale">Sale</p>
                                <p class="old-price">€${games[i].prices.regular_price}</p>
                                <p class="sale-price">€${games[i].prices.price}</p></div>`;
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

    newReleases.innerHTML += `<a href="product.html?id=${games[i].id}"><img src="${games[i].images[0].src}" alt="cover of ${games[i].name}">`;
  }
}

getGameImagesHome();
