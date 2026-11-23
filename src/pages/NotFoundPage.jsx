import Section from '@/components/common/Section';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';

export default function NotFoundPage() {
  return (
    <Section title="Page not found">
      <p className="lead">The page you opened doesn’t exist or was moved.</p>
      <Button to={ROUTES.home}>Back to home</Button>
    </Section>
  );
}
