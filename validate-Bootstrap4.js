const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // no page reload after submit

  if (checkInputs()) {
    addInfo();
    showInfo();
  }
});

function checkInputs() {
  let isValid = true;
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  } else {
    ShowSuccess(nameInput);
  }

  if (email.value.trim() === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isEmail(email.value.trim())) {
    showError(email, "Not a valid email");
    isValid = false;
  } else {
    ShowSuccess(email);
  }

  if (phone.value.trim() === "") {
    showError(phone, "Phone is required");
    isValid = false;
  } else if (isNaN(phone.value.trim())) {
    showError(phone, "Phone must be numbers");
    isValid = false;
  } else {
    ShowSuccess(phone);
  }

  if (address.value.trim() === "") {
    showError(address, "Address is required");
    isValid = false;
  } else {
    ShowSuccess(address);
  }

  return isValid;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const small = formGroup.querySelector("small");
  formGroup.className = "form-group error";
  small.innerText = message;
}

function ShowSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

let listsCus = [];
function addInfo() {
  let info_obj = {
    nameInput: nameInput.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };
  console.log(info_obj);
  let listsCus = getListsCusFromLocalStorage();
  listsCus.push(info_obj);
  localStorage.setItem("listsCus", JSON.stringify(listsCus));
}

function showInfo() {
  let listsCus = getListsCusFromLocalStorage();
  const list = document.querySelector("#list");
  list.innerHTML = "";
  listsCus.forEach((Element, i) => {
    list.innerHTML += ` <tr>
                                <td>${i + 1}</td>
                                <td>${Element.nameInput}</td>
                                <td>${Element.email}</td>
                                <td>${Element.phone}</td>
                                <td>${Element.address}</td>
                                <td><button onclick= "editCus(${i})">Edit</button></td>
                                <td><button onclick= "deleteCus(${i})">Delete</button></td>
                            </tr>`;
  });
}
function getListsCusFromLocalStorage() {
  let getLocalStorage = localStorage.getItem("listsCus");
  if (getLocalStorage == null) {
    listsCus = [];
  } else {
    listsCus = JSON.parse(getLocalStorage);
  }
  return listsCus;
}

window.onload = function () {
  showInfo();
};
