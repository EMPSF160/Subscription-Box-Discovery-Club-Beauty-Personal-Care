/**
 * GLOWBOX - Customer Dashboard Controller
 * Full subscription lifecycle management, customization, orders, profile, points & reviews
 */

document.addEventListener("DOMContentLoaded", () => {
  const dashboardRoot = document.getElementById("customerDashboardRoot");
  if (dashboardRoot) {
    initCustomerDashboard();
  }
});

function initCustomerDashboard() {
  // Sidebar navigation click listeners
  document.querySelectorAll("[data-dash-tab]").forEach(tabBtn => {
    tabBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetTab = tabBtn.getAttribute("data-dash-tab");
      switchDashboardTab(targetTab);
    });
  });

  // Load initial tab from hash or default to overview
  const hash = window.location.hash.replace("#", "");
  switchDashboardTab(hash || "overview");
}

function switchDashboardTab(tabId) {
  // Update sidebar active states
  document.querySelectorAll("[data-dash-tab]").forEach(btn => {
    if (btn.getAttribute("data-dash-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Render tab content
  const contentArea = document.getElementById("dashContentArea");
  if (!contentArea) return;

  const state = getGlowState();
  const user = state.currentUser;

  switch (tabId) {
    case "overview":
      renderOverviewTab(contentArea, user, state);
      break;
    case "subscription":
      renderSubscriptionTab(contentArea, user, state);
      break;
    case "upcoming":
      renderUpcomingBoxTab(contentArea, user, state);
      break;
    case "products":
      renderMyProductsTab(contentArea, user, state);
      break;
    case "profile":
      renderBeautyProfileTab(contentArea, user, state);
      break;
    case "orders":
      renderOrderHistoryTab(contentArea, user, state);
      break;
    case "favorites":
      renderFavoritesTab(contentArea, user, state);
      break;
    case "reviews":
      renderReviewsTab(contentArea, user, state);
      break;
    case "billing":
      renderBillingTab(contentArea, user, state);
      break;
    case "settings":
      renderAccountSettingsTab(contentArea, user, state);
      break;
    default:
      renderOverviewTab(contentArea, user, state);
  }
}

// 1. OVERVIEW TAB
function renderOverviewTab(container, user, state) {
  const currentBox = state.boxes.find(b => b.id === user.subscription.boxId) || state.boxes[0];

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Welcome back, ${user.name.split(' ')[0]} ✨</h2>
        <p class="text-muted m-0">Here is your beauty discovery overview for October & November 2026.</p>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="bg-white px-3 py-2 rounded-3 border shadow-sm d-flex align-items-center gap-2">
          <i class="fa-solid fa-sparkles text-champagne"></i>
          <div>
            <span class="d-block small text-muted lh-1">Glow Points</span>
            <strong class="text-plum fs-5">${user.glowPoints} pts</strong>
          </div>
        </div>
        <a href="#upcoming" onclick="switchDashboardTab('upcoming')" class="btn btn-glow-plum">
          <i class="fa-solid fa-wand-magic-sparkles me-1"></i> Customize Box
        </a>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card-luxury h-100">
          <div>
            <span class="text-muted small text-uppercase fw-semibold d-block mb-1">Plan Status</span>
            <h4 class="font-serif fw-bold my-1">
              <span class="badge ${user.subscription.status === 'Active' ? 'bg-success' : 'bg-warning'} text-white">
                ${user.subscription.status}
              </span>
            </h4>
            <small class="text-muted d-block mt-1">${user.subscription.tier}</small>
          </div>
          <div class="stat-icon-wrap bg-rose-soft text-rose flex-shrink-0 ms-2">
            <i class="fa-solid fa-gem"></i>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card-luxury h-100">
          <div>
            <span class="text-muted small text-uppercase fw-semibold d-block mb-1">Next Box Delivery</span>
            <h4 class="font-serif text-plum fw-bold my-1">Nov 8 - 11</h4>
            <small class="text-muted d-block mt-1">Tracking # Active</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-plum flex-shrink-0 ms-2">
            <i class="fa-solid fa-truck-fast"></i>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card-luxury h-100">
          <div>
            <span class="text-muted small text-uppercase fw-semibold d-block mb-1">Total Discovered</span>
            <h4 class="font-serif text-plum fw-bold my-1">${user.receivedProducts.length + 12} Products</h4>
            <small class="text-success fw-bold d-block mt-1">Saved $680+ Retail</small>
          </div>
          <div class="stat-icon-wrap bg-rose-soft text-rose flex-shrink-0 ms-2">
            <i class="fa-solid fa-spray-can-sparkles"></i>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-3">
        <div class="stat-card-luxury h-100">
          <div>
            <span class="text-muted small text-uppercase fw-semibold d-block mb-1">Store Member Perk</span>
            <h4 class="font-serif text-plum fw-bold my-1">30% OFF</h4>
            <small class="text-muted d-block mt-1">On all full-size bottles</small>
          </div>
          <div class="stat-icon-wrap bg-ivory text-champagne flex-shrink-0 ms-2">
            <i class="fa-solid fa-tags"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Subscription Spotlight -->
    <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
      <div class="row g-0">
        <div class="col-lg-5 position-relative">
          <img src="${currentBox.image}" alt="${currentBox.title}" class="w-100 h-100" style="object-fit: cover; min-height: 240px;">
          <div class="position-absolute top-0 start-0 m-3">
            <span class="luxury-badge ${currentBox.badgeColor}">${currentBox.badge}</span>
          </div>
        </div>
        <div class="col-lg-7 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="text-champagne fw-bold text-uppercase small">Current Subscription Box</span>
              <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-2 py-1">Auto-Renew Active</span>
            </div>
            <h3 class="font-serif text-plum fw-bold mb-2">${user.subscription.planName}</h3>
            <p class="text-muted small mb-3">Your upcoming November box features luxury barrier replenishing botanicals with full customization perks.</p>
            
            <div class="d-flex flex-wrap gap-3 p-3 bg-ivory rounded-3 border mb-3">
              <div>
                <small class="text-muted d-block">Monthly Charge</small>
                <strong class="text-plum">$${user.subscription.price.toFixed(2)}/mo</strong>
              </div>
              <div class="border-start ps-3">
                <small class="text-muted d-block">Next Billing Date</small>
                <strong class="text-plum">${user.subscription.nextBillingDate}</strong>
              </div>
              <div class="border-start ps-3">
                <small class="text-muted d-block">Hero Customization</small>
                <strong class="text-rose">${user.subscription.selectedHeroChoice}</strong>
              </div>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-2 pt-2">
            <a href="#upcoming" onclick="switchDashboardTab('upcoming')" class="btn btn-glow-plum btn-sm">Customize Items</a>
            <a href="#subscription" onclick="switchDashboardTab('subscription')" class="btn btn-glow-outline btn-sm">Manage Subscription</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Discovered Products -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="font-serif text-plum fw-bold m-0">Recent Products in Your Vanity</h4>
      <a href="#products" onclick="switchDashboardTab('products')" class="small text-rose fw-bold">View All (${user.receivedProducts.length}) <i class="fa-solid fa-arrow-right ms-1"></i></a>
    </div>
    <div class="row g-3">
      ${user.receivedProducts.map(p => `
        <div class="col-md-4">
          <div class="p-3 bg-white rounded-3 border shadow-sm h-100 d-flex gap-3 align-items-center">
            <img src="${p.img}" alt="${p.name}" class="rounded-2" style="width: 64px; height: 64px; object-fit: cover;">
            <div class="overflow-hidden">
              <small class="text-champagne fw-bold d-block text-truncate">${p.brand}</small>
              <h6 class="text-plum fw-bold mb-1 text-truncate">${p.name}</h6>
              <div class="text-warning small mb-1">
                ${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}
              </div>
              <button class="btn btn-sm btn-link p-0 text-rose fw-semibold" onclick="reorderProduct('${p.id}', '${p.name}')">
                Repurchase (30% Off)
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 2. MY SUBSCRIPTION TAB
function renderSubscriptionTab(container, user, state) {
  const currentBox = state.boxes.find(b => b.id === user.subscription.boxId) || state.boxes[0];

  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1" style="word-break: break-word;">My Subscription Management</h2>
      <p class="text-muted m-0">Control billing frequency, skip upcoming boxes, or adjust delivery schedules freely.</p>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-lg-8">
        <div class="p-3 p-sm-4 bg-white rounded-4 border shadow-sm mb-4">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h4 class="font-serif text-plum fw-bold m-0">Active Plan Details</h4>
            <span class="badge ${user.subscription.status === 'Active' ? 'bg-success' : 'bg-warning'} px-3 py-2 rounded-pill">
              Status: ${user.subscription.status}
            </span>
          </div>

          <div class="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center p-3 bg-ivory rounded-3 border mb-4">
            <img src="${currentBox.image}" alt="${currentBox.title}" class="rounded-3 flex-shrink-0" style="width: 76px; height: 76px; object-fit: cover;">
            <div class="w-100 overflow-hidden">
              <h5 class="text-plum fw-bold mb-1 font-serif text-truncate">${user.subscription.planName}</h5>
              <p class="text-muted small mb-2">${currentBox.category} • Billed $${user.subscription.price.toFixed(2)}/mo</p>
              <span class="badge fw-bold px-2 py-1" style="background-color: #DFCA9B; color: #191118; font-size: 0.72rem;">Monthly Discovery Pass</span>
            </div>
          </div>

          <div class="row g-3 mb-4">
            <div class="col-sm-6">
              <div class="p-3 border rounded-3 h-100">
                <small class="text-muted d-block">Next Auto-Renewal Date</small>
                <strong class="text-plum fs-6">${user.subscription.nextBillingDate}</strong>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="p-3 border rounded-3 h-100">
                <small class="text-muted d-block">Default Payment Method</small>
                <strong class="text-plum fs-6"><i class="fa-brands fa-cc-mastercard text-danger me-1"></i> Mastercard ending in 8824</strong>
              </div>
            </div>
          </div>

          <h5 class="font-serif text-plum fw-bold mb-3">Subscription Controls</h5>
          <div class="d-flex flex-wrap gap-2">
            ${user.subscription.status === 'Active' ? `
              <button class="btn btn-outline-warning" onclick="togglePauseSubscription(true)">
                <i class="fa-solid fa-pause me-1"></i> Pause Subscription (1 Month)
              </button>
              <button class="btn btn-outline-secondary" onclick="skipNextBox()">
                <i class="fa-solid fa-forward me-1"></i> Skip November Box
              </button>
              <button class="btn btn-outline-danger" onclick="openCancelModal()">
                <i class="fa-solid fa-xmark me-1"></i> Cancel Subscription
              </button>
            ` : `
              <button class="btn btn-success" onclick="togglePauseSubscription(false)">
                <i class="fa-solid fa-play me-1"></i> Resume Subscription
              </button>
            `}
          </div>
        </div>

        <!-- Switch Box Plan Option -->
        <div class="p-3 p-sm-4 bg-white rounded-4 border shadow-sm">
          <h4 class="font-serif text-plum fw-bold mb-3">Switch Your Discovery Curation</h4>
          <p class="text-muted small mb-3">Want to switch your beauty focus? Choose a new box curation for next month at no extra switching cost.</p>
          <div class="row g-3">
            ${state.boxes.map(box => `
              <div class="col-md-6">
                <div class="p-3 border rounded-3 d-flex gap-3 align-items-center ${box.id === user.subscription.boxId ? 'border-plum bg-rose-soft' : 'bg-white'}">
                  <img src="${box.image}" class="rounded-2" style="width: 50px; height: 50px; object-fit: cover;">
                  <div class="flex-grow-1 overflow-hidden">
                    <h6 class="text-plum fw-bold mb-0 text-truncate">${box.title}</h6>
                    <small class="text-muted">$${box.monthlyPrice}/mo</small>
                  </div>
                  ${box.id === user.subscription.boxId ? `
                    <span class="badge bg-plum text-white">Current</span>
                  ` : `
                    <button class="btn btn-sm btn-glow-outline py-1 px-2" onclick="switchUserBox('${box.id}')">Switch</button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Perks Card -->
      <div class="col-lg-4">
        <div class="p-4 bg-plum text-white rounded-4 shadow-sm h-100 d-flex flex-column justify-content-between">
          <div>
            <span class="section-tag dark mb-2"><i class="fa-solid fa-crown text-champagne"></i> Member Benefits</span>
            <h4 class="font-serif text-white fw-bold mb-3">Your Glow Perks</h4>
            <ul class="list-unstyled d-flex flex-column gap-3 small text-white opacity-90 mb-4">
              <li class="d-flex gap-2"><i class="fa-solid fa-check text-rose mt-1"></i> <div><strong class="text-white">30% Off Store:</strong> <span class="text-white">Member pricing on all re-orders.</span></div></li>
              <li class="d-flex gap-2"><i class="fa-solid fa-check text-rose mt-1"></i> <div><strong class="text-white">Hero Choice:</strong> <span class="text-white">Pick 1 product each month before packing.</span></div></li>
              <li class="d-flex gap-2"><i class="fa-solid fa-check text-rose mt-1"></i> <div><strong class="text-white">Free Global Shipping:</strong> <span class="text-white">Zero fulfillment fees ever.</span></div></li>
              <li class="d-flex gap-2"><i class="fa-solid fa-check text-rose mt-1"></i> <div><strong class="text-white">Earn 50 Pts / Review:</strong> <span class="text-white">Redeem for luxury full-size gifts.</span></div></li>
            </ul>
          </div>

          <div class="p-3 rounded-3 mt-3" style="background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.18);">
            <small class="text-champagne-light fw-bold text-uppercase d-block mb-1">Referral Link</small>
            <p class="small text-white opacity-90 mb-2">Give $10 off, get $10 in Glow credits.</p>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" value="glowbox.com/ref/sophia98" readonly>
              <button class="btn btn-glow-champagne" onclick="showGlowToast('Copied!', 'Referral link copied to clipboard.', 'success')">Copy</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. UPCOMING BOX TAB (CUSTOMIZATION)
function renderUpcomingBoxTab(container, user, state) {
  const currentBox = state.boxes.find(b => b.id === user.subscription.boxId) || state.boxes[0];

  container.innerHTML = `
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1" style="word-break: break-word;">Upcoming November Curation</h2>
        <p class="text-muted m-0">Customize your hero luxury product before the packing window closes in <strong>4 days</strong>.</p>
      </div>
      <span class="badge bg-warning text-dark px-3 py-2 rounded-pill fs-6 flex-shrink-0">
        <i class="fa-solid fa-clock me-1"></i> Customization Closes Nov 4
      </span>
    </div>

    <!-- Timeline Tracker -->
    <div class="p-3 p-sm-4 bg-white rounded-4 border shadow-sm mb-4">
      <h5 class="font-serif text-plum fw-bold mb-3">Delivery Journey & Packing Status</h5>
      <div class="row text-center g-2 position-relative">
        <div class="col-6 col-sm-3">
          <div class="p-2 rounded-3 bg-rose-soft border border-rose h-100">
            <i class="fa-solid fa-wand-magic-sparkles text-plum fs-5 mb-1"></i>
            <strong class="d-block small text-plum text-truncate">Customizing</strong>
            <small class="text-success fw-bold d-block">Active Now</small>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="p-2 rounded-3 bg-light border h-100">
            <i class="fa-solid fa-box text-muted fs-5 mb-1"></i>
            <strong class="d-block small text-muted text-truncate">Box Packing</strong>
            <small class="text-muted d-block">Nov 5</small>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="p-2 rounded-3 bg-light border h-100">
            <i class="fa-solid fa-truck text-muted fs-5 mb-1"></i>
            <strong class="d-block small text-muted text-truncate">Dispatched</strong>
            <small class="text-muted d-block">Nov 7</small>
          </div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="p-2 rounded-3 bg-light border h-100">
            <i class="fa-solid fa-house text-muted fs-5 mb-1"></i>
            <strong class="d-block small text-muted text-truncate">Delivered</strong>
            <small class="text-muted d-block">Nov 10</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Product Choice -->
    <div class="p-3 p-sm-4 bg-white rounded-4 border shadow-sm mb-4">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mb-3">
        <div>
          <span class="section-tag mb-1"><i class="fa-solid fa-star"></i> Custom Choice</span>
          <h4 class="font-serif text-plum fw-bold m-0" style="word-break: break-word;">Select Your November Hero Product</h4>
        </div>
        <span class="badge bg-rose-soft text-plum text-wrap text-start text-md-end">Currently Selected: ${user.subscription.selectedHeroChoice}</span>
      </div>
      <p class="text-muted small mb-4">All subscribers receive the foundational 4 essentials, plus your selected choice below:</p>

      <div class="row g-3">
        ${currentBox.productsIncluded.slice(0, 3).map((prod, idx) => `
          <div class="col-md-4">
            <div class="p-3 border rounded-3 h-100 d-flex flex-column justify-content-between ${user.subscription.selectedHeroChoice === prod.name ? 'border-plum bg-rose-soft' : 'bg-white'}">
              <div class="text-center mb-3">
                <div class="img-product-wrap mb-2 mx-auto" style="max-height: 140px;">
                  <img src="${prod.img}" alt="${prod.name}">
                </div>
                <small class="text-champagne fw-bold d-block">${prod.brand}</small>
                <h6 class="text-plum fw-bold mb-1">${prod.name}</h6>
                <span class="badge bg-white text-plum border small">${prod.size} • $${prod.value} Value</span>
              </div>
              <button class="btn btn-sm ${user.subscription.selectedHeroChoice === prod.name ? 'btn-glow-plum' : 'btn-glow-outline'} w-100" onclick="selectHeroChoice('${prod.name}')">
                ${user.subscription.selectedHeroChoice === prod.name ? '<i class="fa-solid fa-check me-1"></i> Selected for Nov' : 'Choose This Hero'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 4. MY PRODUCTS TAB
function renderMyProductsTab(container, user, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">My Beauty Vault & Products</h2>
        <p class="text-muted m-0">All full-size and deluxe products received in your subscription boxes.</p>
      </div>
      <span class="badge bg-rose-soft text-plum px-3 py-2 rounded-pill">
        30% Member Discount Active
      </span>
    </div>

    <div class="row g-3">
      ${user.receivedProducts.map(p => `
        <div class="col-md-6 col-xl-4">
          <div class="luxury-card p-3 bg-white h-100">
            <div class="img-product-wrap mb-3" style="max-height: 180px;">
              <img src="${p.img}" alt="${p.name}">
            </div>
            <small class="text-champagne fw-bold">${p.brand}</small>
            <h5 class="font-serif text-plum fw-bold mb-1 text-truncate">${p.name}</h5>
            <p class="small text-muted mb-2 fst-italic">"${p.userReview}"</p>
            <div class="d-flex justify-content-between align-items-center pt-2 border-top mt-auto">
              <div>
                <span class="text-muted small text-decoration-line-through">$58.00</span>
                <span class="fw-bold text-plum ms-1">$40.60</span>
              </div>
              <button class="btn btn-sm btn-glow-plum" onclick="reorderProduct('${p.id}', '${p.name}')">
                <i class="fa-solid fa-bag-shopping me-1"></i> Repurchase
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. BEAUTY PROFILE TAB
function renderBeautyProfileTab(container, user, state) {
  const profile = user.beautyProfile;

  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Your Beauty & Skin Profile</h2>
      <p class="text-muted m-0">Update your skin goals, allergies, and formula preferences anytime.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <form id="beautyProfileForm" onsubmit="saveBeautyProfile(event)">
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label fw-bold text-plum small">Primary Skin Type</label>
            <select class="form-select" name="skinType">
              <option value="Dry & Dehydrated" ${profile.skinType.includes('Dry') ? 'selected' : ''}>Dry & Dehydrated</option>
              <option value="Combination / Dehydrated" ${profile.skinType.includes('Combination') ? 'selected' : ''}>Combination / Dehydrated</option>
              <option value="Oily & Blemish Prone" ${profile.skinType.includes('Oily') ? 'selected' : ''}>Oily & Blemish Prone</option>
              <option value="Sensitive & Reactive" ${profile.skinType.includes('Sensitive') ? 'selected' : ''}>Sensitive & Reactive</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-plum small">Skin Tone & Undertone</label>
            <input type="text" class="form-control" name="skinTone" value="${profile.skinTone}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-plum small">Scent Preferences</label>
            <input type="text" class="form-control" name="scent" value="${profile.scent}">
          </div>
          <div class="col-md-6">
            <label class="form-label fw-bold text-plum small">Hair Type & Texture</label>
            <input type="text" class="form-control" name="hairType" value="${profile.hairType}">
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label fw-bold text-plum small d-block">Primary Skin Concerns</label>
          <div class="d-flex flex-wrap gap-2">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" checked id="c1">
              <label class="form-check-label small" for="c1">Glass Skin Luminosity</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" checked id="c2">
              <label class="form-check-label small" for="c2">Hydration & Barrier Repair</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" checked id="c3">
              <label class="form-check-label small" for="c3">Anti-Aging & Peptides</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="c4">
              <label class="form-check-label small" for="c4">Pore Refining & Niacinamide</label>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-glow-plum">
          <i class="fa-solid fa-floppy-disk me-1"></i> Save Beauty Profile
        </button>
      </form>
    </div>
  `;
}

// 6. ORDER HISTORY TAB
function renderOrderHistoryTab(container, user, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Order History & Invoices</h2>
      <p class="text-muted m-0">View tracking numbers, receipts, and past monthly discovery boxes.</p>
    </div>

    <div class="table-responsive">
      <table class="table table-luxury align-middle">
        <thead class="text-muted small text-uppercase">
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Item / Box</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${user.orderHistory.map(ord => `
            <tr>
              <td><strong class="text-plum">${ord.id}</strong></td>
              <td class="text-muted small">${ord.date}</td>
              <td class="fw-semibold text-plum">${ord.box}</td>
              <td class="fw-bold text-plum">$${ord.amount.toFixed(2)}</td>
              <td><span class="badge bg-success text-white px-3 py-1 rounded-pill fw-bold" style="font-size: 0.78rem;"><i class="fa-solid fa-circle-check me-1"></i> ${ord.status}</span></td>
              <td>
                <button class="btn btn-sm btn-glow-outline py-1 px-2" onclick="showGlowToast('Tracking Info', 'Carrier: FedEx Luxury Express # ${ord.tracking} - Successfully Delivered.', 'info')">
                  Track
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// 7. FAVORITES TAB
function renderFavoritesTab(container, user, state) {
  const favProducts = state.products.filter(p => user.favorites.includes(p.id));

  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Saved Favorites & Wishlist</h2>
      <p class="text-muted m-0">Products you've saved for future re-orders or box customization.</p>
    </div>

    <div class="row g-3">
      ${favProducts.map(p => `
        <div class="col-md-4">
          <div class="luxury-card p-3 bg-white h-100">
            <div class="img-product-wrap mb-2">
              <img src="${p.image}" alt="${p.name}">
            </div>
            <small class="text-champagne fw-bold">${p.brand}</small>
            <h6 class="font-serif text-plum fw-bold mb-1 text-truncate">${p.name}</h6>
            <div class="d-flex justify-content-between align-items-center mt-auto pt-2">
              <strong class="text-plum">$${p.memberPrice.toFixed(2)}</strong>
              <button class="btn btn-sm btn-glow-plum" onclick="reorderProduct('${p.id}', '${p.name}')">Add to Cart</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 8. REVIEWS TAB
function renderReviewsTab(container, user, state) {
  container.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="font-serif text-plum fw-bold mb-1">Product Reviews & Glow Points</h2>
        <p class="text-muted m-0">Review items from past boxes to earn <strong>50 Glow Points ($5 credit)</strong> per review.</p>
      </div>
      <div class="bg-rose-soft px-3 py-2 rounded-3 text-plum fw-bold">
        <i class="fa-solid fa-coins text-champagne me-1"></i> Balance: ${user.glowPoints} pts
      </div>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm mb-4">
      <h5 class="font-serif text-plum fw-bold mb-3">Leave a Review for Next Month's Perk</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label small fw-bold">Select Product</label>
          <select class="form-select" id="reviewProductSelect">
            <option value="Lumière Rose Peptide Nectar">Lumière Rose Peptide Nectar</option>
            <option value="Bakuchiol Cloud Cream">Bakuchiol Cloud Cream</option>
            <option value="Golden Quartz Sculpting Gua Sha">Golden Quartz Sculpting Gua Sha</option>
          </select>
        </div>
        <div class="col-md-3">
          <label class="form-label small fw-bold">Rating</label>
          <select class="form-select" id="reviewRatingSelect">
            <option value="5">★★★★★ (5 Stars)</option>
            <option value="4">★★★★☆ (4 Stars)</option>
            <option value="3">★★★☆☆ (3 Stars)</option>
          </select>
        </div>
        <div class="col-md-5">
          <label class="form-label small fw-bold">Your Review Feedback</label>
          <div class="input-group">
            <input type="text" class="form-control" id="reviewTextInput" placeholder="How did this product make your skin feel?">
            <button class="btn btn-glow-plum" onclick="submitUserReview()">Submit (+50 pts)</button>
          </div>
        </div>
      </div>
    </div>

    <h5 class="font-serif text-plum fw-bold mb-3">Your Published Reviews</h5>
    <div class="row g-3">
      ${user.receivedProducts.map(p => `
        <div class="col-md-6">
          <div class="p-3 bg-white rounded-3 border">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <strong class="text-plum">${p.name}</strong>
              <span class="text-warning">${'★'.repeat(p.rating)}</span>
            </div>
            <p class="small text-muted m-0">"${p.userReview}"</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 9. BILLING TAB
function renderBillingTab(container, user, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Billing & Payment Methods</h2>
      <p class="text-muted m-0">Secure PCI-compliant encrypted payment methods for your auto-discovery.</p>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="font-serif text-plum fw-bold m-0">Saved Cards</h5>
            <button class="btn btn-sm btn-glow-outline" onclick="showGlowToast('Add Card', 'Payment card gateway opened.', 'info')">+ Add Card</button>
          </div>
          <div class="p-3 bg-ivory rounded-3 border d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center gap-3">
              <i class="fa-brands fa-cc-mastercard text-danger fs-2"></i>
              <div>
                <strong class="d-block text-plum">Mastercard •••• 8824</strong>
                <small class="text-muted">Expires 09/2028 • Default</small>
              </div>
            </div>
            <span class="badge bg-success">Default</span>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="p-4 bg-white rounded-4 border shadow-sm h-100">
          <h5 class="font-serif text-plum fw-bold mb-3">Glow Rewards & Credits</h5>
          <div class="p-3 bg-rose-soft rounded-3 mb-3">
            <small class="text-plum fw-bold text-uppercase d-block">Available Glow Balance</small>
            <div class="fs-2 fw-bold text-plum my-1">${user.glowPoints} Points <span class="fs-6 text-muted fw-normal">($${(user.glowPoints/10).toFixed(2)} Credit)</span></div>
            <p class="small text-muted m-0">Applied automatically at next billing cycle.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 10. ACCOUNT SETTINGS TAB
function renderAccountSettingsTab(container, user, state) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-serif text-plum fw-bold mb-1">Account & Shipping Settings</h2>
      <p class="text-muted m-0">Manage your shipping address, contact email and notification preferences.</p>
    </div>

    <div class="p-4 bg-white rounded-4 border shadow-sm">
      <form onsubmit="saveAccountSettings(event)">
        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label small fw-bold">Full Name</label>
            <input type="text" class="form-control" name="accName" value="${user.name}">
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-bold">Email Address</label>
            <input type="email" class="form-control" name="accEmail" value="${user.email}">
          </div>
          <div class="col-12">
            <label class="form-label small fw-bold">Shipping Street Address</label>
            <input type="text" class="form-control" name="accStreet" value="${user.shippingAddress.street}">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">City</label>
            <input type="text" class="form-control" name="accCity" value="${user.shippingAddress.city}">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">State / Province</label>
            <input type="text" class="form-control" name="accState" value="${user.shippingAddress.state}">
          </div>
          <div class="col-md-4">
            <label class="form-label small fw-bold">Postal Code</label>
            <input type="text" class="form-control" name="accZip" value="${user.shippingAddress.zip}">
          </div>
        </div>

        <button type="submit" class="btn btn-glow-plum">Save Account Changes</button>
      </form>
    </div>
  `;
}

/* User Action Handlers */
function togglePauseSubscription(shouldPause) {
  const state = getGlowState();
  state.currentUser.subscription.status = shouldPause ? "Paused" : "Active";
  saveGlowState(state);
  showGlowToast("Subscription Updated", `Your subscription is now ${state.currentUser.subscription.status}.`, "warning");
  switchDashboardTab("subscription");
}

function skipNextBox() {
  const state = getGlowState();
  state.currentUser.subscription.status = "Skipped (Nov)";
  saveGlowState(state);
  showGlowToast("November Box Skipped", "You will not be billed for November. December delivery will resume as normal.", "info");
  switchDashboardTab("subscription");
}

function openCancelModal() {
  if (confirm("Are you sure you want to cancel? You will lose your 30% subscriber discount and accumulated Glow Points perk.")) {
    const state = getGlowState();
    state.currentUser.subscription.status = "Cancelled";
    saveGlowState(state);
    showGlowToast("Subscription Cancelled", "Your subscription has been cancelled. We hope to see you glow again soon!", "warning");
    switchDashboardTab("subscription");
  }
}

function switchUserBox(boxId) {
  const state = getGlowState();
  const box = state.boxes.find(b => b.id === boxId);
  if (box) {
    state.currentUser.subscription.boxId = box.id;
    state.currentUser.subscription.planName = box.title;
    state.currentUser.subscription.price = box.monthlyPrice;
    saveGlowState(state);
    showGlowToast("Plan Switched! ✨", `You are now subscribed to ${box.title}.`, "success");
    switchDashboardTab("subscription");
  }
}

function selectHeroChoice(productName) {
  const state = getGlowState();
  state.currentUser.subscription.selectedHeroChoice = productName;
  saveGlowState(state);
  showGlowToast("Hero Choice Locked ✨", `${productName} will be packed in your November box!`, "success");
  switchDashboardTab("upcoming");
}

function reorderProduct(prodId, prodName) {
  showGlowToast("Added to Reorder Cart 🛍️", `${prodName} added at 30% VIP subscriber discount.`, "success");
}

function saveBeautyProfile(e) {
  e.preventDefault();
  const form = e.target;
  const state = getGlowState();
  state.currentUser.beautyProfile.skinType = form.skinType.value;
  state.currentUser.beautyProfile.skinTone = form.skinTone.value;
  state.currentUser.beautyProfile.scent = form.scent.value;
  state.currentUser.beautyProfile.hairType = form.hairType.value;
  saveGlowState(state);
  showGlowToast("Profile Saved! ✨", "Your personal beauty profile has been updated.", "success");
}

function submitUserReview() {
  const text = document.getElementById("reviewTextInput").value;
  if (!text) {
    alert("Please enter a short review.");
    return;
  }
  const state = getGlowState();
  state.currentUser.glowPoints += 50;
  saveGlowState(state);
  showGlowToast("+50 Glow Points Earned! 🌟", "Thank you for reviewing! Points credited to your account.", "success");
  switchDashboardTab("reviews");
}

function saveAccountSettings(e) {
  e.preventDefault();
  const form = e.target;
  const state = getGlowState();
  state.currentUser.name = form.accName.value;
  state.currentUser.email = form.accEmail.value;
  state.currentUser.shippingAddress.street = form.accStreet.value;
  state.currentUser.shippingAddress.city = form.accCity.value;
  state.currentUser.shippingAddress.state = form.accState.value;
  state.currentUser.shippingAddress.zip = form.accZip.value;
  saveGlowState(state);
  showGlowToast("Settings Updated", "Your contact & shipping details have been saved.", "success");
}

function handleDashboardLogout(e) {
  if (e) e.preventDefault();
  showGlowToast("Logged Out ✨", "You have been safely signed out. Redirecting to homepage...", "info");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}
