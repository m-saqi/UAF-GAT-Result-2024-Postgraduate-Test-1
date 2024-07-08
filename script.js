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
  // Fetching data from XLSX file
  const xlsx = require('xlsx');
  const workbook = xlsx.readFile('Data/GAT Result 2024 Postgraduate Test 1.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  searchData = [];
  originalData = [];

  // Parsing data from XLSX file
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  data.shift(); // Remove header row

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const sr = parseInt(row[0]);
    const roll = parseInt(row[1]);
    const cnic = row[2];
    const name = row[3];
    const discipline = row[4];
    const marks = parseInt(row[5]);

    const newData = {
      Sr: sr,
      Roll: roll,
      CNIC: cnic,
      Name: name,
      Discipline: discipline,
      Marks: marks
    };

    searchData.push(newData);
    originalData.push(newData);
  }

  notification.innerHTML = "Data parsed successfully!";
  notification.classList.add("show");
  displayData(originalData);
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