// Function to show feedback based on whether the answer is correct or not
function showFeedback(isCorrect) {
    const feedbackContainer = document.getElementById('feedback'); // Feedback container
    const feedbackText = document.querySelector('.feedback-text'); // Feedback text
    const feedbackIcon = document.querySelector('.feedback-icon'); // Feedback icon area
    const feedbackReport = document.querySelector('.report'); // Feedback Report

    const falseAnswer = document.querySelector('.answer.clicked');
    const falseNumberAnswer = document.querySelector('.question-numbers .button.current');
    const correctAnswer = document.querySelector('[data-correct="true"]').closest('.answer');


    // Change the text and background color based on correctness
    if (isCorrect) {
        feedbackText.innerText = 'Nice!'; // Set feedback text to "Nice!"
        feedbackText.style.color = '#489D26'; // Set the text color to green
        feedbackContainer.style.backgroundColor = '#CCFFCC'; // Light green background for correct answer
        feedbackIcon.innerHTML = '<img src="../../assets/correct-icon.svg" alt="Correct Icon" class="feedback-icon-img">'; // Set correct icon
        feedbackReport.style.color = '#489D26'; // Set "Report" color to match correct styling
        falseNumberAnswer.style.backgroundColor = "#89E219";
    } else {
        feedbackText.innerText = 'Nice Try!'; // Set feedback text to "Nice Try!"
        feedbackText.style.color = '#EC0B1B'; // Set the text color to red
        feedbackContainer.style.backgroundColor = '#FFCCCC'; // Light red background for incorrect answer
        feedbackIcon.innerHTML = '<img src="../../assets/incorrect-icon.svg" alt="Incorrect Icon" class="feedback-icon-img">'; // Set incorrect icon
        feedbackReport.style.color = '#EC0B1B'; // Set "Report" color to match incorrect styling

        falseAnswer.style.backgroundColor= "#EC0B1B";
        correctAnswer.style.backgroundColor = "#489D26";
        falseNumberAnswer.style.backgroundColor = "#FF7676";
    }

    // Add the class 'active' to trigger the transition
    feedbackContainer.style.display = 'block';  // Ensure it's visible
    setTimeout(() => {
        feedbackContainer.classList.add('active');
    }, 50);
    feedbackContainer.style.display = 'block'; // Show feedback container
    blockAnswers(); // Prevent further clicks on answer buttons
}


// Function to check the selected answer
function checkAnswer() {
    const selectedAnswer = document.querySelector('.answer.clicked'); // Get selected answer
    if (!selectedAnswer) {
        alert('Please select an answer!'); // If no answer is selected
        return;
    }

    // Logic to check if the selected answer is correct
    const correctAnswer = 'A'; // Example of correct answer being 'A'
    const userAnswer = selectedAnswer.querySelector('.letter').innerText; // Get user's selected answer

    // Show feedback based on whether the answer is correct or not
    showFeedback(userAnswer === correctAnswer);
}

// Function to block clicking more answers after check
function blockAnswers() {
    const answerButtons = document.querySelectorAll('.answer');
    answerButtons.forEach(button => {
        button.disabled = true; // Disable all answer buttons
        button.classList.add('disabled'); // Add 'disabled' class to stop hover effect
    });
}


// Add event listener to 'Check' button
const checkButton = document.querySelector('.btn.check');
checkButton.addEventListener('click', checkAnswer);

