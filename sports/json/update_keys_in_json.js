const fetch = require('node-fetch');
const fs = require('fs');

exports.updateSportsJson = async (req, res) => {
    const keysUrl = 'https://allinonereborn.tech/tplay/lic.php?id=24';

    try {
        // Fetch keys data
        const response = await fetch(keysUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch keys data from ${keysUrl}. Status: ${response.status}`);
        }
        const keysData = await response.json();
        const { lic_keyId, lic_key } = keysData;

        // Read existing sports.json
        let jsonString = fs.readFileSync('test.json', 'utf8');
        let jsonData = JSON.parse(jsonString);

        // Update JSON data with extracted keys
        jsonData.kid = lic_keyId;
        jsonData.k = lic_key;

        // Save updated JSON back to sports.json
        fs.writeFileSync('test.json', JSON.stringify(jsonData, null, 2));

        // Respond with success message
        res.status(200).send(`Updated test.json with keys data: kid=${lic_keyId}, k=${lic_key}`);
    } catch (error) {
        console.error('Error updating sports.json:', error);
        res.status(500).send('Error updating test.json. Check logs for details.');
    }
};
