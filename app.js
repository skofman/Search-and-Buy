var category = document.getElementById('category').innerText.trim();

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
