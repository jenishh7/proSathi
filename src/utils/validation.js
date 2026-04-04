import React from "react";

/**
 * Common validation utilities
 * Error messages are returned from this single source of truth
 */

export const validationRules = {
  email: {
    validate: (value) => {
      if (!value) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email";
      return null;
    },
  },
  password: {
    validate: (value) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;
    },
  },
  name: {
    validate: (value) => {
      if (!value) return "Name is required";
      if (value.length < 2) return "Name must be at least 2 characters";
      if (!/^[a-zA-Z\s]*$/.test(value))
        return "Name can only contain letters and spaces";
      return null;
    },
  },
  phone: {
    validate: (value) => {
      if (!value) return "Phone number is required";
      if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) {
        return "Please enter a valid 10-digit phone number";
      }
      return null;
    },
  },
};

/**
 * Get validation error for a field
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @returns {string|null} - Error message or null if valid
 */
export const getValidationError = (fieldName, value) => {
  const rule = validationRules[fieldName];
  if (!rule) return null;
  return rule.validate(value);
};

/**
 * Custom hook for form field validation
 * @param {string} fieldName - Name of the field
 * @param {string} initialValue - Initial value of the field
 * @returns {Object} - Object with value, error, touched, setValue, setTouched handlers
 */
export const useFieldValidation = (fieldName, initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  const [touched, setTouched] = React.useState(false);

  const error = touched ? getValidationError(fieldName, value) : null;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return {
    value,
    setValue,
    error,
    touched,
    setTouched,
    handlers: {
      onChange: handleChange,
      onBlur: handleBlur,
    },
  };
};
