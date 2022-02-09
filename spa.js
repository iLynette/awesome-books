const listNav = document.querySelector('.list-nav');
const addBooksNav = document.querySelector('.books-nav');
const contactNav = document.querySelector('.contact-nav');

const addBook = document.querySelector('.add-books');
const showContact = document.querySelector('.contact');
const showBookList = document.querySelector('.book-list');

addBook.style.display = 'none';
showContact.style.display = 'none';

function bookList() {
  console.log('list');
  showBookList.style.display = 'block';
  addBook.style.display = 'none';
  showContact.style.display = 'none';
}

listNav.addEventListener('click', bookList);

function addBookForm() {
  console.log('form');
  addBook.style.display = 'flex';
  showBookList.style.display = 'none';
  showContact.style.display = 'none';
}

addBooksNav.addEventListener('click', addBookForm);

function contact() {
  console.log('contact');
  showContact.style.display = 'block';
  addBook.style.display = 'none';
  showBookList.style.display = 'none';
}

contactNav.addEventListener('click', contact);
