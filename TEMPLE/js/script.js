// Ayyarvattom Temple Script

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Vazhipadu Live Search
    const searchInput = document.getElementById('vazhipaduSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const rows = document.querySelectorAll('.vazhipadu-table tbody tr');

            rows.forEach(row => {
                const text = row.querySelector('.item-name').textContent.toLowerCase();
                if (text.includes(query)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // 3. Audio Player with Autoplay Handling
    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicIcon = document.getElementById('musicIcon');
    const musicText = document.getElementById('musicText');

    let isPlaying = false;

    function playAudio() {
        if (!bgMusic) return;
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggleBtn.classList.add('playing');
            musicIcon.className = 'fa-solid fa-volume-high';
            musicText.textContent = 'പാട്ട് ഓഫ് ചെയ്യാം';
        }).catch(err => {
            console.log('Autoplay restriction active. Waiting for user interaction.');
            isPlaying = false;
            musicToggleBtn.classList.remove('playing');
            musicIcon.className = 'fa-solid fa-music';
            musicText.textContent = 'പ്ലേ പാട്ട്';
        });
    }

    function pauseAudio() {
        if (!bgMusic) return;
        bgMusic.pause();
        isPlaying = false;
        musicToggleBtn.classList.remove('playing');
        musicIcon.className = 'fa-solid fa-volume-xmark';
        musicText.textContent = 'പ്ലേ പാട്ട്';
    }

    // Attempt autoplay on load
    playAudio();

    // Browser policy: First user click/scroll starts music if browser blocked autoplay
    const startAudioOnFirstClick = () => {
        if (!isPlaying) {
            playAudio();
        }
        document.removeEventListener('click', startAudioOnFirstClick);
        document.removeEventListener('scroll', startAudioOnFirstClick);
    };

    document.addEventListener('click', startAudioOnFirstClick, { once: true });
    document.addEventListener('scroll', startAudioOnFirstClick, { once: true });

    // Floating button manual toggle
    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }
});
