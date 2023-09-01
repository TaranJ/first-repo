const url = "https://api.noroff.dev/api/v1/gamehub";

const newReleases = document.querySelector(".new-releases");
const specialOffers = document.querySelector(".game-list");

// fetches game images for new releases on home page
async function getGameImages() {
  const response = await fetch(url);
  const games = await response.json();

  console.log(games);

  for (let i = 0; i < games.length; i++) {
    if (i === 5) {
      break;
    }

    newReleases.innerHTML += `<img src="${games[i].image}">`;
  }
}

getGameImages();

// only shows games on sale
async function getGamesOnSale() {
  const response = await fetch(url);
  const games = await response.json();

  for (let i = 0; i < games.length; i++) {
    if (games[i].onSale === false) {
      continue;
    }
    if (i === 8) {
      break;
    }

    specialOffers.innerHTML += ` <div class="pricing"><a href="product.html"><img src="${games[i].image}"></a>
                                <p class="sale">Sale</p>
                                <p class="old-price">€${games[i].price}</p>
                                <p class="sale-price">€${games[i].discountedPrice}</p></div>`;
  }
}

getGamesOnSale();