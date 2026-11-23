
import { Routes, Route } from 'react-router-dom';

import { ROUTES } from '@/config/routes';

import MainLayout from '@/components/layout/MainLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

import ProtectedRoute from '@/features/auth/ProtectedRoute';
import GuestRoute from '@/features/auth/GuestRoute';

import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';

import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';
import NotFoundPage from '@/pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<MainLayout />}>
        <Route
          path={ROUTES.home}
          element={<HomePage />}
        />

        <Route
          path={ROUTES.about}
          element={<AboutPage />}
        />

        {/* Email verification */}
        <Route
          path={ROUTES.verifyEmail}
          element={<VerifyEmailPage />}
        />

        {/* Guest-only authentication pages */}
        <Route element={<GuestRoute />}>
          <Route
            path={ROUTES.login}
            element={<LoginPage />}
          />

          <Route
            path={ROUTES.register}
            element={<RegisterPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>

      {/* Protected dashboard pages */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path={ROUTES.dashboard}
            element={<DashboardPage />}
          />

          <Route
            path={ROUTES.profile}
            element={<ProfilePage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
