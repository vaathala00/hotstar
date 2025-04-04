
    function refreshCounters() {
        // Find the counter container
        const counterContainer = document.getElementById("counter-container");

        // Clear previous counter content
        counterContainer.innerHTML = '';

        // Add new Visits counter script
        const visitsScript = document.createElement('script');
        visitsScript.type = 'text/javascript';
        visitsScript.src = "//widget.supercounters.com/ssl/texthit.js";
        counterContainer.appendChild(visitsScript);


// Add the separator (|) in white color between the counters
    const separator = document.createElement('span');
    separator.classList.add('separator'); // Make sure it uses the .separator styling
    separator.textContent = '|';  // The separator
    counterContainer.appendChild(separator);

        // Add new Live counter script
        const liveScript = document.createElement('script');
        liveScript.type = 'text/javascript';
        liveScript.src = "//widget.supercounters.com/ssl/online_t.js";
        counterContainer.appendChild(liveScript);

        // Initialize the new Live counter
        const liveInitScript = document.createElement('script');
        liveInitScript.type = 'text/javascript';
        liveInitScript.innerHTML = 'sc_online_t(1703136, "Live ↑", "f0f0f0");'; 
        counterContainer.appendChild(liveInitScript);
    }

    // Refresh the counters every 20 seconds (20000 milliseconds)
    setInterval(refreshCounters, 20000);



  