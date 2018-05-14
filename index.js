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

bookmarkSubmit.addEventListener("click", function(e) {
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
  if (bookmarksArray.length > 0) {
    var bookmarkDiv = document.createElement("div");
    bookmarkDisplay.appendChild(bookmarkDiv).innerHTML = `
      <h2>${bookmarksArray[bookmarksArray.length - 1].title}</h2>
      <p>${bookmarksArray[bookmarksArray.length - 1].url}</p>
      <div>
        <p>Read</p>
        <p>Delete</p>
      </div>
    `;
  }
}
displayBookmarks();

function displaySingleBookmark() {}
