//Creating a category variable, defaults to "All".
var category = document.getElementById('category').innerText.trim();
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
  rowElement.appendChild(createElementWithClass('div','col-md-8'));
  //Adding item title
  rowElement.lastChild.appendChild(createElementWithClass('a','item-title'));
  var text = document.createTextNode(object.title);
  rowElement.lastChild.lastChild.appendChild(text);
  //Adding item price
  rowElement.lastChild.appendChild(createElementWithClass('p','item-price'));
  var price = document.createTextNode('$' + object.price);
  rowElement.lastChild.lastChild.appendChild(price);
  //Adding "Add to Cart" button
  rowElement.lastChild.appendChild(createElementWithClass('button','cart-btn'));
  var cartText = document.createTextNode('Add to Cart');
  rowElement.lastChild.lastChild.appendChild(cartText);
  rowElement.lastChild.lastChild.setAttribute('type','button');
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
