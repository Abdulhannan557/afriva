
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AuthForm from '@/features/auth/AuthForm';
import { REGISTER_FORM } from '@/features/auth/authForms';
import { useAuth } from '@/features/auth/AuthContext';
import { ROUTES } from '@/config/routes';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async ({ name, email, password }) => {
    const response = await register({
      name,
      email,
      password,
    });

    setSuccessMessage(
      response.message ||
      'Account created successfully. Please check your email to verify your account.'
    );

    setTimeout(() => {
      navigate(ROUTES.login);
    }, 4000);
  };

  return (
    <div className="register-page">
      <section className="register-panel">

        {/* Editorial image */}
        <div className="register-panel__editorial">
          <div className="register-editorial-content">
            <span>WELCOME TO AFRIVA</span>

            <h2>
              Make room
              <br />
              for better.
            </h2>

            <p>
              Discover a thoughtfully curated collection
              of essentials for your everyday lifestyle.
            </p>

            <div className="register-editorial-line" />

            <small>YOUR STYLE. YOUR EVERYDAY.</small>
          </div>
        </div>

        {/* Registration form or success message */}
        <div className="register-panel__form">

          {!successMessage ? (
            <>
              <div className="register-form-label">
                AFRIVA / CREATE YOUR ACCOUNT
              </div>

              <AuthForm
                config={REGISTER_FORM}
                onSubmit={onSubmit}
                footerText="Already have an account?"
                footerLink={{
                  to: ROUTES.login,
                  label: 'Log in',
                }}
              />

              <p className="register-form-note">
                Join Afriva and discover your everyday essentials.
              </p>
            </>
          ) : (
            <div className="register-success">
              <div className="register-success__icon">✓</div>

              <span>AFRIVA / WELCOME</span>

              <h1>Registration successful!</h1>

              <p>{successMessage}</p>

              <p>
                Please check your inbox and verify your email
                before logging in.
              </p>

              <button
                type="button"
                className="register-success__button"
                onClick={() => navigate(ROUTES.login)}
              >
                Go to Login
              </button>

              <small>
                You will be redirected to login shortly.
              </small>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
