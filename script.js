// script.js

// Get the table body element
const tableBody = document.getElementById('table-body');

// Get the fetch result button
const fetchBtn = document.getElementById('parse-btn');

// Get the search input and button
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Get the position-wise button
const positionWiseBtn = document.getElementById('position-wise-btn');

// Get the loading popup element
const loadingPopup = document.getElementById('loading-popup');

// Get the notification element
const notification = document.getElementById('notification');

// Load the Excel file
let dataArr = [];
let originalData = [];

fetchBtn.addEventListener('click', () => {
  // Show the loading popup
  loadingPopup.style.display = 'block';

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'Data/GAT Result 2024 Postgraduate Test 1.xlsx', true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = new Uint8Array(xhr.response);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      dataArr = XLSX.utils.sheet_to_json(worksheet, { header: ['Sr.#', 'Roll #', 'CNIC', 'Name', 'Discipline', 'Marks'] });
      originalData = [...dataArr]; // Store the original data

      // Sort the data in position-wise sequence
      dataArr.sort((a, b) => b['Marks'] - a['Marks']);

      // Hide the loading popup
      loadingPopup.style.display = 'none';

      // Display the data in the table
      displayData(dataArr);
    }
  };

  xhr.send();
});

// Display the data in the table
function displayData(data) {
  tableBody.innerHTML = '';
  data.forEach((row, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row['Roll #']}</td>
      <td>${row['CNIC']}</td>
      <td>${row['Name']}</td>
      <td>${row['Discipline']}</td>
      <td>${row['Marks']}</td>
    `;
    tableBody.appendChild(tr);
  });
}

// Search by discipline
let currentData = dataArr;

searchBtn.addEventListener('click', () => {
  // Show the loading popup
  loadingPopup.style.display = 'block';

  const searchTerm = searchInput.value.trim().toLowerCase();
  let filteredData;

  if (searchTerm === 'chemistry') {
    filteredData = dataArr.filter((row) => row['Discipline'].toLowerCase() === 'chemistry');
  } else if (searchTerm.includes('biochem')) {
    filteredData = dataArr.filter((row) => row['Discipline'].toLowerCase() === 'biochemistry');
  } else {
    filteredData = dataArr.filter((row) => row['Discipline'].toLowerCase().includes(searchTerm));
  }

  currentData = filteredData;

  // Hide the loading popup
  loadingPopup.style.display = 'none';

  displayData(currentData);
});

// Position-wise sorting
positionWiseBtn.addEventListener('click', () => {
  // Show the loading popup
  loadingPopup.style.display = 'block';

  currentData.sort((a, b) => b['Marks'] - a['Marks']);

  // Hide the loading popup
  loadingPopup.style.display = 'none';

  displayData(currentData);
});
