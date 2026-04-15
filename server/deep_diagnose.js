const axios = require('axios');
require('dotenv').config({ path: 'c:/Users/Raven Butial/OneDrive/Documents/github-issue/server/.env' });

async function diagnose() {
    const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;

    console.log(`--- Diagnostic Report ---`);
    console.log(`Target: ${GITHUB_OWNER}/${GITHUB_REPO}`);

    try {
        // 1. Check Token Identity
        const userRes = await axios.get('https://api.github.com/user', {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        console.log(`Token Owner: ${userRes.data.login}`);

        // 2. Check Repo Accessibility
        const repoRes = await axios.get(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, {
            headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
        });
        console.log(`Repo Found: ${repoRes.data.full_name}`);
        console.log(`Visibility: ${repoRes.data.private ? 'Private' : 'Public'}`);
        console.log(`Permissions:`, repoRes.data.permissions);

    } catch (error) {
        console.error(`Diagnostic Failure: ${error.response?.status} ${error.response?.statusText}`);
        console.error(`Message:`, error.response?.data?.message);
        if (error.response?.status === 404) {
            console.log(`\nPossible causes for 404:`);
            console.log(`1. The repo path ${GITHUB_OWNER}/${GITHUB_REPO} is incorrect.`);
            console.log(`2. The token doesn't have access to this organization/repo.`);
            console.log(`3. If it's a Fine-grained PAT, it hasn't been approved by the organization owner.`);
        }
    }
}

diagnose();
