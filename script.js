let searchData=[];let originalData=[];let currentPositionWise=!1;const parseBtn=document.getElementById("parse-btn");const searchInput=document.getElementById("search-input");const searchBtn=document.getElementById("search-btn");const positionWiseBtn=document.getElementById("position-wise-btn");const tableBody=document.getElementById("table-body");const notification=document.getElementById("notification");parseBtn.addEventListener("click",parseDataHandler);function parseDataHandler(){fetch('Data/GAT Result 2024 Postgraduate Test 1.txt').then(response=>response.text()).then(data=>{searchData=[];originalData=[];const rows=data.trim().split("\n");for(let i=0;i<rows.length;i++){const row=rows[i];if(row==="")continue;const cells=row.split(" ");const sr=parseInt(cells[0]);const roll=parseInt(cells[1]);const cnic=parseInt(cells[2]);let name="";let discipline;let marks;for(let j=3;j<cells.length-2;j++){name+=cells[j]+" "}
name=name.trim();discipline=cells[cells.length-2];marks=parseInt(cells[cells.length-1]);const newData={Sr:sr,Roll:roll,CNIC:cnic,Name:name,Discipline:discipline,Marks:marks};searchData.push(newData);originalData.push(newData)}
notification.innerHTML="Data parsed successfully!";notification.classList.add("show");displayData(originalData)}).catch(error=>{notification.innerHTML="Error: "+error.message;notification.classList.add("show")})}
searchBtn.addEventListener("click",searchHandler);positionWiseBtn.addEventListener("click",positionWiseHandler);function searchHandler(){const searchTerm=searchInput.value.trim();searchData=originalData.filter(item=>item.Discipline.toLowerCase()===searchTerm.toLowerCase());currentPositionWise=!1;displayData(searchData)}
function positionWiseHandler(){currentPositionWise=!0;searchData.sort((a,b)=>b.Marks-a.Marks);displayData(searchData)}
function displayData(data){tableBody.innerHTML="";if(currentPositionWise){data.forEach((item,index)=>{const row=document.createElement("tr");row.innerHTML=`
        <td>${index + 1}</td>
        <td>${item.Roll}</td>
        <td>${item.CNIC}</td>
        <td>${item.Name}</td>
        <td>${item.Discipline}</td>
        <td>${item.Marks}</td>
      `;tableBody.appendChild(row)})}else{data.forEach(item=>{const row=document.createElement("tr");row.innerHTML=`
        <td>${item.Sr}</td>
        <td>${item.Roll}</td>
        <td>${item.CNIC}</td>
        <td>${item.Name}</td>
        <td>${item.Discipline}</td>
        <td>${item.Marks}</td>
      `;tableBody.appendChild(row)})}}