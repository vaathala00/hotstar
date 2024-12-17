const CHANNELS_PER_PAGE = 50;
let channels = [];
let currentPage = 1;
let currentGroup = 'all';
let searchQuery = '';

// Fetch the local M3U playlist
fetch('tataplay.m3u')
    .then(response => response.ok ? response.text() : Promise.reject(response.statusText))
    .then(data => {
        channels = parseM3U(data);
        populateGroups();
        displayChannels();
    })
    .catch(error => console.error('Error fetching M3U file:', error));

// Parse the M3U file
function parseM3U(data) {
    const lines = data.split('\n');
    const parsedChannels = [];
    let currentChannel = {};

    lines.forEach(line => {
        line = line.trim();

        if (line.startsWith('#EXTINF:')) {
            // Push the last channel if there's any
            if (currentChannel.name) parsedChannels.push(currentChannel);
            
            currentChannel = {}; // Reset for the new channel

            const nameMatch = line.match(/,(.+)$/);
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            const groupMatch = line.match(/group-title="([^"]*)"/);

            if (nameMatch) currentChannel.name = nameMatch[1].trim();
            currentChannel.logo = logoMatch ? logoMatch[1] : '';
            currentChannel.group = groupMatch ? groupMatch[1] : 'Ungrouped';
        } else if (line && !line.startsWith('#')) {
            currentChannel.url = line;
        }
    });

    // Push the last channel if it exists
    if (currentChannel.name) parsedChannels.push(currentChannel);
    return parsedChannels;
}

// Populate group select options
function populateGroups() {
    const groupSelect = document.getElementById('group-select');
    const groups = Array.from(new Set(channels.map(channel => channel.group || 'Ungrouped')));
    groups.forEach(group => {
        const option = document.createElement('option');
        option.value = group;
        option.textContent = group;
        groupSelect.appendChild(option);
    });
}

// Display channels with pagination, search, and group filter
function displayChannels() {
    const container = document.getElementById('channel-list');
    container.innerHTML = ''; // Clear current channels

    const filteredChannels = channels.filter(channel =>
        (currentGroup === 'all' || channel.group === currentGroup) &&
        (!searchQuery || channel.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const start = (currentPage - 1) * CHANNELS_PER_PAGE;
    const end = Math.min(start + CHANNELS_PER_PAGE, filteredChannels.length);
    const pageChannels = filteredChannels.slice(start, end);

    pageChannels.forEach(channel => {
        const channelDiv = document.createElement('div');
        channelDiv.classList.add('channel');
        channelDiv.innerHTML = `
            <img src="${channel.logo || 'path/to/default_logo.png'}" alt="${channel.name}" class="channel-logo" onclick="playStream('${encodeURIComponent(channel.url)}', '${encodeURIComponent(channel.name)}')">
            <p>${channel.name}</p>
        `;
        container.appendChild(channelDiv);
    });

    // Update pagination info
    document.getElementById('page-info').textContent = `Page ${currentPage} of ${Math.ceil(filteredChannels.length / CHANNELS_PER_PAGE)}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = end >= filteredChannels.length;
}

// Handle search input
document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    displayChannels();
});

// Handle group selection
document.getElementById('group-select').addEventListener('change', (e) => {
    currentGroup = e.target.value === 'all' ? 'all' : e.target.value;
    currentPage = 1;
    displayChannels();
});

// Pagination controls
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayChannels();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const maxPage = Math.ceil(channels.filter(channel =>
        (currentGroup === 'all' || channel.group === currentGroup) &&
        (!searchQuery || channel.name.toLowerCase().includes(searchQuery.toLowerCase()))
    ).length / CHANNELS_PER_PAGE);
    
    if (currentPage < maxPage) {
        currentPage++;
        displayChannels();
    }
});

// Play stream with proxy
function playStream(url, name) {
    const proxyUrl = `player?url=${encodeURIComponent(url)}&name=${encodeURIComponent(name)}`;
    window.location.href = proxyUrl;
}
