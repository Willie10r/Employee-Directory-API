let employees = [];
let urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err));

function displayEmployees (employeeData) {
  employees = employeeData;
    let employeeHTML = '';
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
  employeeHTML += `
      <div class="card-container" data-index="${index}">
      <img class="profile-pic" src="${picture.large}" />
      <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <a class="email">${email}</a>
      <p class="address">${city}</p>
      </div>
      </div>
      `
  });
  gridContainer.innerHTML = employeeHTML;

}