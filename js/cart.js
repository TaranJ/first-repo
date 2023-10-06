const url = "https://api.noroff.dev/api/v1/gamehub/";

function remove(key) {
  localStorage.removeItem(key);
}

function calculateTotal() {
  const cart = load("cart");

  return cart.reduce((total, currentItem) => {
    return total + currentItem.quantity * currentItem.price;
  }, 0);
}

const shoppingCart = document.querySelector(".games-in-cart");
const totalPrice = document.querySelector(".cart-total-price");

function test() {
  const gameData = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < gameData.length; i++) {
    shoppingCart.innerHTML += `
    <img src="${gameData[i].image}" class="cart-img" />
    <p class="cart-title">${gameData[i].title}</p>
    <div class="cart-price">
      <p>${gameData[i].price}</p>
      <p class="cart-remove">Remove</p>
    </div>
    `;

    totalPrice.innerHTML += `${gameData[i].price}`;
  }

  console.log(userData);
}

test();
