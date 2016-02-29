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
