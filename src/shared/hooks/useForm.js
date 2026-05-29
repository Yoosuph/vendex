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

  const runValidation = useCallback(
    (vals) => {
      if (validate) {
        const validationErrors = validate(vals);
        setErrors(validationErrors || {});
        return validationErrors;
      }
      return {};
    },
    [validate]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;
      setValues((prev) => ({ ...prev, [name]: fieldValue }));
      // Clear error for this field on change
      setErrors((prev) => {
        if (prev[name]) {
          const next = { ...prev };
          delete next[name];
          return next;
        }
        return prev;
      });
    },
    []
  );

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      // Run validation for this field on blur
      if (validate) {
        setValues((currentValues) => {
          const validationErrors = validate(currentValues);
          setErrors((prev) => ({
            ...prev,
            ...(validationErrors ? { [name]: validationErrors[name] || '' } : {}),
          }));
          return currentValues;
        });
      }
    },
    [validate]
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

  const isRequired = useCallback(
    (name) => {
      // A field is considered "required" if initialValues has it defined (even as empty string)
      return Object.prototype.hasOwnProperty.call(initialValues, name);
    },
    [initialValues]
  );

  const isValid = useMemo(() => {
    const hasErrors = Object.keys(errors).some((key) => errors[key]);
    if (hasErrors) return false;
    // Check that all required fields are filled
    const hasEmptyRequired = Object.keys(initialValues).some(
      (key) => !values[key] && values[key] !== 0 && values[key] !== false
    );
    return !hasEmptyRequired;
  }, [errors, values, initialValues]);

  const handleSubmit = useCallback(
    async (e) => {
      if (e && e.preventDefault) {
        e.preventDefault();
      }

      // Mark all fields as touched
      const allTouched = {};
      Object.keys(initialValues).forEach((key) => {
        allTouched[key] = true;
      });
      setTouched(allTouched);

      // Run full validation
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
    [values, validate, onSubmit, initialValues]
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
