let previousMoves = [];

// Add event listeners to answers for dragging
document.querySelectorAll('.answer').forEach(answer => {
    // When drag starts
    answer.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);  // Set the id of the answer being dragged
    });
});

// Add event listeners to all answer boxes to allow drop
document.querySelectorAll('.answer-box').forEach(box => {
    box.addEventListener('dragover', function(e) {
        e.preventDefault();  // Prevent default behavior to allow drop
    });

    box.addEventListener('drop', function(e) {
        e.preventDefault();
        const draggedAnswerId = e.dataTransfer.getData('text/plain');  // Get the id of the dragged element
        const draggedAnswer = document.getElementById(draggedAnswerId);  // Select the dragged element

        // Check if the answer box already has an answer
        if (this.children.length === 0) {
            // Save the previous state for undo
            previousMoves.push({ answer: draggedAnswer, from: draggedAnswer.parentElement, to: this });

            // Append the dragged answer
            this.appendChild(draggedAnswer);

            // Add event listener to allow returning answer back to original position
            enableClickToReturn(draggedAnswer);
        }
    });
});

// Function to allow returning the answer to answer-options by clicking it
function enableClickToReturn(answerElement) {
    answerElement.addEventListener('click', function() {
        const originalAnswerOptions = document.querySelector('.answer-options.Listening');  // Where answers originate
        originalAnswerOptions.appendChild(answerElement);  // Move the answer back to original container

        // Remove any event listener for returning back
        answerElement.removeEventListener('click', arguments.callee);  
    });
}

// Undo the last move
// function undoLastMove() {
//     if (previousMoves.length === 0) {
//         alert('No moves to undo!');
//         return;
//     }

//     const lastMove = previousMoves.pop();  // Get the last move
//     lastMove.from.appendChild(lastMove.answer);  // Move the answer back to its original location

//     // Re-enable the click event to return the answer to the original position if necessary
//     enableClickToReturn(lastMove.answer);
// }

// Allow undo with the 'Undo' button
document.querySelector('.btn.undo').addEventListener('click', undoLastMove);
