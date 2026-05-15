// Track data
const initialTracks = [
    { title: 'MONTAGEM OBSIDIAN', duration: '2:45', url: 'https://youtu.be/Rdy-ZPtEAeI' },
    { title: 'AURA DO MAL', duration: '3:12', url: 'https://youtu.be/Gu0Gvu9iOIs' }
];

let tracks = [...initialTracks];
let currentTrackTitle = document.querySelector('.track-title');
let currentTrackArtist = document.querySelector('.track-artist');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTracks();
    setupEventListeners();
});

// Render tracks
function renderTracks() {
    const tracksList = document.getElementById('tracks-list');
    tracksList.innerHTML = '';

    tracks.forEach(track => {
        const trackRow = document.createElement('div');
        trackRow.className = 'track-row';
        trackRow.innerHTML = `
            <div class="track-info">
                <div class="track-name">${track.title}</div>
                <div class="track-duration">${track.duration}</div>
            </div>
            <button class="play-track-btn">Play</button>
        `;

        trackRow.querySelector('.play-track-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            playTrack(track);
        });

        tracksList.appendChild(trackRow);
    });
}

// Play track
function playTrack(track) {
    currentTrackTitle.textContent = track.title;
    window.open(track.url, '_blank');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Upload button
    document.querySelector('.upload-btn').addEventListener('click', () => {
        openUploadModal();
    });

    // Upload modal
    const modal = document.getElementById('uploadModal');
    document.querySelector('.close-btn').addEventListener('click', closeUploadModal);
    document.getElementById('confirmUpload').addEventListener('click', addTrack);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeUploadModal();
    });

    // Player play button
    document.querySelector('.play-btn').addEventListener('click', () => {
        if (currentTrackTitle.textContent !== 'Select a Track') {
            const track = tracks.find(t => t.title === currentTrackTitle.textContent);
            if (track) playTrack(track);
        }
    });
}

// Switch section
function switchSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });
}

// Upload modal
function openUploadModal() {
    document.getElementById('uploadModal').classList.add('active');
}

function closeUploadModal() {
    document.getElementById('uploadModal').classList.remove('active');
    document.getElementById('trackTitle').value = '';
}

function addTrack() {
    const title = document.getElementById('trackTitle').value;
    if (title.trim() !== '') {
        tracks.push({ title, duration: '3:00', url: 'https://youtube.com' });
        renderTracks();
        closeUploadModal();
    }
}
