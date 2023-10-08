// fetches data from localstorage to display in order summary
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
                        <img src="${gameData[i].image}" alt="game cover" />
                        <div class="order-info">
                            <p>${gameData[i].title}</p>
                            <p>€${gameData[i].price}</p>
                        </div></div>`;
  }
}

summaryPrice.innerHTML = "€" + calculateTotal().toFixed(2);
totalPrice.innerHTML = "€" + calculateTotal().toFixed(2);

displayOrderSummary();

// checkout form validation
const form = document.querySelector("form");
const firstName = document.querySelector("#first-name");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#last-name");
const lastNameError = document.querySelector("#lastNameError");
const adress = document.querySelector("#adress");
const adressError = document.querySelector("#adressError");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector("#postalCodeError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const visaButton = document.querySelector("#visa-mastercard");
const vippsButton = document.querySelector("#vipps");
const paypalButton = document.querySelector("#paypal");
const paymentError = document.querySelector("#paymentError");

const cardHolder = document.querySelector("#card-holder");
const cardHolderError = document.querySelector("#cardHolderError");
const cardNumber = document.querySelector("#card-number");
const cardNumberError = document.querySelector("#cardNumberError");
const expiration = document.querySelector("#expiration");
const expirationError = document.querySelector("#expirationError");
const ccv = document.querySelector("#ccv");
const ccvError = document.querySelector("#ccvError");

const cardPayment = document.querySelector(".card-payment");

const confirmButton = document.querySelector(".cta-confirm-small");

function validateForm(event) {
  event.preventDefault();

  if (checkLength(firstName.value, 0) === true) {
    firstNameError.style.display = "none";
  } else {
    firstNameError.style.display = "block";
  }

  if (checkLength(lastName.value, 0) === true) {
    lastNameError.style.display = "none";
  } else {
    lastNameError.style.display = "block";
  }

  if (checkLength(adress.value, 3) === true) {
    adressError.style.display = "none";
  } else {
    adressError.style.display = "block";
  }

  if (checkNumbersAndLetters(postalCode.value) === true) {
    postalCodeError.style.display = "none";
  } else {
    postalCodeError.style.display = "block";
  }

  if (validateEmail(email.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (document.getElementById("visa-mastercard").checked || document.getElementById("vipps").checked || document.getElementById("paypal").checked) {
    paymentError.style.display = "none";
  } else {
    paymentError.style.display = "block";
  }

  if (checkLength(cardHolder.value, 3) === true) {
    cardHolderError.style.display = "none";
  } else {
    cardHolderError.style.display = "block";
  }

  if (checkExactLength(cardNumber.value, 16) === true) {
    cardNumberError.style.display = "none";
  } else {
    cardNumberError.style.display = "block";
  }

  if (checkExactLength(expiration.value, 4) === true) {
    expirationError.style.display = "none";
  } else {
    expirationError.style.display = "block";
  }

  if (checkExactLength(ccv.value, 3) === true) {
    ccvError.style.display = "none";
  } else {
    ccvError.style.display = "block";
  }

  if (
    checkLength(firstName.value, 0) === true &&
    checkLength(lastName.value, 0) === true &&
    checkLength(adress.value, 3) === true &&
    validateEmail(email.value) === true &&
    checkNumbersAndLetters(postalCode.value) === true &&
    (document.getElementById("visa-mastercard").checked || document.getElementById("vipps").checked || document.getElementById("paypal").checked) &&
    checkLength(cardHolder.value, 3) === true &&
    checkExactLength(cardNumber.value, 16) === true &&
    checkExactLength(expiration.value, 4) === true &&
    checkExactLength(ccv.value, 3) === true
  ) {
    window.location.assign("/success.html");
  }
}

form.addEventListener("submit", validateForm);
confirmButton.addEventListener("click", validateForm);

function checkLength(value, len) {
  if (value.trim().length > len) {
    return true;
  } else {
    return false;
  }
}

function checkExactLength(value, len) {
  if (value.trim().length === len) {
    return true;
  } else {
    return false;
  }
}

function checkNumbersAndLetters(str) {
  var regex = /(?:[A-Za-z].*?\d|\d.*?[A-Za-z])/;
  return !!str.match(regex);
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

visaButton.addEventListener("click", displayCardPayment);
vippsButton.addEventListener("click", hideCardPayment);
paypalButton.addEventListener("click", hideCardPayment);

function displayCardPayment() {
  cardPayment.style.display = "block";
}

function hideCardPayment() {
  cardPayment.style.display = "none";
}
