# GitHub Issue Proxy Portal

A secure, full-stack web application that allows users to submit feedback and issues directly to a GitHub repository without requiring them to have GitHub accounts or organization access.

## 🚀 Overview

This project serves as a bridge (proxy) between your users and your GitHub repository. It provides a clean, professional form for users to fill out, which then uses a secure backend to create issues via the GitHub REST API.

### Key Features
- **Secure Integration**: Sensitive GitHub Personal Access Tokens (PAT) are stored safely on the server, never exposed to the frontend.
- **Modern UI**: Clean, responsive design with glassmorphism aesthetics and smooth animations.
- **Rate Limiting**: Built-in protection against spam and automated submissions.
- **Priority Mapping**: Automatically maps form selections to GitHub issue labels (e.g., `priority-low`, `priority-high`).

---

## 🏗️ Architecture

The project is split into two main components:

### 1. Client (Frontend)
- **Technology**: React 19, Vite, TypeScript.
- **Styling**: Vanilla CSS with modern HSL color palettes and Lucide React icons.
- **Role**: Collects user input, performs client-side validation, and sends data to the Proxy Server.

### 2. Server (Backend)
- **Technology**: Node.js, Express.
- **Role**: Receives form data, authenticates with GitHub using a PAT, and creates the issue in the target repository.
- **Middleware**: Includes CORS for frontend interaction and `express-rate-limit` for spam protection.

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Backend Configuration
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   GITHUB_TOKEN=your_fine_grained_pat
   GITHUB_OWNER=your_github_username
   GITHUB_REPO=your_repository_name
   ```

### 2. Frontend Configuration
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### 3. Running the Project
- **Start Backend**: Run `npm run dev` in the `server` directory.
- **Start Frontend**: Run `npm run dev` in the `client` directory.

---

## 🔑 GitHub Token Configuration

To allow the server to create issues, you must generate a **Fine-grained Personal Access Token**:

1. Go to [GitHub Token Settings](https://github.com/settings/tokens?type=beta).
2. Click **Generate new token**.
3. **Repository access**: Select "Only select repositories" and choose your target repo.
4. **Permissions**:
   - Under **Repository permissions**, find **Issues**.
   - Set "Issues" to **Read and Write**.
5. Copy the generated token and paste it into `server/.env`.

---

## 🛡️ Security Note

- **Never** share your `server/.env` file or commit it to version control.
- The `GITHUB_TOKEN` is strictly handled by the `server`. The `client` only knows about your `localhost:5000` endpoint.
- Rate limiting is set to **20 requests per 15 minutes** per IP by default.

---

## 🎨 UI Customization

The main styles are located in `client/src/App.css`. You can easily change the `--primary`, `--bg`, and `--card-bg` CSS variables to match your brand's colors.
