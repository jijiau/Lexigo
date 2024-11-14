const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('sign-in-btn');

// Function to validate email and password
function validateForm() {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Check if email ends with "@gmail.com" and password is not empty
    if (email.endsWith('@gmail.com') && password.trim() !== '') {
        signInBtn.style.pointerEvents = 'auto'; // Enable the Sign In button
        signInBtn.style.opacity = '1'; // Make button fully visible
    } else {
        signInBtn.style.pointerEvents = 'none'; // Disable the Sign In button
        signInBtn.style.opacity = '0.5'; // Make button less visible
    }
}

// Event listeners for input changes
emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Optional: If user tries to click "Sign In" with invalid fields, show alert
signInBtn.addEventListener('click', function(event) {
    if (signInBtn.style.pointerEvents === 'none') {
        event.preventDefault(); // Prevent default action (navigation)
        alert('Please enter a valid Gmail address and password.');
    }
});
