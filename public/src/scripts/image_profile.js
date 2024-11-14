// Mendapatkan elemen input file dan gambar profil
const profilePictureInput = document.getElementById('profile-picture');
const profileImage = document.getElementById('profileImage');
const fileStatus = document.getElementById('file-status');

// Event listener untuk mengunggah gambar
profilePictureInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Mendapatkan file gambar yang diunggah
    
    // Pastikan file yang dipilih adalah gambar dan ukurannya <= 1 MB
    if (file && file.size <= 1048576 && file.type.startsWith('image/')) {
        const reader = new FileReader(); // Membaca file gambar

        reader.onload = function(e) {
            profileImage.src = e.target.result; // Menampilkan gambar yang diunggah
            fileStatus.textContent = file.name; // Menampilkan nama file di bawah input
        };

        reader.readAsDataURL(file); // Membaca file sebagai URL
    } else {
        // Menampilkan pesan kesalahan jika file tidak sesuai
        fileStatus.textContent = 'Invalid file or file too large';
        profileImage.src = 'default-profile.png'; // Kembalikan ke gambar default
    }
});
