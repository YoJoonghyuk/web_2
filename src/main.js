const bookListElement = document.getElementById('book-list');
const bookDetailsElement = document.getElementById('book-details');
const searchInputElement = document.getElementById('search-input');
const searchButtonElement = document.getElementById('search-button');

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

async function fetchBookList(query) {
  try {
    const response = await fetch(`${API_URL}?q=${query}`);
    const bookData = await response.json();
    if (bookData.items) {
      displayBookList(bookData.items);
    } else {
      bookListElement.innerHTML = '<p>No books found.</p>';
      bookDetailsElement.innerHTML = '';
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    bookListElement.innerHTML = '<p>Error loading books.</p>';
  }
}

function displayBookList(bookList) {
  bookListElement.innerHTML = ''; 
  bookList.forEach(book => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = book.volumeInfo.title;
    link.addEventListener('click', () => fetchBookDetails(book.id));

    const listItem = document.createElement('div');
    listItem.appendChild(link);
    bookListElement.appendChild(listItem);
  });
}

async function fetchBookDetails(bookId) {
  try {
    const response = await fetch(`${API_URL}/${bookId}`);
    const bookDetails = await response.json();
    displayBookDetails(bookDetails);
  } catch (error) {
    console.error('Error fetching book details:', error);
    bookDetailsElement.innerHTML = '<p>Error loading book details.</p>';
  }
}

function displayBookDetails(bookDetails) {
  const volumeInfo = bookDetails.volumeInfo;
  bookDetailsElement.innerHTML = `
    <h2>${volumeInfo.title}</h2>
    <p>Author: ${volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</p>
    <p>Publisher: ${volumeInfo.publisher || 'Unknown'}</p>
    <p>Description: ${volumeInfo.description || 'No description available.'}</p>
    <img src="${volumeInfo.imageLinks?.thumbnail || 'placeholder.png'}" alt="Book Cover">
  `;
}


searchButtonElement.addEventListener('click', () => {
  const searchQuery = searchInputElement.value;
  if (searchQuery) {
    fetchBookList(searchQuery);
  }
});


fetchBookList("javascript");
