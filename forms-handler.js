/* ============================================================
   SPACE PLANNERS INDIA — Consolidated Form Handling & Validation
   ============================================================ */

const WEB3FORMS_CONFIG = {
    ACCESS_KEY: '9074db13-d4be-4e83-ab19-0ff4e500784e'
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

        // Map form name + current page → a descriptive label
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
        const formLabel = pageMap[formName]
            || formName.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

        const subject = `[Space Planners] ${formLabel} — ${fields['name'] || 'Website Visitor'}`;
        const submittedAt = new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' });

        const FIELD_LABELS = {
            name: 'Full Name', phone: 'Phone Number', email: 'Email Address',
            product: 'Product Interest', message: 'Message / Notes', company: 'Company',
            city: 'City', requirement: 'Requirement', product_interest: 'Product Interest',
            specific_product: 'Specific Product', category: 'Category',
            space_size: 'Space Size', budget: 'Budget', timeline: 'Timeline'
        };

        // Build field rows HTML
        const fieldRowsHtml = Object.entries(fields).map(([key, value]) => {
            const label = FIELD_LABELS[key] || key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            const isMessage = key === 'message';
            return `
                <tr>
                    <td style="padding:10px 16px;background:#f9f9f9;width:160px;vertical-align:top;">
                        <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#888888;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
                    </td>
                    <td style="padding:10px 16px;border-left:3px solid #C41212;${isMessage ? 'white-space:pre-wrap;' : ''}">
                        <span style="font-family:Arial,sans-serif;font-size:14px;color:#222222;">${value}</span>
                    </td>
                </tr>
                <tr><td colspan="2" style="padding:0;height:1px;background:#eeeeee;"></td></tr>`;
        }).join('');

        // Build reply buttons
        const replyButton = fields['email']
            ? `<a href="mailto:${fields['email']}?subject=Re: Your Enquiry — Space Planners India"
                  style="display:inline-block;padding:12px 28px;background:#C41212;color:#ffffff;text-decoration:none;
                         font-family:Arial,sans-serif;font-size:14px;font-weight:700;border-radius:4px;margin-right:12px;">
                  Reply to ${fields['name'] || 'Lead'}
               </a>`
            : '';

        const callButton = fields['phone']
            ? `<a href="tel:${fields['phone']}"
                  style="display:inline-block;padding:12px 28px;background:#ffffff;color:#C41212;text-decoration:none;
                         font-family:Arial,sans-serif;font-size:14px;font-weight:700;border-radius:4px;
                         border:2px solid #C41212;">
                  Call ${fields['phone']}
               </a>`
            : '';

        // Full HTML email template
        const htmlMessage = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:6px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#C41212;padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">
                      SPACE PLANNERS INDIA
                    </p>
                    <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.8);">
                      New Website Enquiry
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:rgba(255,255,255,0.7);">
                      ${submittedAt}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Form Label Badge -->
          <tr>
            <td style="padding:16px 32px;background:#fafafa;border-bottom:1px solid #eeeeee;">
              <span style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:#C41212;text-transform:uppercase;letter-spacing:1px;">
                📋 ${formLabel}
              </span>
            </td>
          </tr>

          <!-- Submission Details -->
          <tr>
            <td style="padding:24px 32px 8px;">
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#aaaaaa;text-transform:uppercase;letter-spacing:1px;">
                Submission Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eeeeee;border-radius:4px;overflow:hidden;">
                ${fieldRowsHtml}
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          ${(replyButton || callButton) ? `
          <tr>
            <td style="padding:24px 32px;">
              ${replyButton}${callButton}
            </td>
          </tr>` : ''}

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;background:#f9f9f9;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#aaaaaa;">
                This is an automated notification from
                <a href="https://spaceplannersindia.in" style="color:#C41212;text-decoration:none;">spaceplannersindia.in</a>.
                Do not reply to this email directly — use the button above.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const payload = {
            access_key: WEB3FORMS_CONFIG.ACCESS_KEY,
            subject: subject,
            from_name: fields['name'] || 'Website Visitor',
            html: htmlMessage,
            botcheck: ''
        };

        // Only include replyto if the submitter provided an email
        if (fields['email']) {
            payload.replyto = fields['email'];
        }

        console.log('[Web3Forms] Sending submission...');
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
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
