let searchData = [];
let originalData = [];
let currentPositionWise = false;

const parseBtn = document.getElementById("parse-btn");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const positionWiseBtn = document.getElementById("position-wise-btn");
const tableBody = document.getElementById("table-body");
const notification = document.getElementById("notification");

parseBtn.addEventListener("click", parseDataHandler);

function parseDataHandler() {
  fetch('Data/GAT Result 2024 Postgraduate Test 1.txt')
  .then(response => response.text())
  .then(data => {
      searchData = [];
      originalData = [];
      const rows = data.trim().split("\n");

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row === "") continue;

        const [sr, roll, cnic, ...rest] = row.split(" ");
        const name = rest.slice(0, -1).join(" ");
        const discipline = rest[rest.length - 1];

        const newData = {
          Sr: parseInt(sr),
          Roll: parseInt(roll),
          CNIC: parseInt(cnic),
          Name: name,
          Discipline: discipline,
          Marks: 0 // assuming marks is not present in the data
        };

        searchData.push(newData);
        originalData.push(newData);
      }

      notification.innerHTML = "Data parsed successfully!";
      notification.classList.add("show");
      displayData(originalData);
    })
  .catch(error => {
      notification.innerHTML = "Error: " + error.message;
      notification.classList.add("show");
    });
}

searchBtn.addEventListener("click", searchHandler);
positionWiseBtn.addEventListener("click", positionWiseHandler);

function searchHandler() {
  const searchTerm = searchInput.value.trim();
  searchData = originalData.filter(item => item.Discipline.toLowerCase() === searchTerm.toLowerCase());
  currentPositionWise = false;
  displayData(searchData);
}

function positionWiseHandler() {
  currentPositionWise = true;
  searchData.sort((a, b) => b.Marks - a.Marks);
  displayData(searchData);
}

function displayData(data) {
  tableBody.innerHTML = "";
  if (currentPositionWise) {
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.Roll}</td>
        <td>${item.CNIC}</td>
        <td>${item.Name}</td>
        <td>${item.Discipline}</td>
        <td>${item.Marks}</td>
      `;
      tableBody.appendChild(row);
    });
  } else {
    data.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.Sr}</td>
        <td>${item.Roll}</td>
        <td>${item.CNIC}</td>
        <td>${item.Name}</td>
        <td>${item.Discipline}</td>
        <td>${item.Marks}</td>
      `;
      tableBody.appendChild(row);
    });
  }
}