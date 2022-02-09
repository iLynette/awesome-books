const addBtn = document.querySelector('#addBtn');
const form = document.querySelector('form');

class Book {
  constructor(title = null, author = null) {
    this.title = title;
    this.author = author;
  }
}

class bookList {
    list = []; 

    addBook() {
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        if (title !== '' && author !== '') {
            const book = new Book(title, author);
            this.list.push(book);
            localStorage.setItem('Books', JSON.stringify(this.list));
            this.list = JSON.parse(localStorage.getItem('Books'));
            this.render();
        }
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
    }

    render() {
        if (JSON.parse(localStorage.getItem('Books')) != null) {
            this.list = JSON.parse(localStorage.getItem('Books'));
            document.getElementById('showBooks').innerHTML = '';
            this.list.forEach((book, index) => {
                document.getElementById('showBooks').innerHTML += `
                <div class="books">
                    <div class="d-flex">
                        <p class="title"><b>"${book.title}" &nbsp by ${book.author}</b></p>
                        <button class="removeBtn" onClick = 'books.remove(${index})'><b>Remove</b></button>
                    </div>
                    <hr>
                </div> `
            });
        } else {
            document.getElementById('showBooks').innerHTML = '';
        }
    }

}

const books = new bookList();
books.render();
document.getElementById('addBtn').addEventListener('click', () => {
    books.addBook();
})