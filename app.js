//Creating a category variable, defaults to "All".
var category = document.getElementById('category').innerText.trim();
//Creating variables for qty, price
var totalPrice = 0;
var totalItems = 0;
var cart = [];
//Creating a category selector.
document.getElementsByClassName('cat-selector')[0].addEventListener("click", function() {
  category = "All";
  document.getElementById('category').innerHTML = 'All <span class="caret"></span>';
});

document.getElementsByClassName('cat-selector')[1].addEventListener("click", function() {
  category = "Televisions";
  document.getElementById('category').innerHTML = 'Televisons <span class="caret"></span>';
});

document.getElementsByClassName('cat-selector')[2].addEventListener("click", function() {
  category = "Audio";
  document.getElementById('category').innerHTML = 'Audio <span class="caret"></span>';
});

document.getElementsByClassName('cat-selector')[3].addEventListener("click", function() {
  category = "Phones";
  document.getElementById('category').innerHTML = 'Phones <span class="caret"></span>';
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
  rowElement.lastChild.appendChild(createElementWithClass('p','item-price'));
  var price = document.createTextNode('$' + object.price);
  rowElement.lastChild.lastChild.appendChild(price);
  rowElement.lastChild.lastChild.setAttribute('data-serial',object.serial);
  //Adding "Add to Cart" button
  rowElement.lastChild.appendChild(createElementWithClass('button','cart-btn'));
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
  var showList = document.querySelectorAll('.show');
  for (var j = 0; j < showList.length; j++) {
    showList[j].classList.remove('show');
    showList[j].classList.add('hide');
  }
  document.getElementsByClassName('results-summary')[0].classList.remove('hide');
  document.getElementsByClassName('results-summary')[0].classList.add('show');
  document.getElementsByClassName('results-items')[0].classList.remove('hide');
  document.getElementsByClassName('results-items')[0].classList.add('show');
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
  if (el.target.className === 'cart-btn') {
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
  var showList = document.querySelectorAll('.show');
  for (var j = 0; j < showList.length; j++) {
    showList[j].classList.remove('show');
    showList[j].classList.add('hide');
  }
  document.getElementsByClassName('product-page')[0].classList.remove('hide');
  document.getElementsByClassName('product-page')[0].classList.add('show');
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
document.getElementsByClassName('cart-box')[0].addEventListener("click", function(el) {
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

  for (var i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalPrice += cart[i].object.price * cart[i].quantity;
    parentElement.appendChild(createShoppingElement(cart[i].object,cart[i].quantity));
    parentElement.appendChild(document.createElement('hr'));
  }
  var subTotal = document.createElement('p');
  subTotal.id = 'subtotal';
  parentElement.appendChild(subTotal);
  var subTotalText = "Subtotal (" + totalItems + " items): $" + totalPrice;
  parentElement.lastChild.appendChild(document.createTextNode(subTotalText));
  document.getElementById('shop-box-text').innerText = subTotalText;
  var showList = document.querySelectorAll('.show');
  for (var j = 0; j < showList.length; j++) {
    showList[j].classList.remove('show');
    showList[j].classList.add('hide');
  }
  document.getElementsByClassName('shop-page')[0].classList.remove('hide');
  document.getElementsByClassName('shop-page')[0].classList.add('show');
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
  element.lastChild.appendChild(createElementWithClass('button','delete'));
  element.lastChild.lastChild.setAttribute('type','button');
  element.lastChild.lastChild.innerText = 'Delete';
  //Adding item price
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('p','shop-price'));
  element.lastChild.lastChild.innerText = '$' + obj.price;
  //Creating quantity dropdown
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.innerText = 'Qty:';
  element.lastChild.appendChild(createElementWithClass('select','form-control'));
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
    }
  }
})
