let previousMoves = [];

// Add event listeners to answers for dragging
document.querySelectorAll('.answer').forEach(answer => {
    // When drag starts
    answer.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);  // Set the id of the answer being dragged
    });

    // Touch start for mobile
    answer.addEventListener('touchstart', (event) => {
        event.target.style.opacity = '0.5';
    });

    // Move element on touch move
    answer.addEventListener('touchmove', (event) => {
        const touchLocation = event.targetTouches[0];
        answer.style.position = 'absolute';
        answer.style.left = `${touchLocation.pageX}px`;
        answer.style.top = `${touchLocation.pageY}px`;
    });

    // Handle touch end (drop) for mobile
    answer.addEventListener('touchend', (event) => {
        const touchLocation = event.changedTouches[0];
        const elementUnderTouch = document.elementFromPoint(touchLocation.clientX, touchLocation.clientY);

        if (elementUnderTouch.classList.contains('answer-box') && elementUnderTouch.innerHTML === "") {
            elementUnderTouch.appendChild(event.target);
            event.target.style.position = 'static';
            event.target.style.opacity = '1';
        } else {
            event.target.style.position = 'static';
            event.target.style.opacity = '1';
        }
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

            // Adjust the size of the answer box based on the dragged element
            this.style.width = draggedAnswer.offsetWidth + 'px';  // Set width to match the dragged answer's width
            this.style.height = draggedAnswer.offsetHeight + 'px';  // Set height to match the dragged answer's height

            // Add event listener to allow returning answer back to original position
            enableClickToReturn(draggedAnswer, this);
        }
    });
});

// Function to allow returning the answer to answer-options by clicking it
function enableClickToReturn(answerElement, answerBox) {
    answerElement.addEventListener('click', function() {
        const originalAnswerOptions = document.querySelector('.answer-options.Listening');  // Where answers originate
        originalAnswerOptions.appendChild(answerElement);  // Move the answer back to original container

        // Reset the size of the answer-box to default after the answer is removed
        answerBox.style.width = '100px'; 
        answerBox.style.height = '50px'; 

        // Remove any event listener for returning back
        answerElement.removeEventListener('click', arguments.callee);  
    });
}

// Undo the last move
function undoLastMove() {
    if (previousMoves.length === 0) {
        alert('No moves to undo!');
        return;
    }

    const lastMove = previousMoves.pop();  // Get the last move
    lastMove.from.appendChild(lastMove.answer);  // Move the answer back to its original location

    // Reset the answer box's size
    lastMove.to.style.width = '300px';  // Reset width to default
    lastMove.to.style.height = '50px';  // Reset height to default

    // Re-enable the click event to return the answer to the original position if necessary
    enableClickToReturn(lastMove.answer, lastMove.to);
}

// Allow undo with the 'Undo' button
document.querySelector('.btn.undo').addEventListener('click', undoLastMove);

