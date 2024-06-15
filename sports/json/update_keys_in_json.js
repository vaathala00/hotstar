const fetch = require('node-fetch');
const fs = require('fs');

async function fetchAndExtractKeys(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch keys data from ${url}. Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching keys data:', error);
        throw error; // Propagate the error up
    }
}

async function updateSportsJson(filename, url) {
    try {
        const keysData = await fetchAndExtractKeys(url);

        // Read existing JSON data from file
        let jsonString = fs.readFileSync(filename, 'utf8');
        let jsonData = JSON.parse(jsonString);

        // Update JSON data with extracted keys
        jsonData.kid = keysData.lic_keyId || '';
        jsonData.k = keysData.lic_key || '';

        // Save updated JSON back to file
        fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));

        console.log(`Updated ${filename} with keys data.`);
        return true; // Return true or a success message if needed
    } catch (error) {
        console.error('Error updating test.json:', error);
        return false; // Return false or handle error appropriately
    }
}

// Example usage:
const keysUrl = 'https://allinonereborn.tech/tplay/lic.php?id=24';
const sportsJsonFile = 'test.json';

updateSportsJson(sportsJsonFile, keysUrl)
    .then(success => {
        if (success) {
            console.log('test.json updated successfully.');
        } else {
            console.error('Failed to update test.json.');
        }
    })
    .catch(error => {
        console.error('Error updating test.json:', error);
    });
