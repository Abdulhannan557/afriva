
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import { useAuth } from '@/features/auth/AuthContext';
import { authService } from '@/features/auth/authService';

export default function ProfilePage() {
  const { user } = useAuth();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const firstName = user?.name?.charAt(0)?.toUpperCase() || 'A';

  const updateField = (field, value) => {
    setPasswords((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const clearFields = () => {
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    setMessage('');
    setMessageType('');

    if (isSubmitting) return;

    if (!user?.email) {
      setMessage('Unable to identify your account. Please log in again.');
      setMessageType('error');
      return;
    }

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      setMessage('Please complete all password fields.');
      setMessageType('error');
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage('New password must contain at least 8 characters.');
      setMessageType('error');
      return;
    }

    if (passwords.newPassword.length > 128) {
      setMessage('New password cannot exceed 128 characters.');
      setMessageType('error');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage('New password and confirmation do not match.');
      setMessageType('error');
      return;
    }

    if (passwords.currentPassword === passwords.newPassword) {
      setMessage(
        'Your new password must be different from your current password.'
      );
      setMessageType('error');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await authService.changePassword({
        email: user.email,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setMessage(
        response?.message || 'Password changed successfully!'
      );
      setMessageType('success');

      clearFields();
    } catch (error) {
      const detail = error?.response?.data?.detail;

      setMessage(
        typeof detail === 'string'
          ? detail
          : 'Unable to change password. Please check your current password and try again.'
      );

      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordStrength = passwords.newPassword.length;

  return (
    <div className="profile-page">

      {/* PAGE HEADER */}
      <div className="profile-header">
        <div>
          <span className="profile-eyebrow">ACCOUNT SETTINGS</span>
          <h1>My Profile</h1>
          <p>Manage your personal information and account security.</p>
        </div>

        <Link to="/dashboard" className="profile-back-link">
          ← Back to dashboard
        </Link>
      </div>

      {/* PROFILE SUMMARY */}
      <Card className="profile-summary">
        <div className="profile-avatar">
          {firstName}
        </div>

        <div className="profile-summary-info">
          <h2>{user?.name || 'Customer'}</h2>
          <p>{user?.email || 'No email available'}</p>

          <span className="profile-verified">
            ✓ Email verified
          </span>
        </div>

        <span className="profile-member-label">
          AFRIVA MEMBER
        </span>
      </Card>

      {/* PERSONAL INFORMATION */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <div className="profile-section-icon">♙</div>
          <div>
            <h2>Personal Information</h2>
            <p>Your registered account details.</p>
          </div>
        </div>

        <Card className="profile-information-card">
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <label>Full Name</label>
              <div>{user?.name || 'Not provided'}</div>
            </div>

            <div className="profile-info-item">
              <label>Email Address</label>
              <div>{user?.email || 'Not provided'}</div>
            </div>
          </div>

          <p className="profile-note">
            Your personal information is currently displayed in read-only mode.
          </p>
        </Card>
      </section>

      {/* CHANGE PASSWORD */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <div className="profile-section-icon">⌑</div>
          <div>
            <h2>Change Password</h2>
            <p>Choose a strong password to protect your account.</p>
          </div>
        </div>

        <Card className="profile-password-card">
          <form onSubmit={handlePasswordChange}>

            <div className="profile-field">
              <label htmlFor="currentPassword">
                Current Password
              </label>

              <div className="profile-password-input">
                <input
                  id="currentPassword"
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={passwords.currentPassword}
                  onChange={(event) =>
                    updateField('currentPassword', event.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="newPassword">
                New Password
              </label>

              <div className="profile-password-input">
                <input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  value={passwords.newPassword}
                  onChange={(event) =>
                    updateField('newPassword', event.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="profile-password-strength">
                <div className="profile-strength-track">
                  <span
                    style={{
                      width: `${Math.min(passwordStrength / 12, 1) * 100}%`,
                    }}
                  />
                </div>

                <small>
                  {passwordStrength === 0
                    ? 'Password strength'
                    : passwordStrength < 8
                      ? 'Too short'
                      : passwordStrength < 12
                        ? 'Good length'
                        : 'Length requirement met'}
                </small>
              </div>
            </div>

            <div className="profile-field">
              <label htmlFor="confirmPassword">
                Confirm New Password
              </label>

              <div className="profile-password-input">
                <input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your new password"
                  value={passwords.confirmPassword}
                  onChange={(event) =>
                    updateField('confirmPassword', event.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {message && (
              <div
                className="profile-message"
                role="status"
                data-type={messageType}
              >
                {message}
              </div>
            )}

            <div className="profile-password-actions">
              <button
                type="button"
                className="profile-reset-button"
                disabled={isSubmitting}
                onClick={() => {
                  clearFields();
                  setMessage('');
                  setMessageType('');
                }}
              >
                Clear fields
              </button>

              <button
                type="submit"
                className="profile-save-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Updating...'
                  : 'Update Password →'}
              </button>
            </div>

          </form>
        </Card>
      </section>

      {/* SECURITY */}
      <section className="profile-section">
        <div className="profile-section-heading">
          <div className="profile-section-icon">♢</div>
          <div>
            <h2>Account Security</h2>
            <p>Keep your account protected.</p>
          </div>
        </div>

        <Card className="profile-security-card">
          <div className="profile-security-item">
            <div>
              <strong>Email verification</strong>
              <p>Your email address is verified.</p>
            </div>

            <span className="profile-security-status">
              Verified
            </span>
          </div>

          <div className="profile-security-item">
            <div>
              <strong>Password protection</strong>
              <p>Use a unique password for your Afriva account.</p>
            </div>

            <span className="profile-security-status">
              Enabled
            </span>
          </div>
        </Card>
      </section>

    </div>
  );
}
