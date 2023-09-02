const url = "https://api.noroff.dev/api/v1/gamehub/";

const trending = document.querySelector(".trending");

// fetches game images for trending on store page
async function getGameImagesStore() {
  const response = await fetch(url);
  const games = await response.json();

  console.log(games);

  for (let i = 0; i < games.length; i++) {
    if (i === 9) {
      break;
    }

    trending.innerHTML += `<a href="product.html?id=${games[i].id}"><img src="${games[i].image}">`;
  }
}

getGameImagesStore();
