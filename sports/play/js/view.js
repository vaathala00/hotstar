
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

        // Initialize the new Visits counter
        const visitsInitScript = document.createElement('script');
        visitsInitScript.type = 'text/javascript';
        visitsInitScript.innerHTML = 'sc_text_hit(1705275, "Visits", "f0f0f0");'; 
        counterContainer.appendChild(visitsInitScript);

        // Add the separator (|) in white color between the counters
        const separator = document.createElement('span');
        separator.style.margin = '0 10px';
        separator.style.color = 'white';  // White color for the separator
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



  // Load external HTML content into the body
        fetch('view.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('content-placeholder').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading views:', error);
            });
