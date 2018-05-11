var bookmarkForm = document.querySelector("#bookmark-form");
var titleInput = document.querySelector("#title-input");
var urlInput = document.querySelector("#url-input");
var bookmarkSubmit = document.querySelector("#bookmark-submit");
var bookmarkDisplayContainer = document.querySelector(
  "bookmark-display-container"
);
var bookmarkDisplay = document.querySelector("#bookmark-display");

var bookmarksArray = [];

bookmarkSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  createBookmark();
  displayBookmarks();
  bookmarkForm.reset();
});

function createBookmark() {
  var bookmarkObject = {
    title: titleInput.value,
    url: urlInput.value
  };
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
