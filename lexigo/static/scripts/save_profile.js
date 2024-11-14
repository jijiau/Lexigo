// Event listener untuk mengganti gambar profil saat file diunggah
document.getElementById('profile-Image').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profile-Image').src = event.target.result;
            document.getElementById('file-status').innerText = file.name;
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk menyimpan data ke localStorage
function saveProfile() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const profileImageSrc = document.getElementById('profile-Image').src;


    // Validasi: Jika ada yang kosong, tampilkan pesan peringatan
    if (!name || !username || !email || !profileImageSrc) {
        alert('Semua bagian harus diisi. Mohon lengkapi semua data.');
        return; // Berhenti di sini jika ada yang kosong
    }

    // Simpan data ke localStorage
    localStorage.setItem('name', name);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('profile-Image', profileImageSrc); // Gambar disimpan

    // Alihkan ke halaman view_profile.html
    window.location.href = 'view_profile.html';
}
