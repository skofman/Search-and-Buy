//Creating a category variable, defaults to "All".
var category = document.getElementById('category').innerText.trim();
//Creating variables for qty, price and cart items
var totalPrice = 0;
var totalItems = 0;
var shippingPrice = 0;
var taxRate = 0.08;
var cart = [];
var today = new Date();
var foundItems = [];
//Creating a category selector.
document.getElementsByClassName('cat-menu')[0].addEventListener("click", function(event) {
  category = event.target.innerText;
  var text = category + " ";
  var element = document.createTextNode(text);
  document.getElementById('category').replaceChild(element, document.getElementById('category').firstChild);
});
//Populate front page with random items.
var titleElements = document.getElementsByClassName('main-title');
var imageElements = document.getElementsByClassName('panel-image');
var randomItems = [];

for (var i = 0; i < 9; i++) {
  var randomItem = Math.floor(30 * Math.random());
  if (randomItems.indexOf(randomItem) === -1) {
    randomItems.push(randomItem);
    titleElements[i].innerHTML = items[randomItem].title;
    imageElements[i].setAttribute("src", items[randomItem].image);
  }
  else {
    i--;
  }
}
//Creating row display element
function displayResultsRow(str) {
  var text = document.createTextNode(str);
  document.getElementById('results-text').appendChild(text);
  for (var i = 0; i < foundItems.length; i++) {
    var rowElement = createElementWithClass('div','row');
    //Adding item image
    rowElement.appendChild(createElementWithClass('div','col-md-4'));
    rowElement.lastChild.appendChild(createElementWithClass('img','img-responsive item-image center-block'));
    rowElement.lastChild.lastChild.setAttribute('src',foundItems[i].image);
    rowElement.appendChild(createElementWithClass('div','col-md-8'));
    //Adding item title
    rowElement.lastChild.appendChild(createElementWithClass('h3','item-title'));
    var text = document.createTextNode(foundItems[i].title);
    rowElement.lastChild.lastChild.appendChild(text);
    //Adding item reviews
    var sum = 0;
    for (var j = 0; j < foundItems[i].reviews.length; j++) {
      sum += foundItems[i].reviews[j].stars;
    }
    var rating = sum / foundItems[i].reviews.length;
    rowElement.lastChild.appendChild(createElementWithClass('div','rating'));
    rowElement.lastChild.lastChild.appendChild(createStars(rating));
    rowElement.lastChild.lastChild.appendChild(document.createTextNode("  " + foundItems[i].reviews.length + " customer reviews."));
    //Adding item price
    rowElement.lastChild.appendChild(createElementWithClass('h4','item-price text-danger'));
    var price = document.createTextNode('$' + foundItems[i].price.toFixed(2));
    rowElement.lastChild.lastChild.appendChild(price);
    //Adding "Add to Cart" button
    rowElement.lastChild.appendChild(createElementWithClass('button','btn btn-success cart-btn'));
    rowElement.lastChild.lastChild.appendChild(createElementWithClass('i','fa fa-cart-plus fa-lg'));
    var cartText = document.createTextNode('  Add to Cart');
    rowElement.lastChild.lastChild.appendChild(cartText);
    rowElement.lastChild.lastChild.setAttribute('type','button');
    document.getElementsByClassName('results-items')[0].appendChild(rowElement);
    document.getElementsByClassName('results-items')[0].appendChild(document.createElement('hr'));
  }
}
//Creating grid display element
function displayResultsGrid(str) {
  var text = document.createTextNode(str);
  document.getElementById('results-text').appendChild(text);
  var item = 0;
  for (var i = 0; i < Math.ceil(foundItems.length / 3); i++) {
    var rowElement = createElementWithClass('div','row');
    for (var j = 0; j < 3; j++) {
      if (item < foundItems.length) {
        var colElement = createElementWithClass('div','col-md-4');
        colElement.appendChild(createElementWithClass('div','panel panel-default'));
        colElement.lastChild.appendChild(createElementWithClass('div','panel-heading results'));
        colElement.lastChild.lastChild.appendChild(createElementWithClass('h5','results-title'));
        colElement.lastChild.lastChild.lastChild.appendChild(document.createTextNode(foundItems[item].title));
        colElement.lastChild.appendChild(createElementWithClass('div','panel-body'));
        //Adding image
        colElement.lastChild.lastChild.appendChild(createElementWithClass('img','img-responsive panel-image center-block'));
        colElement.lastChild.lastChild.lastChild.setAttribute('src', foundItems[item].image);
        //Adding ratings
        var sum = 0;
        for (var k = 0; k < foundItems[item].reviews.length; k++) {
          sum += foundItems[item].reviews[k].stars;
        }
        var rating = sum / foundItems[item].reviews.length;
        colElement.lastChild.lastChild.appendChild(createElementWithClass('div','rating'));
        colElement.lastChild.lastChild.lastChild.appendChild(createStars(rating));
        colElement.lastChild.lastChild.lastChild.appendChild(document.createTextNode("  " + foundItems[i].reviews.length + " customer reviews."));
        //Adding price
        colElement.lastChild.lastChild.appendChild(createElementWithClass('h4','text-danger'));
        colElement.lastChild.lastChild.lastChild.appendChild(document.createTextNode('$' + foundItems[item].price.toFixed(2)));
        //Adding cart button
        colElement.lastChild.lastChild.appendChild(createElementWithClass('button','btn btn-success cart-btn'));
        colElement.lastChild.lastChild.lastChild.appendChild(createElementWithClass('i','fa fa-cart-plus fa-lg'));
        var cartText = document.createTextNode('  Add to Cart');
        colElement.lastChild.lastChild.lastChild.appendChild(cartText);
        colElement.lastChild.lastChild.setAttribute('type','button');
        rowElement.appendChild(colElement);
        item++;
      }
    }
    document.getElementsByClassName('results-items')[0].appendChild(rowElement);
  }
}
//Event listener for the 'Enter' key in the search field
document.getElementById('search-field').addEventListener("keypress", function(event) {
  if (event.charCode === 13) {
    document.getElementById('search-btn').click();
  }
});
//Creating the search feature and refreshing the screen to show the results.
document.getElementById('search-btn').addEventListener("click", function() {
  document.getElementById('row-view').className = 'btn btn-primary';
  document.getElementById('grid-view').className = 'btn btn-default';
  clearOldResults();
  foundItems = [];
  var searchValue = document.getElementById('search-field').value.toLowerCase();
  for (var i = 0; i < items.length; i++) {
    if (items[i].title.toLowerCase().match(searchValue) && (category === "All" || items[i].category === category)) {
      foundItems.push(items[i]);
    }
  }
  var foundString = foundItems.length + ' results for "' + searchValue + '"';
  displayResultsRow(foundString);
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
document.getElementById('found-item').addEventListener("click", function(event) {
  if (event.target.className.split(' ').indexOf('cart-btn') != -1) {
    var itemList = document.querySelectorAll('.cart-btn');
    for (var i = 0; i < itemList.length; i++) {
      if (event.target === itemList[i]) {
        addToCart(foundItems[i], 1);
        return;
      }
    }
  }
  var classList = event.target.className.split(' ');
  //checking if an image was clicked
  if (classList.indexOf('item-image') != -1) {
    var itemList = document.querySelectorAll('.item-image');
    for (var j = 0; j < itemList.length; j++) {
      if (event.target == itemList[j]) {
        document.getElementsByClassName('product-page')[0].setAttribute('data-item',j);
        productPage(foundItems[j]);
        return;
      }
    }
  }
  //checking if the price was clicked
  if (classList.indexOf('item-price') != -1) {
    var itemList = document.querySelectorAll('.item-price');
    for (var j = 0; j < itemList.length; j++) {
      if (event.target == itemList[j]) {
        document.getElementsByClassName('product-page')[0].setAttribute('data-item',j);
        productPage(foundItems[j]);
        return;
      }
    }
  }
  //checking if the title was clicked
  if (classList.indexOf('item-title') != -1) {
    var itemList = document.querySelectorAll('.item-title');
    for (var j = 0; j < itemList.length; j++) {
      if (event.target == itemList[j]) {
        document.getElementsByClassName('product-page')[0].setAttribute('data-item',j);
        productPage(foundItems[j]);
        return;
      }
    }
  }
});
//Function to create the product page
function productPage(object) {
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
  //Adding reviews
  var review = document.getElementById('review-insert');
  for (var i = 0; i < object.reviews.length; i++) {
    review.appendChild(document.createElement('span'));
    review.lastChild.appendChild(createStars(object.reviews[i].stars));
    review.lastChild.appendChild(document.createElement('h5'));
    review.lastChild.lastChild.appendChild(document.createTextNode(object.reviews[i].title));
  }
  //Adding price to product page
  var priceText = 'Price: $' + object.price.toFixed(2);
  var priceTextNode = document.createTextNode(priceText);
  document.getElementById('product-price').appendChild(priceTextNode);
  //Adding features to product page
  for (var j = 0; j < object.description.length; j++) {
    var listElement = document.createElement('li');
    var listTextNode = document.createTextNode(object.description[j]);
    listElement.appendChild(listTextNode);
    document.getElementById('features').appendChild(listElement);
  }
  showElements('main-bar','product-page');
}
//Add to cart function
function addToCart(item, qty) {
  var currentQtyString = document.getElementById('cart-items').innerText.trim();
  var currentQty = Number(currentQtyString.slice(1, currentQtyString.length - 1));
  document.getElementById('cart-items').innerText = " (" + (currentQty + qty) + ")";
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].item === item) {
      cart[i].quantity += qty;
      return;
    }
  }
  cart.push({item: item, quantity: qty});
}
//Event listener for add to cart button on the product page
document.getElementById('cart-box-btn').addEventListener("click", function(event) {
  var item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-item'));
  addToCart(foundItems[item], Number(document.getElementsByClassName('qty')[0].value));
})
//Event listener and creation of the shopping cart page
document.getElementsByClassName('cart-go')[0].addEventListener("click", function() {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some items first.');
    return;
  }
  while (document.getElementById('insert').nextSibling) {
    document.getElementById('insert').nextSibling.remove();
  }
  var parentElement = document.getElementById('shop-items');
  totalItems = 0;
  totalPrice = 0;
  for (var i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalPrice += cart[i].item.price * cart[i].quantity;
    parentElement.appendChild(createShoppingElement(cart[i].item,cart[i].quantity));
    parentElement.appendChild(document.createElement('hr'));
  }
  var subTotal = createElementWithClass('p','pull-right');
  subTotal.id = 'subtotal';
  parentElement.appendChild(subTotal);
  var subTotalText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
  parentElement.lastChild.appendChild(document.createTextNode(subTotalText));
  document.getElementById('shop-box-text').innerText = subTotalText;
  showElements('main-bar','shop-page');
})
//Function to create shopping cart element
function createShoppingElement(obj, qty) {
  var element = createElementWithClass('div','row');
  //Adding the product image
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('img','img-responsive'));
  element.lastChild.lastChild.setAttribute('src',obj.image);
  //Adding product title
  element.appendChild(createElementWithClass('div','col-md-6'));
  element.lastChild.appendChild(createElementWithClass('h4','shop-title'));
  element.lastChild.lastChild.innerText = obj.title;
  //Adding the delete from cart button
  element.lastChild.appendChild(createElementWithClass('button','btn btn-info delete'));
  element.lastChild.lastChild.setAttribute('type','button');
  element.lastChild.lastChild.appendChild(createElementWithClass('i','fa fa-trash fa-lg'));
  var text = document.createTextNode('  Delete');
  element.lastChild.lastChild.appendChild(text);
  //Adding item price
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('h4','text-danger shop-price'));
  element.lastChild.lastChild.innerText = '$' + obj.price.toFixed(2);
  //Creating quantity dropdown
  element.appendChild(createElementWithClass('div','col-md-2'));
  element.lastChild.appendChild(createElementWithClass('select','form-control form-inline shop-qty'));
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
        totalPrice -= cart[i].item.price * cart[i].quantity;
        document.getElementById('subtotal').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('shop-box-text').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('cart-items').innerText = " (" + totalItems + ")";
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
        totalPrice += (newQty - cart[i].quantity) * cart[i].item.price;
        cart[i].quantity = newQty;
        document.getElementById('subtotal').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('shop-box-text').innerText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('cart-items').innerText = " (" + totalItems + ")";
        return;
      }
    }
  }
})
//Event listener for the checkout button creating checkout page
document.getElementById('checkout').addEventListener("click", function(event) {
  if (cart.length === 0) {
    alert('Your cart is empty. Please add some items first.');
    return;
  }
  for (var i = 0; i < cart.length; i++) {
    var element = createElementWithClass('div','row');
    //Adding image to the review box
    element.appendChild(createElementWithClass('div','col-md-2'));
    element.lastChild.appendChild(createElementWithClass('img','img-responsive'));
    element.lastChild.lastChild.setAttribute('src',cart[i].item.image);
    //Adding item title
    element.appendChild(createElementWithClass('div','col-md-10'));
    element.lastChild.appendChild(document.createElement('h5'));
    element.lastChild.lastChild.innerText = cart[i].item.title;
    //Adding item price
    element.lastChild.appendChild(createElementWithClass('h5','text-danger'));
    element.lastChild.lastChild.innerText = "$" + cart[i].item.price.toFixed(2);
    //Adding quantity dropdown
    element.lastChild.appendChild(createElementWithClass('form','form-inline'));
    element.lastChild.lastChild.appendChild(createElementWithClass('div','form-group'));
    element.lastChild.lastChild.lastChild.appendChild(createElementWithClass('select','form-control review-item-qty'));
    for (var j = 1; j <= 10; j++) {
      element.lastChild.lastChild.lastChild.lastChild.appendChild(document.createElement('option'));
      element.lastChild.lastChild.lastChild.lastChild.lastChild.innerText = j;
      if (j === cart[i].quantity) {
        element.lastChild.lastChild.lastChild.lastChild.lastChild.setAttribute('selected',true);
      }
    }
    element.lastChild.lastChild.lastChild.appendChild(createElementWithClass('button','btn btn-info checkout-delete'));
    element.lastChild.lastChild.lastChild.lastChild.appendChild(createElementWithClass('i','fa fa-trash fa-lg'));
    var text = document.createTextNode('  Delete');
    element.lastChild.lastChild.lastChild.lastChild.appendChild(text);
    element.lastChild.lastChild.lastChild.lastChild.setAttribute('type','button');
    document.getElementById('review-items').appendChild(element);
  }
  today.setDate(today.getDate() + 7);
  updateCheckoutPage();
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
  document.getElementById('charge-text').innerText = "We did not charge $" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2) + " to your credit card";
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
  var element = createElementWithClass('p','text-danger');
  element.id = 'warning-note';
  element.appendChild(document.createTextNode(note));
  parentElement.insertBefore(element, nextElement);
}
//Event listener for changing quantity of items on the checkout page and selecting shipping method
document.getElementById('checkout-box').addEventListener("change", function(event) {
  if (event.target.className.split(' ').indexOf('review-item-qty') != -1) {
    var length = document.getElementsByClassName('review-item-qty').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('review-item-qty')[i]) {
        var newQty = Number(document.getElementsByClassName('review-item-qty')[i].value);
        totalItems += (newQty - cart[i].quantity);
        totalPrice += (newQty - cart[i].quantity) * cart[i].item.price;
        cart[i].quantity = newQty;
        updateCheckoutPage();
      }
    }
  }
  if (event.target.name === "ship") {
    shippingPrice = Number(event.target.value);
    today = new Date();
    switch(shippingPrice) {
      case 0:
        today.setDate(today.getDate() + 7);
        break;
      case 9.95:
        today.setDate(today.getDate() + 2);
        break;
      case 19.95:
        today.setDate(today.getDate() + 1);
        break;
    }
    updateCheckoutPage();
  }
});
//Creating event listener to delete items from the checkout page
document.getElementById('checkout-box').addEventListener("click", function(event) {
  if (event.target.className.split(' ').indexOf('checkout-delete') != -1) {
    var length = document.getElementsByClassName('checkout-delete').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('checkout-delete')[i]) {
        totalItems -= cart[i].quantity;
        totalPrice -= cart[i].item.price * cart[i].quantity;
        updateCheckoutPage();
        cart.splice(i, 1);
        var parent = document.getElementsByClassName('checkout-delete')[i].parentElement.parentElement.parentElement.parentElement;
        parent.remove();
        return;
      }
    }
  }
});
//Function to update the checkout page information
function updateCheckoutPage() {
  document.getElementById('checkout-text').innerText = 'Checkout (' + totalItems + ' items)';
  document.getElementById('checkout-box-items').innerText = "Items (" + totalItems + "):";
  document.getElementById('checkout-price').innerText = "$" + totalPrice.toFixed(2);
  document.getElementById('shipping').innerText = "$" + shippingPrice.toFixed(2);
  document.getElementById('before-tax').innerText = "$" + (shippingPrice + totalPrice).toFixed(2);
  document.getElementById('tax').innerText = "$" + (totalPrice * taxRate).toFixed(2);
  document.getElementById('order-total').innerText = "$" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2);
  document.getElementById('order-total-bottom').innerText = "Order total: $" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2);
  var date = monthName(today.getMonth()) + ' ' + today.getDate() + ', ' + today.getFullYear();
  document.getElementById('delivery-text').innerText = 'Estimated delivery: ' + date;
}
//function to retrieve month name
function monthName(month) {
  switch(month) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
  }
}
//Event listeners to results view
document.getElementById('grid-view').addEventListener("click", function(event) {
  if (document.getElementById('grid-view').className.split(' ').indexOf('btn-default') != -1) {
    document.getElementById('grid-view').className = 'btn btn-primary';
    document.getElementById('row-view').className = 'btn btn-default';
    var str = document.getElementById('results-text').innerText;
    clearOldResults();
    displayResultsGrid(str);
  }
});
document.getElementById('row-view').addEventListener("click", function(event) {
  if (document.getElementById('row-view').className.split(' ').indexOf('btn-default') != -1) {
    document.getElementById('row-view').className = 'btn btn-primary';
    document.getElementById('grid-view').className = 'btn btn-default';
    var str = document.getElementById('results-text').innerText;
    clearOldResults();
    displayResultsRow(str);
  }
});
//Adding event listener to sort search results
document.getElementById('results-sort').addEventListener("click", function() {
  var sort = event.target.innerText;
  var text = sort + " ";
  var element = document.createTextNode(text);
  document.getElementById('sort-btn').replaceChild(element, document.getElementById('sort-btn').firstChild);
  if (sort === 'Relevance' && document.getElementById('grid-view').className === "btn btn-primary") {
    document.getElementById('search-btn').click();
    document.getElementById('grid-view').click();
  }
  else if (sort === 'Relevance') {
    document.getElementById('search-btn').click();
  }
  else {
    var sorted = _.sortBy(foundItems, 'price');
    foundItems = [];
    for (var j = 0; j < sorted.length; j++) {
      foundItems.push(sorted[j]);
    }
    if (sort === "Price: High to Low") {
      foundItems.reverse();
    }
    var text = document.getElementById('results-text').innerText;
    clearOldResults();
    if (document.getElementById('grid-view').className === "btn btn-primary") {
      displayResultsGrid(text);
    }
    else {
      displayResultsRow(text);
    }
  }
});

function createStars(rating) {
  var element = document.createElement('span');
  var counter = 0;
  for (var i = 0; i < Math.floor(rating); i++) {
    element.appendChild(createElementWithClass('i','fa fa-star fa-lg'));
    counter++;
  }
  if (rating % Math.floor(rating) != 0) {
    element.appendChild(createElementWithClass('i','fa fa-star-half-o fa-lg'));
    counter++;
  }
  for (var j = 0; j < 5 - counter; j++) {
    element.appendChild(createElementWithClass('i','fa fa-star-o fa-lg'));
  }
  return element;
}
