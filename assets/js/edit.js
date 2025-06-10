// Load data dari localStorage berdasarkan index edit
      document.addEventListener("DOMContentLoaded", () => {
        const index = localStorage.getItem("editIndex");
        const notes = JSON.parse(localStorage.getItem("notes")) || [];

        if (index !== null && notes[index]) {
          document.getElementById("noteTitle").value = notes[index].title;
          document.getElementById("noteBody").value = notes[index].body;
          document.getElementById("colorPicker").value =
            notes[index].color || "#f1f1f1";
          setSelectedColor(notes[index].color || "#f1f1f1");
        } else {
          alert("Catatan tidak ditemukan.");
          window.location.href = "index.html";
        }
      });