// Comprehensive validation using Regular Expressions

export const ValidationRegex = {
  // Email validation - RFC 5322 compliant
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  
  // Password - At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  
  // Name - Only letters, spaces, hyphens, apostrophes (2-50 chars)
  name: /^[a-zA-Z\s\-']{2,50}$/,
  
  // Phone - International format with optional country code
  phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
  
  // URL validation
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  
  // Price - Decimal number with up to 2 decimal places
  price: /^\d+(\.\d{1,2})?$/,
  
  // Product name - Alphanumeric with spaces and common punctuation
  productName: /^[a-zA-Z0-9\s\-&'().,]{3,100}$/,
  
  // Zip code - US format
  zipCode: /^\d{5}(-\d{4})?$/,
  
  // Credit card number - Basic format
  creditCard: /^\d{13,19}$/,
  
  // CVV - 3 or 4 digits
  cvv: /^\d{3,4}$/
};

export const validateField = (field, value, customRegex = null) => {
  const regex = customRegex || ValidationRegex[field];
  if (!regex) return { isValid: false, message: 'Invalid field type' };
  
  const isValid = regex.test(value);
  return {
    isValid,
    message: isValid ? '' : getErrorMessage(field, value)
  };
};

const getErrorMessage = (field, value) => {
  switch (field) {
    case 'email':
      return 'Please enter a valid email address (e.g., user@example.com)';
    case 'password':
      return 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    case 'name':
      return 'Name must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes';
    case 'phone':
      return 'Please enter a valid phone number (e.g., +1234567890 or 1234567890)';
    case 'url':
      return 'Please enter a valid URL starting with http:// or https://';
    case 'price':
      return 'Please enter a valid price (e.g., 10.99)';
    case 'productName':
      return 'Product name must be 3-100 characters with letters, numbers, and basic punctuation';
    case 'zipCode':
      return 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
    case 'creditCard':
      return 'Please enter a valid credit card number (13-19 digits)';
    case 'cvv':
      return 'Please enter a valid CVV (3-4 digits)';
    default:
      return 'Invalid input format';
  }
};

export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = formData[field];

    // Required field check
    if (rule.required && (!value || value.toString().trim() === '')) {
      errors[field] = `${rule.label || field} is required`;
      isValid = false;
      return;
    }

    // Skip validation if field is empty and not required
    if (!value || value.toString().trim() === '') return;

    // Regex validation
    if (rule.regex) {
      const validation = validateField(field, value, rule.regex);
      if (!validation.isValid) {
        errors[field] = rule.message || validation.message;
        isValid = false;
      }
    }

    // Custom validation function
    if (rule.validate && typeof rule.validate === 'function') {
      const customValidation = rule.validate(value, formData);
      if (!customValidation.isValid) {
        errors[field] = customValidation.message;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};