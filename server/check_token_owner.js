const axios = require('axios');
require('dotenv').config({ path: 'c:/Users/Raven Butial/OneDrive/Documents/github-issue/server/.env' });

async function checkToken() {
    const { GITHUB_TOKEN } = process.env;

    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        console.log('Token belongs to user:', response.data.login);
    } catch (error) {
        console.error('Token Error:', error.response?.status, error.response?.data);
    }
}

checkToken();
