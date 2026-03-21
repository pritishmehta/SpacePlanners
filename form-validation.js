/* 
 * SPACE PLANNERS INDIA
 * Client-Side Form Validation module
 * Covers: Email format, Indian Phone Numbers (10 digits), and Required Fields
 */

document.addEventListener('DOMContentLoaded', () => {

    // Attach validation to both Inquiry and Finder forms
    const inquiryForm = document.querySelector('#inquiryModal form');
    const finderForm = document.getElementById('product-finder-form');

    if (inquiryForm) {
        setupValidation(inquiryForm);
    }

    if (finderForm) {
        setupValidation(finderForm);
    }

    const assessmentForm = document.querySelector('.assessment-form form') ||
                           document.querySelector('#assessment-form form') ||
                           document.querySelector('form.assessment-form');
    if (assessmentForm) {
        setupValidation(assessmentForm);
    }

    function setupValidation(form) {
        const inputs = form.querySelectorAll('input, select, textarea');

        // Add real-time validation feedback on blur and input
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));

            if (input.type === 'tel') {
                input.addEventListener('input', (e) => {
                    let cleaned = e.target.value.replace(/\D/g, '');
                    // Format as +91 XXXXX XXXXX
                    let match = cleaned.match(/^(?:91)?(\d{0,5})(\d{0,5})$/);
                    if (match) {
                        e.target.value = !match[1] ? '' : '+91 ' + match[1] + (match[2] ? ' ' + match[2] : '');
                    }
                    if (input.classList.contains('is-invalid')) validateField(input);
                });
            } else {
                input.addEventListener('input', () => {
                    if (input.classList.contains('is-invalid')) {
                        validateField(input);
                    }
                });
            }
        });

        // Intercept form submission to validate all fields first
        const originalOnSubmit = form.onsubmit;
        form.onsubmit = function (event) {
            event.preventDefault(); // Stop default early

            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // If the form passes validation, call the original submit handler (which fires GA4 and opens the success modal)
                if (typeof originalOnSubmit === 'function') {
                    originalOnSubmit.call(form, event);
                }
                // Show inline success state for assessment form
                const isAssessmentForm = form.closest('.assessment-form') ||
                                         form.closest('#assessment-form') ||
                                         form.classList.contains('assessment-form');
                if (isAssessmentForm) {
                    form.innerHTML =
                        '<div style="text-align:center;padding:48px 24px;">' +
                        '<div style="font-size:48px;color:#C41212;margin-bottom:16px;">✓</div>' +
                        '<div style="font-family:\'Barlow Condensed\',sans-serif;font-size:24px;font-weight:700;letter-spacing:0.04em;margin-bottom:12px;">Thank you!</div>' +
                        '<p style="font-family:\'Barlow\',sans-serif;font-size:15px;color:#555;line-height:1.6;">Our team will call you within 4 business hours to arrange your free site visit.</p>' +
                        '</div>';
                }
            } else {
                // Scroll the first invalid element into view (helpful for mobile)
                const firstInvalid = form.querySelector('.is-invalid');
                if (firstInvalid) firstInvalid.focus();
            }
        };
    }

    // Returns true if valid, false if invalid
    function validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        // 1. Check Required
        if (input.hasAttribute('required') && value === '') {
            isValid = false;
            if (input.type === 'checkbox') {
                isValid = input.checked;
                errorMessage = 'Please confirm this required field to proceed.';
            } else {
                errorMessage = `Please enter a valid ${getFieldName(input)}.`;
            }
        }
        // 2. Format specific validation (only if not empty)
        else if (value !== '') {
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address (e.g., name@company.com).';
                }
            } else if (input.type === 'tel') {
                // Indian Phone format validation: 
                // Allow optional +91 or 0 prefix, must have exactly 10 digits starting with 6-9
                // Strip spaces, dashes, and parens first
                const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
                const phoneRegex = /^(?:(?:\+|0{0,2})91)?([6789]\d{9})$/;
                if (!phoneRegex.test(cleanPhone)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 10-digit Indian phone number.';
                }
            } else if (input.tagName === 'SELECT') {
                if (value === '') {
                    isValid = false;
                    errorMessage = `Please select a ${getFieldName(input)}.`;
                }
            } else if (input.name === 'name' && value.length < 3) {
                isValid = false;
                errorMessage = 'Name must be at least 3 characters long.';
            }
        }

        // Apply visual feedback
        applyValidationState(input, isValid, errorMessage);
        return isValid;
    }

    function applyValidationState(input, isValid, errorMessage) {
        // Find or create error message container
        let errorEl = input.nextElementSibling;
        if (!errorEl || !errorEl.classList.contains('error-message')) {
            errorEl = document.createElement('div');
            errorEl.className = 'error-message';
            errorEl.setAttribute('role', 'alert');
            // Insert after the input (or label if it's a checkbox)
            if (input.type === 'checkbox') {
                input.parentElement.appendChild(errorEl);
            } else {
                input.parentNode.insertBefore(errorEl, input.nextSibling);
            }
        }

        if (isValid) {
            input.classList.remove('is-invalid');
            if (input.value.trim() !== '') {
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
            }
            errorEl.style.display = 'none';
            input.setAttribute('aria-invalid', 'false');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            errorEl.textContent = errorMessage;
            errorEl.style.display = 'block';
            input.setAttribute('aria-invalid', 'true');
        }
    }

    function getFieldName(input) {
        // Extract a friendly name from the label if possible, else the name attribute
        const label = document.querySelector(`label[for="${input.id}"]`);
        if (label) {
            return label.textContent.replace('*', '').trim().toLowerCase();
        }
        return input.name.replace(/_/g, ' ') || 'value';
    }
});
