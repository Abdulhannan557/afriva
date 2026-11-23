import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useForm } from '@/hooks/useForm';

export default function AuthForm({ config, onSubmit, footerText, footerLink }) {
  const form = useForm({ initialValues: config.initialValues, schema: config.schema, onSubmit });

  return (
    <Card as="form" className="auth-card" onSubmit={form.handleSubmit} noValidate>
      <h1>{config.title}</h1>
      {config.fields.map((f) => (
        <Input key={f.name} {...f} value={form.values[f.name]} error={form.errors[f.name]} onChange={form.handleChange} />
      ))}
      {form.submitError && <p className="form-error" role="alert">{form.submitError}</p>}
      <Button type="submit" loading={form.submitting} block>{config.submitLabel}</Button>
      <p className="auth-card__footer">{footerText} <Link to={footerLink.to}>{footerLink.label}</Link></p>
    </Card>
  );
}
