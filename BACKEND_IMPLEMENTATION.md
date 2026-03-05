# BACKEND DATA CAPTURE & COMPLIANCE IMPLEMENTATION GUIDE

**Space Planners India | Regulatory-Compliant Data Management**
**Status:** Ready for Implementation
**Date:** March 5, 2026

---

## 📊 DATABASE SCHEMA (Compliant Data Models)

### 1. LEADS SCHEMA
```sql
-- Main leads table with GDPR/CCPA flags
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Identity Data
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    company_name VARCHAR(255),
    designation VARCHAR(100),

    -- Professional Data
    industry VARCHAR(100),
    company_size VARCHAR(50), -- Enterprise, Mid-Market, SMB
    annual_revenue VARCHAR(50),
    budget_range VARCHAR(50),

    -- Requirements
    product_interest TEXT,
    storage_requirements TEXT,
    space_dimensions VARCHAR(100),
    timeline VARCHAR(50), -- Immediate, 1-3 months, 3-6 months

    -- Location Data (compliant storage)
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),

    -- Communication Preferences
    preferred_contact VARCHAR(50), -- email, phone, whatsapp
    best_time_to_call VARCHAR(50),
    communication_frequency VARCHAR(50), -- weekly, monthly, as-needed

    -- Attribution Data
    source_channel VARCHAR(100),
    campaign_name VARCHAR(100),
    ad_keyword VARCHAR(255),
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_term VARCHAR(100),

    -- Lead Quality Scoring
    lead_score DECIMAL(5,2), -- 0-100
    engagement_level VARCHAR(50), -- High, Medium, Low
    buying_stage VARCHAR(50), -- Awareness, Research, Evaluation, Decision

    -- Consent & Legal Compliance
    consent_contact BOOLEAN DEFAULT FALSE,
    consent_analytics BOOLEAN DEFAULT FALSE,
    consent_marketing BOOLEAN DEFAULT FALSE,
    consent_timestamp TIMESTAMP,
    consent_regulation VARCHAR(50), -- GDPR, CCPA, INDIA_IT_RULES, PIPEDA, LGPD
    gdpr_accepted_at TIMESTAMP,
    ccpa_acknowledged_at TIMESTAMP,
    ip_address INET, -- Hashed for GDPR compliance
    user_agent TEXT,

    -- Data Management
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_contacted_at TIMESTAMP,

    -- Right to Deletion
    deletion_requested_at TIMESTAMP,
    data_anonymized_at TIMESTAMP,

    -- Metadata
    session_id VARCHAR(50),
    language VARCHAR(10),
    timezone VARCHAR(50),
    device_type VARCHAR(50), -- Desktop, Mobile, Tablet

    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_lead_score (lead_score),
    INDEX idx_consent_status (consent_contact),
    INDEX idx_deletion_requested (deletion_requested_at)
);
```

### 2. BEHAVIOR TRACKING SCHEMA
```sql
CREATE TABLE user_behavior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(50) NOT NULL,
    lead_email VARCHAR(255),

    -- Event Details
    event_type VARCHAR(100), -- page_view, click, form_fill, scroll, video_play
    event_data JSONB,

    -- Page Information
    page_url TEXT,
    page_title VARCHAR(255),
    time_on_page INTEGER, -- milliseconds
    scroll_depth DECIMAL(3,2), -- 0-1

    -- Device Information
    device_type VARCHAR(50),
    screen_resolution VARCHAR(50),
    browser_name VARCHAR(50),
    browser_version VARCHAR(50),
    os_name VARCHAR(50),
    os_version VARCHAR(50),

    -- Metadata
    user_agent TEXT,
    language VARCHAR(10),
    timezone VARCHAR(50),
    geoip_country VARCHAR(2),

    -- Compliance
    consent_status JSONB, -- {analytics: true, marketing: false, ...}
    tracking_permitted BOOLEAN,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_session_id (session_id),
    INDEX idx_lead_email (lead_email),
    INDEX idx_event_type (event_type),
    INDEX idx_created_at (created_at)
);
```

### 3. CONVERSIONS SCHEMA
```sql
CREATE TABLE conversions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(50) NOT NULL,
    lead_email VARCHAR(255),

    -- Conversion Details
    conversion_type VARCHAR(100), -- demo_request, quote_request, consultation, contact_form
    conversion_value DECIMAL(10,2),

    -- Lead Info at Conversion
    lead_score DECIMAL(5,2),
    engagement_level VARCHAR(50),
    buying_stage VARCHAR(50),

    -- Session Metrics
    session_duration INTEGER, -- milliseconds
    page_visits INTEGER,
    time_to_conversion INTEGER, -- milliseconds

    -- Attribution
    first_touch_source VARCHAR(100),
    last_touch_source VARCHAR(100),
    campaign_name VARCHAR(100),

    -- Device Info
    device_type VARCHAR(50),
    browser_name VARCHAR(50),

    -- Compliance
    consent_verified BOOLEAN DEFAULT FALSE,
    gdpr_compliant BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_session_id (session_id),
    INDEX idx_lead_email (lead_email),
    INDEX idx_conversion_type (conversion_type),
    INDEX idx_created_at (created_at)
);
```

### 4. CONSENT LOG SCHEMA (GDPR/CCPA Audit Trail)
```sql
CREATE TABLE consent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Consent Details
    email VARCHAR(255),
    consent_type VARCHAR(100), -- analytics, marketing, contact
    consent_value BOOLEAN,
    consent_method VARCHAR(50), -- banner, form, email_confirmation

    -- Regulation Specific
    regulation VARCHAR(50), -- GDPR, CCPA, INDIA_IT_RULES, PIPEDA, LGPD
    ip_address INET,
    user_agent TEXT,

    -- Legal Requirements
    consent_version VARCHAR(20), -- Policy version accepted
    language_accepted VARCHAR(10), -- Language user read policy in

    -- Change History
    previous_value BOOLEAN,
    change_reason VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    withdrawn_at TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_created_at (created_at),
    INDEX idx_regulation (regulation)
);
```

### 5. DATA RIGHTS REQUEST SCHEMA
```sql
CREATE TABLE data_rights_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Request Details
    request_type VARCHAR(50), -- access, deletion, portability, rectification, objection
    requester_email VARCHAR(255) NOT NULL,

    -- Verification
    verification_token VARCHAR(255) UNIQUE,
    verification_completed_at TIMESTAMP,

    -- Request Details
    requested_data_scope VARCHAR(100), -- all, leads, analytics, conversions
    specific_reason TEXT,

    -- Processing
    status VARCHAR(50), -- pending, processing, completed, rejected
    status_reason TEXT,
    response_sent_at TIMESTAMP,

    -- Compliance
    regulation VARCHAR(50), -- GDPR, CCPA, etc.
    compliance_deadline TIMESTAMP, -- 30 days from request

    -- Metadata
    ip_address INET,
    user_agent TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_requester_email (requester_email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    INDEX idx_compliance_deadline (compliance_deadline)
);
```

---

## 🔌 API ENDPOINTS (Compliant Implementation)

### 1. LEAD CAPTURE ENDPOINT
```javascript
// POST /api/leads/capture
app.post('/api/leads/capture', async (req, res) => {
    try {
        const {
            firstName, lastName, email, phone, company,
            industry, companySize, budget, productInterest,
            city, state, country,
            consentContact, consentAnalytics, consentMarketing,
            consentRegulation, sessionId
        } = req.body;

        // Verify consent status
        if (!consentContact) {
            return res.status(400).json({
                error: 'Contact consent required'
            });
        }

        // Hash IP address for GDPR compliance
        const hashedIP = hashIP(req.ip);

        // Insert lead with all compliance fields
        const lead = await db.query(
            `INSERT INTO leads (
                first_name, last_name, email, phone, company_name,
                industry, company_size, budget_range, product_interest,
                city, state, country,
                consent_contact, consent_analytics, consent_marketing,
                consent_timestamp, consent_regulation,
                ip_address, user_agent, session_id, created_at
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
                $13, $14, $15, NOW(), $16, $17, $18, $19, NOW()
            ) RETURNING id`,
            [firstName, lastName, email, phone, company,
             industry, companySize, budget, productInterest,
             city, state, country,
             consentContact, consentAnalytics, consentMarketing,
             consentRegulation, hashedIP, req.get('user-agent'), sessionId]
        );

        // Log consent decision (audit trail)
        await logConsent(email, 'contact', consentContact, consentRegulation, req);

        // Send confirmation with right to deletion info
        await sendConsentConfirmationEmail(email, {
            dataCollected: true,
            dataUsage: 'Service delivery and consultation',
            rightToDeletion: 'https://spaceplannersindia.in/data-rights',
            privacyPolicy: 'https://spaceplannersindia.in/privacy-policy-comprehensive.html'
        });

        res.json({
            success: true,
            leadId: lead.rows[0].id,
            message: 'Lead captured successfully'
        });

    } catch (error) {
        console.error('Lead capture error:', error);
        res.status(500).json({ error: 'Failed to capture lead' });
    }
});
```

### 2. BEHAVIOR TRACKING ENDPOINT
```javascript
// POST /api/analytics/events
app.post('/api/analytics/events', async (req, res) => {
    try {
        const { events, userId } = req.body;
        const consentStatus = JSON.parse(req.get('X-Consent-Status') || '{}');

        // Check consent before logging
        if (!consentStatus.analytics) {
            return res.status(403).json({ error: 'Analytics not consented' });
        }

        // Batch insert behavior events
        for (const event of events) {
            await db.query(
                `INSERT INTO user_behavior_events (
                    session_id, lead_email, event_type, event_data,
                    page_url, page_title, time_on_page, scroll_depth,
                    device_type, user_agent, language, timezone,
                    consent_status, tracking_permitted
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                [event.sessionId, userId, event.eventType, JSON.stringify(event.eventData),
                 event.url, event.pageTitle, event.timeOnPage, event.scrollDepth,
                 event.deviceType, event.userAgent, event.language, event.timezone,
                 JSON.stringify(consentStatus), true]
            );
        }

        res.json({ success: true, eventsCaptured: events.length });

    } catch (error) {
        console.error('Event tracking error:', error);
        res.status(500).json({ error: 'Failed to track events' });
    }
});
```

### 3. CONVERSION TRACKING ENDPOINT
```javascript
// POST /api/conversions/track
app.post('/api/conversions/track', async (req, res) => {
    try {
        const {
            sessionId, conversionType, conversionValue,
            leadEmail, leadScore, engagementLevel, buyingStage,
            sessionDuration, pageVisits
        } = req.body;

        // Log conversion
        const conversion = await db.query(
            `INSERT INTO conversions (
                session_id, lead_email, conversion_type, conversion_value,
                lead_score, engagement_level, buying_stage,
                session_duration, page_visits, device_type,
                consent_verified, gdpr_compliant
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id`,
            [sessionId, leadEmail, conversionType, conversionValue,
             leadScore, engagementLevel, buyingStage,
             sessionDuration, pageVisits, detectDeviceType(req),
             true, true]
        );

        // Update lead with conversion info
        await db.query(
            `UPDATE leads SET lead_score = $1, engagement_level = $2,
             buying_stage = $3, updated_at = NOW()
             WHERE email = $4`,
            [leadScore, engagementLevel, buyingStage, leadEmail]
        );

        res.json({
            success: true,
            conversionId: conversion.rows[0].id
        });

    } catch (error) {
        console.error('Conversion tracking error:', error);
        res.status(500).json({ error: 'Failed to track conversion' });
    }
});
```

### 4. DATA RIGHTS ENDPOINT (GDPR/CCPA Access Rights)
```javascript
// POST /api/data-rights/request
app.post('/api/data-rights/request', async (req, res) => {
    try {
        const { email, requestType } = req.body;

        // Allowed types: access, deletion, portability, rectification
        if (!['access', 'deletion', 'portability', 'rectification'].includes(requestType)) {
            return res.status(400).json({ error: 'Invalid request type' });
        }

        // Create verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Log request
        const request = await db.query(
            `INSERT INTO data_rights_requests (
                request_type, requester_email, verification_token,
                regulation, compliance_deadline, status, ip_address
            ) VALUES ($1, $2, $3, $4, NOW() + INTERVAL '30 days', $5, $6)
            RETURNING id`,
            [requestType, email, verificationToken,
             determineRegulation(req), 'pending', hashedIP(req.ip)]
        );

        // Send verification email with token
        await sendDataRightsVerificationEmail(email, {
            requestType: requestType,
            verificationLink: `https://spaceplannersindia.in/verify-data-rights?token=${verificationToken}`,
            privacyContactEmail: 'privacy@spaceplannersindia.in'
        });

        res.json({
            success: true,
            message: 'Verification email sent. Check your inbox within 24 hours.'
        });

    } catch (error) {
        console.error('Data rights request error:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

// GET /api/data-rights/access/:token
app.get('/api/data-rights/access/:token', async (req, res) => {
    try {
        const { token } = req.params;

        // Verify token
        const request = await db.query(
            `SELECT * FROM data_rights_requests
             WHERE verification_token = $1 AND verification_completed_at IS NULL
             AND NOW() < compliance_deadline`,
            [token]
        );

        if (request.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const dataRightsRequest = request.rows[0];

        // Fetch user data based on request type
        let userData = {};

        if (dataRightsRequest.request_type === 'access' || 'portability') {
            userData = await fetchCompleteUserData(dataRightsRequest.requester_email);
        }

        // Generate GDPR-compliant response
        const response = {
            requestId: dataRightsRequest.id,
            requestType: dataRightsRequest.request_type,
            generatedAt: new Date().toISOString(),
            data: userData,
            rightsInformation: {
                gdpr: 'You have the right to lodge a complaint with your national data protection authority',
                ccpa: 'You may have additional rights under CCPA. Contact privacy@spaceplannersindia.in',
                contactUs: 'privacy@spaceplannersindia.in'
            }
        };

        // Mark as completed
        await db.query(
            `UPDATE data_rights_requests SET
             status = 'completed', response_sent_at = NOW()
             WHERE id = $1`,
            [dataRightsRequest.id]
        );

        // Send via email
        await sendDataExportEmail(dataRightsRequest.requester_email, response);

        res.json({
            success: true,
            message: 'Your data export has been sent to your email'
        });

    } catch (error) {
        console.error('Data access error:', error);
        res.status(500).json({ error: 'Failed to retrieve data' });
    }
});
```

### 5. DATA DELETION ENDPOINT (Right to be Forgotten)
```javascript
// POST /api/data-rights/delete-data
app.post('/api/data-rights/delete-data', async (req, res) => {
    try {
        const { email, token } = req.body;

        // Verify stored token first
        const dataRightsRequest = await db.query(
            `SELECT * FROM data_rights_requests
             WHERE request_type = 'deletion' AND requester_email = $1
             AND verification_completed_at IS NOT NULL`,
            [email]
        );

        if (dataRightsRequest.rows.length === 0) {
            return res.status(400).json({ error: 'Deletion request not verified' });
        }

        // Anonymize instead of delete (keep audit trail)
        await db.query(
            `UPDATE leads SET
             first_name = 'DELETED', last_name = 'DELETED',
             email = CONCAT(id, '@deleted.local'),
             phone = NULL, company_name = NULL,
             product_interest = NULL,
             data_anonymized_at = NOW()
             WHERE email = $1`,
            [email]
        );

        // Delete associated analytics
        await db.query(
            `DELETE FROM user_behavior_events WHERE lead_email = $1`,
            [email]
        );

        // Mark deletion
        await db.query(
            `UPDATE leads SET deletion_requested_at = NOW()
             WHERE email = $1`,
            [email]
        );

        res.json({
            success: true,
            message: 'Your data has been anonymized and deleted'
        });

    } catch (error) {
        console.error('Deletion error:', error);
        res.status(500).json({ error: 'Failed to delete data' });
    }
});
```

---

## ✅ COMPLIANCE IMPLEMENTATION CHECKLIST

- [ ] Implement all database schemas with proper indexing
- [ ] Create API endpoints with consent verification
- [ ] Add HTTPS/SSL encryption for all endpoints
- [ ] Implement IP address hashing for GDPR compliance
- [ ] Create email verification for data rights requests
- [ ] Set up automated compliance deadline tracking
- [ ] Implement data retention policies with scheduled deletion
- [ ] Create audit logs for all data access
- [ ] Set up GDPR-compliant error handling
- [ ] Regular security audits and penetration testing

---

## 🔐 SECURITY BEST PRACTICES

1. **Data Minimization:** Only collect necessary data
2. **Encryption:** All data encrypted in transit and at rest
3. **Access Controls:** RBAC for employee access
4. **Audit Trails:** Complete logging of all data access
5. **Regular Backups:** Daily encrypted backups with 30-day retention
6. **Incident Response:** 72-hour breach notification protocol
7. **Third-Party Agreements:** DPA signed with all vendors
8. **Data Anonymization:** Automatic anonymization after retention period

---

**This implementation ensures full compliance with GDPR, CCPA, India IT Rules 2021, PIPEDA, and LGPD.**
