
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '@/features/auth/AuthForm';
import { LOGIN_FORM } from '@/features/auth/authForms';
import { useAuth } from '@/features/auth/AuthContext';
import { ROUTES } from '@/config/routes';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const from = useLocation().state?.from?.pathname || ROUTES.dashboard;

  const onSubmit = async (values) => {
    await login(values);
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <section className="login-panel">

        <div className="login-panel__form">
          <div className="login-form-label">
            AFRIVA / MEMBER ACCESS
          </div>

          <AuthForm
            config={LOGIN_FORM}
            onSubmit={onSubmit}
            footerText="New to Afriva?"
            footerLink={{
              to: ROUTES.register,
              label: 'Create an account',
            }}
          />

          <p className="login-form-note">
            A considered collection. A better everyday.
          </p>
        </div>

        <div className="login-panel__editorial">
          <div className="login-editorial-content">
            <span>THE AFRIVA EDIT</span>

            <h2>
              Style that feels
              <br />
              like you.
            </h2>

            <p>
              Discover thoughtfully selected essentials
              designed to make every day feel exceptional.
            </p>

            <div className="login-editorial-line" />

            <small>DISCOVER YOUR EVERYDAY STYLE</small>
          </div>
        </div>

      </section>
    </div>
  );
}
