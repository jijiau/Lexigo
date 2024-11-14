// Ambil data dari localStorage dan tampilkan
document.addEventListener('DOMContentLoaded', function() {
    const name = localStorage.getItem('name');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const profileImageSrc = localStorage.getItem('profile-Image');

    // Set nilai yang diambil dari localStorage ke elemen HTML
    if (name) {
        document.getElementById('display-name').innerText = name;
    }
    if (username) {
        document.getElementById('display-username').innerText = username;
    }
    if (email) {
        document.getElementById('display-email').innerText = email;
    }
    if (profileImageSrc) {
        document.getElementById('profileImage').src = profileImageSrc; // Pastikan ID ini benar
    }
});
