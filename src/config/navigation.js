import { ROUTES } from '@/config/routes';

export const PUBLIC_NAV = [
  { label: 'Home', to: ROUTES.home },
  { label: 'About', to: ROUTES.about },
];

export const DASHBOARD_NAV = [
  { label: 'Overview', to: ROUTES.dashboard, end: true },
  { label: 'Profile', to: ROUTES.profile },
];
