
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { ROUTES } from '@/config/routes';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();

  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    let active = true;

    const verify = async () => {
      const token = searchParams.get('token');

      if (!token) {
        if (active) {
          setStatus('error');
          setMessage('Verification token is missing.');
        }
        return;
      }

      try {
        const response = await verifyEmail(token);

        if (active) {
          setStatus('success');
          setMessage(response.message || 'Your email has been verified successfully.');
        }
      } catch (error) {
        if (active) {
          setStatus('error');
          setMessage(error.message || 'Email verification failed.');
        }
      }
    };

    verify();

    return () => {
      active = false;
    };
  }, [searchParams, verifyEmail]);

  return (
    <div className="container auth">
      <div className="auth-card">
        <h1>
          {status === 'loading' && 'Verifying email'}
          {status === 'success' && 'Email verified!'}
          {status === 'error' && 'Verification failed'}
        </h1>

        <p role="status">{message}</p>

        {status === 'success' && (
          <Link to={ROUTES.login}>Continue to login</Link>
        )}

        {status === 'error' && (
          <Link to={ROUTES.register}>Back to registration</Link>
        )}
      </div>
    </div>
  );
}
