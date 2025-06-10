// ==========================
// Inisialisasi dan Data
// ==========================

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let selectedColor = "#f1f1f1"; // Warna default background

// ==========================
// Fungsi Penyimpanan
// ==========================

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// ==========================
// Utilitas
// ==========================

function isDarkColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance < 128; // True jika warna gelap
}

// ==========================
// Fungsi Color Picker
// ==========================

function openColorPicker() {
  document.getElementById("colorPicker").click();
}

function setSelectedColor(color) {
  selectedColor = color;
}

// ==========================
// Fungsi Tambah Catatan
// ==========================

function addNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const body = document.getElementById("noteBody").value.trim();
  const color = selectedColor || "#f0f0f0";

  if (title && body) {
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];

    existingNotes.push({
      title,
      body,
      timestamp: new Date().toLocaleString(),
      color,
    });

    localStorage.setItem("notes", JSON.stringify(existingNotes));
    window.location.href = "index.html";
  }
}

// ==========================
// Fungsi Edit Catatan
// ==========================

function saveEditedNote() {
  const title = document.getElementById("noteTitle").value.trim();
  const body = document.getElementById("noteBody").value.trim();
  const index = localStorage.getItem("editIndex");

  if (!title || !body) {
    alert("Form tidak boleh kosong.");
    return;
  }

  notes[index] = {
    title,
    body,
    timestamp: new Date().toLocaleString(),
    color: selectedColor,
  };

  saveNotes();
  localStorage.removeItem("editIndex");
  window.location.href = "index.html";
}

// ==========================
// Fungsi Edit Catatan
// ==========================

function editNote(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "edit.html";
}

// ==========================
// Fungsi Tampilkan Catatan
// ==========================

function renderNotes() {
  const list = document.getElementById("notesList");
  if (!list) return;

  list.innerHTML = "";

  notes.forEach((note, i) => {
    const card = document.createElement("div");
    card.className = "note";
    const bgColor = note.color || "#f1f1f1";
    card.style.backgroundColor = bgColor;
    card.style.color = isDarkColor(bgColor) ? "white" : "black";

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.body}</p>
      <div class="content">
        <small>${note.timestamp}</small>
        <div class="buttons">
          <button class="btn" onclick="editNote(${i})">Edit</button>
          <button class="cancel" onclick="deleteNote(${i})">Delete</button>
        </div>
      </div>
    `;

    list.appendChild(card);
  });
}

// ==========================
// Fungsi Hapus Catatan
// ==========================

function deleteNote(index) {
  if (confirm("Hapus catatan ini?")) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
  }
}

// ==========================
// Jalankan Saat Load
// ==========================

document.addEventListener("DOMContentLoaded", renderNotes);
