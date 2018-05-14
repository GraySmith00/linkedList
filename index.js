var bookmarkForm = document.querySelector('#bookmark-form');
var titleInput = document.querySelector('#title-input');
var urlInput = document.querySelector('#url-input');
var bookmarkSubmit = document.querySelector('#bookmark-submit');
var bookmarkDisplay = document.querySelector('#bookmark-display');

var bookmarksArray = [];

// bookmakr constructor function (blueprint for creating bookmarks)
function Bookmark(title, url) {
  this.title = title;
  this.url = url;
  this.read = false;
}

bookmarkForm.addEventListener('submit', function(e) {
  // 1. prevent submit default page refresh
  e.preventDefault();
  // 2. call createBookmark funciton and pass in user input
  createBookmark(titleInput.value, urlInput.value);
  // 3. re render bookmarks display by calling displayBookmarks function
  displayBookmarks();
  // 4. clear the bookmark form
  bookmarkForm.reset();
});

bookmarkDisplay.addEventListener('click', function(e) {
  // 1. call the toggleRead function when read button is pressed
  toggleRead(e);
  // 2. call removeBookmark function when delete button is pressed
  removeBookmark(e);
});

function createBookmark(title, url) {
  // 1. create new bookmark object from constructor function
  var bookmarkObject = new Bookmark(title, url);
  // 2. push new bookmark object into bookmarks array
  bookmarksArray.push(bookmarkObject);
}

function displayBookmarks() {
  // 1. clear display html before rerendering
  bookmarkDisplay.innerHTML = '';

  // 2. loop through the bookmarks array
  if (bookmarksArray.length > 0) {
    for (var i = 0; i < bookmarksArray.length; i++) {
      // 3. call displaySingleBookmark function for each item in bookmarksArray, pass in the index
      displaySingleBookmark(i);
    }
  }
}
// call displayBookmarks function on page load
displayBookmarks();

function displaySingleBookmark(i) {
  // 1. create bookmark div so we can use it for innerHTML
  var bookmarkDiv = document.createElement('div');
  // 2. adding the data-index=i attribute to the div, so we know which bookmark is which
  bookmarkDiv.setAttribute('data-index', i);
  // 3. if read property on bookmark object is set to true, add the class of read to the bookmark div
  if (bookmarksArray[i].read) {
    bookmarkDiv.setAttribute('class', 'read');
  }
  // 4. adds the bookmarkDiv as a child to bookmarkDisplay,
  bookmarkDisplay.appendChild(bookmarkDiv).innerHTML = `
      <h2>${bookmarksArray[i].title}</h2>
      <p>${bookmarksArray[i].url}</p>
      <div>
        <p class="read-button">Read</p>
        <p class="delete-button">Delete</p>
      </div>
    `;
}

function toggleRead(e) {
  if (
    e.target.attributes.class &&
    e.target.attributes.class.nodeValue === 'read-button'
  ) {
    var bookmarkElement = e.target.parentNode.parentNode;
    var bookmarkIndex = bookmarkElement.dataset.index;
    bookmarksArray[bookmarkIndex].read = !bookmarksArray[bookmarkIndex].read;
    displayBookmarks();
  }
}

function removeBookmark(e) {
  if (
    e.target.attributes.class &&
    e.target.attributes.class.nodeValue === 'delete-button'
  ) {
    // 1. target the delete button on the boomark
    var bookmarkElement = e.target.parentNode.parentNode;
    var bookmarkIndex = bookmarkElement.dataset.index;
    // 2. when delete button is pressed removes bookmark from the array
    bookmarksArray.splice(bookmarkIndex, 1);
    // 3. displays bookmarks without the deleted bookmark
    displayBookmarks();
  }
}
