// Array yang berisi urutan jawaban yang benar
const correctOrder = ["my", "mom", "is", "forty eight", "years"];

// Function to show feedback based on whether the answer is correct or not
function showFeedback(isCorrect) {
    const feedbackContainer = document.getElementById('feedback'); // Feedback container
    const feedbackText = document.querySelector('.feedback-text'); // Feedback text
    const feedbackIcon = document.querySelector('.feedback-icon'); // Feedback icon area
    const feedbackReport = document.querySelector('.report'); // Feedback Report

    const falseNumberAnswer = document.querySelector('.question-numbers .button.current');

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

        falseNumberAnswer.style.backgroundColor = "#FF7676";
    }

    feedbackContainer.style.display = 'block';  // Show feedback container
    setTimeout(() => {
        feedbackContainer.classList.add('active');
    }, 50);
    blockAnswers(); // Prevent further clicks on answer buttons
}

// Function to check the answer order
function checkAnswerOrder() {
    // Ambil semua jawaban yang ada di answer box
    const answerBoxes = document.querySelectorAll('.answer-box');
    const userAnswers = [];

    // Loop untuk mendapatkan teks dari setiap jawaban yang ada di answer box
    answerBoxes.forEach(box => {
        if (box.children.length > 0) {
            userAnswers.push(box.children[0].innerText.trim());
        }
    });

    // Jika panjang userAnswers tidak sesuai dengan correctOrder, berarti jawaban salah
    let isCorrect = userAnswers.length === correctOrder.length;

    // Bandingkan userAnswers dengan correctOrder
    for (let i = 0; i < correctOrder.length; i++) {
        if (userAnswers[i] !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }

    // Tampilkan feedback berdasarkan hasil pengecekan
    showFeedback(isCorrect);

    // Tampilkan jawaban benar di bawah answer-box jika salah
    if (!isCorrect) {
        const correctAnswerContainer = document.getElementById('correct-answer-container');
        correctAnswerContainer.innerText = `Correct Answer : "${correctOrder.join(' ')}"`;
        correctAnswerContainer.style.display = 'block';  // Tampilkan jawaban yang benar
    }
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
checkButton.addEventListener('click', checkAnswerOrder);
