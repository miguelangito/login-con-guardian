//Selectores
const formAuthor = document.getElementById("formAuthor");
const nameAuthor = document.getElementById("name");
const ageAuthor = document.getElementById("age");
const formBooks = document.getElementById("formBooks");
const nameBook = document.getElementById("nameBook");
const dateBook = document.getElementById("dateBook");
const authorBook = document.getElementById("authorBook");
const listBooks = document.querySelector("#listBooks")


const URLAuthors = "http://localhost:3000/authors";
const URLBooks = "http://localhost:3000/books";
//Eventos

document.addEventListener("DOMContentLoaded", () => {
  loadSelectAuthor();
  getBooks();
});

formAuthor.addEventListener("submit", (event) => {
  event.preventDefault();

  createAuthor();
});

formBooks.addEventListener("submit", (event) => {
  event.preventDefault();

  createBook();
});

async function getBooks() {
  const response = await fetch(`${URLBooks}?_embed=author`)
  const data = await response.json()

  data.forEach(books => {
    listBooks.innerHTML += `<li>
    Name: ${books.name}
    date: ${books.date}
    author: ${books.author.name}
    </li>` 
      
  })
  console.log(data);
}

function createBook() {
  console.log("object");
  const newBook = {
    name: nameBook.value,
    date: dateBook.value,
    authorId: authorBook.value,
  };

  fetch(URLBooks, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });
}

async function loadSelectAuthor() {
  //1.Obtener todos los autores -> GET
  //2.Recorrer la lista de autores y por cada autor crear una etiqueta option, llenar el value y el titulo y agregarlo dentro del select
  const response = await fetch(URLAuthors);
  const data = await response.json();
  data.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = element.name;
    authorBook.appendChild(option);
  });
}

function createAuthor() {
  fetch(URLAuthors, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameAuthor.value,
      age: ageAuthor.value
    }),
  });
}
