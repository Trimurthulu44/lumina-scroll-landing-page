/**
 * Standard validators for forms
 */
export const validateRequired = (val) => {
  return val && val.trim().length > 0;
};

export const validateEmail = (val) => {
  if (!val) return false;
  // RFC 5322 standard regex
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return regex.test(val.trim());
};

export const validatePhone = (val) => {
  if (!val || val.trim() === '') return true; // Phone is optional
  const cleanPhone = val.replace(/[\s()-]/g, '');
  return /^\+?[0-9]{7,15}$/.test(cleanPhone);
};

export const validateMinLength = (val, min = 3) => {
  return !!val && val.trim().length >= min;
};
