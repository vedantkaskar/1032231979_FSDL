document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let zip = document.getElementById("zip").value.trim();
    let interest = document.getElementById("interest").value;
    let message = document.getElementById("message").value.trim();

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;
    let zipPattern = /^[0-9]{6}$/;

    document.querySelectorAll(".error").forEach(e => e.innerText = "");
    document.getElementById("successMsg").innerText = "";

    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required";
        valid = false;
    }

    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format";
        valid = false;
    }

    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Enter 10 digit phone number";
        valid = false;
    }

    if (!zipPattern.test(zip)) {
        document.getElementById("zipError").innerText = "Enter 6 digit zip code";
        valid = false;
    }

    if (interest === "") {
        document.getElementById("interestError").innerText = "Select an interest";
        valid = false;
    }

    if (message === "") {
        document.getElementById("messageError").innerText = "Message cannot be empty";
        valid = false;
    }

    if (valid) {
        document.getElementById("successMsg").innerText =
            "Form submitted successfully (Client-side validation passed)";
        document.getElementById("contactForm").reset();
    }
});
