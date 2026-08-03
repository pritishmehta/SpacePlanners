/* ============================================================
   SPACE PLANNERS INDIA — Consolidated Form Handling & Validation
   ============================================================ */

const WEB3FORMS_CONFIG = {
    ACCESS_KEY: '822f9ff2-e317-4a63-9b26-706129555c34'

};

const Validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: (value) => /^\+?\d{7,15}$/.test(value.replace(/[\s\-\(\)\.]/g, '')),
    name: (value) => value.trim().length >= 3 && !/<[a-z][\s\S]*>/i.test(value),
    required: (value) => value.trim().length > 0
};

/**
 * Sanitizes input to prevent XSS and strip HTML tags
 */
function sanitizeInput(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/<[^>]*>?/gm, '') // Strip HTML tags
        .replace(/[&<>"']/g, (m) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[m])
        .trim();
}



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
        { id: 'floatInquiryForm', handler: submitPopupInquiry },
        { id: 'contactPageForm', handler: submitContactPage }
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

        input.addEventListener('input', () => {
            if (input.classList.contains('is-invalid')) validateField(input);
        });
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
            errorMsg = 'Enter a valid phone number.';
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
/* ----------------------------------------------------------------
   TO CHANGE THE RECIPIENT EMAIL:
   Edit the `TO` value in MAILTO_CONFIG at the top of this file.
   ---------------------------------------------------------------- */
async function submitFormToBackend(formElement, formName) {
    try {
        const formData = new FormData(formElement);

        // Collect all form fields into a clean object
        const fields = {};
        const SKIP_KEYS = new Set(['_token', 'botcheck', 'form_type', 'timestamp']);
        for (const [key, value] of formData.entries()) {
            if (!SKIP_KEYS.has(key) && !key.startsWith('g-recaptcha') && value.trim()) {
                fields[sanitizeInput(key)] = sanitizeInput(value);
            }
        }

        // Map form name + current page to a descriptive label
        const PAGE_LABELS = {
            'index': { general_inquiry: 'Home Page — General Inquiry', site_assessment: 'Home Page — Free Assessment', product_finder: 'Home Page — Product Finder', floating_inquiry: 'Quick Inquiry (Popup)' },
            'compactor-storage': { general_inquiry: 'Compactor Storage — Inquiry', floating_inquiry: 'Compactor Storage — Quick Inquiry' },
            'industrial-racks': { general_inquiry: 'Industrial Racks — Inquiry', floating_inquiry: 'Industrial Racks — Quick Inquiry' },
            'storage-lockers': { general_inquiry: 'Storage Lockers — Inquiry', floating_inquiry: 'Storage Lockers — Quick Inquiry' },
            'filing-cabinets': { general_inquiry: 'Filing Cabinets — Inquiry', floating_inquiry: 'Filing Cabinets — Quick Inquiry' },
            'contact': { general_inquiry: 'Contact Page — Inquiry', floating_inquiry: 'Contact Page — Quick Inquiry' },
            'about': { general_inquiry: 'About Page — Inquiry', floating_inquiry: 'About Page — Quick Inquiry' },
            'projects': { general_inquiry: 'Projects Page — Inquiry', floating_inquiry: 'Projects Page — Quick Inquiry' },
        };

        const pagePath = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
        const pageMap = PAGE_LABELS[pagePath] || {};
        const formLabel = pageMap[formName] || formName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const subject = `[Space Planners] ${formLabel} — ${fields['name'] || 'Website Visitor'}`;
        const submittedAt = new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' });

        const FIELD_LABELS = {
            name: 'Full Name',
            phone: 'Phone Number',
            email: 'Email Address',
            product: 'Product Interest',
            product_interest: 'Product Interest',
            specific_product: 'Specific Product',
            message: 'Message',
            company: 'Company Name',
            company_name: 'Company Name',
            city: 'City',
            requirement: 'Requirement',
            category: 'Category',
            space_size: 'Space Size',
            budget: 'Budget',
            timeline: 'Timeline',
        };

        const finalFields = {
            "Source Form": formLabel,
            "Submitted At": submittedAt
        };
        for (const [key, value] of Object.entries(fields)) {
            const label = FIELD_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            finalFields[label] = value;
        }

        const payload = {
            access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
            subject: subject,
            from_name: fields['name'] || 'Website Visitor',
            botcheck: '',
            ...finalFields
        };

        if (fields['email']) payload.replyto = fields['email'];

        console.log('[Web3Forms] Sending submission...');
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (result.success) {
            console.log('[Web3Forms] Success:', result);
            return { success: true };
        } else {
            console.error('[Web3Forms] Failed — Status:', response.status, '| Response:', JSON.stringify(result));
            return { success: false };
        }

    } catch (error) {
        console.error('[Form] Submission error:', error.message || error);
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
        if (typeof showStep === 'function') showStep(2);
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

function submitContactPage(e) {
    e.preventDefault();
    const form = e.target;
    if (!validateAll(form)) return;

    handleSubmission(form, 'general_inquiry', () => {
        const successMsg = document.getElementById('cfSuccess');
        if (successMsg) successMsg.style.display = 'block';
        form.style.display = 'none';
        if (typeof showToast === 'function') showToast('Thank you! Message sent successfully.', 'success');
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
    // 1. Validate Form Fields
    if (!validateAll(form)) return;

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
