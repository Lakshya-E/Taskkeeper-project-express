if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
} else {
    data = [];
}

let signBtn = document.getElementById("submit-signup");
if (signBtn != null) {
    signBtn.addEventListener("click", signFunc);

    let names = document.getElementById("username-sign");
    let email = document.getElementById("email-sign");
    let password = document.getElementById("password-sign");

    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    function signFunc() {
        var curr = data;
        var emailCheck = 0;
        for (let i = 0; i < curr.length; i++) {
            if (curr[i].email == email.value) {
                emailCheck = 1;
            }
        }
        if (names.value.length == 0) {
            alert("Enter a Name")
        } else if (email.value.length == 0) {
            alert("Enter an Email")
        } else if (password.value.length == 0) {
            alert("Enter a Password")
        } else if (password.value.length < 8) {
            alert("Minimum 8 Characters Password!");
        } else if (emailCheck == 1) {
            alert("This User Already Exists");
        } else if (!email.value.match(mailformat)) {
            alert("Enter a valid Email");
        } else if (!password.value.match(numbers)) {
            alert("Add atleast 1 Number");
        } else if (!password.value.match(upperCaseLetters)) {
            alert("Add atleast 1 UpperCase Letter");
        } else if (!password.value.match(lowerCaseLetters)) {
            alert("Add atleast 1 LowerCase Letter");
        } else {
            userData = {};
            userData.name = document.getElementById("username-sign").value;
            userData.email = document.getElementById("email-sign").value;
            userData.password = document.getElementById("password-sign").value;

            data.push(userData);
            localStorage.setItem("data", JSON.stringify(data));

            console.log(data);
            alert("You have Signed In! ^_^")
            reloadpage();
        }
    }
}
console.log(signBtn)


let loginBtn = document.getElementById('submit-log');
if (loginBtn != null) {
    loginBtn.addEventListener("click", loginFunc);

    let namesLog = document.getElementById("username-login");
    let emailLog = document.getElementById("email-login");
    let pswLog = document.getElementById("password-login");

    function loginFunc() {
        var curr = data;
        for (let i = 0; i < curr.length; i++) {
            if (namesLog.value == "") {
                alert("Enter a Username");
                return;
            } else if (emailLog.value == "") {
                alert("Enter an Email");
                return;
            } else if (pswLog.value == "") {
                alert("Enter a Password");
                return;
            } else if (curr[i].name == namesLog.value && curr[i].email == emailLog.value && curr[i].password == pswLog.value) {
                alert("You are Logged In!");
                reloadpage();
                return;
            } else if (i == curr.length - 1 && (curr[i].name != namesLog.value || curr[i].email != emailLog.value || curr[i].password != pswLog.value)) {
                alert("Login Details Incorrect!");
            }
        }
    }
}

function reloadpage() {
    // var returnURL = "this_pages_name.php?upd=" + Math.random() * 100;
    setTimeout(function() {
        window.location.href = '/';
    }, 50);
}








// let formSign = document.getElementById("form-sign");
// formSign.onsubmit = () => {
//   signFunc();
// };
// let formlogin = document.getElementById("form-login");
// formlogin.onsubmit = () => {
//   return false;
// };