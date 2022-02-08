const title = document.getElementById('title');
const author = document.getElementById('author');
const showBooks = document.getElementById('show-books');
const submitBtn = document.getElementById('addBtn');
let books = [];

function display() {
  document.querySelector('#show-books').innerHTML = '';
  books.forEach((book) => {
    showBooks.innerHTML += `
        <h3>${book.title}</h3>
        <h3>${book.author}</h3>
        <button id=${book.id} onClick=removeBook(id) type="submit">Remove</button>
        <hr>
        `;
  });
  title.value = '';
  author.value = '';
}

function addNewBook() {
  if (title.value.length > 0 && author.value.length > 0) {
    books.push({
      title: title.value,
      author: author.value,
      id: books.length,
    });
    display();
    addLocalStorage();
  }
}
function removeBook(id) {
  books = books.filter((e) => e.id != id);
  display();
  addLocalStorage();
}

submitBtn.addEventListener('click', addNewBook);
function addLocalStorage() {
  const addStorage = JSON.stringify(books);
  localStorage.setItem('form', addStorage);
}
if (localStorage.getItem('form') != null) {
  const getForm = localStorage.getItem('form');
  books = JSON.parse(getForm);
  display();
}