/**
 * Common Validation Message Component
 * Display validation error messages consistently across the app
 */
export const ValidationMessage = ({ error, touched }) => {
  if (!error || !touched) return null;

  return <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>;
};
