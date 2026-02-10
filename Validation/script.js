document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const form = document.getElementById('regForm');
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const zipInput = document.getElementById('zip');

    // --- Validation Helper Functions ---

    // Generic function to set error state
    const setError = (element, message) => {
        const errorDisplay = element.nextElementSibling; // The <small> tag
        errorDisplay.innerText = message;
        element.classList.add('invalid');
        element.classList.remove('valid');
        return false;
    };

    // Generic function to set success state
    const setSuccess = (element) => {
        const errorDisplay = element.nextElementSibling;
        errorDisplay.innerText = '';
        element.classList.add('valid');
        element.classList.remove('invalid');
        return true;
    };

    // Regex Patterns
    const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPhone = phone => {
        // Validates exactly 10 digits
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    const isValidZip = zip => {
        // Validates exactly 5 digits
        const re = /^\d{5}$/;
        return re.test(zip);
    };

    // --- Real-time Validation Logic (DOM Manipulation) ---

    const validateInputs = () => {
        let isValid = true;

        // 1. Name Validation (Mandatory)
        if (nameInput.value.trim() === '') {
            isValid = setError(nameInput, 'Full Name is required');
        } else {
            setSuccess(nameInput);
        }

        // 2. Email Validation
        if (emailInput.value.trim() === '') {
            isValid = setError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = setError(emailInput, 'Provide a valid email address');
        } else {
            setSuccess(emailInput);
        }

        // 3. Phone Validation
        if (phoneInput.value.trim() === '') {
            isValid = setError(phoneInput, 'Phone number is required');
        } else if (!isValidPhone(phoneInput.value.trim())) {
            isValid = setError(phoneInput, 'Phone must be 10 digits');
        } else {
            setSuccess(phoneInput);
        }

        // 4. Zip Code Validation
        if (zipInput.value.trim() === '') {
            isValid = setError(zipInput, 'Zip code is required');
        } else if (!isValidZip(zipInput.value.trim())) {
            isValid = setError(zipInput, 'Zip code must be 5 digits');
        } else {
            setSuccess(zipInput);
        }

        return isValid;
    };

    // Add "Real-time" feedback using 'input' event listeners
    [nameInput, emailInput, phoneInput, zipInput].forEach(input => {
        input.addEventListener('input', () => {
            // We only validate the specific field being typed in for better UX
            // But for simplicity here, we clear errors on type
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                input.nextElementSibling.innerText = "";
            }
        });
    });

    // --- jQuery AJAX Submission ---

    $('#regForm').on('submit', function (e) {
        e.preventDefault(); // Prevent actual HTML form submission

        // Run the Vanilla JS validation
        // Note: We call validateInputs() which returns true only if ALL fields pass
        if (validateInputs()) {

            const formData = {
                name: $('#fullname').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                zip: $('#zip').val()
            };

            const responseArea = $('#responseArea');
            responseArea.hide().removeClass('success').text("Sending data...");

            // AJAX Call
            $.ajax({
                // Using JSONPlaceholder to simulate a real API endpoint
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: 'POST',
                data: JSON.stringify(formData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // DOM Update on Success
                    responseArea
                        .addClass('success')
                        .html(`<strong>Success!</strong> ID: ${response.id} created via AJAX.`)
                        .fadeIn();

                    // Optional: Clear form
                    $('#regForm')[0].reset();
                    $('.valid').removeClass('valid');
                },
                error: function (xhr, status, error) {
                    alert("An error occurred: " + error);
                }
            });
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const form = document.getElementById('regForm');
    const nameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const zipInput = document.getElementById('zip');

    // --- Validation Helper Functions ---

    // Generic function to set error state
    const setError = (element, message) => {
        const errorDisplay = element.nextElementSibling; // The <small> tag
        errorDisplay.innerText = message;
        element.classList.add('invalid');
        element.classList.remove('valid');
        return false;
    };

    // Generic function to set success state
    const setSuccess = (element) => {
        const errorDisplay = element.nextElementSibling;
        errorDisplay.innerText = '';
        element.classList.add('valid');
        element.classList.remove('invalid');
        return true;
    };

    // Regex Patterns
    const isValidEmail = email => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const isValidPhone = phone => {
        // Validates exactly 10 digits
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    const isValidZip = zip => {
        // Validates exactly 5 digits
        const re = /^\d{5}$/;
        return re.test(zip);
    };

    // --- Real-time Validation Logic (DOM Manipulation) ---

    const validateInputs = () => {
        let isValid = true;

        // 1. Name Validation (Mandatory)
        if (nameInput.value.trim() === '') {
            isValid = setError(nameInput, 'Full Name is required');
        } else {
            setSuccess(nameInput);
        }

        // 2. Email Validation
        if (emailInput.value.trim() === '') {
            isValid = setError(emailInput, 'Email is required');
        } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = setError(emailInput, 'Provide a valid email address');
        } else {
            setSuccess(emailInput);
        }

        // 3. Phone Validation
        if (phoneInput.value.trim() === '') {
            isValid = setError(phoneInput, 'Phone number is required');
        } else if (!isValidPhone(phoneInput.value.trim())) {
            isValid = setError(phoneInput, 'Phone must be 10 digits');
        } else {
            setSuccess(phoneInput);
        }

        // 4. Zip Code Validation
        if (zipInput.value.trim() === '') {
            isValid = setError(zipInput, 'Zip code is required');
        } else if (!isValidZip(zipInput.value.trim())) {
            isValid = setError(zipInput, 'Zip code must be 5 digits');
        } else {
            setSuccess(zipInput);
        }

        return isValid;
    };

    // Add "Real-time" feedback using 'input' event listeners
    [nameInput, emailInput, phoneInput, zipInput].forEach(input => {
        input.addEventListener('input', () => {
            // We only validate the specific field being typed in for better UX
            // But for simplicity here, we clear errors on type
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                input.nextElementSibling.innerText = "";
            }
        });
    });

    // --- jQuery AJAX Submission ---

    $('#regForm').on('submit', function (e) {
        e.preventDefault(); // Prevent actual HTML form submission

        // Run the Vanilla JS validation
        // Note: We call validateInputs() which returns true only if ALL fields pass
        if (validateInputs()) {

            const formData = {
                name: $('#fullname').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                zip: $('#zip').val()
            };

            const responseArea = $('#responseArea');
            responseArea.hide().removeClass('success').text("Sending data...");

            // AJAX Call
            $.ajax({
                // Using JSONPlaceholder to simulate a real API endpoint
                url: 'https://jsonplaceholder.typicode.com/posts',
                type: 'POST',
                data: JSON.stringify(formData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    // DOM Update on Success
                    responseArea
                        .addClass('success')
                        .html(`<strong>Success!</strong> ID: ${response.id} created via AJAX.`)
                        .fadeIn();

                    // Optional: Clear form
                    $('#regForm')[0].reset();
                    $('.valid').removeClass('valid');
                },
                error: function (xhr, status, error) {
                    alert("An error occurred: " + error);
                }
            });
        }
    });
});
