const form = document.getElementById("form");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const password2Input = document.getElementById("password2Input");
const URLInput = document.getElementById("URLInput");
const optionSelect = document.getElementById("devSelect");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // no page reload after submit

  if (checkInputs()) {
    addInfo();
    showInfo();
  }
});

function checkInputs() {
  // trim to remove the whitespaces
  // const usernameValue = username.value.trim();
  // const emailValue = email.value.trim();
  // const passwordValue = password.value.trim();
  // const password2Value = password2.value.trim();
  // const URLInputValue = URLInput.value.trim();
  // const optionSelectValue = optionSelect.value.trim();

  let isValid = true;
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Username is required");
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

  if (passwordInput.value.trim() === "") {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (
    passwordInput.value.trim().length < 6 ||
    passwordInput.value.trim().length > 25
  ) {
    showError(passwordInput, "Password must be between 6 and 25 characters.");
    isValid = false;
  } else {
    ShowSuccess(passwordInput);
  }

  if (password2Input.value.trim() === "") {
    showError(password2Input, "Password2 is required");
    isValid = false;
  } else if (passwordInput.value.trim() !== password2Input.value.trim()) {
    showError(password2Input, "Passwords does not match");
    isValid = false;
  } else {
    ShowSuccess(password2Input);
  }

  if (URLInput.value.trim() === "") {
    showError(URLInput, "URL is required");
    isValid = false;
  } else if (!isURL(URLInput.value.trim())) {
    showError(URLInput, "Not a valid URL");
    isValid = false;
  } else {
    ShowSuccess(URLInput);
  }

  if (optionSelect.value.trim() === "") {
    showError(optionSelect, "Option is required");
    isValid = false;
  } else {
    ShowSuccess(optionSelect);
  }

  return isValid;
}

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.innerText = message;
}

function ShowSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
function isURL(URLInput) {
  return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    URLInput
  );
}

// =========== action ==============
// =========== action ==============
// =========== action ==============
let listInfo = [];
function addInfo() {
  let info_obj = {
    nameInput: nameInput.value,
    emailInput: emailInput.value,
    passwordInput: passwordInput.value,
    URLInput: URLInput.value,
    optionSelect: optionSelect.value,
  };
  console.log(info_obj);
  let listInfo = getListInfoFromLocalStorage();
  listInfo.push(info_obj);
  localStorage.setItem("listInfo", JSON.stringify(listInfo));
}

function showInfo() {
  let listInfo = getListInfoFromLocalStorage();
  const list = document.querySelector("#list");
  list.innerHTML = "";
  listInfo.forEach((Element, i) => {
    list.innerHTML += ` <tr>
                                <td>${i + 1}</td>
                                <td>${Element.nameInput}</td>
                                <td>${Element.emailInput}</td>
                                <td>${Element.passwordInput}</td>
                                <td>${Element.URLInput}</td>
                                <td>${Element.optionSelect}</td>
                                
                            </tr>`;
  });
}
function getListInfoFromLocalStorage() {
  let getLocalStorage = localStorage.getItem("listInfo");
  if (getLocalStorage == null) {
    listInfo = [];
  } else {
    listInfo = JSON.parse(getLocalStorage);
  }
  return listInfo;
}

window.onload = function () {
  showInfo();
};
