/**
 * UNISEX SALON - Main Interactive Script
 * Pure Vanilla JavaScript (No libraries, No external APIs)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initAppointmentModal();
  initServiceFilters();
  initGalleryModal();
  initContactForm();
  initBackToTop();
  initServiceDetailTriggers();
});

/* ==========================================================================
   1. STICKY HEADER & ACTIVE NAV
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION TOGGLE
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });

  // Close when clicking a link
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('is-open')) {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   3. SERVICE DATA (CATALOG FOR DYNAMIC BOOKING & FILTERING)
   ========================================================================== */
const SALON_SERVICES = {
  men: {
    hair: [
      { id: 'm-cut', name: 'Classic Haircut', price: '₹299' },
      { id: 'm-mod-cut', name: 'Modern Haircut & Styling', price: '₹399' },
      { id: 'm-wash', name: 'Hair Wash & Conditioning', price: '₹199' },
      { id: 'm-spa', name: 'Men\'s Invigorating Hair Spa', price: '₹799' },
      { id: 'm-color', name: 'Hair Colouring / Root Touch-Up', price: '₹899' },
      { id: 'm-smooth', name: 'Hair Smoothening Treatment', price: '₹1,499' }
    ],
    beard: [
      { id: 'm-b-trim', name: 'Beard Trimming & Line Up', price: '₹199' },
      { id: 'm-b-style', name: 'Signature Beard Styling & Hot Towel', price: '₹299' },
      { id: 'm-b-shave', name: 'Traditional Clean Shave', price: '₹179' },
      { id: 'm-b-color', name: 'Beard Colouring & Tinting', price: '₹399' },
      { id: 'm-head-mass', name: 'Relaxing Head Massage (20 Mins)', price: '₹349' }
    ],
    skincare: [
      { id: 'm-cleanup', name: 'Men\'s Express Cleanup', price: '₹399' },
      { id: 'm-facial', name: 'Basic Revitalizing Facial', price: '₹599' },
      { id: 'm-detan', name: 'Face & Neck Detan Pack', price: '₹499' },
      { id: 'm-polish', name: 'Skin Polishing & Exfoliation', price: '₹999' }
    ],
    package: [
      { id: 'm-pkg-basic', name: 'Basic Grooming Package', price: '₹649' },
      { id: 'm-pkg-combo', name: 'Haircut and Beard Combo', price: '₹549' },
      { id: 'm-pkg-prem', name: 'Premium Grooming Package', price: '₹1,299' },
      { id: 'm-pkg-spa', name: 'Hair Spa and Facial Package', price: '₹1,499' }
    ]
  },
  women: {
    hair: [
      { id: 'w-cut', name: 'Women\'s Precision Haircut', price: '₹499' },
      { id: 'w-layer', name: 'Layer / Feather Haircut', price: '₹699' },
      { id: 'w-blowdry', name: 'Hair Wash & Blow Dry Styling', price: '₹399' },
      { id: 'w-spa', name: 'Deep Nourishing Hair Spa', price: '₹899' },
      { id: 'w-smooth', name: 'Hair Smoothening', price: '₹1,999' },
      { id: 'w-straight', name: 'Hair Straightening', price: '₹1,499' },
      { id: 'w-global-color', name: 'Global Hair Colour', price: '₹1,499' },
      { id: 'w-balayage', name: 'Balayage / Ombre Highlights', price: '₹2,499' }
    ],
    skincare: [
      { id: 'w-cleanup', name: 'Deep Cleansing Glow Cleanup', price: '₹399' },
      { id: 'w-fruit-facial', name: 'Nourishing Fruit Facial', price: '₹799' },
      { id: 'w-gold-facial', name: 'Gold Radiance Facial', price: '₹1,199' },
      { id: 'w-detan', name: 'Detan Treatment', price: '₹499' },
      { id: 'w-polish', name: 'Full Face & Neck Skin Polishing', price: '₹999' },
      { id: 'w-wax', name: 'Full Arms & Legs Waxing', price: '₹699' },
      { id: 'w-thread', name: 'Eyebrow & Upper Lip Threading', price: '₹119' }
    ],
    nails: [
      { id: 'w-manicure', name: 'Basic Manicure', price: '₹399' },
      { id: 'w-pedicure', name: 'Basic Pedicure', price: '₹499' },
      { id: 'w-spa-mani-pedi', name: 'Luxury Spa Manicure & Pedicure', price: '₹1,399' },
      { id: 'w-nailart', name: 'Creative Nail Art & Gel Polish', price: '₹399' }
    ],
    makeup: [
      { id: 'w-party-mu', name: 'Party Makeup & Hairstyling', price: '₹2,499' },
      { id: 'w-eng-mu', name: 'Engagement Makeup Artistry', price: '₹3,999' },
      { id: 'w-bridal-mu', name: 'Signature Bridal Makeup Package', price: '₹9,999' },
      { id: 'w-rec-mu', name: 'Reception Glam Makeup', price: '₹7,999' }
    ],
    package: [
      { id: 'w-pkg-basic', name: 'Basic Beauty Package', price: '₹999' },
      { id: 'w-pkg-hair-skin', name: 'Hair Care & Skin Glow Package', price: '₹1,899' },
      { id: 'w-pkg-prem', name: 'Premium Beauty Package', price: '₹3,499' },
      { id: 'w-pkg-bridal', name: 'Complete Bridal Beauty Package', price: '₹12,499' }
    ]
  }
};

/* ==========================================================================
   4. APPOINTMENT BOOKING MODAL & FORM LOGIC
   ========================================================================== */
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('[data-close-modal]');
  const triggerBtns = document.querySelectorAll('[data-open-booking]');

  const openModal = (prefillCategory = 'women', prefillService = '') => {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    // Set category radio
    const radio = modal.querySelector(`input[name="bookingCategory"][value="${prefillCategory}"]`);
    if (radio) {
      radio.checked = true;
    }

    // Populate service options
    updateBookingServices(modal, prefillCategory, prefillService);

    // Reset feedback
    const feedback = modal.querySelector('#appointmentConfirmation');
    const form = modal.querySelector('#appointmentForm');
    if (feedback) feedback.style.display = 'none';
    if (form) {
      form.style.display = 'block';
      form.reset();
      if (radio) radio.checked = true;
      updateBookingServices(modal, prefillCategory, prefillService);
      // set min date to today
      const dateInput = form.querySelector('#appointmentDate');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
      }
    }
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCategory = btn.getAttribute('data-category') || 'women';
      const targetService = btn.getAttribute('data-service') || '';
      openModal(targetCategory, targetService);
    });
  });

  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Handle radio toggle between Men / Women
  const radios = modal.querySelectorAll('input[name="bookingCategory"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateBookingServices(modal, radio.value);
    });
  });

  // Handle form submission
  const bookingForm = modal.querySelector('#appointmentForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleBookingSubmit);
  }

  // Also check if there is an in-page booking form (on contact.html)
  const inPageBookingForm = document.getElementById('inPageBookingForm');
  if (inPageBookingForm) {
    const inPageRadios = inPageBookingForm.querySelectorAll('input[name="bookingCategory"]');
    inPageRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        updateBookingServices(inPageBookingForm, radio.value);
      });
    });
    // initialize
    updateBookingServices(inPageBookingForm, 'women');
    const dateInput = inPageBookingForm.querySelector('#appointmentDate');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }
    inPageBookingForm.addEventListener('submit', handleBookingSubmit);
  }
}

function updateBookingServices(container, category, prefillService = '') {
  const serviceSelect = container.querySelector('#bookingService');
  if (!serviceSelect) return;

  serviceSelect.innerHTML = '<option value="">-- Choose a Service or Package --</option>';

  const catData = SALON_SERVICES[category] || SALON_SERVICES.women;

  for (const groupKey in catData) {
    const groupName = groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
    const optGroup = document.createElement('optgroup');
    optGroup.label = `${groupName.toUpperCase()} SERVICES`;

    catData[groupKey].forEach(service => {
      const opt = document.createElement('option');
      opt.value = `${service.name} (${service.price})`;
      opt.textContent = `${service.name} — starting ${service.price}`;
      if (prefillService && service.name.toLowerCase().includes(prefillService.toLowerCase())) {
        opt.selected = true;
      }
      optGroup.appendChild(opt);
    });

    serviceSelect.appendChild(optGroup);
  }
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  let isValid = true;

  // Validation
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      isValid = false;
    } else {
      input.classList.remove('is-invalid');
    }
  });

  const phoneInput = form.querySelector('[type="tel"]');
  if (phoneInput && phoneInput.value.trim()) {
    const cleanPhone = phoneInput.value.replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }
  }

  if (!isValid) return;

  // Extract values
  const customerName = form.querySelector('#bookingName')?.value || 'Guest Client';
  const customerPhone = form.querySelector('#bookingPhone')?.value || 'N/A';
  const categoryRadio = form.querySelector('input[name="bookingCategory"]:checked');
  const category = categoryRadio ? (categoryRadio.value === 'men' ? "Men's Services" : "Women's Services") : "General Services";
  const service = form.querySelector('#bookingService')?.value || 'General Consultation';
  const stylist = form.querySelector('#bookingStylist')?.value || 'First Available Specialist';
  const date = form.querySelector('#bookingDate')?.value || form.querySelector('#appointmentDate')?.value || 'Selected Date';
  const time = form.querySelector('#bookingTime')?.value || 'Selected Time';
  const notes = form.querySelector('#bookingNotes')?.value || 'No special requests';

  // Show confirmation container
  const container = form.closest('.modal-body') || form.parentElement;
  let confirmCard = container.querySelector('#appointmentConfirmation');

  if (!confirmCard) {
    confirmCard = document.createElement('div');
    confirmCard.id = 'appointmentConfirmation';
    container.appendChild(confirmCard);
  }

  confirmCard.innerHTML = `
    <div class="demo-confirmation-card">
      <div class="confirm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h3 style="margin-bottom: 0.5rem;">Appointment Request Received!</h3>
      <p style="color: var(--color-soft-grey); font-size: 0.9rem;">Thank you, ${escapeHtml(customerName)}. Here is your booking summary:</p>
      
      <div class="confirm-details">
        <div class="confirm-row">
          <span>Client Name:</span>
          <span>${escapeHtml(customerName)}</span>
        </div>
        <div class="confirm-row">
          <span>Contact Phone:</span>
          <span>${escapeHtml(customerPhone)}</span>
        </div>
        <div class="confirm-row">
          <span>Section:</span>
          <span>${escapeHtml(category)}</span>
        </div>
        <div class="confirm-row">
          <span>Selected Service:</span>
          <span>${escapeHtml(service)}</span>
        </div>
        <div class="confirm-row">
          <span>Stylist / Specialist:</span>
          <span>${escapeHtml(stylist)}</span>
        </div>
        <div class="confirm-row">
          <span>Scheduled For:</span>
          <span>${escapeHtml(date)} at ${escapeHtml(time)}</span>
        </div>
      </div>

      <div class="demo-disclaimer-alert">
        <strong>Important Demonstration Notice:</strong> This is a demonstration website. Your appointment request has not been sent to a real salon. No actual booking has occurred and no data has been transmitted.
      </div>

      <button type="button" class="btn btn-primary btn-sm" id="resetBookingFormBtn">Book Another Service</button>
    </div>
  `;

  form.style.display = 'none';
  confirmCard.style.display = 'block';

  const resetBtn = confirmCard.querySelector('#resetBookingFormBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      confirmCard.style.display = 'none';
      form.reset();
      form.style.display = 'block';
    });
  }
}

/* ==========================================================================
   5. SERVICE CATEGORY FILTERS & SEARCH (ON SERVICES.HTML)
   ========================================================================== */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('[data-service-filter]');
  const searchInput = document.getElementById('serviceSearchInput');
  const serviceCards = document.querySelectorAll('[data-service-category]');

  if (!filterBtns.length && !searchInput) return;

  const applyFilters = () => {
    const activeBtn = document.querySelector('[data-service-filter].active');
    const activeCategory = activeBtn ? activeBtn.getAttribute('data-service-filter') : 'all';
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    serviceCards.forEach(card => {
      const cardCategory = card.getAttribute('data-service-category');
      const cardText = card.innerText.toLowerCase();

      const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!query || cardText.includes(query));

      if (matchesCategory && matchesSearch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });

    // Also hide/show empty category block headers if applicable
    document.querySelectorAll('.category-block').forEach(block => {
      const visibleCards = block.querySelectorAll('[data-service-category]:not([style*="display: none"])');
      if (visibleCards.length === 0) {
        block.style.display = 'none';
      } else {
        block.style.display = '';
      }
    });
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
}

/* ==========================================================================
   6. GALLERY FILTERING & PREVIEW MODAL (ON GALLERY.HTML)
   ========================================================================== */
function initGalleryModal() {
  const filterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('galleryPreviewModal');

  // Filter functionality
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-gallery-filter');
        galleryItems.forEach(item => {
          const itemTag = item.getAttribute('data-gallery-category');
          if (filter === 'all' || itemTag === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Preview Modal functionality
  if (!modal) return;

  const modalBody = modal.querySelector('.gallery-modal-body');
  const closeBtn = modal.querySelector('[data-close-modal]');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const placeholder = item.querySelector('.img-placeholder');
      const title = item.querySelector('.gallery-overlay h4')?.innerText || 'Salon Showcase';
      const category = item.querySelector('.gallery-overlay span')?.innerText || 'Unisex Salon';

      if (placeholder) {
        // Clone placeholder for preview
        const clone = placeholder.cloneNode(true);
        clone.classList.remove('aspect-4-3', 'aspect-1-1');
        clone.classList.add('aspect-16-9');
        clone.style.minHeight = '360px';

        modalBody.innerHTML = '';
        modalBody.appendChild(clone);
        
        const caption = document.createElement('div');
        caption.style.padding = '1.2rem 0 0.5rem 0';
        caption.style.textAlign = 'center';
        caption.innerHTML = `
          <h3 style="color: var(--color-white); margin-bottom: 0.3rem;">${escapeHtml(title)}</h3>
          <p style="color: var(--color-gold); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; margin: 0;">${escapeHtml(category)}</p>
          <p style="color: #b0aaa0; font-size: 0.8rem; margin-top: 0.5rem;">Approved Placeholder concept ready for Google Flow rendering.</p>
        `;
        modalBody.appendChild(caption);
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & DEMO SUBMIT
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = contactForm.querySelector('#contactName');
    const email = contactForm.querySelector('#contactEmail');
    const phone = contactForm.querySelector('#contactPhone');
    const subject = contactForm.querySelector('#contactSubject');
    const message = contactForm.querySelector('#contactMessage');

    [name, email, phone, subject, message].forEach(field => {
      if (field && !field.value.trim()) {
        field.classList.add('is-invalid');
        isValid = false;
      } else if (field) {
        field.classList.remove('is-invalid');
      }
    });

    if (!isValid) return;

    // Show demo response
    const formBox = contactForm.parentElement;
    formBox.innerHTML = `
      <div class="demo-confirmation-card">
        <div class="confirm-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 style="margin-bottom: 0.5rem;">Message Sent Successfully!</h3>
        <p style="color: var(--color-deep-brown);">Thank you, <strong>${escapeHtml(name.value)}</strong>. We have received your inquiry regarding <em>"${escapeHtml(subject.value)}"</em>.</p>
        
        <div class="demo-disclaimer-alert" style="margin-top: 1.5rem;">
          <strong>Demonstration Notice:</strong> This is a demonstration website. Your message has not been transmitted to a real inbox or salon server.
        </div>

        <a href="index.html" class="btn btn-secondary btn-sm">Return to Homepage</a>
      </div>
    `;
  });
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   9. SERVICE CARD DETAILS MODAL / QUICK VIEW
   ========================================================================== */
function initServiceDetailTriggers() {
  document.querySelectorAll('[data-view-details]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-title') || 'Salon Service';
      const servicePrice = btn.getAttribute('data-service-price') || 'Illustrative Pricing';
      const serviceDesc = btn.getAttribute('data-service-desc') || 'Full service details available upon appointment consultation.';

      alert(`UNISEX SALON SERVICE DETAILS:\n\n• Service: ${serviceName}\n• Starting Price: ${servicePrice}\n• Details: ${serviceDesc}\n\nClick "Book Appointment" anytime to schedule!`);
    });
  });
}

/* Helper to prevent XSS in demo string interpolation */
function escapeHtml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
