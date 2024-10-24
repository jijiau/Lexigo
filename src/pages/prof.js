// Function to allow returning the answer to answer-options by clicking it or using touch
function enableClickToReturn(answerElement, answerBox) {
    const returnAnswer = function() {
        const originalAnswerOptions = document.querySelector('.answer-options.Listening');  // Where answers originate
        originalAnswerOptions.appendChild(answerElement);  // Move the answer back to original container

        // Reset the size of the answer-box to default after the answer is removed
        answerBox.style.width = '100px';  // Reset to default width
        answerBox.style.height = '50px';  // Reset to default height

        // Remove any event listener for returning back
        answerElement.removeEventListener('click', returnAnswer);
        answerElement.removeEventListener('touchend', returnAnswer);  // Remove touch listener too
    };

    answerElement.addEventListener('click', returnAnswer);   // For desktop click
    answerElement.addEventListener('touchend', returnAnswer);  // For mobile touch
}
