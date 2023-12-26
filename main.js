// Set up with regard to:
// https://github.com/BradyBorker/Odin-JavaScript/blob/main/Library/library.js

const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = (read == 'read') ? 'Yes' : 'No';
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayLibrary();
}

function removeBookFromLibrary(index) {
	myLibrary.splice(index, 1);
  displayLibrary();
}

function displayLibrary() {
  const tableBody = document.querySelector('tbody');
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild)
  }

  let bookNumber = 0;
  for (let book of myLibrary) {
    const tr = document.createElement('tr');
    tableBody.appendChild(tr);

    for (let property of Object.keys(book)) {
      let td = document.createElement('td');
      let tdText = document.createTextNode(book[property]);

      td.appendChild(tdText);
      tr.appendChild(td);

      addEditReadStatusListener(property, book, td);
    }
    addBookRemovalListener(tr, bookNumber);
    bookNumber++;
  }
}

theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'Yes');
addBookToLibrary(theHobbit);
annaKarenina = new Book('Anna Karenina', 'Tolstoy', 799, 'No');
addBookToLibrary(annaKarenina);
displayLibrary();

function addEditReadStatusListener(property, book, td) {
  if (property === 'read') {
    td.addEventListener('click', (e) => {
      if (book.read === 'No') {
        book[property] = 'Yes';
        td.textContent = 'Yes';
      } else if (book.read === 'Yes') {
        book[property] = 'No';
        td.textContent = 'No';
      }
    })
  }
}

function addBookRemovalListener(tr, bookNumber) {
  let td = document.createElement('td');
  td.id = bookNumber;
  td.appendChild(document.createTextNode('X'));
  td.addEventListener('click', (e) => {
    removeBookFromLibrary(e.target.id);
  })
  tr.appendChild(td);
}

function allInputsFilled(author, title, pages) {
  if (author === '' || title === '' || pages === '') {
    alert('All inputs need to be filled');
    return false;
  }
  return true;
}

function dropModal(title, author, pages, modal, library) {
  author.value = '';
  title.value = '';
  pages.value = '';
  modal.classList.remove('show');
  library.classList.remove('hide');
}

const modal = document.querySelector('.modal');
const button = document.querySelector('.add-book');
const library = document.querySelector('.library-container');

button.addEventListener('click', (e) => {
  modal.classList.add('show');
  library.classList.add('hide');
});

const form = document.getElementById('add-book-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let author = document.querySelector('#author');
  let title = document.querySelector('#title');
  let pages = document.querySelector('#page-count');
  let read = document.querySelector('input[name=has-read]:checked');

  if (e.submitter.id ==='add' && allInputsFilled(title.value, author.value, pages.value)) {
    addBookToLibrary(new Book(title.value, author.value, pages.value, read.id));
    dropModal(title, author, pages, modal, library);
  } else if (e.submitter.id === 'discard') {
    dropModal(title, author, pages, modal, library);
  }
});
