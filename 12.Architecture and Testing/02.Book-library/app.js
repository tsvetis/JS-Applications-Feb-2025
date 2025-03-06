const loadBtnRef = document.getElementById("loadBooks");
const tableRef = document.querySelector("tbody");
const formRef = document.querySelector("form");
const url = "http://localhost:3030/jsonstore/collections/books";

loadBtnRef.addEventListener("click", loadBooks);
formRef.addEventListener("submit", onSubmit);

let currentEditId = null;

async function loadBooks() {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }
    const data = await res.json();
    tableRef.innerHTML = "";
    Object.entries(data).forEach(([id, book]) => {
      const row = createRow(book, id);
      tableRef.appendChild(row);
    });
  } catch (error) {
    alert(error.message);
  }
}

function onSubmit(event) {
  event.preventDefault();
  const formData = new FormData(formRef);
  const title = formData.get("title").trim();
  const author = formData.get("author").trim();

  if (!title || !author) {
    alert("Both title and author are required");
    return;
  }

  if (currentEditId) {
    updateBook(currentEditId, { title, author });
  } else {
    addBook({ title, author });
  }
}

async function addBook(book) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) {
      throw new Error("Failed to add book");
    }
    await loadBooks();
    formRef.reset();
  } catch (error) {
    alert(error.message);
  }
}

async function updateBook(id, book) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    if (!res.ok) {
      throw new Error("Failed to update book");
    }
    await loadBooks();
    formRef.reset();
    currentEditId = null;
    formRef.querySelector("button[type='submit']").textContent = "Submit";
  } catch (error) {
    alert(error.message);
  }
}

function createRow(book, id) {
  const tr = document.createElement("tr");

  const titleTd = document.createElement("td");
  titleTd.textContent = book.title;
  tr.appendChild(titleTd);

  const authorTd = document.createElement("td");
  authorTd.textContent = book.author;
  tr.appendChild(authorTd);

  const actionsTd = document.createElement("td");
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => startEdit(id, book));
  actionsTd.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => deleteBook(id));
  actionsTd.appendChild(deleteBtn);

  tr.appendChild(actionsTd);

  return tr;
}

function startEdit(id, book) {
  currentEditId = id;
  formRef.querySelector("input[name='title']").value = book.title;
  formRef.querySelector("input[name='author']").value = book.author;
  formRef.querySelector("button[type='submit']").textContent = "Save";
}

async function deleteBook(id) {
  try {
    const res = await fetch(`${url}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Failed to delete book");
    }
    await loadBooks();
  } catch (error) {
    alert(error.message);
  }
}
