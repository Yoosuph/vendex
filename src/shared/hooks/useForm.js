import { useState, useCallback, useMemo } from 'react';

/**
 * Reusable form validation hook.
 *
 * @param {Object} options
 * @param {Object} options.initialValues - Initial form field values
 * @param {Function} options.validate - Validation function (values) => errors object
 * @param {Function} options.onSubmit - Submission handler (values) => void | Promise
 * @returns {Object} Form state and handlers
 */
export default function useForm({ initialValues = {}, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({ ...prev, [name]: fieldValue }));
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      if (validate) {
        const validationErrors = validate(values);
        setErrors((prev) => ({
          ...prev,
          ...(validationErrors ? { [name]: validationErrors[name] || '' } : {}),
        }));
      }
    },
    [validate, values],
  );

  const setFieldValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const isValid = useMemo(() => {
    if (validate) {
      const validationErrors = validate(values);
      return !validationErrors || Object.keys(validationErrors).length === 0;
    }
    return !Object.keys(errors).some((key) => errors[key]);
  }, [errors, values, validate]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      const allTouched = {};
      Object.keys(initialValues).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      const validationErrors = validate ? validate(values) : {};
      setErrors(validationErrors || {});

      if (validationErrors && Object.keys(validationErrors).length > 0) {
        return;
      }

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit, initialValues],
  );

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    isValid,
    isSubmitting,
  };
}

