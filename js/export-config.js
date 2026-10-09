/* ── EXPORT SECTION CONFIG (shared by /export/*.html) ──
   Edit the arrays below only; page markup is rendered from them. */
window.EXPORT_CONFIG = {
    // Client's latest list (supersedes nothing yet — final list still to be confirmed).
    // TODO-CLIENT: confirm final country list. Note "West Africa" depends on the unresolved
    // heavy-duty racks project location; replace with the confirmed country when known.
    countries: [
        { name: 'South Africa', flag: '🇿🇦' },
        { name: 'Oman', flag: '🇴🇲' },
        { name: 'Sri Lanka', flag: '🇱🇰' },
        { name: 'West Africa', flag: '🌍' }
    ]
    /* Earlier working list from the dev brief (NOT confirmed — do not enable without sign-off):
       UAE, Saudi Arabia, Oman, Sri Lanka, South Africa, Kenya, Uganda,
       possibly Bangladesh, Nepal, Qatar, Bahrain */
};

document.addEventListener('DOMContentLoaded', function () {
    var cfg = window.EXPORT_CONFIG || { countries: [] };
    var pill = function (c) {
        var el = document.createElement('div');
        el.className = 'country-pill';
        var f = document.createElement('span');
        f.className = 'flag-icon';
        f.textContent = c.flag || '🌍';
        el.appendChild(f);
        el.appendChild(document.createTextNode(' ' + c.name));
        return el;
    };

    // Scrolling badge strip (list rendered twice for a seamless loop)
    document.querySelectorAll('[data-export-countries="strip"]').forEach(function (wrap) {
        wrap.textContent = '';
        for (var i = 0; i < 2; i++) cfg.countries.forEach(function (c) { wrap.appendChild(pill(c)); });
    });

    // Static list (used on the overview page in place of the world map)
    document.querySelectorAll('[data-export-countries="list"]').forEach(function (wrap) {
        wrap.textContent = '';
        cfg.countries.forEach(function (c) { wrap.appendChild(pill(c)); });
    });
});
