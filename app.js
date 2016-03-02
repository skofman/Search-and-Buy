//Creating a category variable, defaults to "All".
var category = document.getElementById('category').innerText.trim();
//Creating variables for qty, price and cart items
var totalPrice = 0;
var totalItems = 0;
var shippingPrice = 0;
var taxRate = 0.08;
var cart = [];
//Creating a category selector.
document.getElementsByClassName('cat-menu')[0].addEventListener("click", function(event) {
  category = event.target.innerText;
  var text = category + " ";
  var element = document.createTextNode(text);
  document.getElementById('category').replaceChild(element, document.getElementById('category').firstChild);
  console.log(document.getElementById('category'));
});
//Populate front page with random items.
var titleElements = document.getElementsByClassName('main-title');
var imageElements = document.getElementsByClassName('main-image');
var randomItems = [];

for (var i = 0; i < 9; i++) {
  var randomItem = Math.floor(30 * Math.random());
  if (randomItems.indexOf(randomItem) === -1) {
    randomItems.push(randomItem);
    titleElements[i].innerHTML = items[randomItem].title;
    imageElements[i].setAttribute("src", items[randomItem].image);
    titleElements[i].setAttribute('data-serial',items[randomItem].serial);
    imageElements[i].setAttribute('data-serial',items[randomItem].serial);
  }
  else {
    i--;
  }
}
//Creating row display element
function displayResults(object) {
  var rowElement = createElementWithClass('div','row');
  //Adding item image
  rowElement.appendChild(createElementWithClass('div','col-md-4'));
  rowElement.lastChild.appendChild(createElementWithClass('img','item-image center-block'));
  rowElement.lastChild.lastChild.setAttribute('src',object.image);
  rowElement.lastChild.lastChild.setAttribute('data-serial',object.serial);
  rowElement.appendChild(createElementWithClass('div','col-md-8'));
  //Adding item title
  rowElement.lastChild.appendChild(createElementWithClass('h3','item-title'));
  var text = document.createTextNode(object.title);
  rowElement.lastChild.lastChild.appendChild(text);
  rowElement.lastChild.lastChild.setAttribute('data-serial',object.serial);
  //Adding item price
  rowElement.lastChild.appendChild(createElementWithClass('p','item-price text-danger'));
  var price = document.createTextNode('$' + object.price);
  rowElement.lastChild.lastChild.appendChild(price);
  rowElement.lastChild.lastChild.setAttribute('data-serial',object.serial);
  //Adding "Add to Cart" button
  rowElement.lastChild.appendChild(createElementWithClass('button','btn btn-success cart-btn'));
  var cartText = document.createTextNode('Add to Cart');
  rowElement.lastChild.lastChild.appendChild(cartText);
  rowElement.lastChild.lastChild.setAttribute('type','button');
  rowElement.lastChild.lastChild.setAttribute('data-serial',object.serial);
  document.getElementsByClassName('results-items')[0].appendChild(rowElement);
  document.getElementsByClassName('results-items')[0].appendChild(document.createElement('hr'));
};

//Creating grid display element

//Creating the search feature and refreshing the screen to show the results.
document.getElementById('search-btn').addEventListener("click", function() {
  clearOldResults();
  var searchValue = document.getElementById('search-field').value.toLowerCase();
  var counter = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].title.toLowerCase().match(searchValue) && (category === "All" || items[i].category === category)) {
      displayResults(items[i]);
      counter++;
    }
  }
  var text = document.createTextNode(counter + ' results for "' + searchValue + '"');
  document.getElementById('results-text').appendChild(text);
  //Show results page and hide all other pages
  showElements('main-bar','results-summary','results-items');
});
//Function to create element with chosen class names
function createElementWithClass(el, classLabel) {
  var element = document.createElement(el);
  element.className = classLabel;
  return element;
}
//Function to clear the results for previous search of exists.
function clearOldResults() {
  if (document.getElementById('results-text').lastChild) {
    document.getElementById('results-text').lastChild.remove();
  }
  while (document.getElementsByClassName('results-items')[0].lastChild) {
    document.getElementsByClassName('results-items')[0].lastChild.remove();
  }
}
//Create event listener that shows the product page for selected product
document.getElementById('found-item').addEventListener("click", productPage);
//Function to create the product page
function productPage(el) {
  //Finding the selected product
  for (var i = 0; i < items.length; i++) {
    if (el.target.getAttribute('data-serial') === items[i].serial) {
      var object = items[i];
      break;
    }
  }
  //Checking if add to cart button was clicked
  if (el.target.className.split(' ').indexOf('cart-btn') != -1) {
    addToCart(object, 1);
    return;
  }
  //Clearing previous product information
  if (document.getElementById('product-title').lastChild) {
    document.getElementById('product-title').lastChild.remove();
  }
  if (document.getElementById('product-price').lastChild) {
    document.getElementById('product-price').lastChild.remove();
  }
  while (document.getElementById('features').lastChild) {
    document.getElementById('features').lastChild.remove();
  }
  //Adding image to product page
  document.getElementById('product-image').setAttribute('src',object.image);
  //Adding title to product page
  var titleTextNode = document.createTextNode(object.title);
  document.getElementById('product-title').appendChild(titleTextNode);
  //Adding price to product page
  var priceText = 'Price: $' + object.price;
  var priceTextNode = document.createTextNode(priceText);
  document.getElementById('product-price').appendChild(priceTextNode);
  //Adding features to product page
  for (var j = 0; j < object.description.length; j++) {
    var listElement = document.createElement('li');
    var listTextNode = document.createTextNode(object.description[j]);
    listElement.appendChild(listTextNode);
    document.getElementById('features').appendChild(listElement);
  }
  document.getElementById('cart-box-btn').setAttribute('data-serial',object.serial);
  showElements('main-bar','product-page');
}
//Add to cart function
function addToCart(obj, qty) {
  var currentQty = Number(document.getElementById('cart-items').innerText);
  document.getElementById('cart-items').innerText = currentQty + qty;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].object.serial === obj.serial) {
      cart[i].quantity += qty;
      return;
    }
  }
  cart.push({object: obj, quantity: qty});
}
//Event listener for add to cart button on the product page
document.getElementsByClassName('product-box')[0].addEventListener("click", function(el) {
  for (var i = 0; i < items.length; i++) {
    if (el.target.getAttribute('data-serial') === items[i].serial) {
      var object = items[i];
      break;
    }
  }
  if (el.target.id === "cart-box-btn") {
    addToCart(object, Number(document.getElementsByClassName('qty')[0].value));
  }
})
//Event listener and creation of the shopping cart page
document.getElementsByClassName('cart')[0].addEventListener("click", function() {
  while (document.getElementById('insert').nextSibling) {
    document.getElementById('insert').nextSibling.remove();
  }
  var parentElement = document.getElementById('shop-items');
  totalItems = 0;
  totalPrice = 0;
  for (var i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalPrice += cart[i].object.price * cart[i].quantity;
    parentElement.appendChild(createShoppingElement(cart[i].object,cart[i].quantity));
    parentElement.appendChild(document.createElement('hr'));
  }
  var subTotal = createElementWithClass('p','pull-right');
  subTotal.id = 'subtotal';
  parentElement.appendChild(subTotal);
  var subTotalText = "Subtotal (" + totalItems + " items): $" + totalPrice;
  parentElement.lastChild.appendChild(document.createTextNode(subTotalText));
  document.getElementById('shop-box-text').innerText = subTotalText;
  showElements('main-bar','shop-page');
})
//Function to create shopping cart element
function createShoppingElement(obj, qty) {
  var element = createElementWithClass('div','row');
  //Adding the product image
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('img','shop-image'));
  element.lastChild.lastChild.setAttribute('src',obj.image);
  //Adding product title
  element.appendChild(createElementWithClass('div','col-md-6'));
  element.lastChild.appendChild(createElementWithClass('h3','shop-title'));
  element.lastChild.lastChild.innerText = obj.title;
  //Adding the delete from cart button
  element.lastChild.appendChild(createElementWithClass('button','btn btn-info delete'));
  element.lastChild.lastChild.setAttribute('type','button');
  element.lastChild.lastChild.innerText = 'Delete';
  //Adding item price
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('p','shop-price'));
  element.lastChild.lastChild.innerText = '$' + obj.price;
  //Creating quantity dropdown
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.innerText = 'Qty:';
  element.lastChild.appendChild(createElementWithClass('select','form-control shop-qty'));
  for (var i = 1; i <= 10; i++) {
    element.lastChild.lastChild.appendChild(document.createElement('option'));
    element.lastChild.lastChild.lastChild.innerText = i;
    if (qty === i) {
      element.lastChild.lastChild.lastChild.setAttribute('selected',true)
    }
  }
  return element;
}
//Event listener for deleting items from cart
document.getElementById('shop-items').addEventListener("click", function(event) {
  if (event.target.className.split(' ').indexOf('delete') != -1) {
    var length = document.getElementsByClassName('delete').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('delete')[i]) {
        totalItems -= cart[i].quantity;
        totalPrice -= cart[i].object.price * cart[i].quantity;
        document.getElementById('subtotal').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('shop-box-text').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('cart-items').innerText = totalItems;
        cart.splice(i, 1);
        var parent = document.getElementsByClassName('delete')[i].parentElement.parentElement;
        if (i === 0) {
          parent.nextSibling.remove();
        }
        else {
          parent.previousSibling.remove();
        }
        parent.remove();
        return;
      }
    }
  }
})
//Event listener for changing item quantity in the cart
document.getElementById('shop-items').addEventListener("change", function(event) {
  if (event.target.className.split(' ').indexOf('shop-qty') != -1) {
    var length = document.getElementsByClassName('shop-qty').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('shop-qty')[i]) {
        var newQty = Number(document.getElementsByClassName('shop-qty')[i].value);
        totalItems += (newQty - cart[i].quantity);
        totalPrice += (newQty - cart[i].quantity) * cart[i].object.price;
        cart[i].quantity = newQty;
        document.getElementById('subtotal').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('shop-box-text').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('cart-items').innerText = totalItems;
        return;
      }
    }
  }
})
//Event listener for the checkout button creating checkout page
document.getElementById('checkout').addEventListener("click", function(event) {
  for (var i = 0; i < cart.length; i++) {
    var element = createElementWithClass('div','row');
    //Adding image to the review box
    element.appendChild(createElementWithClass('div','col-md-2'));
    element.lastChild.appendChild(createElementWithClass('img','review-image'));
    element.lastChild.lastChild.setAttribute('src',cart[i].object.image);
    //Adding item title
    element.appendChild(createElementWithClass('div','col-md-10'));
    element.lastChild.appendChild(document.createElement('h5'));
    element.lastChild.lastChild.innerText = cart[i].object.title;
    //Adding item price
    element.lastChild.appendChild(document.createElement('h5'));
    element.lastChild.lastChild.innerText = "$" + cart[i].object.price;
    //Adding quantity dropdown
    element.lastChild.appendChild(createElementWithClass('select','form-control review-item-qty'));
    for (var j = 1; j <= 10; j++) {
      element.lastChild.lastChild.appendChild(document.createElement('option'));
      element.lastChild.lastChild.lastChild.innerText = j;
      if (j === cart[i].quantity) {
        element.lastChild.lastChild.lastChild.setAttribute('selected',true);
      }
    }
    element.lastChild.appendChild(createElementWithClass('button','btn btn-info checkout-delete'));
    element.lastChild.lastChild.innerText = 'Delete';
    element.lastChild.lastChild.setAttribute('type','button');
    document.getElementById('review-items').appendChild(element);
  }
  //Updating information elements
  document.getElementById('checkout-text').innerText = 'Checkout (' + totalItems + ' items)';
  document.getElementById('checkout-box-items').innerText = "Items (" + totalItems + "):";
  document.getElementById('checkout-price').innerText = "$" + totalPrice;
  document.getElementById('shipping').innerText = "$" + shippingPrice;
  document.getElementById('before-tax').innerText = "$" + (shippingPrice + totalPrice);
  document.getElementById('tax').innerText = "$" + (totalPrice * taxRate);
  document.getElementById('order-total').innerText = "$" + (totalPrice * (1 + taxRate) + shippingPrice);
  document.getElementById('order-total-bottom').innerText = "Order total: $" + (totalPrice * (1 + taxRate) + shippingPrice);
  showElements('checkout-bar','checkout-page');
})
//Function to show and hide HTML elements
function showElements() {
  var showList = document.querySelectorAll('.show');
  for (var i = 0; i < showList.length; i++) {
    showList[i].classList.remove('show');
    showList[i].classList.add('hide');
  }
  for (var j = 0; j < arguments.length; j++) {
    document.getElementsByClassName(arguments[j])[0].classList.add('show');
  }
}
//Create an event listener for the "Place your order" buttons
document.getElementsByClassName('order')[0].addEventListener("click", orderPage);
document.getElementsByClassName('order')[1].addEventListener("click", orderPage);

function orderPage() {
  document.getElementById('charge-text').innerText = "We did not charge $" + (totalPrice * (1 + taxRate) + shippingPrice) + " to your credit card";
  showElements('order-page');
}
//Create event listener to the address modal
document.getElementsByClassName('address-btn')[0].addEventListener("click", function() {
  if (document.getElementById('warning-note')) {
    document.getElementById('warning-note').remove();
  }
  if (document.getElementById('ship-name').value === "") {
    warningNote('Please enter your name','ship-name');
    return;
  }
  if (document.getElementById('ship-address').value === "") {
    warningNote('Please enter your address','ship-address');
    return;
  }
  if (document.getElementById('ship-city').value === "") {
    warningNote('Please enter your city','ship-city');
    return;
  }
  if (document.getElementById('ship-state').value === "") {
    warningNote('Please enter your state','ship-state');
    return;
  }
  if (document.getElementById('ship-zip').value === "" || isNaN(Number(document.getElementById('ship-zip').value))) {
    warningNote('Please enter a valid zip code','ship-zip');
    return;
  }
  if (document.getElementById('ship-country').value === "") {
    warningNote('Please enter your country','ship-country');
    return;
  }
  if (document.getElementById('ship-phone').value === "" || isNaN(Number(document.getElementById('ship-phone').value))) {
    warningNote('Please enter a valid phone number','ship-phone');
    return;
  }
  var element = document.getElementById('address-text');
  while (element.lastChild) {
    element.lastChild.remove();
  }
  var text = document.getElementById('ship-name').value;
  element.appendChild(document.createTextNode(text));
  element.appendChild(document.createElement('br'));
  text = document.getElementById('ship-address').value + ' ' + document.getElementById('ship-unit').value;
  element.appendChild(document.createTextNode(text));
  element.appendChild(document.createElement('br'));
  text = document.getElementById('ship-city').value + ', ' + document.getElementById('ship-state').value + ' ' + document.getElementById('ship-zip').value;
  element.appendChild(document.createTextNode(text));
  document.getElementById('address-close').click();
})
//Create event listener to the payment modal
document.getElementsByClassName('payment-btn')[0].addEventListener("click", function() {
  if (document.getElementById('warning-note')) {
    document.getElementById('warning-note').remove();
  }
  if (document.getElementById('pay-card').value === "" || isNaN(Number(document.getElementById('pay-card').value))) {
    warningNote('Please enter a valid card number','pay-card');
    return;
  }
  if (document.getElementById('pay-name').value === "") {
    warningNote('Please enter the name on the card','pay-name');
    return;
  }
  var element = document.getElementById('payment-text');
  element.lastChild.remove();
  var text = 'Card ending in ' + document.getElementById('pay-card').value;
  element.appendChild(document.createTextNode(text));
  document.getElementById('payment-close').click();
});
//Function to display a note on wrong input
function warningNote(note, idLabel) {
  var parentElement = document.getElementById(idLabel).parentElement;
  var nextElement = document.getElementById(idLabel).nextSibling;
  var element = document.createElement('p');
  element.id = 'warning-note';
  element.appendChild(document.createTextNode(note));
  parentElement.insertBefore(element, nextElement);
}
//Event listener for changing quantity or deleting items on the checkout page
document.getElementById('checkout-box').addEventListener("change", function(event) {
  if (event.target.className.split(' ').indexOf('review-item-qty') != -1) {
    var length = document.getElementsByClassName('review-item-qty').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('review-item-qty')[i]) {
        var newQty = Number(document.getElementsByClassName('review-item-qty')[i].value);
        totalItems += (newQty - cart[i].quantity);
        totalPrice += (newQty - cart[i].quantity) * cart[i].object.price;
        cart[i].quantity = newQty;
        document.getElementById('checkout-text').innerText = 'Checkout (' + totalItems + ' items)';
        document.getElementById('checkout-box-items').innerText = "Items (" + totalItems + "):";
        document.getElementById('checkout-price').innerText = "$" + totalPrice;
        document.getElementById('before-tax').innerText = "$" + (shippingPrice + totalPrice);
        document.getElementById('tax').innerText = "$" + (totalPrice * taxRate);
        document.getElementById('order-total').innerText = "$" + (totalPrice * (1 + taxRate) + shippingPrice);
        document.getElementById('order-total-bottom').innerText = "Order total: $" + (totalPrice * (1 + taxRate) + shippingPrice);
      }
    }
  }
});
//Creating event listener to delete items from the checkout page
document.getElementById('checkout-box').addEventListener("click", function(event) {
  if (event.target.className.split(' ').indexOf('checkout-delete') != -1) {
    var length = document.getElementsByClassName('checkout-delete').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('checkout-delete')[i]) {
        totalItems -= cart[i].quantity;
        totalPrice -= cart[i].object.price * cart[i].quantity;
        document.getElementById('checkout-text').innerText = 'Checkout (' + totalItems + ' items)';
        document.getElementById('checkout-box-items').innerText = "Items (" + totalItems + "):";
        document.getElementById('checkout-price').innerText = "$" + totalPrice;
        document.getElementById('before-tax').innerText = "$" + (shippingPrice + totalPrice);
        document.getElementById('tax').innerText = "$" + (totalPrice * taxRate);
        document.getElementById('order-total').innerText = "$" + (totalPrice * (1 + taxRate) + shippingPrice);
        document.getElementById('order-total-bottom').innerText = "Order total: $" + (totalPrice * (1 + taxRate) + shippingPrice);
        cart.splice(i, 1);
        var parent = document.getElementsByClassName('checkout-delete')[i].parentElement.parentElement;
        parent.remove();
        return;
      }
    }
  }

  /*
  if (event.target.className.split(' ').indexOf('delete') != -1) {
    var length = document.getElementsByClassName('delete').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('delete')[i]) {
        totalItems -= cart[i].quantity;
        totalPrice -= cart[i].object.price * cart[i].quantity;
        document.getElementById('subtotal').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('shop-box-text').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice;
        document.getElementById('cart-items').innerText = totalItems;
        cart.splice(i, 1);
        var parent = document.getElementsByClassName('delete')[i].parentElement.parentElement;
        if (i === 0) {
          parent.nextSibling.remove();
        }
        else {
          parent.previousSibling.remove();
        }
        parent.remove();
        return;
      }
    }
  }*/
});
