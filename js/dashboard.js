/**
 * Interactive Biostatistics & Clinical Metrics Dashboard
 * Pure Vanilla JS interactive data visualizer.
 */

const DASHBOARD_DATA = {
  tat: {
    title: "Clinical Diagnostic Turnaround Time (TAT) Optimization",
    subtitle: "5+ Validated Protocols across 100+ Daily Patient Cases (Hetauda Reference Lab)",
    metric: "-20.8%",
    metricLabel: "Average TAT Reduction",
    chartType: "dual-bar",
    items: [
      { name: "Biochemistry Profile", before: 48, after: 36, unit: "hrs" },
      { name: "Hematology & CBC", before: 24, after: 18, unit: "hrs" },
      { name: "Serology & ELISA", before: 36, after: 28, unit: "hrs" },
      { name: "Hormone Immunoassays", before: 72, after: 52, unit: "hrs" },
      { name: "Infectious Disease PCR", before: 48, after: 38, unit: "hrs" }
    ]
  },
  surveillance: {
    title: "Epidemiological Prevalence & Cohort Distribution",
    subtitle: "Public Health Population Risk Analysis Model (R / SAS Analytics)",
    metric: "95% CI",
    metricLabel: "Multivariate Regression Accuracy",
    chartType: "trend-bar",
    items: [
      { name: "Age 0–18 (Pediatric)", rate: 12.4, risk: "Low", unit: "%" },
      { name: "Age 19–35 (Young Adult)", rate: 21.8, risk: "Moderate", unit: "%" },
      { name: "Age 36–50 (Adult)", rate: 38.6, risk: "High", unit: "%" },
      { name: "Age 51–65 (Mature Adult)", rate: 44.2, risk: "High", unit: "%" },
      { name: "Age 65+ (Geriatric)", rate: 58.7, risk: "Critical", unit: "%" }
    ]
  }
};

export function initDashboard() {
  const container = document.getElementById('dashboard-chart-area');
  const toggleBtns = document.querySelectorAll('.dash-toggle-btn');
  const metricVal = document.getElementById('dash-metric-val');
  const metricLabel = document.getElementById('dash-metric-label');
  const titleEl = document.getElementById('dash-title');
  const subtitleEl = document.getElementById('dash-subtitle');

  if (!container) return;

  function render(viewKey) {
    const data = DASHBOARD_DATA[viewKey];
    if (!data) return;

    if (titleEl) titleEl.textContent = data.title;
    if (subtitleEl) subtitleEl.textContent = data.subtitle;
    if (metricVal) metricVal.textContent = data.metric;
    if (metricLabel) metricLabel.textContent = data.metricLabel;

    container.innerHTML = '';

    if (data.chartType === 'dual-bar') {
      const maxVal = Math.max(...data.items.map(i => i.before));
      
      data.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'dash-row';

        const beforePct = ((item.before / maxVal) * 100).toFixed(1);
        const afterPct = ((item.after / maxVal) * 100).toFixed(1);
        const reduction = (((item.before - item.after) / item.before) * 100).toFixed(0);

        row.innerHTML = `
          <div class="dash-row-header">
            <span class="dash-row-name">${item.name}</span>
            <span class="dash-row-stat text-teal">-${reduction}% (${item.after}${item.unit})</span>
          </div>
          <div class="dash-bars-wrap">
            <div class="dash-bar-line">
              <span class="dash-bar-label">Before</span>
              <div class="dash-bar-bg">
                <div class="dash-bar dash-bar--before" style="width: ${beforePct}%"></div>
              </div>
              <span class="dash-bar-val">${item.before}${item.unit}</span>
            </div>
            <div class="dash-bar-line">
              <span class="dash-bar-label text-teal">After</span>
              <div class="dash-bar-bg">
                <div class="dash-bar dash-bar--after" style="width: ${afterPct}%"></div>
              </div>
              <span class="dash-bar-val text-teal">${item.after}${item.unit}</span>
            </div>
          </div>
        `;
        container.appendChild(row);
      });
    } else {
      const maxVal = Math.max(...data.items.map(i => i.rate));

      data.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'dash-row';
        const pct = ((item.rate / maxVal) * 100).toFixed(1);

        row.innerHTML = `
          <div class="dash-row-header">
            <span class="dash-row-name">${item.name}</span>
            <span class="dash-row-stat text-cyan">${item.risk} Risk (${item.rate}${item.unit})</span>
          </div>
          <div class="dash-bar-bg" style="height: 12px; margin-top: 0.35rem;">
            <div class="dash-bar dash-bar--trend" style="width: ${pct}%"></div>
          </div>
        `;
        container.appendChild(row);
      });
    }
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.getAttribute('data-view'));
    });
  });

  render('tat');
}
