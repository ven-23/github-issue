const axios = require('axios');
require('dotenv').config({ path: 'c:/Users/Raven Butial/OneDrive/Documents/github-issue/server/.env' });

async function testAccess() {
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

    console.log(`Testing access to: ${GITHUB_OWNER}/${GITHUB_REPO}`);

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        console.log('Repo metadata found:', response.data.full_name);
        console.log('Permissions:', response.data.permissions);
    } catch (error) {
        console.error('API Error:', error.response?.status, error.response?.data);
    }
}

testAccess();
