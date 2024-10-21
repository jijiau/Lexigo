document.querySelector('.btn-check').addEventListener('click', function() {
    // Dapatkan elemen yang dipilih
    const selectedAnswer = document.querySelector('.answer.clicked');
    
    // Jika tidak ada jawaban yang dipilih, tampilkan pesan error (opsional)
    if (!selectedAnswer) {
        alert('Please select an answer before checking.');
        return;
    }

    // Menampilkan feedback footer
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'flex'; // Menampilkan feedback

    // Setelah menekan "Continue", kita bisa lanjut ke pertanyaan berikutnya
    // Atau memperbarui status jawaban yang benar/salah
});

function continueQuiz() {
    // Logika untuk lanjut ke pertanyaan berikutnya
    alert("Lanjut ke pertanyaan berikutnya.");
    
    // Sembunyikan feedback footer setelah lanjut
    document.getElementById('feedback').style.display = 'none';
}
