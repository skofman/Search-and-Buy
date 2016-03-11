//Creating a category variable, defaults to "All".
var category = document.getElementById('category').textContent.trim();
//Creating variables for qty, price and cart items
var totalPrice = 0;
var totalItems = 0;
var shippingPrice = 0;
var taxRate = 0.08;
var cart = [];
var today = new Date();
var foundItems = [];
var orders = [];
var wishlist = [];
var mine = {
  searches: [],
  views: []
};

//Creating a category selector.
document.getElementsByClassName('cat-menu')[0].addEventListener("click", function(event) {
  category = event.target.textContent;
  var text = category + " ";
  var element = document.createTextNode(text);
  document.getElementById('category').replaceChild(element, document.getElementById('category').firstChild);
});
//Populate front page with random items.
var titleElements = document.getElementsByClassName('main-title');
var imageElements = document.getElementsByClassName('panel-image');
var randomItems = [];
//Function to display front page random items
function frontPageItems() {
  for (var i = 0; i < 9; i++) {
    var randomItem = Math.floor(30 * Math.random());
    if (randomItems.indexOf(randomItem) === -1) {
      randomItems.push(randomItem);
      titleElements[i].textContent = items[randomItem].title;
      imageElements[i].setAttribute("src", items[randomItem].image.panel);
      titleElements[i].setAttribute('data-id', randomItem);
      imageElements[i].setAttribute('data-id', randomItem);
    }
    else {
      i--;
    }
  }
}
frontPageItems();
//Creating row display element
function displayResultsRow(str) {
  var text = document.createTextNode(str);
  document.getElementById('results-text').appendChild(text);
  for (var i = 0; i < foundItems.length; i++) {
    var sum = 0;
    for (var j = 0; j < foundItems[i].reviews.length; j++) {
      sum += foundItems[i].reviews[j].stars;
    }

    var rating = sum / foundItems[i].reviews.length;
    var row = createElementWithClass('div','row selector');
    var imageDiv = createElementWithClass('div','col-md-4');
    var image = createElementWithClass('img','img-responsive item-image');
    var dataDiv = createElementWithClass('div','col-md-8');
    var title = createElementWithClass('h3','item-title');
    var stars = createElementWithClass('div','rating');
    var price = createElementWithClass('h4','item-price text-danger');
    var button = createElementWithClass('button','btn btn-success cart-btn');
    var icon = createElementWithClass('i','fa fa-cart-plus fa-lg');
    var text = document.createTextNode('  Add to Cart');
    var wish = createElementWithClass('button','btn btn-info wish-btn');
    var wishIcon = createElementWithClass('i','fa fa-heart fa-lg');
    var wishText = document.createTextNode('  Add to Wishlist');
    var spacing = document.createElement('p');

    image.setAttribute('src', foundItems[i].image.cart);
    button.setAttribute('type','button');
    wish.setAttribute('type','button');
    title.textContent = foundItems[i].title;
    price.textContent = "$" + foundItems[i].price.toFixed(2);

    row.appendChild(imageDiv);
    imageDiv.appendChild(image);
    row.appendChild(dataDiv);
    dataDiv.appendChild(title);
    dataDiv.appendChild(stars);
    stars.appendChild(createStars(rating));
    stars.appendChild(document.createTextNode("  " + foundItems[i].reviews.length + " customer reviews."));
    dataDiv.appendChild(price);
    dataDiv.appendChild(button);
    dataDiv.appendChild(spacing);
    dataDiv.appendChild(wish);
    button.appendChild(icon);
    button.appendChild(text);
    wish.appendChild(wishIcon);
    wish.appendChild(wishText);

    document.getElementsByClassName('results-items')[0].appendChild(row);
    document.getElementsByClassName('results-items')[0].appendChild(document.createElement('hr'));
  }
}
//Creating grid display element
function displayResultsGrid(str) {
  var text = document.createTextNode(str);
  document.getElementById('results-text').appendChild(text);
  var item = 0;
  for (var i = 0; i < Math.ceil(foundItems.length / 3); i++) {
    var row = createElementWithClass('div','row');
    for (var j = 0; j < 3; j++) {
      if (item < foundItems.length) {
        var sum = 0;
        for (var k = 0; k < foundItems[item].reviews.length; k++) {
          sum += foundItems[item].reviews[k].stars;
        }
        var rating = sum / foundItems[item].reviews.length;

        var column = createElementWithClass('div','col-md-4');
        var panel = createElementWithClass('div','panel panel-default selector');
        var header = createElementWithClass('div','panel-heading results');
        var title = createElementWithClass('h5','results-title');
        var body = createElementWithClass('div','panel-body');
        var image = createElementWithClass('img','img-responsive panel-image');
        var stars = createElementWithClass('div','rating');
        var reviews = document.createTextNode("  " + foundItems[i].reviews.length + " customer reviews");
        var price = createElementWithClass('h4','text-danger');
        var button = createElementWithClass('button','btn btn-success cart-btn');
        var icon = createElementWithClass('i','fa fa-cart-plus fa-lg');
        var cartText = document.createTextNode('  Add to Cart');
        var wish = createElementWithClass('button','btn btn-info wish-btn spacing');
        var wishIcon = createElementWithClass('i','fa fa-heart fa-lg');
        var wishText = document.createTextNode('  Add to Wishlist');

        title.textContent = foundItems[item].title;
        price.textContent = '$' + foundItems[item].price.toFixed(2);
        image.setAttribute('src', foundItems[item].image.panel);
        button.setAttribute('type','button');
        wish.setAttribute('type','button');

        column.appendChild(panel);
        panel.appendChild(header);
        header.appendChild(title);
        panel.appendChild(body);
        body.appendChild(image);
        body.appendChild(document.createElement('br'));
        body.appendChild(stars);
        stars.appendChild(createStars(rating));
        stars.appendChild(reviews);
        body.appendChild(price);
        body.appendChild(button);
        body.appendChild(wish);
        button.appendChild(icon);
        button.appendChild(cartText);
        wish.appendChild(wishIcon);
        wish.appendChild(wishText);
        row.appendChild(column);
        item++;
      }
    }
    document.getElementsByClassName('results-items')[0].appendChild(row);
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
  var searchValue = document.getElementById('search-field').value.toLowerCase().split(' ');
  mine.searches.push(searchValue);
  _.each(items, function(obj) {
    obj.relevance = 0;
    obj.mfg = 0;
  })
  for (var i = 0; i < searchValue.length; i++) {
    _.each(items, function(obj) {
      if (obj.manufacturer.toLowerCase() === searchValue[i] && obj.title.toLowerCase().match(searchValue[i]) && (category === "All" || obj.category === category)) {
        obj.mfg = searchValue.length / (i + 1);
      }
      if (obj.title.toLowerCase().match(searchValue[i]) && obj.manufacturer.toLowerCase() != searchValue[i] && (category === "All" || obj.category === category)) {
        obj.relevance += searchValue.length * searchValue.length / (i + 1);
      }
    })
  }
  foundItems = _.filter(items, function(obj) {
    return obj.relevance > 0;
  })
  if (foundItems.length === 0) {
    foundItems = _.filter(items, function(obj) {
      return obj.mfg > 0;
    })
  }
  foundItems = _.each(foundItems, function(obj) {
    obj.relevance += obj.mfg * searchValue.length;
  })
  foundItems = _.sortBy(foundItems, 'relevance');
  foundItems.reverse();
  var foundString = foundItems.length + ' results for "' + searchValue.join(' ') + '"';
  displayResultsRow(foundString);
  //Show results page and hide all other pages
  showElements('main-bar','results-summary','results-items','search-panel');
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
  var check = false;
  if (event.target.className.includes('cart-btn')) {
    var itemList = document.querySelectorAll('.cart-btn');
    for (var i = 0; i < itemList.length; i++) {
      if (event.target === itemList[i]) {
        addToCart(foundItems[i], 1);
        return;
      }
    }
  }
  else if (event.target.className.includes('wish-btn')) {
    itemList = document.querySelectorAll('.wish-btn');
    for (var i = 0; i < itemList.length; i++) {
      if (event.target === itemList[i]) {
        addWish(foundItems[i]);
        return;
      }
    }
  }
  var classFinder = event.target;
  while (!classFinder.className.includes('selector')) {
    classFinder = classFinder.parentElement;
  }
  var itemList = document.querySelectorAll('.selector');
  for (var j = 0; j < itemList.length; j++) {
    if (classFinder == itemList[j]) {
      document.getElementsByClassName('product-page')[0].setAttribute('data-item',j);
      mine.views.push({
        category: foundItems[j].category,
        manufacturer: foundItems[j].manufacturer
      });
      productPage(foundItems[j]);
      return;
    }
  }
});
//Create event listener that shows the product page from wishlist
document.getElementById('wish-list').addEventListener("click", function(event) {
  var check = false;
  if (event.target.className.includes('wl-cart-btn')) {
    var itemList = document.querySelectorAll('.wl-cart-btn');
    for (var i = 0; i < itemList.length; i++) {
      if (event.target === itemList[i]) {
        addToCart(wishlist[i].item, 1);
        return;
      }
    }
  }
  else if (event.target.className.includes('wl-remove-btn')) {
    itemList = document.querySelectorAll('.wl-remove-btn');
    for (var i = 0; i < itemList.length; i++) {
      if (event.target === itemList[i]) {
        wishlist.splice(i, 1);
        var parent = document.getElementsByClassName('wl-remove-btn')[i].parentElement.parentElement.parentElement.parentElement;
        parent.remove();
        return;
      }
    }
  }
  var classFinder = event.target;
  while (!classFinder.className.includes('wish')) {
    classFinder = classFinder.parentElement;
  }
  var itemList = document.querySelectorAll('.wish');
  for (var j = 0; j < itemList.length; j++) {
    if (classFinder == itemList[j]) {
      document.getElementsByClassName('product-page')[0].setAttribute('data-item',j);
      mine.views.push({
        category: wishlist[j].item.category,
        manufacturer: wishlist[j].item.manufacturer
      });
      productPage(wishlist[j].item);
      return;
    }
  }
});
//Function to create the product page
function productPage(object) {
  //Clearing previous product information
  if (document.getElementById('product-title').lastChild) {
    document.getElementById('product-title').lastChild.remove();
  }
  if (document.getElementById('stars').lastChild) {
    document.getElementById('stars').lastChild.remove();
  }
  if (document.getElementById('reviewers').lastChild) {
    document.getElementById('reviewers').lastChild.remove();
  }
  if (document.getElementById('product-price').lastChild) {
    document.getElementById('product-price').lastChild.remove();
  }
  while (document.getElementById('review-insert').lastChild) {
    document.getElementById('review-insert').lastChild.remove();
  }
  while (document.getElementById('features').lastChild) {
    document.getElementById('features').lastChild.remove();
  }
  //Adding image to product page
  document.getElementById('product-image').setAttribute('src',object.image.panel);
  //Adding title to product page
  var titleTextNode = document.createTextNode(object.title);
  document.getElementById('product-title').appendChild(titleTextNode);
  //Adding reviews
  var sum = 0;
  for (var k = 0; k < object.reviews.length; k++) {
    sum += object.reviews[k].stars;
  }
  var rating = sum / object.reviews.length;
  document.getElementById('stars').appendChild(createStars(rating));
  var reviewText = document.createTextNode("  " + object.reviews.length + " customer reviews");
  document.getElementById('reviewers').appendChild(reviewText);
  var review = document.getElementById('review-insert');
  for (var i = 0; i < object.reviews.length; i++) {
    var titleDiv = document.createElement('div');
    var title = document.createElement('span');
    var boldUser = document.createElement('b');
    var infoDiv = document.createElement('div');
    var info = document.createElement('span');
    var boldTitle = document.createElement('b');
    var reviewText = document.createElement('p');

    boldTitle.textContent = " " + object.reviews[i].title;
    boldUser.textContent = object.reviews[i].user;
    reviewText.textContent = object.reviews[i].review;

    review.appendChild(titleDiv);
    titleDiv.appendChild(createStars(object.reviews[i].stars));
    titleDiv.appendChild(title);
    title.appendChild(boldTitle);
    review.appendChild(infoDiv);
    infoDiv.appendChild(info);
    info.appendChild(document.createTextNode("By "));
    info.appendChild(boldUser);
    info.appendChild(document.createTextNode(" on " + createDateText(object.reviews[i].date)));
    infoDiv.appendChild(reviewText);
    review.appendChild(document.createElement('hr'));
  }
  //Function creating a date text
  function createDateText(date) {
    var arr = date.split(' ');
    return monthName(arr[0] - 1) + " " + arr[1] + ", " + arr[2];
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
  var currentQtyString = document.getElementById('cart-items').textContent.trim();
  var currentQty = Number(currentQtyString.slice(1, currentQtyString.length - 1));
  document.getElementById('cart-items').textContent = " (" + (currentQty + qty) + ")";
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].item === item) {
      cart[i].quantity += qty;
      return;
    }
  }
  cart.push({item: item, quantity: qty});
}
//Add to wishlist function
function addWish(item) {
  var check = false;
  for (var i = 0; i < wishlist.length; i++) {
    if (wishlist[i].item === item) {
      check = true;
    }
  }
  if (check === true) {
    vex.dialog.alert("This item is already in your wishlist: " + item.title);
  }
  if (check === false) {
    vex.dialog.alert("Added to wishlist: " + item.title);
    wishlist.push({item: item});
  }
}
//Event listener for add to cart button on the product page
document.getElementById('cart-box-btn').addEventListener("click", function(event) {
  var item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-item'));
  if (!item) {
    item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-id'));
    addToCart(items[item], Number(document.getElementsByClassName('qty')[0].value));
  }
  else {
    addToCart(foundItems[item], Number(document.getElementsByClassName('qty')[0].value));
  }
})
//Event listener for add to wishlist button on the product page
document.getElementById('wish-box-btn').addEventListener("click", function(event) {
  var item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-item'));
  if (!item) {
    item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-id'));
    addWish(items[item]);
  }
  else {
    addWish(foundItems[item]);
  }
})
//Event listener and creation of the shopping cart page
document.getElementsByClassName('cart-go')[0].addEventListener("click", function() {
  if (cart.length === 0) {
    vex.dialog.alert('Your cart is empty. Please add some items first.');
    return;
  }
  while (document.getElementById('insert').nextSibling) {
    document.getElementById('insert').nextSibling.remove();
  }
  var parent = document.getElementById('shop-items');
  totalItems = 0;
  totalPrice = 0;
  for (var i = 0; i < cart.length; i++) {
    totalItems += cart[i].quantity;
    totalPrice += cart[i].item.price * cart[i].quantity;
    parent.appendChild(createShoppingElement(cart[i].item,cart[i].quantity));
    parent.appendChild(document.createElement('hr'));
  }
  var subTotal = createElementWithClass('p','pull-right');
  subTotal.id = 'subtotal';
  parent.appendChild(subTotal);
  var subTotalText = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
  parent.lastChild.appendChild(document.createTextNode(subTotalText));
  document.getElementById('shop-box-text').textContent = subTotalText;
  document.getElementById('cart-items').textContent = " (" + totalItems + ")";
  showElements('main-bar','shop-page');
})
//Function to create shopping cart element
function createShoppingElement(obj, qty) {
  var row = createElementWithClass('div','row');
  var imageDiv = createElementWithClass('div','col-md-2');
  var image = createElementWithClass('img','img-responsive');
  var infoDiv = createElementWithClass('div','col-md-6');
  var title = createElementWithClass('h4','shop-title');
  var trash = createElementWithClass('button','btn btn-info delete');
  var icon = createElementWithClass('i','fa fa-trash fa-lg');
  var text = document.createTextNode('  Delete');
  var priceDiv = createElementWithClass('div','col-md-2');
  var price = createElementWithClass('h4','text-danger shop-price');
  var qtyDiv = createElementWithClass('div','col-md-2');
  var quantity = createElementWithClass('select','form-control form-inline shop-qty');

  image.setAttribute('src',obj.image.cart);
  trash.setAttribute('type','button');
  title.textContent = obj.title;
  price.textContent = '$' + obj.price.toFixed(2);

  row.appendChild(imageDiv);
  imageDiv.appendChild(image);
  row.appendChild(infoDiv);
  infoDiv.appendChild(title);
  infoDiv.appendChild(trash);
  trash.appendChild(icon);
  trash.appendChild(text);
  row.appendChild(priceDiv);
  priceDiv.appendChild(price);
  row.appendChild(qtyDiv);
  qtyDiv.appendChild(quantity);
  for (var i = 1; i <= 10; i++) {
    var option = document.createElement('option');
    quantity.appendChild(option);
    option.textContent = i;
    if (qty === i) {
      option.setAttribute('selected',true);
    }
  }
  return row;
}
//Event listener for deleting items from cart
document.getElementById('shop-items').addEventListener("click", function(event) {
  if (event.target.className.includes('delete')) {
    var length = document.getElementsByClassName('delete').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('delete')[i]) {
        totalItems -= cart[i].quantity;
        totalPrice -= cart[i].item.price * cart[i].quantity;
        document.getElementById('subtotal').textContent = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('shop-box-text').textContent = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('cart-items').textContent = " (" + totalItems + ")";
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
  if (event.target.className.includes('shop-qty') != -1) {
    var length = document.getElementsByClassName('shop-qty').length;
    for (var i = 0; i < length; i++) {
      if (event.target === document.getElementsByClassName('shop-qty')[i]) {
        var newQty = Number(document.getElementsByClassName('shop-qty')[i].value);
        totalItems += (newQty - cart[i].quantity);
        totalPrice += (newQty - cart[i].quantity) * cart[i].item.price;
        cart[i].quantity = newQty;
        document.getElementById('subtotal').textContent = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('shop-box-text').textContent = "Subtotal (" + totalItems + " items): $" + totalPrice.toFixed(2);
        document.getElementById('cart-items').textContent = " (" + totalItems + ")";
        return;
      }
    }
  }
})
//Event listener for the checkout button creating checkout page
document.getElementById('checkout').addEventListener("click", function(event) {
  if (cart.length === 0) {
    vex.dialog.alert('Your cart is empty. Please add some items first.');
    return;
  }
  while(document.getElementById('review-items').lastChild) {
    document.getElementById('review-items').lastChild.remove();
  }
  for (var i = 0; i < cart.length; i++) {
    var row = createElementWithClass('div','row');
    var imageDiv = createElementWithClass('div','col-md-2');
    var image = createElementWithClass('img','img-responsive');
    var infoDiv = createElementWithClass('div','col-md-10');
    var infoDiv = createElementWithClass('div','col-md-10');
    var title = document.createElement('h5');
    var price = createElementWithClass('h5','text-danger');
    var form = createElementWithClass('form','form-inline');
    var formDiv = createElementWithClass('div','form-group');
    var qty = createElementWithClass('select','form-control review-item-qty');
    var space = document.createElement('span');
    var trash = createElementWithClass('button','btn btn-info checkout-delete');
    var icon = createElementWithClass('i','fa fa-trash fa-lg');
    var text = document.createTextNode('  Delete');

    image.setAttribute('src',cart[i].item.image.cart);
    trash.setAttribute('type','button');
    title.textContent = cart[i].item.title;
    space.textContent = " ";
    price.textContent = "$" + cart[i].item.price.toFixed(2);

    row.appendChild(imageDiv);
    imageDiv.appendChild(image);
    row.appendChild(infoDiv);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(form);
    form.appendChild(formDiv);
    formDiv.appendChild(qty);
    formDiv.appendChild(space);
    formDiv.appendChild(trash);
    trash.appendChild(icon);
    trash.appendChild(text);

    for (var j = 1; j <= 10; j++) {
      var option = document.createElement('option');
      qty.appendChild(option);
      option.textContent = j;
      if (j === cart[i].quantity) {
        option.setAttribute('selected',true);
      }
    }

    document.getElementById('review-items').appendChild(row);
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
//Function for placing your order
function orderPage() {
  if (cart.length === 0) {
    vex.dialog.alert("Your shopping cart is empty. Please add some items first.");
    return;
  }
  if (document.getElementById('address-text').textContent === "Please enter your address") {
    vex.dialog.alert("Please enter your shipping address");
    return;
  }
  if (document.getElementById('payment-text').textContent === "Please enter payment method") {
    vex.dialog.alert("Please enter your payment method");
    return;
  }
  orders.push([]);
  for (var i = 0; i < cart.length; i++) {
    orders[orders.length - 1].push(cart[i]);
  }
  var orderDate = new Date();
  orders[orders.length - 1].push(monthName(orderDate.getMonth()) + ' ' + orderDate.getDate() + ', ' + orderDate.getFullYear());
  orders[orders.length - 1].push(document.getElementById('order-total').textContent);
  cart = [];
  document.getElementById('cart-items').textContent = " (0)";
  document.getElementById('charge-text').textContent = "We did not charge $" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2) + " to your credit card";
  var date = monthName(today.getMonth()) + ' ' + today.getDate() + ', ' + today.getFullYear();
  document.getElementById('delivery-order').textContent = "Your order will not be delivered on: " + date + " since we don't really sell anything"
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
  if (document.getElementById('pay-card').value === "" || document.getElementById('pay-card').value.length != 16) {
    warningNote('Please enter a valid card number','pay-card');
    return;
  }
  if (document.getElementById('pay-name').value === "") {
    warningNote('Please enter the name on the card','pay-name');
    return;
  }
  var element = document.getElementById('payment-text');
  element.lastChild.remove();
  var text = 'Card ending in ' + document.getElementById('pay-card').value.toString().substr(12, 4);
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
  document.getElementById('checkout-text').textContent = 'Checkout (' + totalItems + ' items)';
  document.getElementById('checkout-box-items').textContent = "Items (" + totalItems + "):";
  document.getElementById('checkout-price').textContent = "$" + totalPrice.toFixed(2);
  document.getElementById('shipping').textContent = "$" + shippingPrice.toFixed(2);
  document.getElementById('before-tax').textContent = "$" + (shippingPrice + totalPrice).toFixed(2);
  document.getElementById('tax').textContent = "$" + (totalPrice * taxRate).toFixed(2);
  document.getElementById('order-total').textContent = "$" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2);
  document.getElementById('order-total-bottom').textContent = "Order total: $" + (totalPrice * (1 + taxRate) + shippingPrice).toFixed(2);
  var date = monthName(today.getMonth()) + ' ' + today.getDate() + ', ' + today.getFullYear();
  document.getElementById('delivery-text').textContent = 'Estimated delivery: ' + date;
  document.getElementById('cart-items').textContent = " (" + totalItems + ")";
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
    var str = document.getElementById('results-text').textContent;
    clearOldResults();
    displayResultsGrid(str);
  }
});
document.getElementById('row-view').addEventListener("click", function(event) {
  if (document.getElementById('row-view').className.split(' ').indexOf('btn-default') != -1) {
    document.getElementById('row-view').className = 'btn btn-primary';
    document.getElementById('grid-view').className = 'btn btn-default';
    var str = document.getElementById('results-text').textContent;
    clearOldResults();
    displayResultsRow(str);
  }
});
//Adding event listener to sort search results
document.getElementById('results-sort').addEventListener("click", function() {
  var sort = event.target.textContent;
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
    var text = document.getElementById('results-text').textContent;
    clearOldResults();
    if (document.getElementById('grid-view').className === "btn btn-primary") {
      displayResultsGrid(text);
    }
    else {
      displayResultsRow(text);
    }
  }
});
//Function to create the full, half and empty stars based on provided rating
function createStars(rating) {
  var element = document.createElement('span');
  var counter = 0;
  for (var i = 0; i < Math.floor(rating); i++) {
    element.appendChild(createElementWithClass('i','fa fa-star fa-lg text-primary'));
    counter++;
  }
  if (rating % Math.floor(rating) != 0) {
    element.appendChild(createElementWithClass('i','fa fa-star-half-o fa-lg text-primary'));
    counter++;
  }
  for (var j = 0; j < 5 - counter; j++) {
    element.appendChild(createElementWithClass('i','fa fa-star-o fa-lg text-primary'));
  }
  return element;
}
//Event listener for write review button
document.getElementById('write-review').addEventListener("click", function() {
  document.getElementById('review-panel').className = "panel panel-default show";
});
//Event listener for review panel
var reviewPanel = document.getElementById('review-panel');
reviewPanel.addEventListener("click", function(event) {
  //Close button
  if (event.target.id === "review-close") {
    if (document.getElementById('warning-note')) {
      document.getElementById('warning-note').remove();
    }
    reviewPanel.getElementsByTagName('form')[0].reset();
    for (var i = 0; i < document.getElementsByClassName('star-rate').length; i++) {
      document.getElementsByClassName('star-rate')[i].className = "fa fa-star-o fa-3x text-primary star-rate";
    }
    document.getElementById('review-panel').className = "panel panel-default hide";
  }
  //Submit button
  if (event.target.id === "review-submit") {
    if (document.getElementById('warning-note')) {
      document.getElementById('warning-note').remove();
    }
    if (document.getElementsByClassName('star-rate')[0].className.includes('fa-star-o')) {
      warningNote("Please enter star rating",'review-stars');
      return;
    }
    if (document.getElementById('review-name').value === "") {
      warningNote("Please write your name",'review-name');
      return;
    }
    if (document.getElementById('review-title').value === "") {
      warningNote("Please write a review headline", 'review-title');
      return;
    }
    if (document.getElementById('review-text').value === "") {
      warningNote("Please write a review", 'review-text');
      return;
    }
    var rating = 0;
    for (var j = 0; j < document.querySelectorAll('.star-rate').length; j++) {
      if (!document.querySelectorAll('.star-rate')[j].className.includes('fa-star-o')) {
        rating += 1;
      }
    }
    var item = Number(document.getElementsByClassName('product-page')[0].getAttribute('data-item'));
    foundItems[item].reviews.push({
      stars: rating,
      title: document.getElementById('review-title').value,
      user: document.getElementById('review-name').value,
      date: (today.getMonth() + 1) + " " + today.getDate() + " " + today.getFullYear(),
      review: document.getElementById('review-text').value
    })
    document.getElementById('review-close').click();
    productPage(foundItems[item]);
  }
  if (event.target.className.includes('star-rate')) {
    var stars = document.querySelectorAll('.star-rate');
    var starFill = "fa fa-star fa-3x text-primary star-rate";
    for (var j = 0; j < stars.length; j++) {
      document.getElementsByClassName('star-rate')[j].className = starFill;
      if (event.target === document.getElementsByClassName('star-rate')[j]) {
        starFill = "fa fa-star-o fa-3x text-primary star-rate";
      }
    }
  }
});
//Event listener for showing past orders
document.getElementsByClassName("user-menu")[0].addEventListener("click", function(event) {
  if (event.target.textContent === "Your orders") {
    while (document.getElementById('orders-list').lastChild) {
      document.getElementById('orders-list').lastChild.remove();
    }
    var list = document.getElementById('orders-list');
    for (var i = 0; i < orders.length; i++) {
      var panel = createElementWithClass('div','panel panel-default');
      var heading = createElementWithClass('div','panel-heading');
      var date = document.createElement('span');
      var total = document.createElement('span');
      var body = createElementWithClass('div','panel-body');

      date.textContent = "Order placed: " + orders[i][orders[i].length - 2] + " | ";
      total.textContent = " Order total: " + orders[i][orders[i].length - 1];

      list.appendChild(panel);
      panel.appendChild(heading);
      heading.appendChild(date);
      heading.appendChild(total);
      panel.appendChild(body);

      for (var j = 0; j < orders[i].length - 2; j++) {
        var row = createElementWithClass('div','row');
        var imageDiv = createElementWithClass('div','col-md-3');
        var image = createElementWithClass('img','img-responsive');
        var infoDiv = createElementWithClass('div','col-md-9');
        var title = document.createElement('h4');
        var price = createElementWithClass('h4','text-danger');
        var qty = document.createElement('p');

        image.setAttribute('src', orders[i][j].item.image.cart);
        title.textContent = orders[i][j].item.title;
        price.textContent = "$" + orders[i][j].item.price.toFixed(2);
        qty.textContent = "Qty: " + orders[i][j].quantity;

        body.appendChild(row);
        row.appendChild(imageDiv);
        imageDiv.appendChild(image);
        row.appendChild(infoDiv);
        infoDiv.appendChild(title);
        infoDiv.appendChild(price);
        infoDiv.appendChild(qty);
      }
    }
    showElements('main-bar','past-orders');
  }
});
//Event listener for showing wishlist
document.getElementsByClassName("user-menu")[0].addEventListener("click", function(event) {
  if (event.target.textContent === "Wishlist") {
    while (document.getElementById('wish-list').lastChild) {
      document.getElementById('wish-list').lastChild.remove();
    }
    var list = document.getElementById('wish-list');
    for (var i = 0; i < wishlist.length; i++) {
      var sum = 0;
      for (var j = 0; j < wishlist[i].item.reviews.length; j++) {
        sum += wishlist[i].item.reviews[j].stars;
      }
      var panel = createElementWithClass('div','panel panel-default');
      var heading = createElementWithClass('div','panel-heading');
      var title = document.createElement('span');
      var body = createElementWithClass('div','panel-body');

      title.textContent = wishlist[i].item.title;

      list.appendChild(panel);
      panel.appendChild(heading);
      heading.appendChild(title);
      panel.appendChild(body);

      var rating = sum / wishlist[i].item.reviews.length;
      var row = createElementWithClass('div','row wish');
      var imageDiv = createElementWithClass('div','col-md-3');
      var image = createElementWithClass('img','img-responsive');
      var infoDiv = createElementWithClass('div','col-md-9');
      var title = document.createElement('h4');
      var stars = createElementWithClass('div','rating');
      var price = createElementWithClass('h4','text-danger');
      var cart = createElementWithClass('button','btn btn-success wl-cart-btn');
      var cartIcon = createElementWithClass('i','fa fa-cart-plus fa-lg');
      var cartText = document.createTextNode('  Add to Cart');
      var remove = createElementWithClass('button','btn btn-info wl-remove-btn');
      var removeIcon = createElementWithClass('i','fa fa-trash fa-lg');
      var removeText = document.createTextNode('  Remove');
      var spacing = document.createElement('p');

      image.setAttribute('src', wishlist[i].item.image.cart);
      title.textContent = wishlist[i].item.title;
      price.textContent = "$" + wishlist[i].item.price.toFixed(2);

      body.appendChild(row);
      row.appendChild(imageDiv);
      imageDiv.appendChild(image);
      row.appendChild(infoDiv);
      infoDiv.appendChild(title);
      infoDiv.appendChild(stars);
      stars.appendChild(createStars(rating));
      stars.appendChild(document.createTextNode("  " + wishlist[i].item.reviews.length + " customer reviews."));
      infoDiv.appendChild(price);
      infoDiv.appendChild(cart);
      infoDiv.appendChild(spacing);
      infoDiv.appendChild(remove);
      cart.appendChild(cartIcon);
      cart.appendChild(cartText);
      remove.appendChild(removeIcon);
      remove.appendChild(removeText);
    }
    showElements('main-bar','wishlist');
  }
});
//Event listener for main page button
document.getElementById('home').addEventListener("click", function() {
  calculateRecommendations();
  today = new Date();
  showElements('main-bar','main-screen','recommended','search-panel');
});
//Event listener to logo click
document.getElementById('logo').addEventListener("click", function() {
  calculateRecommendations();
  showElements('main-bar','main-screen','recommended','search-panel');
});
//Event lsiteners for back buttons on product, cart, checkout and orders pages
document.getElementById('product-back').addEventListener("click", function() {
  showElements('main-bar','results-summary','results-items','search-panel');
});

document.getElementById('cart-back').addEventListener("click", function() {
  showElements('main-bar','results-summary','results-items','search-panel');
});

document.getElementById('checkout-back').addEventListener("click", function() {
  if (cart.length != 0) {
    document.getElementsByClassName('cart-go')[0].click();
  }
  else {
    vex.dialog.alert("Your cart is empty. You will be redirected to search results page.");
    showElements('main-bar','results-summary','results-items','search-panel');
  }
});

document.getElementById('orders-back').addEventListener("click", function() {
  showElements('main-bar','main-screen','search-panel','recommended');
});

document.getElementById('wish-back').addEventListener("click", function() {
  showElements('main-bar','main-screen','search-panel','recommended');
});
//Function that calculates recommended items for display
function calculateRecommendations() {
  var fullMatch = [];
  var catMatch = [];
  var mfgMatch = [];
  var searchMatch = [];
  var recommend = [];

  var searched = _.chain(mine.searches).flatten()
    .reduce(function(counts, word) {
       counts[word] = (counts[word] || 0) + 1;
       return counts; }, {})
    .pairs().sortBy('1').value().reverse();

  for (var j = 0; j < mine.views.length; j++) {
    for (var i = 0; i < items.length; i++) {
      if (mine.views[j].category === items[i].category && mine.views[j].manufacturer === items[i].manufacturer) {
        fullMatch.push(i);
      }
      else if (mine.views[j].category === items[i].category) {
        catMatch.push(i);
      }
      else if (mine.views[j].manufacturer === items[i].manufacturer) {
        mfgMatch.push(i);
      }
    }
  }

  for (var j = 0; j < searched.length; j++) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].title.toLowerCase().includes(searched[j][0].toLowerCase())) {
        searchMatch.push(i);
      }
    }
  }

  var recommend = _.union(recommend, fullMatch);
  if (recommend.length < 12) {
    recommend = _.union(recommend, catMatch);
  }
  if (recommend.length < 12) {
    recommend = _.union(recommend, searchMatch);
  }
  if (recommend.length < 12) {
    recommend = _.union(recommend, mfgMatch);
  }
  if (recommend.length < 12) {
    recommend = _.union(recommend, [0,1,2,3,4,5,6,7,8,9,10,11]);
  }
  var classList = document.querySelectorAll('.recommend');
  for (var i = 0; i < classList.length; i++) {
    document.getElementsByClassName('recommend')[i].setAttribute('src', items[recommend[i]].image.panel);
    document.getElementsByClassName('recommend')[i].setAttribute('data-id', recommend[i]);
  }
}
//Event listener for recommended items to display the product page
document.getElementsByClassName('recommended')[0].addEventListener("click", function(event) {
  var item = Number(event.target.getAttribute('data-id'));
  document.getElementsByClassName('product-page')[0].setAttribute('data-item',false);
  document.getElementsByClassName('product-page')[0].setAttribute('data-id',item);
  productPage(items[item]);
})
//Event listener for front page items to display the product page
document.getElementById('random-items').addEventListener("click", function(event) {
  var item = Number(event.target.getAttribute('data-id'));
  document.getElementsByClassName('product-page')[0].setAttribute('data-item',false);
  document.getElementsByClassName('product-page')[0].setAttribute('data-id',item);
  productPage(items[item]);
})
