<!-- ===== EXCEL-BASED DATA CAPTURE SYSTEM ===== -->
<!-- This replaces the database approach with automated Excel file generation -->

<script>
// ===== DATA CAPTURE TO EXCEL/CSV =====
class ExcelDataCapture {
    constructor() {
        this.sessionId = 'SPL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.leads = [];
        this.conversionEvents = [];
        this.behaviorEvents = [];
        this.startTime = new Date();
    }

    // Capture form submission and prepare for Excel
    captureFormData(formElement, formType) {
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);

        const leadRecord = {
            'Timestamp': new Date().toLocaleString('en-IN'),
            'Session ID': this.sessionId,
            'Form Type': formType,

            // Contact Information
            'First Name': data.name?.split(' ')[0],
            'Last Name': data.name?.split(' ').pop(),
            'Email': data.email,
            'Phone': data.phone,
            'Company': data.company,
            'Designation': data.designation,

            // Requirements
            'Industry': data.industry,
            'Company Size': data.companySize,
            'Budget': data.budget,
            'Product Interest': data.productInterest,
            'Storage Requirements': data.storageRequirements,
            'Timeline': data.timeline,

            // Location
            'City': data.city,
            'State': data.state,
            'Country': data.country,

            // Source Attribution
            'Source Channel': this.getSourceChannel(),
            'Campaign Name': this.getCampaignName(),
            'Referrer': document.referrer,

            // Lead Scoring
            'Lead Score': this.calculateLeadScore(data),
            'Engagement Level': this.calculateEngagementLevel(),
            'Buying Stage': this.estimateBuyingStage(data),

            // Communication
            'Preferred Contact': data.preferredContact,
            'Communication Frequency': data.communicationFrequency,

            // Metadata
            'Device Type': this.getDeviceType(),
            'Browser': navigator.userAgent.split(' ').pop(),
            'Language': navigator.language,
            'Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,

            // Compliance
            'Consent Contact': data.consent_contact === 'on' ? 'Yes' : 'No',
            'Consent Analytics': data.consent_analytics === 'on' ? 'Yes' : 'No',
            'Consent Marketing': data.consent_marketing === 'on' ? 'Yes' : 'No',
            'Consent Timestamp': new Date().toISOString(),

            // Notes
            'Message': data.message || ''
        };

        this.leads.push(leadRecord);

        // Send to Excel/CSV export
        this.exportToExcel();

        // Also send to email/webhook
        this.sendToBackend(leadRecord, 'lead_capture');

        return leadRecord;
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

        // Industry weight (15 points)
        const highValueIndustries = ['Pharmaceutical', 'Government', 'Banking', 'Healthcare', 'Manufacturing'];
        if (highValueIndustries.includes(formData.industry)) score += 15;

        // Engagement proxy (10 points)
        if (this.getSessionDuration() > 180000) score += 10;

        return Math.min(Math.round(score), 100);
    }

    calculateEngagementLevel() {
        const sessionDuration = this.getSessionDuration();
        return sessionDuration > 300000 ? 'High' : sessionDuration > 120000 ? 'Medium' : 'Low';
    }

    estimateBuyingStage(formData) {
        const timeline = formData.timeline;
        if (timeline === 'Immediate') return 'Decision';
        if (timeline === '1-3 Months') return 'Evaluation';
        if (timeline === '3-6 Months') return 'Research';
        return 'Awareness';
    }

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/Mobile|Android|iPhone/.test(ua)) return 'Mobile';
        if (/Tablet|iPad/.test(ua)) return 'Tablet';
        return 'Desktop';
    }

    getSourceChannel() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_source') || urlParams.get('source') || 'Direct';
    }

    getCampaignName() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('utm_campaign') || 'Not Set';
    }

    getSessionDuration() {
        return new Date().getTime() - this.startTime.getTime();
    }

    // Convert to CSV format (Excel compatible)
    convertToCSV(data) {
        if (!data || data.length === 0) return '';

        // Get headers
        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.map(header => `"${header}"`).join(','),
            ...data.map(row =>
                headers.map(header => {
                    const value = row[header] || '';
                    // Escape quotes and wrap in quotes
                    return `"${String(value).replace(/"/g, '""')}"`;
                }).join(',')
            )
        ].join('\n');

        return csvContent;
    }

    // Download CSV file
    exportToExcel() {
        const csv = this.convertToCSV(this.leads);
        const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        const filename = `leads_${timestamp}.csv`;

        // Create blob
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`✅ Data exported to ${filename}`);
    }

    // Send to backend (optional - for email notifications)
    sendToBackend(data, eventType) {
        // Send to Zapier/Make.com webhook or email service
        fetch('YOUR_WEBHOOK_URL_HERE', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                eventType: eventType,
                data: data,
                timestamp: new Date().toISOString()
            })
        }).catch(e => {
            // Fail silently - still have Excel export
            console.log('Backend sync skipped (optional)');
        });
    }
}

// Initialize data capture
const excelCapture = new ExcelDataCapture();

// ===== MODIFIED FORM SUBMISSION =====
function captureFormSubmission(formElement, formType) {
    const leadRecord = excelCapture.captureFormData(formElement, formType);

    // Show success message
    alert(`✅ Thank you! Your information has been saved.\n\nLead Score: ${leadRecord['Lead Score']}/100\nBuying Stage: ${leadRecord['Buying Stage']}`);

    // Reset form
    formElement.reset();

    // Optional: Don't close modal immediately
    // closeInquiryModal();

    return false;
}

// ===== AUTOMATIC EXPORT (Optional - for admin dashboard) =====
function exportAllLeads() {
    if (excelCapture.leads.length === 0) {
        alert('No leads to export yet');
        return;
    }

    excelCapture.exportToExcel();
}

// Export every hour (optional)
setInterval(() => {
    if (excelCapture.leads.length > 0) {
        console.log(`📊 Auto-exporting ${excelCapture.leads.length} leads...`);
        excelCapture.exportToExcel();
    }
}, 3600000); // Every 1 hour
</script>

<!-- ===== OPTIONAL: Add Export Button to Admin Area ===== -->
<style>
    .admin-export-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #e53935;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        z-index: 99998;
        display: none; /* Show only on admin pages */
    }
    .admin-export-btn:hover {
        background: #c62828;
    }
</style>

<button class="admin-export-btn" onclick="exportAllLeads()" title="Export leads to CSV">
    📊 Export Leads
</button>
