const customer_name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");
const addBtn = document.getElementById("btnAdd");
const updateBtn = document.getElementById("btnUpdate");

addBtn.onclick = () => {
  let obj_customer = {
    name: customer_name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };
  let getLocalStorageData = localStorage.getItem("customer");
  if (getLocalStorageData == null) {
    let lists = [];
  } else {
    let lists = JSON.parse(getLocalStorageData);
  }
  lists.push(obj_customer);
  localStorage.setItem("customer", JSON.stringify(lists));
  show_lists();
  reset_form();
};

function show_lists() {
  let getLocalStorageData = localStorage.getItem("customer");
  if (getLocalStorageData == null) {
    lists = [];
  } else {
    lists = JSON.parse(getLocalStorageData);
  }
  let row = "";
  lists.forEach((element, index) => {
    row += `
                <tr>
                    <td>${index}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.phone}</td>
                    <td>${element.address}</td>
                    <td><button onclick= "edit(${index})">Edit</button></td>
                    <td><button onclick= "delete_customer(${index})">Delete</button></td>
                </tr>
                `;
  });
  document.getElementById("list").innerHTML = row;
}

function reset_form() {
  customer_name.value = "";
  email.value = "";
  phone.value = "";
  address.value = "";
  customer_name.focus();
}

function delete_customer(index) {
  let getLocalStorageData = localStorage.getItem("customer");
  lists = JSON.parse(getLocalStorageData);
  lists.splice(index, 1);
  localStorage.setItem("customer", JSON.stringify(lists));
  show_lists();
}

function edit(index) {
  let getLocalStorageData = localStorage.getItem("customer");
  lists = JSON.parse(getLocalStorageData);
  customer_name.value = lists[index].name;
  email.value = lists[index].email;
  phone.value = lists[index].phone;
  address.value = lists[index].address;
  document.getElementById("index").value = index;
  document.getElementById("btnAdd").style.display = "none";
  document.getElementById("btnUpdate").style.display = "block";
}

updateBtn.onclick = () => {
  let obj_customer = {
    name: customer_name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };
  let getLocalStorageData = localStorage.getItem("customer");
  lists = JSON.parse(getLocalStorageData);
  let index = parseInt(document.getElementById("index").value);

  lists[index] = obj_customer;

  localStorage.setItem("customer", JSON.stringify(lists));
  show_lists();
  document.getElementById("btnUpdate").style.display = "none";
  document.getElementById("btnAdd").style.display = "block";
  reset_form();
};

window.onload = () => {
  show_lists();
};
