const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
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
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  const URLInputValue = URLInput.value.trim();
  const optionSelectValue = optionSelect.value.trim();

  let isValid = true;
  if (usernameValue === "") {
    showError(username, "Username is required");
    isValid = false;
  } else {
    ShowSuccess(username);
  }

  if (emailValue === "") {
    showError(email, "Email is required");
    isValid = false;
  } else if (!isEmail(emailValue)) {
    showError(email, "Not a valid email");
    isValid = false;
  } else {
    ShowSuccess(email);
  }

  if (passwordValue === "") {
    showError(password, "Password is required");
    isValid = false;
  } else if (passwordValue.length < 6 || passwordValue.length > 25) {
    showError(password, "Password must be between 6 and 25 characters.");
    isValid = false;
  } else {
    ShowSuccess(password);
  }

  if (password2Value === "") {
    showError(password2, "Password2 is required");
    isValid = false;
  } else if (passwordValue !== password2Value) {
    showError(password2, "Passwords does not match");
    isValid = false;
  } else {
    ShowSuccess(password2);
  }

  if (URLInputValue === "") {
    showError(URLInput, "URL is required");
    isValid = false;
  } else if (!isURL(URLInputValue)) {
    showError(URLInput, "Not a valid URL");
    isValid = false;
  } else {
    ShowSuccess(URLInput);
  }

  if (optionSelectValue === "") {
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
    username: username.value,
    email: email.value,
    password: password.value,
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
                                <td>${Element.username}</td>
                                <td>${Element.email}</td>
                                <td>${Element.password}</td>
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
