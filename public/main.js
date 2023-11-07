const form = document.querySelector('#form')
const inputFields = document.querySelectorAll('.inputField');
const errors = document.querySelectorAll('.error');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const number = document.querySelector('#number');
const password = document.querySelector('#password');
const confirmPW = document.querySelector('#confirmPW');
const createAcctbtn = document.querySelector('#createAcct')


function onFocus() {
    if(this.value !== "") {
      this.classList.add('activeField');
      this.nextElementSibling.classList.add('activeSpan');
    } else {
      this.classList.remove('activeField');
      this.nextElementSibling.classList.remove('activeSpan');
    }
};

function emailValidation() {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.value === "" || this.value.match(regex)){
        errors[2].textContent = ""
    }
    else if(!this.value.match(regex)) {
        errors[2].textContent = "Please inpute valid email"
    }
};

function passwordValidation() {
    if (this.value === "") {
        errors[4].textContent = ""
    }
    else if(this.value.length < 8 || !this.value.match(/[a-z]/g) || 
    !this.value.match(/[A-Z]/g) || !this.value.match(/[0-9]/g) ||
    !this.value.match(/\W|_/g)) {
        errors[4].textContent = "Password must be valid"
    } 
    else {
        errors[4].textContent = ""
    }
};

function confirmPasswordvalidation() {
    if (this.value === "") {
        errors[5].textContent = ""
    }
    else if (this.value === password.value && this.value !== "" ){
        errors[5].textContent = "Passwords match";
        errors[5].style.color = "green";
    } else {
        errors[5].textContent = "Passwords should match";
        errors[5].style.color = "red";
    }
};


function submitValidation() {
    let i = 0;
    for (inputfield of inputFields){
        if (inputfield.value === ""){
            errors[i].textContent = "*This is required";
            i++;
        }
        else if (inputfield.value !== "") {
            errors[i].textContent = "";
            i++
        }
        else {
            i++;
        }
}};



form.addEventListener('submit', (e) => e.preventDefault());
password.addEventListener('input', passwordValidation);
confirmPW.addEventListener('input', confirmPasswordvalidation);
email.addEventListener('input', emailValidation);
createAcctbtn.addEventListener('click', submitValidation);
errors.forEach(error => error.appendChild(document.createTextNode("")));
inputFields.forEach(inputField => inputField.addEventListener('input', onFocus));
