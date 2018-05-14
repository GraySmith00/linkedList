var bookmarkForm = document.querySelector("#bookmark-form");
var titleInput = document.querySelector("#title-input");
var urlInput = document.querySelector("#url-input");
var bookmarkSubmit = document.querySelector("#bookmark-submit");
var bookmarkDisplayContainer = document.querySelector(
  "bookmark-display-container"
);
var bookmarkDisplay = document.querySelector("#bookmark-display");

var bookmarksArray = [];

function Bookmark(title, url) {
  this.title = title;
  this.url = url;
  this.read = false;
}

bookmarkForm.addEventListener("submit", function(e) {
  e.preventDefault();
  createBookmark(titleInput.value, urlInput.value);
  displayBookmarks();
  bookmarkForm.reset();
});

function createBookmark(title, url) {
  var bookmarkObject = new Bookmark(title, url);
  bookmarksArray.push(bookmarkObject);
}

function displayBookmarks() {
  bookmarkDisplay.innerHTML = "";
  if (bookmarksArray.length > 0) {
    for (var i = 0; i < bookmarksArray.length; i++) {
      displaySingleBookmark(i);
    }
  }
}
displayBookmarks();

function displaySingleBookmark(i) {
  var bookmarkDiv = document.createElement("div");
  bookmarkDisplay.appendChild(bookmarkDiv).innerHTML = `
      <h2>${bookmarksArray[i].title}</h2>
      <p>${bookmarksArray[i].url}</p>
      <div>
        <p>Read</p>
        <p>Delete</p>
      </div>
    `;
}
