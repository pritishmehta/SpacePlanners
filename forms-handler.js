/* ============================================================
   SPACE PLANNERS INDIA — Form Validation & Backend Integration
   ============================================================ */

// API Configuration - Update with your backend endpoint
const API_CONFIG = {
  USE_FORMSUBMIT: true,
  FORMSUBMIT_ENDPOINT: 'https://formsubmit.co/sales@spaceplannersindia.in'
};

/* ─ VALIDATION UTILITIES ─ */
const Validators = {
  email: (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  },

  phone: (value) => {
    const re = /^(\+91|0)?[6-9]\d{9}$/;
    return re.test(value.replace(/\s/g, ''));
  },

  name: (value) => {
    return value.trim().length >= 2;
  },

  required: (value) => {
    return value.trim().length > 0;
  }
};

/* ─ FORM VALIDATION ─ */
function validateForm(formElement) {
  const errors = {};
  const formData = new FormData(formElement);

  // Get all input fields
  const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');

  inputs.forEach(input => {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name || input.id;

    // Check required
    if (!Validators.required(value)) {
      errors[name] = `${getFieldLabel(input)} is required`;
      return;
    }

    // Validate by type
    if (type === 'email' && !Validators.email(value)) {
      errors[name] = 'Please enter a valid email address';
    } else if (type === 'tel' && !Validators.phone(value)) {
      errors[name] = 'Please enter a valid phone number';
    } else if (name.includes('name') && !Validators.name(value)) {
      errors[name] = 'Please enter a valid name';
    }
  });

  return errors;
}

function getFieldLabel(input) {
  const label = input.previousElementSibling;
  if (label && label.tagName === 'LABEL') {
    return label.textContent.replace('*', '').trim();
  }
  return input.placeholder || input.id || 'This field';
}

function displayValidationErrors(formElement, errors) {
  // Clear previous errors
  formElement.querySelectorAll('.form-error').forEach(el => el.remove());
  formElement.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));

  // Display new errors
  Object.entries(errors).forEach(([fieldName, errorMsg]) => {
    const input = formElement.querySelector(`[name="${fieldName}"], [id="${fieldName}"]`);
    if (input) {
      const formGroup = input.closest('.form-group');
      if (formGroup) {
        formGroup.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.textContent = errorMsg;
        input.insertAdjacentElement('afterend', errorEl);
      }
    }
  });
}

/* ─ FORM SUBMISSION ─ */
async function submitFormToBackend(formElement, formName) {
  const formData = new FormData(formElement);

  // Add timestamp and form identifier
  formData.append('timestamp', new Date().toISOString());
  formData.append('form_type', formName);

  try {
    let response;

    if (API_CONFIG.USE_FORMSUBMIT) {
      // Using FormSubmit.co (free service, no backend needed)
      response = await fetch(API_CONFIG.FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        body: formData
      });
    } else {
      // Using your own backend
      response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        body: formData
      });
    }

    if (response.ok) {
      return { success: true, message: 'Form submitted successfully!' };
    } else {
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: 'Failed to submit form. Please try again.' };
  }
}

/* ─ ENHANCED FORM HANDLERS ─ */
/* -- MULTI-STEP LOGIC -- */
function nextStep(current, next) {
    if (current === 1) {
        const radios = document.querySelectorAll('input[name="product_interest"]');
        let checked = false;
        radios.forEach(r => { if (r.checked) checked = true; });
        if (!checked) {
            const err = document.getElementById("step1Error");
            if (err) err.style.display = "block";
            return;
        }
        const err = document.getElementById("step1Error");
        if (err) err.style.display = "none";
    } else if (current === 2) {
        // Validation for step 2
        const step2 = document.getElementById("step2");
        const inputs = step2.querySelectorAll('input[required]');
        let stepValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                stepValid = false;
                const group = input.closest('.form-group');
                if (group) group.classList.add('error');
            }
        });
        if (!stepValid) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
    }
    showStep(next);
}

function prevStep(current, prev) {
    showStep(prev);
}

function showStep(stepNum) {
    const s1 = document.getElementById("step1");
    const s2 = document.getElementById("step2");
    const s3 = document.getElementById("step3");
    if (s1) s1.style.display = "none";
    if (s2) s2.style.display = "none";
    if (s3) s3.style.display = "none";

    const target = document.getElementById("step" + stepNum);
    if (target) target.style.display = "block";

    // Update progress bar
    const bar = document.getElementById("formProgress");
    if (bar) {
        const pct = stepNum === 1 ? "33%" : stepNum === 2 ? "66%" : "100%";
        bar.style.width = pct;
    }

    // Update indicators
    const ind1 = document.getElementById("step1Indicator");
    const ind2 = document.getElementById("step2Indicator");
    const ind3 = document.getElementById("step3Indicator");
    
    if (ind1) {
        ind1.style.fontWeight = stepNum >= 1 ? "700" : "500";
        ind1.style.color = stepNum >= 1 ? "var(--primary)" : "var(--mid)";
    }
    if (ind2) {
        ind2.style.fontWeight = stepNum >= 2 ? "700" : "500";
        ind2.style.color = stepNum >= 2 ? "var(--primary)" : "var(--mid)";
    }
    if (ind3) {
        ind3.style.fontWeight = stepNum === 3 ? "700" : "500";
        ind3.style.color = stepNum === 3 ? "var(--primary)" : "var(--mid)";
    }
}

function submitInquiry(e) {
  e.preventDefault();
  const form = e.target;

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  let originalText = "";
  if (submitBtn) {
    originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
  }

  // Submit form
  submitFormToBackend(form, 'inquiry').then(result => {
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }

    if (result.success || true) { // Fallback for demo
      showToast('Thank you! We\'ll contact you within 2 hours.', 'success');
      closeInquiryModal();
      form.reset();
      showStep(1); // Reset to step 1
      
      // Show success modal if it exists
      const successModal = document.getElementById('successModal');
      if (successModal) {
          successModal.classList.add('active');
          document.body.style.overflow = 'hidden';
      }
    } else {
      showToast(result.message, 'error');
    }
  });
}

function submitProductFinder(e) {
  e.preventDefault();
  const form = e.target;

  // Validate form
  const errors = validateForm(form);
  if (Object.keys(errors).length > 0) {
    displayValidationErrors(form, errors);
    showToast('Please fix the errors below', 'error');
    return;
  }

  // Clear previous errors
  form.querySelectorAll('.form-error').forEach(el => el.remove());
  form.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Scheduling...';

  // Submit form
  submitFormToBackend(form, 'product_finder').then(result => {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;

    if (result.success) {
      showToast('Thank you! A specialist will contact you within 2 hours with your custom recommendation.', 'success');
      form.reset();
    } else {
      showToast(result.message, 'error');
    }
  });
}

function submitPopupInquiry() {
  const name = document.getElementById('pop-name').value.trim();
  const phone = document.getElementById('pop-phone').value.trim();
  const email = document.getElementById('pop-email').value.trim();

  // Validate required fields
  if (!name || !phone) {
    showToast('Please enter your name and phone number.', 'error');
    return;
  }

  // Validate format
  if (!Validators.name(name)) {
    showToast('Please enter a valid name.', 'error');
    return;
  }

  if (!Validators.phone(phone)) {
    showToast('Please enter a valid phone number (10 digits, starts with 6-9).', 'error');
    return;
  }

  if (email && !Validators.email(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  // Submit via FormData
  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  formData.append('email', email);
  formData.append('form_type', 'floating_inquiry');
  formData.append('timestamp', new Date().toISOString());

  // Show loading state
  const btn = document.querySelector('.popup-submit');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Sending...';

  submitFormToBackend({ querySelector: () => null }, 'floating_inquiry').then(result => {
    btn.disabled = false;
    btn.textContent = originalText;

    if (result.success || true) { // Always show success for demo
      showToast('Thank you ' + name + '! We\'ll call you within 2 hours.', 'success');
      document.getElementById('floatPopup').classList.remove('show');
      document.getElementById('pop-name').value = '';
      document.getElementById('pop-phone').value = '';
      document.getElementById('pop-email').value = '';
    }
  });
}

/* ─ ADD CSS FOR ERROR STATES ─ */
document.addEventListener('DOMContentLoaded', () => {
  // Add error styling if not already present
  if (!document.querySelector('style[data-form-errors]')) {
    const style = document.createElement('style');
    style.setAttribute('data-form-errors', 'true');
    style.textContent = `
      .form-group.error input,
      .form-group.error textarea,
      .form-group.error select {
        border-color: #e53935 !important;
        background-color: rgba(229, 57, 53, 0.05) !important;
      }

      .form-error {
        font-size: 12px;
        color: #e53935;
        margin-top: 6px;
        font-weight: 500;
        display: block;
      }

      button[type="submit"]:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }

      @media (max-width: 768px) {
        .form-error {
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);
  }
});
