function remove(key, value) {
  localStorage.removeItem(key, JSON.stringify(value));
}

function load(key) {
  const encodedValue = localStorage.getItem(key);
  return JSON.parse(encodedValue);
}

function calculateTotal() {
  const cart = load("cart");

  return cart.reduce((total, currentItem) => {
    return total + currentItem.quantity * currentItem.price;
  }, 0);
}

const shoppingCart = document.querySelector(".games-in-cart");
const totalPrice = document.querySelector(".cart-total-price");

function displayCart() {
  const gameData = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < gameData.length; i++) {
    shoppingCart.innerHTML += `
    <div class="cart-item"><img src="${gameData[i].image}" class="cart-img" />
    <p class="cart-title">${gameData[i].title}</p>
    <div class="cart-price">
      <p>€${gameData[i].price}</p>
      <p class="cart-remove" data-id="${gameData[i].id}">Remove</p>
    </div>
    `;
  }

  function onRemoveFromCart(event) {
    remove("cart");

    location.reload();
  }

  function RemoveFromCart() {
    const buttons = document.querySelectorAll(".cart-remove");
    console.log(gameData);

    buttons.forEach((button) => {
      button.addEventListener("click", onRemoveFromCart);
    });
  }

  RemoveFromCart();
}

totalPrice.innerHTML = "€" + calculateTotal().toFixed(2);

displayCart();
