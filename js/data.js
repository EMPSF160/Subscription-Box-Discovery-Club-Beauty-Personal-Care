/**
 * GLOWBOX - Central Database & State Store
 * Handles persistent mock data across all 11+ pages, Customer Dashboard & Admin Portal
 */

const GLOW_DATA = {
  boxes: [
    {
      id: "box-velvet-radiance",
      title: "The Velvet Radiance Edit",
      subtitle: "Our iconic cult-favorite monthly curation",
      category: "Skincare & Glow",
      rating: 4.9,
      reviewCount: 1420,
      monthlyPrice: 28,
      threeMonthPrice: 78,
      annualPrice: 288,
      retailValue: 195,
      frequency: "Monthly Discovery",
      badge: "Best Seller",
      badgeColor: "badge-gold",
      image: "image/Inside the Box.jpg",
      heroImage: "image/Inside the Box1.jpg",
      description: "Experience five curated luxury essentials engineered to restore luminous radiance, deeply hydrate, and refine skin texture. Featuring award-winning serums, botanical mists, and clean complexion enhancers.",
      productsIncluded: [
        { name: "Lumière Rose Peptide Nectar", brand: "AURA LUXE", size: "Deluxe (30ml)", value: 68, category: "Serum", img: "image/Product Collections.jpg" },
        { name: "Bakuchiol Cloud Cream", brand: "BOTANICA LAB", size: "Full Size (50ml)", value: 52, category: "Moisturizer", img: "image/Product Collections1.jpg" },
        { name: "Damask Rose Floral Hydrosol", brand: "VALMONT PURE", size: "Travel (45ml)", value: 28, category: "Toner", img: "image/Beauty Lifestyle Personalization2.jpg" },
        { name: "Velvet Silk Lip Glaze (Nectar)", brand: "MAISON ÉCLAT", size: "Full Size (6ml)", value: 32, category: "Makeup", img: "image/Product Collections2.jpg" },
        { name: "Golden Quartz Sculpting Gua Sha", brand: "GLOW ATELIER", size: "Tool", value: 25, category: "Tools", img: "image/Inside the Box3.jpg" }
      ],
      features: [
        "5 Deluxe & Full-Size Luxury Products ($195+ retail value)",
        "100% Cruelty-Free & Dermatologist Tested",
        "Exclusive subscriber discounts (30% off full sizes in Shop)",
        "Customizable: Choose 1 hero item every month",
        "Free Global Express Shipping & Eco-Luxe Packaging"
      ]
    },
    {
      id: "box-clean-botanical",
      title: "Clean Botanical Ritual",
      subtitle: "100% Organic, vegan & high-altitude adaptogens",
      category: "Clean Beauty",
      rating: 4.95,
      reviewCount: 980,
      monthlyPrice: 32,
      threeMonthPrice: 89,
      annualPrice: 320,
      retailValue: 210,
      frequency: "Monthly Discovery",
      badge: "Clean Certified",
      badgeColor: "badge-clean",
      image: "image/Inside the Box22.jpg",
      heroImage: "image/Inside the Box5.jpg",
      description: "Harness the restorative power of cold-pressed botanicals, alpine moss, and bio-fermented actives. Formulated without parabens, synthetic fragrances, or silicones.",
      productsIncluded: [
        { name: "Bio-Ferment Reset Essence", brand: "VERDANT EARTH", size: "Full Size (100ml)", value: 74, category: "Essence", img: "image/Product Collections4.jpg" },
        { name: "Matcha Chlorophyll Cleansing Balm", brand: "ZENITH BIO", size: "Deluxe (40g)", value: 38, category: "Cleanser", img: "image/Product Collections5.jpg" },
        { name: "Squalane & Blue Tansy Elixir", brand: "FLORA BOTANICA", size: "Full Size (30ml)", value: 65, category: "Facial Oil", img: "image/Beauty Lifestyle Personalization4.jpg" },
        { name: "Herbal Bamboo Scalp Therapy", brand: "ROOTS & LEAF", size: "Travel (50ml)", value: 33, category: "Haircare", img: "image/Product Collections6.jpg" }
      ],
      features: [
        "Eco-Cert & Leaping Bunny Certified Formulations",
        "Sustainable Glass Bottles & Compostable Box",
        "Gentle for Eczema & Sensitive Skin Types",
        "Includes Seasonal Herbal Beauty Tea Sachet"
      ]
    },
    {
      id: "box-golden-luxe",
      title: "Golden Glow Luxury VIP",
      subtitle: "Prestige anti-aging & ultra-concentrated formulas",
      category: "Luxury Prestige",
      rating: 5.0,
      reviewCount: 640,
      monthlyPrice: 48,
      threeMonthPrice: 135,
      annualPrice: 480,
      retailValue: 340,
      frequency: "Quarterly / VIP Monthly",
      badge: "VIP Prestige",
      badgeColor: "badge-gold",
      image: "image/Inside the Box6.jpg",
      heroImage: "image/Inside the Box7.jpg",
      description: "For the discerning beauty connoisseur. An ultra-exclusive edit featuring rare 24K colloidal gold, marine collagen peptides, and haute French perfumery samples.",
      productsIncluded: [
        { name: "24K Gold Cellular Lift Elixir", brand: "ATELIER D'OR", size: "Full Size (30ml)", value: 145, category: "Serum", img: "image/Product Collections.jpg" },
        { name: "Cashmere Ceramide Barrier Balm", brand: "HAUTE DERM", size: "Full Size (60ml)", value: 95, category: "Moisturizer", img: "image/Product Collections1.jpg" },
        { name: "Ambre Impériale Extrait de Parfum", brand: "MAISON PARFUMS", size: "Deluxe Atomizer (15ml)", value: 60, category: "Fragrance", img: "image/kaboompics-perfume-791698_1920.jpg" },
        { name: "Silken Pillow Mist & Satin Eye Wrap", brand: "NOCTURNE SLEEP", size: "VIP Gift", value: 40, category: "Wellness", img: "image/Beauty Lifestyle Personalization5.jpg" }
      ],
      features: [
        "All Full-Size & Deluxe Prestige Items ($340+ Value)",
        "Priority VIP Concierge & Early Access to Flash Sales",
        "Handmade Keepsake Magnetic Velvet Box",
        "Complimentary Annual Birthday Masterclass Box"
      ]
    },
    {
      id: "box-dew-drench",
      title: "Drench & Dew Hydration Box",
      subtitle: "Multi-depth hyaluronic & barrier strengthening",
      category: "Skin Barrier",
      rating: 4.88,
      reviewCount: 820,
      monthlyPrice: 26,
      threeMonthPrice: 72,
      annualPrice: 260,
      retailValue: 180,
      frequency: "Monthly Discovery",
      badge: "Barrier Savior",
      badgeColor: "badge-rose",
      image: "image/Your Beauty Matc.jpg",
      heroImage: "image/Your Beauty Matcd.jpg",
      description: "Say goodbye to dull, dehydrated, flaking skin. Designed to flood your skin barrier with 8 molecular weights of hyaluronic acid, panthenol, and ceramides.",
      productsIncluded: [
        { name: "Hyaluron Multi-Plump Serum", brand: "HYDRO LAB", size: "Full Size (40ml)", value: 58, category: "Serum", img: "image/Product Collections2.jpg" },
        { name: "Centella Soothing Gel Cream", brand: "CICA PURE", size: "Full Size (75ml)", value: 42, category: "Moisturizer", img: "image/Product Collections4.jpg" },
        { name: "Overnight Moisture Glaze Mask", brand: "DEW REVOLUTION", size: "Deluxe (30g)", value: 36, category: "Mask", img: "image/Product Collections5.jpg" },
        { name: "Micro-Fiber Plush Spa Headband", brand: "GLOW ESSENTIALS", size: "Accessory", value: 18, category: "Tools", img: "image/Inside the Box3.jpg" }
      ],
      features: [
        "Clinically proven 72-hour moisture lock",
        "Fragrance-free & Hypoallergenic",
        "Perfect for dry winter seasons & air-conditioned lifestyles",
        "Subscriber price lock guarantee"
      ]
    }
  ],

  // Products catalog in GLOWBOX Store
  products: [
    { id: "p1", name: "Lumière Rose Peptide Nectar", brand: "AURA LUXE", price: 68, memberPrice: 47.60, rating: 4.9, category: "Skincare", image: "image/Product Collections.jpg", tags: ["Best Seller", "Anti-Aging"] },
    { id: "p2", name: "Bakuchiol Cloud Cream", brand: "BOTANICA LAB", price: 52, memberPrice: 36.40, rating: 4.8, category: "Skincare", image: "image/Product Collections1.jpg", tags: ["Clean", "Vegan"] },
    { id: "p3", name: "Damask Rose Floral Hydrosol", brand: "VALMONT PURE", price: 28, memberPrice: 19.60, rating: 4.7, category: "Skincare", image: "image/Beauty Lifestyle Personalization2.jpg", tags: ["Hydrating"] },
    { id: "p4", name: "Velvet Silk Lip Glaze (Nectar)", brand: "MAISON ÉCLAT", price: 32, memberPrice: 22.40, rating: 4.9, category: "Makeup", image: "image/Product Collections2.jpg", tags: ["Hydrating Lip"] },
    { id: "p5", name: "24K Gold Cellular Lift Elixir", brand: "ATELIER D'OR", price: 145, memberPrice: 101.50, rating: 5.0, category: "Luxury", image: "image/Product Collections.jpg", tags: ["Prestige VIP"] },
    { id: "p6", name: "Ambre Impériale Extrait de Parfum", brand: "MAISON PARFUMS", price: 120, memberPrice: 84.00, rating: 4.9, category: "Fragrance", image: "image/kaboompics-perfume-791698_1920.jpg", tags: ["Niche Fragrance"] },
    { id: "p7", name: "Matcha Chlorophyll Cleansing Balm", brand: "ZENITH BIO", price: 38, memberPrice: 26.60, rating: 4.8, category: "Skincare", image: "image/Product Collections5.jpg", tags: ["Clean Cleanser"] },
    { id: "p8", name: "Golden Quartz Sculpting Gua Sha", brand: "GLOW ATELIER", price: 25, memberPrice: 17.50, rating: 4.7, category: "Tools", image: "image/Inside the Box3.jpg", tags: ["Facial Massage"] }
  ],

  // Quiz Questions Data
  quizQuestions: [
    {
      id: 1,
      question: "What best describes your primary skin type?",
      subtitle: "Our algorithms calibrate ingredient weights based on your barrier needs.",
      type: "single",
      options: [
        { label: "Dry & Dehydrated", desc: "Feels tight, looks dull, craves moisture", icon: "fa-droplet-slash", key: "dry" },
        { label: "Combination", desc: "Oily T-zone, normal or dry cheeks", icon: "fa-sliders", key: "combo" },
        { label: "Oily & Acne-Prone", desc: "Frequent shine, visible pores, breakouts", icon: "fa-wand-magic-sparkles", key: "oily" },
        { label: "Sensitive & Reactive", desc: "Easily flushed, stings with harsh products", icon: "fa-shield-heart", key: "sensitive" }
      ]
    },
    {
      id: 2,
      question: "What is your #1 Beauty & Skin Goal this season?",
      subtitle: "Choose your primary transformation target.",
      type: "single",
      options: [
        { label: "Glass Skin & Maximum Radiance", desc: "Dewy luminosity, even tone, refined pores", icon: "fa-sun", key: "radiance" },
        { label: "Clean Beauty & Barrier Reset", desc: "Calm irritation, non-toxic, organic glow", icon: "fa-leaf", key: "clean" },
        { label: "Anti-Aging & Firming Lift", desc: "Boost collagen, smooth fine lines, elasticity", icon: "fa-gem", key: "antiaging" },
        { label: "Deep Moisture Flood", desc: "72h hydration lock & bouncy skin", icon: "fa-water", key: "hydration" }
      ]
    },
    {
      id: 3,
      question: "How do you prefer your beauty mix split?",
      subtitle: "Tell us how much makeup vs skincare you want in each box.",
      type: "single",
      options: [
        { label: "80% Skincare / 20% Makeup", desc: "Heavy focus on serums, masks, moisturizers", icon: "fa-flask-round-potion", key: "skincare-heavy" },
        { label: "50% Skincare / 50% Makeup", desc: "A balanced discovery of luxury lips, blush & creams", icon: "fa-scale-balanced", key: "balanced" },
        { label: "Clean & Holistic Wellness", desc: "Skincare, haircare, botanicals & aromatherapy", icon: "fa-spa", key: "wellness" },
        { label: "High-End Prestige Only", desc: "VIP cult formulas & haute fragrance", icon: "fa-crown", key: "prestige" }
      ]
    },
    {
      id: 4,
      question: "What is your scent & fragrance preference?",
      subtitle: "We scent-profile all body and facial formulas.",
      type: "single",
      options: [
        { label: "Fresh Florals & Damask Rose", desc: "Subtle, feminine, romantic peony & petals", icon: "fa-flower", key: "rose" },
        { label: "Earthy Botanical & Herbal Herbs", desc: "Eucalyptus, sage, green tea & blue tansy", icon: "fa-seedling", key: "herbal" },
        { label: "Warm Vanilla & Golden Amber", desc: "Sensual, cozy, cashmere & sandalwood", icon: "fa-fire", key: "amber" },
        { label: "100% Fragrance-Free", desc: "Pure hypoallergenic essentials with zero scent", icon: "fa-ban", key: "unscented" }
      ]
    },
    {
      id: 5,
      question: "Select your preferred subscription tier & budget:",
      subtitle: "You can pause, skip, or cancel any time in your dashboard.",
      type: "single",
      options: [
        { label: "Discovery Monthly ($28/mo)", desc: "5 deluxe/full-size items ($195+ value)", icon: "fa-gift", key: "tier-monthly" },
        { label: "VIP Prestige Quarterly ($48/mo)", desc: "Full-size luxury items & VIP gifts ($340+ value)", icon: "fa-star", key: "tier-vip" },
        { label: "Annual Glow Pass ($24/mo billed yearly)", desc: "Save 18% + Free $85 Welcome Beauty Bundle", icon: "fa-award", key: "tier-annual" }
      ]
    }
  ],

  // Articles for Journal
  journalArticles: [
    {
      id: "art-1",
      title: "The Molecular Science of Glass Skin: How Peptides Rebuild Cellular Density",
      category: "Skincare Science",
      readTime: "5 min read",
      author: "Dr. Elena Vance, Lead Dermatologist",
      date: "October 2026",
      image: "image/Beauty Lifestyle Personalization.jpg",
      excerpt: "Why modern multi-peptides are outperforming traditional retinol for barrier longevity and non-irritating luminosity."
    },
    {
      id: "art-2",
      title: "Inside the October Unboxing: Hand-Curating France's Rarest Botanical Actives",
      category: "Behind the Box",
      readTime: "4 min read",
      author: "Camille Laurent, Editorial Director",
      date: "September 2026",
      image: "image/Inside the Box.jpg",
      excerpt: "Our team visited Grasse and the French Alps to partner directly with artisanal growers for this month's Velvet Radiance Edit."
    },
    {
      id: "art-3",
      title: "Morning Routine vs Evening Reset: The Layering Order You Must Never Break",
      category: "Beauty Guide",
      readTime: "6 min read",
      author: "Maya Lin, Master Aesthetician",
      date: "September 2026",
      image: "image/Beauty Lifestyle Personalization6.jpg",
      excerpt: "Step-by-step masterclass on pH balancing, humectants first, and sealing with botanical lipid barrier creams."
    },
    {
      id: "art-4",
      title: "Bakuchiol vs. Retinol: The Sensitive Skin Matchup Explained",
      category: "Clean Beauty",
      readTime: "4 min read",
      author: "Dr. Elena Vance",
      date: "August 2026",
      image: "image/Beauty Lifestyle Personalization4.jpg",
      excerpt: "Can a plant-derived Ayurvedic babchi seed extract truly deliver 0.5% retinol results without redness or UV sensitivity?"
    }
  ],

  // Customer Mock State (Default logged in demo user)
  currentUser: {
    name: "Sophia Montgomery",
    email: "sophia.m@example.com",
    avatar: "image/stocksnap-face-2573217_1920.jpg",
    memberSince: "March 2025",
    subscription: {
      planName: "The Velvet Radiance Edit",
      tier: "Monthly Discovery",
      status: "Active", // "Active", "Paused", "Skipped"
      price: 28.00,
      nextBillingDate: "November 1, 2026",
      nextDeliveryEstimated: "November 8 - 11, 2026",
      trackingNumber: "GLOW-US-9847291",
      boxId: "box-velvet-radiance",
      customizationLocked: false,
      selectedHeroChoice: "Lumière Rose Peptide Nectar"
    },
    beautyProfile: {
      skinType: "Combination / Dehydrated",
      skinTone: "Fair - Light Warm",
      concerns: ["Luminosity", "Hydration", "Fine Lines"],
      scent: "Fresh Damask Rose & Peony",
      hairType: "Wavy / Fine Texture",
      cleanOnly: false
    },
    glowPoints: 640,
    savedCards: [
      { type: "Mastercard", last4: "8824", exp: "09/28", isDefault: true }
    ],
    shippingAddress: {
      name: "Sophia Montgomery",
      street: "742 Evergreen Terrace, Apt 4B",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      country: "United States"
    },
    orderHistory: [
      { id: "ORD-98214", date: "Oct 1, 2026", box: "The Velvet Radiance Edit (October)", amount: 28.00, status: "Delivered", tracking: "GLOW-98214-DEL" },
      { id: "ORD-97430", date: "Sep 1, 2026", box: "Clean Botanical Ritual (September)", amount: 28.00, status: "Delivered", tracking: "GLOW-97430-DEL" },
      { id: "ORD-96118", date: "Aug 1, 2026", box: "Golden Glow Summer Edition", amount: 28.00, status: "Delivered", tracking: "GLOW-96118-DEL" }
    ],
    receivedProducts: [
      { id: "p1", name: "Lumière Rose Peptide Nectar", brand: "AURA LUXE", rating: 5, userReview: "Absolute holy grail serum! Gives that healthy glass glow without stickiness.", img: "image/Product Collections.jpg" },
      { id: "p2", name: "Bakuchiol Cloud Cream", brand: "BOTANICA LAB", rating: 5, userReview: "So gentle and deeply soothing on my sensitive skin.", img: "image/Product Collections1.jpg" },
      { id: "p3", name: "Damask Rose Floral Hydrosol", brand: "VALMONT PURE", rating: 4, userReview: "Smells heavenly, refreshingly hydrating after a flight.", img: "image/Beauty Lifestyle Personalization2.jpg" }
    ],
    favorites: ["p1", "p4", "p6"]
  },

  // Admin Mock Database
  adminMetrics: {
    totalSubscribers: 14890,
    activeSubscribers: 13940,
    monthlyRevenue: 418320,
    churnRate: "1.8%",
    pendingFulfillment: 342,
    quizCompletions: 38400,
    averageRating: 4.92
  },

  adminCustomers: [
    { id: "CUST-101", name: "Sophia Montgomery", email: "sophia.m@example.com", box: "Velvet Radiance", plan: "Monthly", spend: "$476", status: "Active", joined: "Mar 2025" },
    { id: "CUST-102", name: "Isabella Rossi", email: "isabella.r@vogue.it", box: "Golden Glow VIP", plan: "Quarterly", spend: "$860", status: "Active", joined: "Jan 2025" },
    { id: "CUST-103", name: "Chloe Dupont", email: "chloe.dupont@paris.fr", box: "Clean Botanical", plan: "Annual", spend: "$320", status: "Active", joined: "May 2025" },
    { id: "CUST-104", name: "Jessica Taylor", email: "jtaylor92@gmail.com", box: "Velvet Radiance", plan: "Monthly", spend: "$112", status: "Paused", joined: "Jun 2025" },
    { id: "CUST-105", name: "Amara Okonjo", email: "amara.oko@luxury.ng", box: "Golden Glow VIP", plan: "Monthly", spend: "$640", status: "Active", joined: "Feb 2025" },
    { id: "CUST-106", name: "Hannah Schmidt", email: "hannah.s@berlin.de", box: "Drench & Dew", plan: "Monthly", spend: "$78", status: "Active", joined: "Aug 2025" }
  ],

  adminCoupons: [
    { code: "GLOWVIP20", discount: "20% OFF", type: "First Box", usages: 1420, active: true },
    { code: "FREESHIPGLOW", discount: "Free VIP Shipping", type: "All Orders", usages: 3890, active: true },
    { code: "AUTUMNGLOW", discount: "$10 OFF", type: "Seasonal", usages: 850, active: true }
  ]
};

// Initialize or pull from LocalStorage for live dynamic persistence across pages
function initGlowStorage() {
  if (!localStorage.getItem("GLOWBOX_STATE")) {
    localStorage.setItem("GLOWBOX_STATE", JSON.stringify(GLOW_DATA));
  }
}
initGlowStorage();

function getGlowState() {
  try {
    return JSON.parse(localStorage.getItem("GLOWBOX_STATE")) || GLOW_DATA;
  } catch (e) {
    return GLOW_DATA;
  }
}

function saveGlowState(state) {
  localStorage.setItem("GLOWBOX_STATE", JSON.stringify(state));
}
