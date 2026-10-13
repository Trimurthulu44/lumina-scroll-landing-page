import { useState } from 'react';

export const useForm = (initialValues = {}, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (validate) {
      const fieldErrors = validate({ ...values, [name]: value });
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name] || ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (validate) {
      const fieldErrors = validate(values);
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name] || ''
      }));
    }
  };

  const handleSubmit = async (e, onSubmitSuccess) => {
    if (e && e.preventDefault) e.preventDefault();

    // Mark all touched
    const touchedAll = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(touchedAll);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      const hasErrors = Object.values(validationErrors).some((err) => !!err);
      if (hasErrors) return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmitSuccess) {
        await onSubmitSuccess(values);
      }
      setIsSubmitted(true);
      // Reset form after successful submission
      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    setIsSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues
  };
};
