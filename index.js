// grabbing the DOM elements from HTML and setting to global variables
var bookmarkForm = document.querySelector('#bookmark-form');
var titleInput = document.querySelector('#title-input');
var urlInput = document.querySelector('#url-input');
var bookmarkSubmit = document.querySelector('#bookmark-submit');
var bookmarkDisplay = document.querySelector('#bookmark-display');

// declaring the bookmarksArray and setting it to an empty array
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
  // 4. adds the bookmarkDiv as a child to bookmarkDisplay, set innerHTML
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
  // 1. target the correct html element
  if (
    // 2. target the html element with the class of 'read-button'
    e.target.attributes.class &&
    e.target.attributes.class.nodeValue === 'read-button'
  ) {
    // 3. setting the bookmark outer div to bookmarkElement
    var bookmarkElement = e.target.parentNode.parentNode;
    // 4. grabbing the Index from the outer div's data-index attribute
    var bookmarkIndex = bookmarkElement.dataset.index;
    // 5. toggling the read property on the object in the bookmarks array
    bookmarksArray[bookmarkIndex].read = !bookmarksArray[bookmarkIndex].read;
    // 6. re rendering the bookmarks
    displayBookmarks();
  }
}

function removeBookmark(e) {
  // 1. target the correct html element
  if (
    // 2. target the html element with the class of 'delete-button'
    e.target.attributes.class &&
    e.target.attributes.class.nodeValue === 'delete-button'
  ) {
    // 3. target the delete button on the boomark
    var bookmarkElement = e.target.parentNode.parentNode;
    var bookmarkIndex = bookmarkElement.dataset.index;
    // 4. when delete button is pressed removes bookmark from the array
    bookmarksArray.splice(bookmarkIndex, 1);
    // 5. displays bookmarks without the deleted bookmark
    displayBookmarks();
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
