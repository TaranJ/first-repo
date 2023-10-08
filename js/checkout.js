function remove(key) {
  localStorage.removeItem(key);
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

const gamesInOrder = document.querySelector(".games-in-order");
const summaryPrice = document.querySelector(".summary-price");
const totalPrice = document.querySelector(".summary-total-price");

function displayOrderSummary() {
  const gameData = JSON.parse(localStorage.getItem("cart"));
  for (let i = 0; i < gameData.length; i++) {
    gamesInOrder.innerHTML += `<div class="order-item">
                        <img src="${gameData[i].image}" />
                        <div class="order-info">
                            <p>${gameData[i].title}</p>
                            <p>€${gameData[i].price}</p>
                        </div></div>`;
  }
}

summaryPrice.innerHTML = "€" + calculateTotal().toFixed(2);
totalPrice.innerHTML = "€" + calculateTotal().toFixed(2);

displayOrderSummary();
