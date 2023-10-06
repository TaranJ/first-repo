import { displayError } from "./components/error.js";

const product = document.querySelector(".product");
const moreLikeThis = document.querySelector(".more-like-this");
const productDetails = document.querySelector(".product-details");
const title = document.querySelector("title");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const url = "https://api.noroff.dev/api/v1/gamehub/";
const productUrl = url + id;

// fetches game details
export async function getGameDetails() {
  try {
    const response = await fetch(productUrl);
    const game = await response.json();
    console.log(game);

    title.innerHTML += ` ${game.title}`;

    createHtmlDetails(game);

    if (game.onSale === true) {
      createHtmlSale(game);
    } else {
      createHtml(game);
    }
  } catch (error) {
    product.innerHTML = displayError("An error occurred when calling the API");
  }

  // Shopping cart
  function save(key, value) {
    const encodedValue = JSON.stringify(value);
    localStorage.setItem(key, encodedValue);
  }

  function load(key) {
    const encodedValue = localStorage.getItem(key);
    return JSON.parse(encodedValue);
  }

  function onAddToCart(event) {
    const button = event.target;
    const id = button.dataset.id;
    const title = button.dataset.title;
    const price = button.dataset.price;
    const image = button.dataset.img;

    let cart = load("cart") || [];

    const itemInCart = cart.find((item) => item.id === id);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      cart.push({
        id,
        title,
        price,
        image,
        quantity: 1,
      });
    }

    save("cart", cart);
  }

  function AddToCart() {
    const buttons = document.querySelectorAll("button[data-id]");

    buttons.forEach((button) => {
      button.addEventListener("click", onAddToCart);
    });
  }

  AddToCart();
}

getGameDetails();

// 3 functions that are called in getGameDetails, the first one is only called if the game is on sale
function createHtmlSale(game) {
  product.innerHTML = `<div class="product-photo"> <img src="${game.image}" /> </div>
                        <div class="product-description">
                        <h1>${game.title}</h1>
                        <p class="da-description">${game.description}</p>
                        <div class="product-price">
                        <p class="sale">Sale</p>
                        <p class="old-price">€${game.price}</p>
                        <p class="sale-price">€${game.discountedPrice}</p>
                        <a href="/cart.html"> <button data-id="${game.id}" data-title="${game.title}" data-price="${game.discountedPrice}" data-img="${game.image}" class="cta">Buy Now</button></a></div>
                        </div>`;
}

function createHtml(game) {
  product.innerHTML = `<div class="product-photo"> <img src="${game.image}" /> </div>
                          <div class="product-description">
                          <h1>${game.title}</h1>
                          <p class="da-description">${game.description}</p>
                          <div class="product-price">
                          <p class="sale-price">€${game.price}</p>
                          <a href="/cart.html"> <button data-id="${game.id}" data-title="${game.title}" data-price="${game.price}" data-img="${game.image}" class="cta">Buy Now</button></a></div>
                          </div>`;
}

function createHtmlDetails(game) {
  productDetails.innerHTML = `<h1>Product details</h1>
    <table>
      <tr>
        <th>Release year:</th>
        <td>${game.released}</td>
      </tr>
      <tr>
        <th>Genre:</th>
        <td>${game.genre}</td>
      </tr>
      <tr>
        <th>Rating:</th>
        <td>${game.ageRating}</td>
      </tr>
      <tr>
        <th>Reviews:</th>
        <td class="mostly-positive">Mostly positive</td>
      </tr>
    </table>`;
}

// fetches images for "More like this"-section, and skips the current game
async function getGameImages() {
  try {
    const response = await fetch(url);
    const games = await response.json();

    moreLikeThis.innerHTML = `<h1>More like this</h1>`;

    for (let i = 0; i < games.length; i++) {
      if (id === games[i].id) {
        continue;
      }

      if (i === 5 || i === 6) {
        break;
      }

      moreLikeThis.innerHTML += `<a href="product.html?id=${games[i].id}"><img src="${games[i].image}">`;
    }
  } catch (error) {
    moreLikeThis.innerHTML = displayError("An error occurred when calling the API");
  }
}

getGameImages();
