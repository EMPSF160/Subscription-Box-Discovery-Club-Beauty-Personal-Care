/**
 * GLOWBOX - Admin Management Portal Controller
 * Full analytics charts, customer CRM, box manager, orders, quiz insights, promo codes
 */

let revenueChartInstance = null;
let categoryChartInstance = null;

document.addEventListener("DOMContentLoaded", () => {
  const adminRoot = document.getElementById("adminDashboardRoot");
  if (adminRoot) {
    initAdminPortal();
  }
});

function initAdminPortal() {
  document.querySelectorAll("[data-admin-tab]").forEach(tabBtn => {
    tabBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = tabBtn.getAttribute("data-admin-tab");
      switchAdminTab(targetTab);
    });
  });

  const hash = window.location.hash.replace("#", "");
  switchAdminTab(hash || "dashboard");
}

function switchAdminTab(tabId) {
  document.querySelectorAll("[data-admin-tab]").forEach(btn => {
    if (btn.getAttribute("data-admin-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const contentArea = document.getElementById("adminContentArea");
  if (!contentArea) return;

  const state = getGlowState();

  switch (tabId) {
    case "dashboard":
      renderAdminDashboardTab(contentArea, state);
      break;
    case "customers":
      renderAdminCustomersTab(contentArea, state);
      break;
    case "subscriptions":
      renderAdminSubscriptionsTab(contentArea, state);
      break;
    case "boxes":
      renderAdminBoxesTab(contentArea, state);
      break;
    case "products":
      renderAdminProductsTab(contentArea, state);
      break;
    case "orders":
      renderAdminOrdersTab(contentArea, state);
      break;
    case "payments":
      renderAdminPaymentsTab(contentArea, state);
      break;
    case "reviews":
      renderAdminReviewsTab(contentArea, state);
      break;
    case "quiz":
      renderAdminQuizTab(contentArea, state);
      break;
    case "promotions":
      renderAdminPromotionsTab(contentArea, state);
      break;
    case "journal":
      renderAdminJournalTab(contentArea, state);
      break;
    case "reports":
      renderAdminReportsTab(contentArea, state);
      break;
    case "settings":
      renderAdminSettingsTab(contentArea, state);
      break;
    default:
      renderAdminDashboardTab(contentArea, state);
  }
}

// 1. ADMIN DASHBOARD OVERVIEW
function renderAdminDashboardTab(container, state) {
  const m = state.adminMetrics;

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <span class="badge bg-plum text-white px-3 py-1 rounded-pill mb-1">Admin Management Portal</span>
        <h2 class="font-serif text-plum fw-bold mb-1">Executive Subscription Command Center</h2>
        <p class="text-muted m-0">Live MRR, fulfillment queues, subscriber retention and inventory velocity.</p>
      </div>
      <div class="d-flex gap-2">
        <a href="dashboard.html" class="btn btn-glow-outline btn-sm">
          <i class="fa-solid fa-eye me-1"></i> Customer View
        </a>
        <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('Exporting Report', 'Generating Q4 2026 Beauty Subscription CSV...', 'info')">
          <i class="fa-solid fa-download me-1"></i> Export Metrics
        </button>
      </div>
    </div>

    <!-- Live Metric Cards -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-xl-3">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Active Subscribers</span>
            <h3 class="font-serif text-plum fw-bold my-1">${m.activeSubscribers.toLocaleString()}</h3>
            <small class="text-success fw-bold"><i class="fa-solid fa-arrow-trend-up"></i> +12.4% this month</small>
          </div>
          <div class="stat-icon-wrap bg-rose-soft text-rose">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Monthly Recurring Rev (MRR)</span>
            <h3 class="font-serif text-plum fw-bold my-1">$${m.monthlyRevenue.toLocaleString()}</h3>
            <small class="text-success fw-bold"><i class="fa-solid fa-arrow-trend-up"></i> +$38,400 MoM</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-plum">
            <i class="fa-solid fa-dollar-sign"></i>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Churn Rate</span>
            <h3 class="font-serif text-plum fw-bold my-1">${m.churnRate}</h3>
            <small class="text-success fw-bold">Industry low (Avg 4.5%)</small>
          </div>
          <div class="stat-icon-wrap bg-rose-soft text-champagne">
            <i class="fa-solid fa-shield-halved"></i>
          </div>
        </div>
      </div>
      <div class="col-sm-6 col-xl-3">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Pending Fulfillment</span>
            <h3 class="font-serif text-plum fw-bold my-1">${m.pendingFulfillment} Boxes</h3>
            <small class="text-warning fw-bold"><i class="fa-solid fa-box-open"></i> Packing November Batch</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-danger">
            <i class="fa-solid fa-boxes-packing"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="font-serif text-plum fw-bold m-0">Revenue & Subscriber Trajectory (2026)</h5>
            <span class="badge bg-rose-soft text-plum">Monthly Growth</span>
          </div>
          <div style="height: 280px; position: relative;">
            <canvas id="adminRevenueChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <h5 class="font-serif text-plum fw-bold mb-3">Category Distribution</h5>
          <div style="height: 220px; position: relative;">
            <canvas id="adminCategoryChart"></canvas>
          </div>
          <div class="d-flex justify-content-around text-center mt-3 pt-2 border-top small">
            <div><span class="d-block fw-bold text-plum">54%</span><span class="text-muted">Skincare</span></div>
            <div><span class="d-block fw-bold text-plum">26%</span><span class="text-muted">Clean Bio</span></div>
            <div><span class="d-block fw-bold text-plum">20%</span><span class="text-muted">Prestige</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Subscriber Feed -->
    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="font-serif text-plum fw-bold m-0">Recent Subscriber Activity</h5>
        <a href="#customers" onclick="switchAdminTab('customers')" class="small text-rose fw-bold">View All Customers <i class="fa-solid fa-arrow-right ms-1"></i></a>
      </div>
      <div class="table-responsive">
        <table class="table table-luxury">
          <thead class="text-muted small text-uppercase">
            <tr>
              <th>Customer</th>
              <th>Selected Box</th>
              <th>Plan</th>
              <th>Lifetime Spend</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminCustomers.slice(0, 4).map(c => `
              <tr>
                <td>
                  <strong class="text-plum d-block">${c.name}</strong>
                  <small class="text-muted">${c.email}</small>
                </td>
                <td class="fw-semibold text-plum">${c.box}</td>
                <td><span class="badge bg-light text-dark">${c.plan}</span></td>
                <td class="fw-bold text-plum">${c.spend}</td>
                <td><span class="badge ${c.status === 'Active' ? 'bg-success' : 'bg-warning'}">${c.status}</span></td>
                <td>
                  <button class="btn btn-sm btn-glow-outline py-1 px-2" onclick="showGlowToast('Customer Record', 'Opening full CRM profile for ${c.name}', 'info')">Details</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;

  initAdminCharts();
}

function initAdminCharts() {
  if (typeof Chart === 'undefined') return;

  const revCtx = document.getElementById('adminRevenueChart');
  if (revCtx) {
    if (revenueChartInstance) revenueChartInstance.destroy();
    revenueChartInstance = new Chart(revCtx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Curr)', 'Nov (Proj)'],
        datasets: [{
          label: 'Monthly Revenue ($K)',
          data: [290, 315, 342, 370, 395, 418, 450],
          borderColor: '#241923',
          backgroundColor: 'rgba(216, 155, 168, 0.25)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#C9A66B'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(0,0,0,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  const catCtx = document.getElementById('adminCategoryChart');
  if (catCtx) {
    if (categoryChartInstance) categoryChartInstance.destroy();
    categoryChartInstance = new Chart(catCtx, {
      type: 'doughnut',
      data: {
        labels: ['Skincare & Glow', 'Clean Botanical', 'Golden Luxe VIP'],
        datasets: [{
          data: [54, 26, 20],
          backgroundColor: ['#241923', '#D89BA8', '#C9A66B'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: '72%'
      }
    });
  }
}

// 2. ADMIN CUSTOMERS CRM TAB
function renderAdminCustomersTab(container, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Customer CRM & Subscribers</h2>
        <p class="text-muted m-0">Directory of all 14,890 members, subscription states and skin profiles.</p>
      </div>
      <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('Add Member', 'Customer manual enrollment modal.', 'info')">+ Add Customer</button>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="row g-3 mb-3">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Search customer by name, email, or order ID...">
        </div>
        <div class="col-md-3">
          <select class="form-select">
            <option>All Subscription Plans</option>
            <option>Monthly Discovery</option>
            <option>Quarterly VIP</option>
            <option>Annual Glow Pass</option>
          </select>
        </div>
        <div class="col-md-3">
          <select class="form-select">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Cancelled</option>
          </select>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-luxury">
          <thead class="text-muted small text-uppercase">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subscription Box</th>
              <th>Billing Plan</th>
              <th>Member Since</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminCustomers.map(c => `
              <tr>
                <td><small class="text-muted font-monospace">${c.id}</small></td>
                <td>
                  <strong class="text-plum d-block">${c.name}</strong>
                  <small class="text-muted">${c.email}</small>
                </td>
                <td class="fw-semibold text-plum">${c.box}</td>
                <td>${c.plan}</td>
                <td>${c.joined}</td>
                <td><span class="badge ${c.status === 'Active' ? 'bg-success' : 'bg-warning'}">${c.status}</span></td>
                <td>
                  <button class="btn btn-sm btn-outline-secondary py-1 px-2" onclick="showGlowToast('CRM Modal', 'Loaded beauty diagnostic profile for ${c.name}', 'info')">
                    <i class="fa-solid fa-id-card"></i>
                  </button>
                  <button class="btn btn-sm btn-outline-danger py-1 px-2" onclick="showGlowToast('Notice', 'Customer status updated.', 'warning')">
                    <i class="fa-solid fa-pause"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 3. ADMIN SUBSCRIPTIONS TAB
function renderAdminSubscriptionsTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Subscription Tier Governance</h2>
      <p class="text-muted m-0">Manage active recurring tiers, churn protection, and monthly pricing schedules.</p>
    </div>

    <div class="row g-4">
      ${state.boxes.map(b => `
        <div class="col-md-6 col-xl-3">
          <div class="luxury-card p-4 bg-white text-center">
            <span class="luxury-badge ${b.badgeColor} mx-auto mb-2">${b.badge}</span>
            <h4 class="font-serif text-plum fw-bold mb-1">${b.title}</h4>
            <div class="fs-3 fw-bold text-plum my-2">$${b.monthlyPrice}<span class="fs-6 text-muted fw-normal">/mo</span></div>
            <p class="small text-muted mb-3">${b.subtitle}</p>
            <div class="p-2 bg-ivory rounded-3 border mb-3 small text-muted">
              <div><strong>3,450</strong> Active Subscribers</div>
              <div>MRR: <strong>$${(b.monthlyPrice * 3450).toLocaleString()}</strong></div>
            </div>
            <button class="btn btn-sm btn-glow-outline w-100" onclick="showGlowToast('Edit Tier', 'Modifying parameters for ${b.title}', 'info')">
              Edit Tier Parameters
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. ADMIN BOXES TAB
function renderAdminBoxesTab(container, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Monthly Box Curations</h2>
        <p class="text-muted m-0">Assign products, set deluxe samples, and configure seasonal hero items.</p>
      </div>
      <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('Curate Box', 'Box curation builder opened.', 'info')">+ Build New Box</button>
    </div>

    <div class="row g-4">
      ${state.boxes.map(box => `
        <div class="col-lg-6">
          <div class="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
            <div class="d-flex gap-3 align-items-center mb-3">
              <img src="${box.image}" class="rounded-3" style="width: 70px; height: 70px; object-fit: cover;">
              <div>
                <h5 class="font-serif text-plum fw-bold mb-1">${box.title}</h5>
                <small class="text-champagne fw-bold">${box.category} • Value: $${box.retailValue}</small>
              </div>
            </div>
            <h6 class="small text-uppercase text-muted fw-bold mb-2">Curated Products Included:</h6>
            <div class="d-flex flex-column gap-2 mb-3">
              ${box.productsIncluded.map(p => `
                <div class="p-2 bg-ivory rounded-2 border d-flex justify-content-between align-items-center small">
                  <div>
                    <strong class="text-plum">${p.name}</strong> <span class="text-muted">(${p.brand})</span>
                  </div>
                  <span class="badge bg-rose-soft text-plum">${p.size} • $${p.value}</span>
                </div>
              `).join('')}
            </div>
            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-sm btn-glow-plum flex-grow-1" onclick="showGlowToast('Box Editor', 'Updated box assignments.', 'success')">Edit Curation</button>
              <button class="btn btn-sm btn-outline-secondary" onclick="showGlowToast('Preview', 'Generating box digital 3D preview.', 'info')">Preview</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. ADMIN PRODUCTS TAB
function renderAdminProductsTab(container, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Beauty Product Inventory</h2>
        <p class="text-muted m-0">Manage partner brands, SKU levels, warehouse stock, and member discount rates.</p>
      </div>
      <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('Add SKU', 'Product intake form opened.', 'info')">+ Add Product SKU</button>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="table-responsive">
        <table class="table table-luxury align-middle">
          <thead class="text-muted small text-uppercase">
            <tr>
              <th>SKU</th>
              <th>Product</th>
              <th>Brand Partner</th>
              <th>Retail / Member Price</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${state.products.map(p => `
              <tr>
                <td><small class="font-monospace text-muted">${p.id}</small></td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <img src="${p.image}" class="rounded-2" style="width: 40px; height: 40px; object-fit: cover;">
                    <strong class="text-plum">${p.name}</strong>
                  </div>
                </td>
                <td class="text-champagne fw-semibold">${p.brand}</td>
                <td>
                  <span class="text-decoration-line-through text-muted small">$${p.price}</span>
                  <strong class="text-plum ms-1">$${p.memberPrice}</strong>
                </td>
                <td><span class="badge bg-success">In Stock (1,240 units)</span></td>
                <td>
                  <button class="btn btn-sm btn-glow-outline py-1 px-2" onclick="showGlowToast('Inventory', 'Updated stock for ${p.name}', 'info')">Edit</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 6. ADMIN ORDERS TAB
function renderAdminOrdersTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Fulfillment & Shipping Pipeline</h2>
      <p class="text-muted m-0">Track warehouse packing, label generation, and carrier dispatches.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="font-serif text-plum fw-bold m-0">Live Fulfillment Batches (November 2026)</h5>
        <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('Dispatched', 'Generated 342 FedEx shipping labels.', 'success')">
          <i class="fa-solid fa-barcode me-1"></i> Batch Print Labels
        </button>
      </div>

      <div class="table-responsive">
        <table class="table table-luxury">
          <thead class="text-muted small text-uppercase">
            <tr>
              <th>Order ID</th>
              <th>Recipient</th>
              <th>Box Version</th>
              <th>Custom Hero Choice</th>
              <th>Status</th>
              <th>Fulfill</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#GLW-8891</strong></td>
              <td>Sophia Montgomery</td>
              <td>Velvet Radiance (Nov)</td>
              <td><span class="badge bg-rose-soft text-plum">Lumière Rose Peptide</span></td>
              <td><span class="badge bg-warning text-dark">Packing</span></td>
              <td><button class="btn btn-sm btn-success py-1 px-2" onclick="showGlowToast('Shipped', 'Order #GLW-8891 marked as Dispatched.', 'success')">Mark Shipped</button></td>
            </tr>
            <tr>
              <td><strong>#GLW-8892</strong></td>
              <td>Isabella Rossi</td>
              <td>Golden Glow VIP (Nov)</td>
              <td><span class="badge bg-rose-soft text-plum">24K Gold Cellular Lift</span></td>
              <td><span class="badge bg-warning text-dark">Packing</span></td>
              <td><button class="btn btn-sm btn-success py-1 px-2" onclick="showGlowToast('Shipped', 'Order #GLW-8892 marked as Dispatched.', 'success')">Mark Shipped</button></td>
            </tr>
            <tr>
              <td><strong>#GLW-8893</strong></td>
              <td>Chloe Dupont</td>
              <td>Clean Botanical (Nov)</td>
              <td><span class="badge bg-rose-soft text-plum">Matcha Cleansing Balm</span></td>
              <td><span class="badge bg-success">Shipped</span></td>
              <td><button class="btn btn-sm btn-outline-secondary py-1 px-2" disabled>Completed</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 7. ADMIN PAYMENTS TAB
function renderAdminPaymentsTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Financial Ledgers & Payment Gateways</h2>
      <p class="text-muted m-0">Stripe and PayPal recurring subscription settlement records.</p>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Net Payout (This Week)</span>
            <h4 class="font-serif text-plum fw-bold my-1">$94,280.00</h4>
            <small class="text-success fw-bold">Settled via Stripe</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-success"><i class="fa-solid fa-vault"></i></div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Failed Charge Rate</span>
            <h4 class="font-serif text-plum fw-bold my-1">0.42%</h4>
            <small class="text-success fw-bold">Smart dunning active</small>
          </div>
          <div class="stat-icon-wrap bg-rose-soft text-plum"><i class="fa-solid fa-credit-card"></i></div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="stat-card-luxury">
          <div>
            <span class="text-muted small text-uppercase">Total Refund Vol</span>
            <h4 class="font-serif text-plum fw-bold my-1">$280.00</h4>
            <small class="text-muted">0.06% of revenue</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-warning"><i class="fa-solid fa-receipt"></i></div>
        </div>
      </div>
    </div>
  `;
}

// 8. ADMIN REVIEWS TAB
function renderAdminReviewsTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Review Moderation & Glow UGC</h2>
      <p class="text-muted m-0">Approve customer product reviews, ratings, and unboxing photos.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="d-flex flex-column gap-3">
        <div class="p-3 bg-ivory rounded-3 border d-flex justify-content-between align-items-center">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <strong class="text-plum">Sophia M.</strong>
              <span class="text-warning">★★★★★</span>
              <span class="badge bg-success">Verified Subscriber</span>
            </div>
            <p class="small text-muted m-0">"Absolute holy grail serum! Gives that healthy glass glow without stickiness."</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-success" onclick="showGlowToast('Approved', 'Review published to product page.', 'success')">Approve</button>
            <button class="btn btn-sm btn-outline-danger" onclick="showGlowToast('Dismissed', 'Review rejected.', 'warning')">Reject</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 9. ADMIN QUIZ TAB
function renderAdminQuizTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Beauty Quiz Diagnostic Analytics</h2>
      <p class="text-muted m-0">Over 38,400 quiz completions. Skin barrier telemetry and formulation demand.</p>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <h5 class="font-serif text-plum fw-bold mb-3">Skin Type Demographics</h5>
          <ul class="list-unstyled d-flex flex-column gap-3 small">
            <div>
              <div class="d-flex justify-content-between mb-1"><span>Combination / Dehydrated</span><strong>44%</strong></div>
              <div class="progress" style="height: 6px;"><div class="progress-bar bg-plum" style="width: 44%"></div></div>
            </div>
            <div>
              <div class="d-flex justify-content-between mb-1"><span>Dry & Sensitive</span><strong>31%</strong></div>
              <div class="progress" style="height: 6px;"><div class="progress-bar bg-rose" style="width: 31%"></div></div>
            </div>
            <div>
              <div class="d-flex justify-content-between mb-1"><span>Oily & Acne Prone</span><strong>25%</strong></div>
              <div class="progress" style="height: 6px;"><div class="progress-bar bg-champagne" style="width: 25%"></div></div>
            </div>
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <h5 class="font-serif text-plum fw-bold mb-3">Quiz Conversion Rate</h5>
          <div class="text-center py-4">
            <div class="display-4 font-serif text-plum fw-bold mb-2">32.8%</div>
            <p class="text-muted small">Of users who complete "Your Beauty Match" convert to an active recurring subscription within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 10. ADMIN PROMOTIONS TAB
function renderAdminPromotionsTab(container, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Promotions & Discount Coupons</h2>
        <p class="text-muted m-0">Manage promo campaigns, discount codes, and influencer tracking links.</p>
      </div>
      <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('New Coupon', 'Coupon generation form opened.', 'info')">+ Create Coupon</button>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <div class="table-responsive">
        <table class="table table-luxury">
          <thead class="text-muted small text-uppercase">
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Applicable Scope</th>
              <th>Times Redeemed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${state.adminCoupons.map(c => `
              <tr>
                <td><strong class="font-monospace text-plum">${c.code}</strong></td>
                <td class="fw-bold text-success">${c.discount}</td>
                <td>${c.type}</td>
                <td>${c.usages.toLocaleString()} uses</td>
                <td><span class="badge bg-success">Active</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 11. ADMIN JOURNAL TAB
function renderAdminJournalTab(container, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Beauty Journal & Editorial Articles</h2>
        <p class="text-muted m-0">Publish beauty science guides, ingredient deep-dives, and trend reports.</p>
      </div>
      <button class="btn btn-glow-plum btn-sm" onclick="showGlowToast('New Article', 'Editorial WYSIWYG editor opened.', 'info')">+ New Article</button>
    </div>

    <div class="row g-3">
      ${state.journalArticles.map(a => `
        <div class="col-md-6">
          <div class="p-3 bg-white rounded-3 border shadow-sm d-flex gap-3 align-items-center">
            <img src="${a.image}" class="rounded-2" style="width: 70px; height: 70px; object-fit: cover;">
            <div class="overflow-hidden flex-grow-1">
              <span class="badge bg-rose-soft text-plum small mb-1">${a.category}</span>
              <h6 class="text-plum fw-bold mb-0 text-truncate">${a.title}</h6>
              <small class="text-muted">${a.author} • ${a.date}</small>
            </div>
            <button class="btn btn-sm btn-glow-outline py-1 px-2" onclick="showGlowToast('Edit Article', 'Opening article editor for ${a.title}', 'info')">Edit</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 12. ADMIN REPORTS TAB
function renderAdminReportsTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Financial & Cohort Intelligence</h2>
      <p class="text-muted m-0">Subscriber LTV, CAC payback period (3.2 months), and cohort retention matrices.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <h5 class="font-serif text-plum fw-bold mb-3">12-Month Cohort Retention Matrix (%)</h5>
      <p class="text-muted small mb-4">GLOWBOX retains <strong>84%</strong> of subscribers at month 6 and <strong>76%</strong> at month 12.</p>
      
      <div class="table-responsive">
        <table class="table table-bordered text-center small">
          <thead class="bg-light">
            <tr>
              <th>Cohort</th>
              <th>M1</th><th>M2</th><th>M3</th><th>M4</th><th>M5</th><th>M6</th><th>M12</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Jan 2026</td><td class="bg-success bg-opacity-25">100%</td><td>95%</td><td>91%</td><td>88%</td><td>86%</td><td>84%</td><td>78%</td></tr>
            <tr><td>Feb 2026</td><td class="bg-success bg-opacity-25">100%</td><td>96%</td><td>92%</td><td>89%</td><td>87%</td><td>85%</td><td>-</td></tr>
            <tr><td>Mar 2026</td><td class="bg-success bg-opacity-25">100%</td><td>94%</td><td>90%</td><td>88%</td><td>86%</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 13. ADMIN SETTINGS TAB
function renderAdminSettingsTab(container, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Platform Configuration & API Settings</h2>
      <p class="text-muted m-0">Store currency, Stripe webhooks, fulfillment API keys, and notification emails.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <form onsubmit="event.preventDefault(); showGlowToast('Settings Saved', 'Platform parameters updated.', 'success');">
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label small fw-bold">Platform Name</label>
            <input type="text" class="form-control" value="GLOWBOX - Luxury Beauty Subscription">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Primary Store Currency</label>
            <input type="text" class="form-control" value="USD ($)">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Support Concierge Email</label>
            <input type="email" class="form-control" value="concierge@glowbox.luxury">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Warehouse Dispatch Cutoff Day</label>
            <input type="text" class="form-control" value="4th of every month">
          </div>
        </div>
        <button type="submit" class="btn btn-glow-plum">Save Admin Settings</button>
      </form>
    </div>
  `;
}
