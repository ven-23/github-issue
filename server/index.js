const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting (Prevent Spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per window
  message: { error: 'Too many submissions from this IP, please try again later.' },
});

app.use('/api', limiter);

// Endpoint: Create GitHub Issue
app.post('/api/create-issue', async (req, res) => {
  const { title, description, name, email, priority } = req.body;

  // 1. Validation
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and Description are required.' });
  }

  // 2. Format Issue Body
  const submittedBy = name || 'Anonymous';
  const contactEmail = email || 'N/A';
  
  const issueBody = `
### Submission Details
**Submitted by:** ${submittedBy}
**Email:** ${contactEmail}
**Priority:** ${priority || 'Medium'}

---

### Description
${description}

---
*Generated via GitHub Issue Proxy*
  `;

  // 3. GitHub API Config
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.GITHUB_OWNER;
  const REPO = process.env.GITHUB_REPO;

  if (!GITHUB_TOKEN || !OWNER || !REPO) {
    console.error('Missing GitHub configuration in server environment.');
    return res.status(500).json({ error: 'Server configuration error. Please contact the administrator.' });
  }

  try {
    const response = await axios.post(
      `https://api.github.com/repos/${OWNER}/${REPO}/issues`,
      {
        title: title,
        body: issueBody,
        labels: ['user-submitted', `priority-${(priority || 'medium').toLowerCase()}`],
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );

    res.status(201).json({
      message: 'Issue successfully created!',
      issueUrl: response.data.html_url,
    });
  } catch (error) {
    console.error('GitHub API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: 'Failed to create GitHub issue.',
      details: error.response?.data?.message || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
