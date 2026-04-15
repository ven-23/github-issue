import React, { useState } from 'react';
import axios from 'axios';
import {
  User,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import './App.css';

// Custom Unique SVG Logo for Issue Builder (Hexagonal Engineering Mark)
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2L24.3923 8V20L14 26L3.6077 20V8L14 2Z" fill="var(--color-success-emphasis)" />
    <path d="M14 7V13M14 21V19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 10L14 13L18 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Custom GitHub SVG Logo
const GithubLogo = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface FormState {
  title: string;
  description: string;
  name: string;
  email: string;
  priority: 'Low' | 'Medium' | 'High';
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    title: '',
    description: '',
    name: '',
    email: '',
    priority: 'Medium',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setStatus({ type: 'error', message: 'Title and Description are required.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Submitting issue to GitHub...' });

    try {
      await axios.post('http://localhost:5000/api/create-issue', formData);

      setStatus({
        type: 'success',
        message: 'Issue successfully created! Thank you for your feedback.'
      });

      setFormData({
        title: '',
        description: '',
        name: '',
        email: '',
        priority: 'Medium',
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to connect to the server. Please try again.';
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  return (
    <div className="app-container">
      <div className="top-nav">
        <div className="nav-brand">
          <Logo />
          <span>Issue Builder</span>
        </div>
        <div className="nav-partner">
          <span className="partner-label">Powered by</span>
          <GithubLogo size={20} className="github-icon" />
        </div>
      </div>

      <div className="main-layout">
        <div className="form-column">
          <div className="card editor-card">
            <div className="card-header">
              <span className="editor-title">Create New Issue</span>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label htmlFor="title">Issue Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="title-input"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Detailed Description</label>
                <div className="editor-container">
                  <textarea
                    id="description"
                    name="description"
                    className="description-editor"
                    placeholder="Leave a comment"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                  <div className="editor-footer">
                    <span>Your feedback helps us build better tools.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <div className="status-placeholder">
                {status.type !== 'idle' && (
                  <div className={`status-badge ${status.type}`}>
                    {status.type === 'loading' && <div className="loader"></div>}
                    {status.type === 'success' && <CheckCircle2 size={14} />}
                    {status.type === 'error' && <AlertCircle size={14} />}
                    {status.message}
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="submit-btn"
                disabled={status.type === 'loading'}
              >
                {status.type === 'loading' ? 'Submitting...' : 'Submit new issue'}
              </button>
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          <div className="sidebar-section">
            <div className="section-header">
              <ShieldAlert size={16} />
              <span>Priority Level</span>
            </div>
            <select
              id="priority"
              name="priority"
              className="sidebar-select"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <User size={16} />
              <span>Submitter Info</span>
            </div>
            <div className="sidebar-input-group">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name (Optional)"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email (Optional)"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="sidebar-info">
            <div className="info-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--color-fg-muted)', fontSize: '12px', fontWeight: 600 }}>
              <GithubLogo size={14} />
              <span>GitHub Integration</span>
            </div>
            <p>Your submission will be securely proxied to our private GitHub repository via REST API.</p>
          </div>
        </div>
      </div>

      <div className="app-footer">
        © 2026 Issue Builder • <span className="secure-tag">Secure SSL Endpoint</span>
      </div>
    </div>
  );
};

export default App;
