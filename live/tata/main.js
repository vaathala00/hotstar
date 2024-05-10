 // Function to store the selected group in localStorage
 function saveSelectedGroup(selectedGroup) {
    localStorage.setItem('selectedGroup', selectedGroup);
}

// Function to retrieve the stored selected group from localStorage
function getStoredSelectedGroup() {
    return localStorage.getItem('selectedGroup');
}

// Function to create site-card elements
function createSiteCard(channel) {
    const siteCard = document.createElement('a');
    siteCard.href = `api.html?channel=${encodeURIComponent(channel.channel_name)}`;
    siteCard.className = 'site-card';

    const img = document.createElement('img');
    img.src = `https://tata-logos.pages.dev/logos/${encodeURIComponent(channel.channel_name)}.webp`;
    img.alt = channel.channel_name;

    const siteInfo = document.createElement('div');
    siteInfo.className = 'site-info';

    const h2 = document.createElement('h2');
    h2.textContent = channel.channel_name;

    // Append elements
    siteInfo.appendChild(h2);
    siteCard.appendChild(img);
    siteCard.appendChild(siteInfo);

    return siteCard;
}

// Function to populate site-grid for a specific genre
function populateSiteGrid(genre, channels) {
    const siteGrid = document.getElementById(`${genre.replace(/\s+/g, '-').toLowerCase()}-channels`);
    if (siteGrid) {
        channels.forEach(channel => {
            const siteCard = createSiteCard(channel);
            siteGrid.appendChild(siteCard);
        });
    }
}

// Function to load JSON data and populate site-grids
function loadChannelsFromJSON() {
    fetch('genre_mapping.json')
        .then(response => response.json())
        .then(data => {
            for (const genre in data) {
                if (data.hasOwnProperty(genre)) {
                    populateSiteGrid(genre, data[genre]);
                }
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    // Show loading screen
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';

    // Update the progress bar width
    const loadingBar = document.getElementById('loading-bar');
    loadingBar.style.width = '100%';

    // Hide loading screen after a delay (adjust as needed)
    setTimeout(function () {
        loadingScreen.style.display = 'none';
    }, 1000); // 1000 milliseconds = 1 second

    // Check if there is a stored selected group
    const storedSelectedGroup = getStoredSelectedGroup();
    if (storedSelectedGroup) {
        // Set the selected group in the dropdown
        const selectElement = document.getElementById('channel-dropdown');
        selectElement.value = storedSelectedGroup;

        // Trigger the changeChannelGroup function with the stored value
        changeChannelGroup();
    } else {
        // Trigger the changeChannelGroup function with the default value
        changeChannelGroup();
    }

    // Load channels from external JSON
    loadChannelsFromJSON();
});

function searchChannels() {
    const input = document.getElementById('channel-search').value.toLowerCase();
    const allSiteCards = document.querySelectorAll('.site-card');

    allSiteCards.forEach(card => {
        const channelName = card.querySelector('.site-info h2').innerText.toLowerCase();
        const displayStyle = channelName.includes(input) ? 'flex' : 'none';
        card.style.display = displayStyle;
    });

    // Show all genre-specific channel grids
    const genreGrids = document.querySelectorAll('.site-grid');
    genreGrids.forEach(grid => {
        grid.style.display = 'grid';
    });
}

function changeChannelGroup() {
    const selectElement = document.getElementById('channel-dropdown');
    const selectedGroup = selectElement.options[selectElement.selectedIndex].value;

    // Save the selected group to localStorage
    saveSelectedGroup(selectedGroup);

    // Hide all genre-specific channel grids
    const genreGrids = document.querySelectorAll('.site-grid');
    genreGrids.forEach(grid => {
        grid.style.display = 'none';
    });

    // Show the selected genre-specific channel grid
    const selectedGrid = document.getElementById(`${selectedGroup.replace(/\s+/g, '-').toLowerCase()}-channels`);
    if (selectedGrid) {
        selectedGrid.style.display = 'grid';
    }
}
