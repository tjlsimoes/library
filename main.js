const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.info = getInfo(title, author, pages, read)

	function getInfo(title, author, pages, read) {
		info =`${title} by ${author}, ${pages} pages, `;
		if (read == true) {
			info += 'read';
		} else {
			info += 'not read yet';
		}
		return info;
	}
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary(theHobbit);
annaKarenina = new Book('Anna Karenina', 'Tolstoy', 799, false);
addBookToLibrary(annaKarenina);

function displayLibrary(myLibrary) {
  let table = document.getElementById("myLibrary");

  myLibrary.forEach(book => {
    let row = table.insertRow(-1);

    let c0 = row.insertCell(0);
    let c1 = row.insertCell(1);
    let c2 = row.insertCell(2);
    let c3 = row.insertCell(3);

    c0.innerText = book.title
    c1.innerText = book.author
    c2.innerText = book.pages
    c3.innerText = book.read
  });
}

displayLibrary(myLibrary);



const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

