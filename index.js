var bookmarkForm = document.querySelector('#bookmark-form');
var titleInput = document.querySelector('#title-input');
var urlInput = document.querySelector('#url-input');
var bookmarkSubmit = document.querySelector('#bookmark-submit');
var bookmarkDisplay = document.querySelector('#bookmark-display');
var bookmarkCounterSection = document.querySelector(
  '#bookmark-counter-section'
);
var totalBookmarkCounter = document.querySelector('#total-bookmark-counter');
var readBookmarkCounter = document.querySelector('#read-bookmark-counter');
var unreadBookmarkCounter = document.querySelector('#unread-bookmark-counter');
var clearReadBookmarksButton = document.querySelector('#clear-read-bookmarks');

var bookmarksArray = [];

function Bookmark(title, url) {
  this.title = title;
  this.url = url;
  this.read = false;
}

bookmarkForm.addEventListener('submit', function(e) {
  e.preventDefault();
  createBookmark(titleInput.value, urlInput.value);
  displayBookmarks();
  bookmarkForm.reset();
  bookmarkCounter();
  readBookmarksCounter();
  unreadBookmarksCounter();
  displayClearBookmarksButton();
});

clearReadBookmarksButton.addEventListener('click', clearReadBookmarks);

bookmarkDisplay.addEventListener('click', function(e) {
  toggleRead(e);
  removeBookmark(e);
});

titleInput.addEventListener('keyup', function() {
  isInputPopulated();
});
urlInput.addEventListener('keyup', function() {
  isInputPopulated();
});

function createBookmark(title, url) {
  if (title.length === 0 || url.length === 0) {
    alert('Ooooops!!! Looks like you left out an input!');
    return;
  }
  var bookmarkObject = new Bookmark(title, url);
  bookmarksArray.push(bookmarkObject);
}

function displayBookmarks() {
  bookmarkDisplay.innerHTML = '';

  if (bookmarksArray.length > 0) {
    for (var i = 0; i < bookmarksArray.length; i++) {
      displaySingleBookmark(i);
    }
  }
}
displayBookmarks();

function displaySingleBookmark(i) {
  var bookmarkDiv = document.createElement('div');
  bookmarkDiv.setAttribute('data-index', i);
  bookmarkDiv.setAttribute('class', 'bookmark-element');
  if (bookmarksArray[i].read) {
    bookmarkDiv.setAttribute('class', 'bookmark-element read');
  }
  bookmarkDisplay.appendChild(bookmarkDiv).innerHTML = `
      <h2>${bookmarksArray[i].title}</h2>
      <p><a href="${bookmarksArray[i].url}" target="_blank">${
    bookmarksArray[i].url
  }</a></p>
      <div>
        <span class="read-button">Read</span>
        <span class="delete-button">Delete</span>
      </div>
    `;
}

function toggleRead(e) {
  if (e.target.className && e.target.className === 'read-button') {
    var bookmarkElement = e.target.parentNode.parentNode;
    var bookmarkIndex = bookmarkElement.dataset.index;
    bookmarksArray[bookmarkIndex].read = !bookmarksArray[bookmarkIndex].read;
    displayBookmarks();
    readBookmarksCounter();
    unreadBookmarksCounter();
  }
}

function removeBookmark(e) {
  if (e.target.className && e.target.className === 'delete-button') {
    var confirmResponse = confirm('Are you sure you want to delete this item?');
    if (confirmResponse) {
      var bookmarkElement = e.target.parentNode.parentNode;
      var bookmarkIndex = bookmarkElement.dataset.index;

      bookmarksArray.splice(bookmarkIndex, 1);

      displayBookmarks();
      bookmarkCounter();
      readBookmarksCounter();
      unreadBookmarksCounter();
      displayClearBookmarksButton();
    }
  }
}

function isInputPopulated() {
  if (titleInput.value && urlInput.value) {
    bookmarkSubmit.disabled = false;
  } else {
    bookmarkSubmit.disabled = true;
  }
}
isInputPopulated();

function bookmarkCounter() {
  if (bookmarksArray.length > 0) {
    totalBookmarkCounter.innerHTML = `Total Bookmarks: ${
      bookmarksArray.length
    }`;
  } else {
    totalBookmarkCounter.innerHTML = '';
  }
}
bookmarkCounter();

function readBookmarksCounter() {
  var readBookmarks = 0;
  for (var i = 0; i < bookmarksArray.length; i++) {
    if (bookmarksArray[i].read === true) {
      readBookmarks++;
    }
  }
  if (bookmarksArray.length > 0) {
    readBookmarkCounter.innerHTML = `Read Bookmarks: ${readBookmarks}`;
  } else {
    readBookmarkCounter.innerHTML = '';
  }
}

function unreadBookmarksCounter() {
  var unreadBookmarks = 0;
  for (var i = 0; i < bookmarksArray.length; i++) {
    if (bookmarksArray[i].read === false) {
      unreadBookmarks++;
    }
  }
  if (bookmarksArray.length > 0) {
    unreadBookmarkCounter.innerHTML = `Unread Bookmarks: ${unreadBookmarks}`;
  } else {
    unreadBookmarkCounter.innerHTML = '';
  }
}

function clearReadBookmarks() {
  for (var i = 0; i < bookmarksArray.length; i++) {
    if (bookmarksArray[i].read === true) {
      bookmarksArray.splice(i, 1);
      clearReadBookmarks();
    }
  }

  displayBookmarks();
  bookmarkCounter();
  readBookmarksCounter();
  unreadBookmarksCounter();
}

function displayClearBookmarksButton() {
  if (bookmarksArray.length === 0) {
    clearReadBookmarksButton.classList.add('display-none');
  } else {
    clearReadBookmarksButton.classList.remove('display-none');
  }
}
displayClearBookmarksButton();
