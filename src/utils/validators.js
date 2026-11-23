// Small composable validators. Each returns an error string or ''.
export const required = (label) => (v) => (v?.trim() ? '' : `Enter your ${label}`);
export const email = (v) => (/^\S+@\S+\.\S+$/.test(v || '') ? '' : 'Enter a valid email address');
export const minLength = (n) => (v) => ((v || '').length >= n ? '' : `Use at least ${n} characters`);
export const matches = (field, msg) => (v, all) => (v === all[field] ? '' : msg);

// Runs a { field: [validators] } schema and returns { field: error } for failures only.
export function validate(schema, values) {
  return Object.entries(schema).reduce((errors, [field, rules]) => {
    for (const rule of rules) {
      const msg = rule(values[field], values);
      if (msg) { errors[field] = msg; break; }
    }
    return errors;
  }, {});
}
