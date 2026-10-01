/**
 * GLOWBOX - "Your Beauty Match" Interactive Quiz Engine
 * Multi-step personalized beauty diagnostic & subscription recommendation
 */

let currentStep = 0;
let userAnswers = {};

document.addEventListener("DOMContentLoaded", () => {
  const quizApp = document.getElementById("glowQuizApp");
  if (quizApp) {
    renderQuizStep(0);
  }
});

function renderQuizStep(stepIndex) {
  const state = getGlowState();
  const questions = state.quizQuestions;
  const quizApp = document.getElementById("glowQuizApp");

  if (!quizApp) return;

  if (stepIndex >= questions.length) {
    renderQuizResults();
    return;
  }

  currentStep = stepIndex;
  const q = questions[stepIndex];
  const progressPercent = Math.round(((stepIndex + 1) / questions.length) * 100);

  quizApp.innerHTML = `
    <div class="quiz-container" data-aos="fade-up">
      <!-- Progress Bar -->
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span class="small fw-bold text-uppercase text-champagne tracking-wider">Step ${stepIndex + 1} of ${questions.length}</span>
        <span class="small text-muted">${progressPercent}% Completed</span>
      </div>
      <div class="quiz-progress-bar-wrap">
        <div class="quiz-progress-bar" style="width: ${progressPercent}%;"></div>
      </div>

      <!-- Question Title -->
      <div class="text-center mb-4">
        <span class="section-tag"><i class="fa-solid fa-sparkles"></i> Personalized Discovery</span>
        <h3 class="font-serif text-plum fw-bold mb-2">${q.question}</h3>
        <p class="text-muted m-0">${q.subtitle}</p>
      </div>

      <!-- Options Grid -->
      <div class="row g-3 mb-5">
        ${q.options.map((opt, i) => {
          const isSelected = userAnswers[q.id] === opt.key;
          return `
            <div class="col-md-6">
              <div class="quiz-option-card ${isSelected ? 'selected' : ''}" onclick="selectQuizOption(${q.id}, '${opt.key}', this)">
                <div class="quiz-option-icon">
                  <i class="fa-solid ${opt.icon}"></i>
                </div>
                <h5 class="text-plum fw-bold mb-1">${opt.label}</h5>
                <p class="small text-muted m-0">${opt.desc}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Navigation Buttons -->
      <div class="d-flex justify-content-between align-items-center pt-3 border-top">
        <button class="btn btn-glow-outline ${stepIndex === 0 ? 'invisible' : ''}" onclick="renderQuizStep(${stepIndex - 1})">
          <i class="fa-solid fa-arrow-left me-1"></i> Back
        </button>
        <button class="btn btn-glow-plum px-4" id="quizNextBtn" onclick="nextQuizStep()" ${!userAnswers[q.id] ? 'disabled' : ''}>
          ${stepIndex === questions.length - 1 ? 'Calculate My Beauty Match <i class="fa-solid fa-sparkles ms-1"></i>' : 'Continue <i class="fa-solid fa-arrow-right ms-1"></i>'}
        </button>
      </div>
    </div>
  `;
}

function selectQuizOption(questionId, optionKey, cardEl) {
  userAnswers[questionId] = optionKey;
  
  // Update selected class
  const parentRow = cardEl.closest(".row");
  parentRow.querySelectorAll(".quiz-option-card").forEach(c => c.classList.remove("selected"));
  cardEl.classList.add("selected");

  // Enable Next button
  const nextBtn = document.getElementById("quizNextBtn");
  if (nextBtn) nextBtn.disabled = false;
}

function nextQuizStep() {
  const quizApp = document.getElementById("glowQuizApp");
  
  // If we are at the final step, show calculating animation then results
  if (currentStep === GLOW_DATA.quizQuestions.length - 1) {
    quizApp.innerHTML = `
      <div class="quiz-container text-center py-5" data-aos="zoom-in">
        <div class="spinner-grow text-rose mb-3" style="width: 3.5rem; height: 3.5rem;" role="status"></div>
        <h3 class="font-serif text-plum fw-bold mb-2">Formulating Your Bespoke Beauty Formula...</h3>
        <p class="text-muted max-w-500 mx-auto">Cross-referencing 350+ luxury formulations, climate factors, and cellular compatibility indices.</p>
      </div>
    `;

    setTimeout(() => {
      renderQuizResults();
    }, 1800);
  } else {
    renderQuizStep(currentStep + 1);
  }
}

function renderQuizResults() {
  const state = getGlowState();
  const quizApp = document.getElementById("glowQuizApp");
  if (!quizApp) return;

  // Decide match based on answers
  let matchedBox = state.boxes[0];
  let matchScore = 98;

  if (userAnswers[2] === 'clean') {
    matchedBox = state.boxes[1]; // Clean Botanical
  } else if (userAnswers[2] === 'antiaging' || userAnswers[3] === 'prestige') {
    matchedBox = state.boxes[2]; // Golden Luxe VIP
  } else if (userAnswers[1] === 'dry' || userAnswers[2] === 'hydration') {
    matchedBox = state.boxes[3]; // Drench & Dew
  }

  // Save beauty profile to user state
  state.currentUser.beautyProfile.skinType = userAnswers[1] || "Combination / Dehydrated";
  state.currentUser.beautyProfile.scent = userAnswers[4] || "Fresh Florals";
  saveGlowState(state);

  // Trigger celebration confetti
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#D89BA8', '#C9A66B', '#241923']
    });
  }

  quizApp.innerHTML = `
    <div class="quiz-container p-4 p-md-5 text-center" data-aos="fade-up">
      <!-- Result Banner -->
      <div class="text-center mb-4">
        <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-rose-soft text-plum mb-3 mx-auto text-center">
          <i class="fa-solid fa-sparkles text-champagne"></i>
          <span class="fw-bold small text-uppercase tracking-wider">Your Beauty Match Diagnostic Result</span>
        </div>
        <h2 class="font-serif text-plum fw-bold mb-2 text-center">We Found Your Perfect Discovery Curation!</h2>
        <p class="text-muted text-center mx-auto section-intro-text">Based on your diagnostic skin barrier and formula preferences, your algorithmic match is:</p>
      </div>

      <!-- Box Spotlight Card -->
      <div class="card border-0 shadow-lg rounded-4 overflow-hidden mb-5 bg-white text-center">
        <div class="row g-0">
          <div class="col-md-5 position-relative">
            <img src="${matchedBox.image}" alt="${matchedBox.title}" class="w-100 h-100" style="object-fit: cover; min-height: 280px;">
            <div class="position-absolute top-0 start-0 m-3">
              <span class="badge bg-plum text-white px-3 py-2 rounded-pill fs-6 shadow">
                <i class="fa-solid fa-star text-champagne me-1"></i> ${matchScore}% Compatibility
              </span>
            </div>
          </div>
          <div class="col-md-7 p-4 p-lg-5 d-flex flex-column justify-content-between text-center">
            <div>
              <div class="d-flex justify-content-center align-items-center gap-3 mb-2 text-center">
                <span class="text-champagne fw-bold text-uppercase small">${matchedBox.category}</span>
                <span class="text-muted small"><i class="fa-solid fa-star text-warning"></i> ${matchedBox.rating} (${matchedBox.reviewCount}+ reviews)</span>
              </div>
              <h3 class="font-serif text-plum fw-bold mb-2 text-center">${matchedBox.title}</h3>
              <p class="text-muted small mb-4 text-center mx-auto" style="max-width: 90%;">${matchedBox.description}</p>

              <div class="p-3 bg-ivory rounded-3 mb-4 border text-center">
                <strong class="d-block text-plum small mb-2 text-center"><i class="fa-solid fa-circle-check text-success me-1"></i> Why this matches your profile:</strong>
                <ul class="list-unstyled small text-muted mb-0 d-flex flex-column gap-1 text-center">
                  <li>• Formulated for <strong>${userAnswers[1] || 'dehydrated'}</strong> barrier calibration.</li>
                  <li>• Includes non-comedogenic bio-peptides and active botanicals.</li>
                  <li>• Scent profile adjusted to your <strong>${userAnswers[4] || 'floral'}</strong> preference.</li>
                </ul>
              </div>
            </div>

            <div class="d-flex flex-column align-items-center justify-content-center gap-3 pt-3 border-top text-center w-100">
              <div class="text-center">
                <span class="text-muted small text-decoration-line-through d-block">$${matchedBox.retailValue} Value</span>
                <div class="fs-3 fw-bold text-plum">$${matchedBox.monthlyPrice}<span class="fs-6 text-muted fw-normal">/month</span></div>
              </div>
              <div class="d-flex gap-2 w-100 justify-content-center">
                <a href="box-detail.html?id=${matchedBox.id}" class="btn btn-glow-outline flex-grow-1 text-center">View Details</a>
                <button class="btn btn-glow-plum flex-grow-1 text-center" onclick="confirmSubscription('${matchedBox.id}')">
                  <i class="fa-solid fa-bag-shopping me-1"></i> Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Included Products Preview -->
      <h4 class="font-serif text-plum fw-bold mb-3 text-center">Custom Products in Your Recommended Box:</h4>
      <div class="row g-3 mb-4">
        ${matchedBox.productsIncluded.map(prod => `
          <div class="col-6 col-md-3">
            <div class="p-3 bg-white rounded-3 border text-center h-100 shadow-sm d-flex flex-column justify-content-between">
              <div>
                <div class="img-product-wrap mb-2 mx-auto" style="width: 76px; height: 76px;">
                  <img src="${prod.img}" alt="${prod.name}">
                </div>
                <small class="text-champagne fw-bold d-block text-truncate text-center">${prod.brand}</small>
                <h6 class="text-plum fw-bold mb-1 small text-truncate text-center">${prod.name}</h6>
              </div>
              <span class="badge bg-rose-soft text-plum font-monospace mt-2 mx-auto" style="font-size: 0.7rem;">${prod.size} • $${prod.value}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="text-center mt-3">
        <button class="btn btn-link text-muted mx-auto" onclick="renderQuizStep(0)">
          <i class="fa-solid fa-rotate-left me-1"></i> Retake Beauty Quiz
        </button>
      </div>
    </div>
  `;
}
