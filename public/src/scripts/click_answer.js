// // Dapatkan semua tombol dengan kelas 'answer'
// const answerButtons = document.querySelectorAll('.answer');

// answerButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Hapus kelas 'clicked' dari semua tombol
//         answerButtons.forEach(btn => btn.classList.remove('clicked'));
        
//         // Tambahkan kelas 'clicked' pada tombol yang di-click
//         this.classList.add('clicked');
//     });
// });

// clicked_answer.js
// Dapatkan semua tombol dengan kelas 'answer'
const answerButtons = document.querySelectorAll('.answer');

// Fungsi untuk mengatur tombol yang di-klik
answerButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Hapus kelas 'clicked' dari semua tombol
        answerButtons.forEach(btn => btn.classList.remove('clicked'));
        
        // Tambahkan kelas 'clicked' pada tombol yang di-click
        this.classList.add('clicked');
    });
});
