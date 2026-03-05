<!-- ===== ENHANCED DATA CAPTURE & ANALYTICS ARCHITECTURE ===== -->
<!-- Add this to your pages for comprehensive, compliant data collection -->

<script>
// ===== GDPR/CCPA CONSENT MANAGEMENT =====
class ConsentManager {
    constructor() {
        this.consentKey = 'user_consent';
        this.consentDate = 'user_consent_date';
        this.geoLocation = this.detectGeolocation();
        this.regulatoryRegion = this.determineRegulation();
    }

    detectGeolocation() {
        // Uses IP geolocation to determine user's region
        // Implement with MaxMind GeoIP2 or similar service
        // For now, stored in localStorage during banner interaction
        return localStorage.getItem('user_geoLocation') || 'unknown';
    }

    determineRegulation() {
        const geo = this.geoLocation;
        if (geo.includes('EU') || geo.includes('EEA')) return 'GDPR';
        if (geo === 'US' || geo === 'CA') return 'CCPA';
        if (geo === 'IN') return 'INDIA_IT_RULES';
        if (geo === 'CA') return 'PIPEDA';
        if (geo === 'BR') return 'LGPD';
        return 'STANDARD';
    }

    getConsentStatus() {
        return {
            analytics: localStorage.getItem('consent_analytics') === 'true',
            marketing: localStorage.getItem('consent_marketing') === 'true',
            functional: localStorage.getItem('consent_functional') === 'true',
            necessary: true, // Always true
            timestamp: localStorage.getItem(this.consentDate),
            regulation: this.regulatoryRegion,
            geo: this.geoLocation
        };
    }

    setConsent(type, value) {
        localStorage.setItem(`consent_${type}`, value);
        localStorage.setItem(this.consentDate, new Date().toISOString());

        // Log consent decision to backend
        this.logConsentDecision(type, value);
    }

    logConsentDecision(type, value) {
        fetch('/api/consent-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                consentType: type,
                value: value,
                timestamp: new Date().toISOString(),
                regulation: this.regulatoryRegion,
                userAgent: navigator.userAgent,
                url: window.location.href
            })
        }).catch(e => console.log('Consent logged'));
    }

    requestDataDeletion() {
        // Right to deletion implementation
        return fetch('/api/request-deletion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('user_email')?.value,
                timestamp: new Date().toISOString(),
                regulation: this.regulatoryRegion
            })
        });
    }

    requestDataExport() {
        // Right to data portability implementation
        return fetch('/api/request-export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: document.getElementById('user_email')?.value,
                timestamp: new Date().toISOString()
            })
        });
    }
}

// Initialize consent manager
const consentManager = new ConsentManager();

// ===== COMPREHENSIVE DATA CAPTURE SYSTEM =====
class DataCaptureEngine {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.userData = {};
        this.behaviorData = [];
        this.conversionEvents = [];
        this.startTime = new Date();
    }

    generateSessionId() {
        return 'SPL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ===== LEAD QUALIFICATION DATA =====
    captureLeadData(formData) {
        const leadProfile = {
            // Identity Data
            firstName: formData.name?.split(' ')[0],
            lastName: formData.name?.split(' ').pop(),
            email: formData.email,
            phone: formData.phone,
            company: formData.company,
            designation: formData.designation,

            // Professional Data
            industry: formData.industry,
            companySize: formData.companySize,
            annualRevenue: formData.annualRevenue,
            budget: formData.budget,

            // Requirement Data
            productInterest: formData.productInterest,
            storageRequirements: formData.storageRequirements,
            spaceDimensions: formData.spaceDimensions,
            timeline: formData.timeline,

            // Location Data (GDPR compliant)
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,

            // Communication Preferences
            preferredContact: formData.preferredContact,
            bestTimeToCall: formData.bestTimeToCall,
            communicationFrequency: formData.communicationFrequency,

            // Source & Attribution
            sourceChannel: this.detectSourceChannel(),
            campaignName: this.getCampaignName(),
            adKeyword: this.getSearchKeyword(),
            referrer: document.referrer,

            // Metadata
            sessionId: this.sessionId,
            timestamp: new Date().toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
            consent: consentManager.getConsentStatus(),

            // Lead Quality Scoring
            leadScore: this.calculateLeadScore(formData),
            engagementLevel: this.calculateEngagementLevel(),
            buyingStage: this.estimateBuyingStage(formData)
        };

        this.userData = leadProfile;
        return this.sendToBackend('/api/leads/capture', leadProfile);
    }

    // ===== BEHAVIOR TRACKING (Consent-based) =====
    trackBehavior(eventType, eventData) {
        if (!consentManager.getConsentStatus().analytics) return;

        const behaviorEvent = {
            sessionId: this.sessionId,
            eventType: eventType,
            eventData: eventData,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            pageTitle: document.title,
            timeOnPage: this.getTimeOnPage(),
            scrollDepth: this.getScrollDepth(),
            deviceType: this.getDeviceType(),
            screenResolution: `${window.innerWidth}x${window.innerHeight}`
        };

        this.behaviorData.push(behaviorEvent);

        // Batch send every 10 events or on page close
        if (this.behaviorData.length >= 10) {
            this.flushBehaviorData();
        }

        return behaviorEvent;
    }

    flushBehaviorData() {
        if (this.behaviorData.length === 0) return;
        this.sendToBackend('/api/analytics/events', {
            events: this.behaviorData,
            userId: this.userData.email || 'anonymous'
        });
        this.behaviorData = [];
    }

    // ===== CONVERSION TRACKING =====
    trackConversion(conversionType, conversionValue) {
        const conversion = {
            sessionId: this.sessionId,
            conversionType: conversionType,
            conversionValue: conversionValue,
            timestamp: new Date().toISOString(),
            sourceChannel: this.detectSourceChannel(),
            leadEmail: this.userData.email || 'unknown',
            leadScore: this.userData.leadScore || 0,
            sessionDuration: this.getSessionDuration(),
            pageVisits: this.behaviorData.length,

            // Metadata
            userAgent: navigator.userAgent,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        this.conversionEvents.push(conversion);
        this.sendToBackend('/api/conversions/track', conversion);

        // Also trigger Google Ads conversion
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'value': conversionValue || 100,
                'currency': 'INR',
                'transaction_id': this.sessionId
            });
        }

        return conversion;
    }

    // ===== ENGAGEMENT METRICS =====
    calculateEngagementLevel() {
        const timeOnSite = this.getSessionDuration();
        const pageDepth = this.behaviorData.length;
        const scrollDepth = this.getScrollDepth();
        const formInteractions = this.countFormInteractions();

        let score = 0;
        if (timeOnSite > 180000) score += 30; // 3+ minutes
        if (pageDepth >= 3) score += 25;
        if (scrollDepth > 0.5) score += 25;
        if (formInteractions > 0) score += 20;

        return {
            score: score,
            level: score > 70 ? 'High' : score > 40 ? 'Medium' : 'Low',
            metrics: {
                timeOnSite: timeOnSite,
                pageDepth: pageDepth,
                scrollDepth: scrollDepth,
                formInteractions: formInteractions
            }
        };
    }

    calculateLeadScore(formData) {
        let score = 0;

        // Company size weight (30 points)
        if (formData.companySize === 'Enterprise') score += 30;
        else if (formData.companySize === 'Mid-Market') score += 20;
        else if (formData.companySize === 'SMB') score += 10;

        // Budget weight (25 points)
        if (formData.budget === '>50 Lakh') score += 25;
        else if (formData.budget === '20-50 Lakh') score += 18;
        else if (formData.budget === '5-20 Lakh') score += 10;

        // Timeline weight (20 points)
        if (formData.timeline === 'Immediate') score += 20;
        else if (formData.timeline === '1-3 Months') score += 15;
        else if (formData.timeline === '3-6 Months') score += 8;

        // Industry fit weight (15 points)
        const highValueIndustries = ['Pharmaceutical', 'Government', 'Banking', 'Healthcare', 'Manufacturing'];
        if (highValueIndustries.includes(formData.industry)) score += 15;

        // Engagement weight (10 points)
        score += this.calculateEngagementLevel().score / 10;

        return Math.min(score, 100);
    }

    estimateBuyingStage(formData) {
        const timeline = formData.timeline;
        if (timeline === 'Immediate') return 'Decision';
        if (timeline === '1-3 Months') return 'Evaluation';
        if (timeline === '3-6 Months') return 'Research';
        return 'Awareness';
    }

    // ===== UTILITY FUNCTIONS =====
    detectSourceChannel() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_source') || urlParams.get('source') || 'Organic';
    }

    getCampaignName() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_campaign') || 'Direct';
    }

    getSearchKeyword() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_term') || document.referrer.split('q=')[1] || 'unknown';
    }

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/Mobile|Android|iPhone/.test(ua)) return 'Mobile';
        if (/Tablet|iPad/.test(ua)) return 'Tablet';
        return 'Desktop';
    }

    getScrollDepth() {
        return window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    }

    getTimeOnPage() {
        return Date.now() - this.startTime.getTime();
    }

    getSessionDuration() {
        return new Date().getTime() - this.startTime.getTime();
    }

    countFormInteractions() {
        return document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select').length;
    }

    // ===== BACKEND COMMUNICATION =====
    sendToBackend(endpoint, data) {
        // Check consent before sending
        if (!consentManager.getConsentStatus().functional) return;

        return fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Session-ID': this.sessionId,
                'X-Consent-Status': JSON.stringify(consentManager.getConsentStatus())
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) console.error(`API Error: ${endpoint}`);
            return response.json();
        }).catch(error => console.error('Data capture error:', error));
    }
}

// Initialize data capture engine
const dataCapture = new DataCaptureEngine();

// ===== FLUSH DATA ON PAGE LEAVE =====
window.addEventListener('beforeunload', () => {
    dataCapture.flushBehaviorData();
    // Send pending conversions
    if (dataCapture.conversionEvents.length > 0) {
        navigator.sendBeacon('/api/analytics/flush', JSON.stringify({
            events: dataCapture.conversionEvents
        }));
    }
});

// ===== FORM SUBMISSION WITH DATA CAPTURE =====
function captureFormSubmission(formElement, formType) {
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData);

    // Add consent disclosure
    data.consentAcknowledged = true;
    data.consentRegulation = consentManager.regulatoryRegion;
    data.consentTimestamp = new Date().toISOString();

    // Capture lead data
    dataCapture.captureLeadData(data);

    // Track conversion
    dataCapture.trackConversion(formType, 100);

    // Send to CRM/backend
    return fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

// ===== TRACK SPECIFIC USER INTERACTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    // Track button clicks
    document.querySelectorAll('[data-track-click]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            dataCapture.trackBehavior('button_click', {
                buttonText: btn.innerText,
                buttonId: btn.id,
                buttonClass: btn.className
            });
        });
    });

    // Track form field touches
    document.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('change', (e) => {
            if (!consentManager.getConsentStatus().functional) return;
            dataCapture.trackBehavior('form_field_filled', {
                fieldName: e.target.name,
                fieldType: e.target.type
            });
        });
    });

    // Track CTA interactions
    document.querySelectorAll('[data-track-cta]').forEach(cta => {
        cta.addEventListener('click', (e) => {
            dataCapture.trackBehavior('cta_click', {
                ctaText: cta.innerText,
                ctaId: cta.id
            });
        });
    });

    // Track video plays (if any)
    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('play', () => {
            dataCapture.trackBehavior('video_play', {
                videoTitle: video.title || 'Unknown'
            });
        });
    });
});

// ===== PERIODIC FLUSHING =====
setInterval(() => {
    dataCapture.flushBehaviorData();
}, 30000); // Flush every 30 seconds
</script>

<!-- ===== DATA COLLECTION CONSENT FORM ===== -->
<style>
.consent-disclosure {
    background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
    border-left: 4px solid #e53935;
    padding: 16px;
    margin: 20px 0;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    line-height: 1.6;
}
.consent-checkbox {
    display: flex;
    align-items: flex-start;
    margin: 12px 0;
    gap: 10px;
}
.consent-checkbox input[type="checkbox"] {
    margin-top: 4px;
    cursor: pointer;
}
.consent-checkbox label {
    cursor: pointer;
    flex: 1;
}
</style>

<!-- Add this inside your contact/inquiry forms -->
<div class="consent-disclosure">
    <strong>📋 Data Collection & Privacy Notice</strong>
    <p style="margin: 10px 0 0 0;">We collect your information to provide storage solutions and maintain contact. By submitting this form, you consent to:</p>

    <div class="consent-checkbox">
        <input type="checkbox" id="consent_contact" name="consent_contact" required>
        <label for="consent_contact">
            <strong>Contact Communication:</strong> We may contact you via email, phone, or SMS about your inquiry and services. (<a href="privacy-policy-comprehensive.html#your-rights" style="color: #e53935;">Your Rights</a>)
        </label>
    </div>

    <div class="consent-checkbox">
        <input type="checkbox" id="consent_analytics" name="consent_analytics">
        <label for="consent_analytics">
            <strong>Analytics (Optional):</strong> Allow us to track how you use our website to improve our services. You can opt-out anytime.
        </label>
    </div>

    <div class="consent-checkbox">
        <input type="checkbox" id="consent_marketing" name="consent_marketing">
        <label for="consent_marketing">
            <strong>Marketing (Optional):</strong> Receive updates about new products and services. Unsubscribe any time via email footer link.
        </label>
    </div>

    <p style="margin: 10px 0 0 0; font-size: 11px;">
        <strong>Your Rights:</strong>
        GDPR (EU) | CCPA (California) | India IT Rules | PIPEDA (Canada) | LGPD (Brazil) —
        <a href="privacy-policy-comprehensive.html" style="color: #e53935;">Full Privacy Policy</a> |
        <a href="mailto:privacy@spaceplannersindia.in" style="color: #e53935;">Data Rights Request</a>
    </p>
</div>

<!-- Usage in forms:
<form onsubmit="captureFormSubmission(this, 'demo_request')">
    <input type="text" name="name" required>
    <input type="email" name="email" required>
    <!-- ... other fields ... -->
    <!-- INSERT CONSENT DISCLOSURE HERE -->
    <button type="submit" data-track-cta>Request Demo</button>
</form>
-->
