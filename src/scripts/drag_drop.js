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
            this.appendChild(draggedAnswer);  // Append the dragged answer
            addDeleteButton(draggedAnswer);  // Add the delete button (X)
        }
    });
});

// Function to add a delete button (X) to the dragged element
function addDeleteButton(answerElement) {
    // Create delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.innerText = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.style.marginLeft = '10px';  // Styling tombol X

    // Event listener for delete button
    deleteBtn.addEventListener('click', function() {
        // Remove the answer element from the answer-box
        const originalAnswerOptions = document.querySelector('.answer-options.Listening');  // Where answers originate
        originalAnswerOptions.appendChild(answerElement);  // Move back to original container
        removeDeleteButton(answerElement);  // Remove the delete button once moved back
    });

    answerElement.appendChild(deleteBtn);  // Append the delete button to the answer element
}

// Function to remove delete button (X)
function removeDeleteButton(answerElement) {
    const deleteBtn = answerElement.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.remove();  // Remove the delete button from the answer element
    }
}
s