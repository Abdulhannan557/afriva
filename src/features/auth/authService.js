
import { api } from '@/services/apiClient';

export const authService = {
  // Register a new user
  async register({ name, email, password }) {
    const response = await api.post('/auth/register', {
      full_name: name,
      email: email.trim().toLowerCase(),
      password,
    });

    return response;
  },

  // Login an existing user
  async login({ email, password }) {
    const response = await api.post('/auth/login', {
      email: email.trim().toLowerCase(),
      password,
    });

    return {
      user: {
        id: response.user.id,
        name: response.user.full_name,
        email: response.user.email,
        isVerified: response.user.is_verified,
      },
      token: null,
    };
  },

  // Verify email address
  async verifyEmail(token) {
    return api.post(
      `/auth/verify-email?token=${encodeURIComponent(token)}`,
      {}
    );
  },

  // Change account password
  async changePassword({ email, currentPassword, newPassword }) {
    return api.post('/auth/change-password', {
      email: email.trim().toLowerCase(),
      current_password: currentPassword,
      new_password: newPassword,
    });
  },
};
