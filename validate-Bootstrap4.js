const form = document.getElementById("form");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const addressInput = document.getElementById("addressInput");

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

  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!isEmail(emailInput.value.trim())) {
    showError(emailInput, "Not a valid email");
    isValid = false;
  } else {
    ShowSuccess(emailInput);
  }

  if (phoneInput.value.trim() === "") {
    showError(phoneInput, "Phone is required");
    isValid = false;
  } else if (isNaN(phoneInput.value.trim())) {
    showError(phoneInput, "Phone must be numbers");
    isValid = false;
  } else {
    ShowSuccess(phoneInput);
  }

  if (addressInput.value.trim() === "") {
    showError(addressInput, "Address is required");
    isValid = false;
  } else {
    ShowSuccess(addressInput);
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

function isEmail(emailInput) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    emailInput
  );
}

let listsCus = [];
function addInfo() {
  let info_obj = {
    nameInfo: nameInput.value,
    emailInfo: emailInput.value,
    phoneInfo: phoneInput.value,
    addressInfo: addressInput.value,
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
                                <td>${Element.nameInfo}</td>
                                <td>${Element.emailInfo}</td>
                                <td>${Element.phoneInfo}</td>
                                <td>${Element.addressInfo}</td>
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
