document.addEventListener('DOMContentLoaded', function () {
    async function fetchMovies() {
        try {
            const response = await fetch('movies.json');
            if (!response.ok) {
                throw new Error('Failed to fetch movies.json');
            }
            const movies = await response.json();
            return movies;
        } catch (error) {
            console.error('Error fetching movies.json:', error.message);
            return [];
        }
    }

    async function initializeVideoPlayerById(id) {
        const movies = await fetchMovies();
        const videoData = movies.find(video => video.id == id);

        if (!videoData) {
            console.error('Video data not found for id ' + id);
            return;
        }

        const player = new Plyr('#player');
        const source = document.createElement('source');
        source.src = videoData.link.replace('.mkv', '.mp4'); // Assuming link is adjusted
        source.type = 'video/mp4';
        document.getElementById('player').appendChild(source);

        // Update file name
        document.getElementById('fileName').textContent = videoData.title;

        // Update file description
        document.getElementById('fileSize').textContent = videoData.description;

        // Update vlc link
        const openInVLCButton = document.getElementById('openInVLCButton');
        openInVLCButton.addEventListener('click', function() {
            vlc_player(videoData.link);
        });

        // Update square image
        const squareImage = document.getElementById('squareImage');
        squareImage.src = videoData.image;
        squareImage.alt = "Square Image"; // Update alt text as needed

        // Update download link
        const downloadLink = document.getElementById('download-link');
        downloadLink.href = videoData.download;
        downloadLink.setAttribute('download', videoData.title + '.mp4');
    }

    // Get id parameter from URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    var id = getUrlParameter('id');
    initializeVideoPlayerById(id);
});
