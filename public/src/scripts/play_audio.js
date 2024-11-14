// Get the audio element
const audioElement = document.getElementById('audioElement');

// Get the listen button
const listenButton = document.querySelector('.listen-btn');

// Add event listener to the button
listenButton.addEventListener('click', function() {
    audioElement.play(); // Play the audio when the button is clicked
});
