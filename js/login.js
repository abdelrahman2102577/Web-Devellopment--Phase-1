const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('pass');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});
let emailvalid = false;
let passvalid = false;


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();


    if (emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
        emailvalid = true;
    }

    if (passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
        passvalid = true;
    }



    if (emailvalid === true && email.value === "admin@111.com" && passvalid === true && password.value === "admin1111") {
        window.open("dashboard.html", "_blank", "height=1000, width=2000");
    }
    if (emailvalid === true && email.value !== "admin@111.com" && passvalid === true && password.value !== "admin1111") {
        window.open("index.html", "_blank", "height=1000, width=2000");
    }
};

