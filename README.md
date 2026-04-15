# Issue Builder 🛠️

A high-fidelity, professional issue-building platform that allows anyone to submit feedback and issues directly to your GitHub repository—no GitHub account or organization access required.

## 🚀 Overview

Issue Builder is designed for teams that want to bridge the gap between their non-technical users and their technical issue trackers. It provides a secure, streamlined "Studio" where users can construct clear, actionable issues that are then securely proxied to your private repository via the GitHub REST API.

### Key Features
- **Elite Senior UI/UX**: A clean 2-column "Studio" layout with professional design tokens, high-fidelity spacing, and responsive aesthetics.
- **Secure End-to-End**: Your GitHub Personal Access Tokens (PAT) are stored safely on the server and never exposed to the client.
- **Hexagonal Engineering Identity**: Unique, custom-branded SVG logo and interface.
- **Priority Intelligence**: Automatically maps priority levels to GitHub issue labels (`priority-low`, `priority-high`).
- **Spam Protection**: Built-in rate limiting and input validation.

---

## 🏗️ Architecture

- **Client (Frontend)**: React 19, Vite, TypeScript, Lucide Icons, Custom SVG Branding.
- **Server (Backend)**: Node.js, Express, Axios, GitHub REST API v3.
- **Security**: Cross-Origin Resource Sharing (CORS) and `express-rate-limit`.

---

## 🛠️ Setup & Installation

### 1. Backend Configuration
1. Navigate to `server/` and run `npm install`.
2. Create a `.env` file:
   ```env
   PORT=5000
   GITHUB_TOKEN=your_fine_grained_pat
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=your_repository_name
   ```

### 2. Frontend Configuration
1. Navigate to `client/` and run `npm install`.

### 3. Running Locally
- Run `npm run dev` in both `client/` and `server/` directories.

---

## 🔑 GitHub Configuration

For the best experience, use a **Personal Access Token (Classic)**:
1. Go to [GitHub Token Settings (Classic)](https://github.com/settings/tokens).
2. Generate a new token with the **`repo`** scope.
3. Update your `server/.env` and restart the server.

---

## 🛡️ Security & Privacy

Issue Builder includes comprehensive `.gitignore` protection to ensure your sensitive credentials and local dependencies are never pushed to public version control.

---

© 2026 Issue Builder Studio • Secure SSL Endpoint • Powered by GitHub REST v3
