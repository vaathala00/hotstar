const fs = require('fs');
const fetch = require('node-fetch'); // Assuming you have node-fetch installed (`npm install node-fetch`)

// Function to fetch keys data from URL and extract lic_keyId and lic_key
async function fetchAndExtractKeys(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch keys data from ${url}. Status: ${response.status}`);
        }
        const keys_data = await response.json();
        const { lic_keyId, lic_key } = keys_data; // Destructure keys_data to get lic_keyId and lic_key
        return { lic_keyId, lic_key };
    } catch (error) {
        console.error('Error fetching or extracting keys data:', error);
        return { lic_keyId: '', lic_key: '' }; // Return empty values on error
    }
}

// Function to update keys in JSON data
async function updateKeysInJSON(filename, url) {
    try {
        // Fetch and extract keys data
        const { lic_keyId, lic_key } = await fetchAndExtractKeys(url);

        // Read existing JSON data from file
        const jsonString = fs.readFileSync(filename, 'utf8');
        const json_data = JSON.parse(jsonString);

        // Update JSON data with extracted keys
        json_data.kid = lic_keyId;
        json_data.k = lic_key;

        // Save updated JSON back to file
        fs.writeFileSync(filename, JSON.stringify(json_data, null, 2));
        console.log(`Updated ${filename} with keys data.`);
    } catch (error) {
        console.error('Error updating keys in JSON:', error);
    }
}

// Call function to update keys in sports.json
const keysUrl = 'https://allinonereborn.tech/tplay/lic.php?id=78';
updateKeysInJSON('test.json', keysUrl);
