/* ============================================================
   SPACE PLANNERS INDIA — Consolidated Form Handling & Validation
   ============================================================ */

const API_CONFIG = {
  USE_FORMSUBMIT: true,
  FORMSUBMIT_ENDPOINT: 'https://formsubmit.co/sales@spaceplannersindia.in'
};

const Validators = {
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  phone: (value) => /^(?:(?:\+|0{0,2})91)?([6-9]\d{9})$/.test(value.replace(/[\s\-\(\)]/g, '')),
  name: (value) => value.trim().length >= 3,
  required: (value) => value.trim().length > 0
};

/* ── INITIALIZATION ── */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all forms after components are loaded
    document.addEventListener('componentsLoaded', initAllForms);
    // Fallback if already loaded
    initAllForms();
});

function initAllForms() {
    const forms = [
        { id: 'multiStepForm', handler: submitInquiry },
        { id: 'product-finder-form', handler: submitProductFinder },
        { id: 'assessmentForm', handler: submitAssessment },
        { id: 'floatInquiryForm', handler: submitPopupInquiry }
    ];

    forms.forEach(f => {
        const el = document.getElementById(f.id);
        if (el) {
            setupRealTimeValidation(el);
            if (f.handler) {
                el.onsubmit = f.handler;
            }
        }
    });
}

/* ── REAL-TIME VALIDATION ── */
function setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        
        if (input.type === 'tel') {
            input.addEventListener('input', (e) => {
                let cleaned = e.target.value.replace(/\D/g, '');
                let match = cleaned.match(/^(?:91)?(\d{0,5})(\d{0,5})$/);
                if (match && match[1]) {
                    e.target.value = '+91 ' + match[1] + (match[2] ? ' ' + match[2] : '');
                }
                if (input.classList.contains('is-invalid')) validateField(input);
            });
        } else {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) validateField(input);
            });
        }
    });
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMsg = '';

    if (input.hasAttribute('required') && !Validators.required(value)) {
        isValid = false;
        errorMsg = `Please enter your ${getFieldLabel(input).toLowerCase()}.`;
    } else if (value !== '') {
        if (input.type === 'email' && !Validators.email(value)) {
            isValid = false;
            errorMsg = 'Please enter a valid email address.';
        } else if (input.type === 'tel' && !Validators.phone(value)) {
            isValid = false;
            errorMsg = 'Enter a valid 10-digit phone number.';
        } else if (input.name === 'name' && !Validators.name(value)) {
            isValid = false;
            errorMsg = 'Name must be at least 3 characters.';
        }
    }

    applyValidationState(input, isValid, errorMsg);
    return isValid;
}

function applyValidationState(input, isValid, errorMsg) {
    const group = input.closest('.form-group') || input.parentElement;
    let errorEl = group.querySelector('.form-error');

    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        input.insertAdjacentElement('afterend', errorEl);
    }

    if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        group.classList.remove('error');
        errorEl.style.display = 'none';
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        group.classList.add('error');
        errorEl.textContent = errorMsg;
        errorEl.style.display = 'block';
    }
}

function getFieldLabel(input) {
    const label = input.previousElementSibling;
    if (label && label.tagName === 'LABEL') return label.textContent.replace('*', '').trim();
    return input.placeholder || input.name || 'field';
}

/* ── SUBMISSION HANDLERS ── */
async function submitFormToBackend(formElement, formName) {
    const formData = new FormData(formElement);
    formData.append('timestamp', new Date().toISOString());
    formData.append('form_type', formName);

    try {
        const response = await fetch(API_CONFIG.FORMSUBMIT_ENDPOINT, {
            method: 'POST',
            body: formData
        });
        return { success: response.ok };
    } catch (error) {
        console.error('Submission error:', error);
        return { success: false };
    }
}

function submitInquiry(e) {
    e.preventDefault();
    const form = e.target;
    if (!validateAll(form)) return;

    handleSubmission(form, 'general_inquiry', () => {
        showToast('Thank you! We will contact you shortly.', 'success');
        closeInquiryModal();
        const successModal = document.getElementById('successModal');
        if (successModal) successModal.classList.add('active');
        form.reset();
        if (typeof showStep === 'function') showStep(1);
    });
}

function submitAssessment(e) {
    e.preventDefault();
    const form = e.target;
    if (!validateAll(form)) return;

    handleSubmission(form, 'site_assessment', () => {
        form.innerHTML = `
            <div style="text-align:center;padding:48px 24px;">
                <div style="font-size:48px;color:#C41212;margin-bottom:16px;">✓</div>
                <h3 style="margin-bottom:12px;">Request Received!</h3>
                <p>Our experts will call you to schedule your free site assessment.</p>
            </div>`;
    });
}

function submitProductFinder(e) {
    e.preventDefault();
    const form = e.target;
    if (!validateAll(form)) return;

    handleSubmission(form, 'product_finder', () => {
        showToast('Success! Your custom storage recommendation is on the way.', 'success');
        form.reset();
    });
}

function submitPopupInquiry(e) {
    if (e) e.preventDefault();
    const form = document.getElementById('floatInquiryForm');
    if (!form || !validateAll(form)) return;

    handleSubmission(form, 'floating_inquiry', () => {
        showToast('Inquiry sent successfully!', 'success');
        const popup = document.getElementById('floatPopup');
        if (popup) popup.classList.remove('show');
        form.reset();
    });
}

function validateAll(form) {
    let isAllValid = true;
    form.querySelectorAll('input, select, textarea').forEach(input => {
        if (!validateField(input)) isAllValid = false;
    });
    if (!isAllValid) showToast('Please correct the highlighted errors.', 'error');
    return isAllValid;
}

async function handleSubmission(form, type, onSuccess) {
    const btn = form.querySelector('button[type="submit"]') || form.querySelector('button');
    const originalText = btn ? btn.textContent : '';
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
    }

    const result = await submitFormToBackend(form, type);
    
    if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
    }

    if (result.success) {
        onSuccess();
    } else {
        showToast('Failed to send. Please check your connection.', 'error');
    }
}

/* ── MULTI-STEP BRIDGE ── */
function nextStep(current, next) {
    if (current === 1) {
        const checked = !!document.querySelector('input[name="product_interest"]:checked');
        if (!checked) {
            const err = document.getElementById("step1Error");
            if (err) err.style.display = "block";
            return;
        }
    } else if (current === 2) {
        const step2 = document.getElementById("step2");
        let valid = true;
        step2.querySelectorAll('input[required]').forEach(i => { if (!validateField(i)) valid = false; });
        if (!valid) return;
    }
    showStep(next);
}

function showStep(stepNum) {
    [1, 2, 3].forEach(n => {
        const el = document.getElementById('step' + n);
        if (el) el.style.display = (n === stepNum) ? 'block' : 'none';
        
        const ind = document.getElementById(`step${n}Indicator`);
        if (ind) {
            ind.style.fontWeight = (n <= stepNum) ? "700" : "500";
            ind.style.color = (n <= stepNum) ? "var(--primary)" : "var(--mid)";
        }
    });

    const bar = document.getElementById("formProgress");
    if (bar) bar.style.width = (stepNum * 33.33) + "%";
}

function prevStep(current, prev) {
    showStep(prev);
}

/* ── STYLES ── */
const style = document.createElement('style');
style.textContent = `
    .form-error { color: #e53935; font-size: 11px; margin-top: 4px; font-weight: 500; display: none; }
    .is-invalid { border-color: #e53935 !important; background-color: rgba(229, 57, 53, 0.04) !important; }
    .is-valid { border-color: #2e7d32 !important; }
    button:disabled { opacity: 0.7; cursor: not-allowed; }
`;
document.head.appendChild(style);
