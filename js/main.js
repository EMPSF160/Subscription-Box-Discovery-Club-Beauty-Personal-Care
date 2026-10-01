// Initialize theme immediately to prevent flashing
(function() {
  const savedTheme = localStorage.getItem("glowbox_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
})();

document.addEventListener("DOMContentLoaded", () => {
  // Sync theme toggle icons on load
  const savedTheme = localStorage.getItem("glowbox_theme") || "light";
  updateThemeIcons(savedTheme);

  // Sticky Navbar Blur and Shadow on scroll
  const nav = document.querySelector(".glow-nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    });
  }

  // Initialize AOS if present
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }

  // Quick subscribe modal trigger listener
  document.querySelectorAll("[data-subscribe-box]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const boxId = btn.getAttribute("data-subscribe-box");
      openSubscribeModal(boxId);
    });
  });

  // Highlight active link in navigation
  highlightCurrentNav();
});

// Toggle Theme Function
function toggleGlowTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("glowbox_theme", newTheme);
  updateThemeIcons(newTheme);
  
  if (typeof showGlowToast === "function") {
    showGlowToast(
      newTheme === "dark" ? "Dark Ritual Active 🌙" : "Daylight Radiance Active ☀️",
      newTheme === "dark" ? "Switched to midnight luxury dark theme." : "Switched to daylight ivory luxury theme.",
      "info"
    );
  }
}

function updateThemeIcons(theme) {
  document.querySelectorAll(".theme-icon-indicator").forEach(icon => {
    if (theme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

function highlightCurrentNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// Toast notification helper
function showGlowToast(title, message, type = 'success') {
  let toastContainer = document.getElementById("glowToastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "glowToastContainer";
    toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
    toastContainer.style.zIndex = "9999";
    document.body.appendChild(toastContainer);
  }

  const iconClass = type === 'success' ? 'fa-circle-check text-success' : (type === 'warning' ? 'fa-triangle-exclamation text-warning' : 'fa-circle-info text-info');

  const toastEl = document.createElement("div");
  toastEl.className = "toast show shadow-lg border-0 bg-white";
  toastEl.role = "alert";
  toastEl.innerHTML = `
    <div class="toast-header border-bottom-0 pb-0" style="background: transparent;">
      <i class="fa-solid ${iconClass} me-2 fs-5"></i>
      <strong class="me-auto text-plum font-serif fs-6">${title}</strong>
      <small class="text-muted">Just now</small>
      <button type="button" class="btn-close ms-2 mb-1" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body text-charcoal pt-1 pb-3">
      ${message}
    </div>
  `;

  toastContainer.appendChild(toastEl);
  setTimeout(() => {
    toastEl.classList.remove("show");
    setTimeout(() => toastEl.remove(), 400);
  }, 4500);

  const closeBtn = toastEl.querySelector(".btn-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.remove(), 400);
    });
  }
}

// Quick Subscribe Modal Helper
function openSubscribeModal(boxId) {
  const state = getGlowState();
  const box = state.boxes.find(b => b.id === boxId) || state.boxes[0];

  let modalEl = document.getElementById("quickSubscribeModal");
  if (!modalEl) {
    modalEl = document.createElement("div");
    modalEl.id = "quickSubscribeModal";
    modalEl.className = "modal fade";
    modalEl.tabIndex = -1;
    document.body.appendChild(modalEl);
  }

  modalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content border-0 shadow-xl" style="border-radius: var(--radius-xl); overflow: hidden;">
        <div class="modal-header bg-plum text-white border-0 py-3 px-4">
          <div class="d-flex align-items-center gap-2">
            <span class="brand-sparkle"><i class="fa-solid fa-sparkles"></i></span>
            <h5 class="modal-title font-serif text-white m-0">Start Your Glow Journey</h5>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body p-4 p-md-5 bg-ivory">
          <div class="row g-4 align-items-center">
            <div class="col-md-5 text-center">
              <div class="rounded-4 overflow-hidden shadow-md mb-3">
                <img src="${box.image}" alt="${box.title}" class="w-100" style="height: 220px; object-fit: cover;">
              </div>
              <span class="luxury-badge ${box.badgeColor} mb-2">${box.badge}</span>
              <h5 class="font-serif text-plum fw-bold mb-1">${box.title}</h5>
              <p class="small text-muted mb-2">Value $${box.retailValue}+ for only $${box.monthlyPrice}/mo</p>
            </div>
            <div class="col-md-7">
              <h6 class="text-uppercase tracking-wider text-champagne fw-bold mb-2">Select Your Plan Frequency</h6>
              <div class="d-flex flex-column gap-2 mb-4">
                <label class="p-3 border rounded-3 bg-white d-flex align-items-center justify-content-between cursor-pointer shadow-sm">
                  <div class="d-flex align-items-center gap-3">
                    <input type="radio" name="planFreq" value="monthly" checked class="form-check-input mt-0">
                    <div>
                      <strong class="d-block text-plum">Monthly Auto-Discovery</strong>
                      <small class="text-muted">Billed monthly, skip or cancel anytime</small>
                    </div>
                  </div>
                  <span class="fs-5 fw-bold text-plum">$${box.monthlyPrice}<span class="fs-6 text-muted fw-normal">/mo</span></span>
                </label>
                <label class="p-3 border rounded-3 bg-white d-flex align-items-center justify-content-between cursor-pointer shadow-sm">
                  <div class="d-flex align-items-center gap-3">
                    <input type="radio" name="planFreq" value="threeMonth" class="form-check-input mt-0">
                    <div>
                      <strong class="d-block text-plum">3-Month Prepay <span class="badge bg-rose-soft text-plum ms-1">Save 8%</span></strong>
                      <small class="text-muted">Billed $${box.threeMonthPrice} every 3 months</small>
                    </div>
                  </div>
                  <span class="fs-5 fw-bold text-plum">$${(box.threeMonthPrice/3).toFixed(0)}<span class="fs-6 text-muted fw-normal">/mo</span></span>
                </label>
                <label class="p-3 border rounded-3 bg-white d-flex align-items-center justify-content-between cursor-pointer shadow-sm border-warning">
                  <div class="d-flex align-items-center gap-3">
                    <input type="radio" name="planFreq" value="annual" class="form-check-input mt-0">
                    <div>
                      <strong class="d-block text-plum">Annual Glow Pass <span class="badge bg-champagne text-white ms-1">Best Value</span></strong>
                      <small class="text-muted">Billed $${box.annualPrice}/yr + Free $85 Gift Set</small>
                    </div>
                  </div>
                  <span class="fs-5 fw-bold text-plum">$${(box.annualPrice/12).toFixed(0)}<span class="fs-6 text-muted fw-normal">/mo</span></span>
                </label>
              </div>

              <div class="d-grid gap-2">
                <button class="btn btn-glow-plum py-3" onclick="confirmSubscription('${box.id}')">
                  <i class="fa-solid fa-bag-shopping me-1"></i> Confirm & Activate Subscription
                </button>
                <p class="small text-muted text-center m-0">✓ Free US Delivery ✓ 100% Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const bsModal = new bootstrap.Modal(modalEl);
  bsModal.show();
}

function confirmSubscription(boxId) {
  const state = getGlowState();
  const box = state.boxes.find(b => b.id === boxId) || state.boxes[0];
  
  // Update state
  state.currentUser.subscription.planName = box.title;
  state.currentUser.subscription.status = "Active";
  state.currentUser.subscription.boxId = box.id;
  state.currentUser.subscription.price = box.monthlyPrice;
  saveGlowState(state);

  const modalEl = document.getElementById("quickSubscribeModal");
  if (modalEl) {
    const bsModal = bootstrap.Modal.getInstance(modalEl);
    if (bsModal) bsModal.hide();
  }

  // Trigger celebratory confetti if library loaded
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D89BA8', '#C9A66B', '#241923']
    });
  }

  showGlowToast("Subscription Activated! ✨", `Welcome to ${box.title}! Your next box is scheduled for delivery.`, "success");

  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 1200);
}

// UGC Video Modal
function openUgcVideoModal(author, title, coverImg) {
  let videoModalEl = document.getElementById("ugcVideoModal");
  if (!videoModalEl) {
    videoModalEl = document.createElement("div");
    videoModalEl.id = "ugcVideoModal";
    videoModalEl.className = "modal fade";
    videoModalEl.tabIndex = -1;
    document.body.appendChild(videoModalEl);
  }

  videoModalEl.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 bg-plum text-white shadow-xl overflow-hidden" style="border-radius: var(--radius-xl);">
        <div class="modal-header border-0 pb-0">
          <div class="d-flex align-items-center gap-2">
            <span class="luxury-badge badge-gold"><i class="fa-solid fa-circle-check"></i> Verified Member</span>
            <span class="small fw-bold text-white">${author}</span>
          </div>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body p-4 text-center">
          <div class="rounded-4 overflow-hidden mb-3 position-relative shadow-lg" style="height: 380px; background: #000;">
            <img src="${coverImg}" alt="${title}" class="w-100 h-100" style="object-fit: cover; opacity: 0.85;">
            <div class="position-absolute top-50 start-50 translate-middle">
              <div class="spinner-grow text-rose" role="status" style="width: 3rem; height: 3rem;"></div>
            </div>
            <div class="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient" style="background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);">
              <span class="badge bg-rose text-plum fw-bold mb-1">Live Unboxing Story</span>
              <h5 class="font-serif text-white fw-bold mb-0">${title}</h5>
            </div>
          </div>
          <p class="small text-white opacity-75 mb-3">"I loved the formulation textures and how personalized the items were for my skin barrier."</p>
          <div class="d-flex gap-2">
            <a href="quiz.html" class="btn btn-glow-champagne w-100" data-bs-dismiss="modal">
              <i class="fa-solid fa-wand-magic-sparkles me-1"></i> Get Your Matched Box
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  const bsModal = new bootstrap.Modal(videoModalEl);
  bsModal.show();
}

