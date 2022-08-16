let employees = [];
let urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector(".gridContainer");
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

};
function displayModal(index) {
  let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
    <img class="avatar" src="${picture.large}" />
    <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <p class="address">${city}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number},${street.name}, ${state} ${postcode}</p>
    <p>Birthday:${((date.getMonth() + 1) < 10 ? '0' : '')+ (date.getMonth() + 1)}/${(date.getDate() < 10 ? '0' : '')+ date.getDate()}/${date.getFullYear()}</p>
    </div>
    `;
  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
};
gridContainer.addEventListener('click', e => {
  if (e.target !== gridContainer) {
    const card = e.target.closest(".card-container");
    const index = card.getAttribute('data-index');
    displayModal(index);
    }
});
overlay.addEventListener('click', e => {
  if(e.target.classList.contains('modalClose')) {
    overlay.classList.add("hidden");
    console.log('what');
  }
});


