/**
 * JR MODULARS — PREMIUM LUXURY INTERIOR WEBSITE
 * Interactive Functionality & Behavioral Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize current year
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Initialize Sticky Header
  initStickyHeader();

  // Initialize Mobile Menu
  initMobileMenu();

  // Initialize Scroll Spy
  initScrollSpy();

  // Initialize Gallery Filter
  initGalleryFilter();

  // Initialize Keyboard Listeners (Esc for modals)
  initKeyboardListeners();
});

/* ==========================================================================
   1. STICKY HEADER TRANSITION
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check
}

/* ==========================================================================
   2. MOBILE MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileDrawer) return;

  const toggleMenu = () => {
    const isOpen = menuToggle.classList.toggle('open');
    mobileDrawer.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
}

function closeMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.classList.remove('open');
    mobileDrawer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. SCROLL SPY (NAV HIGHLIGHTING)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], main > section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length) return;

  const onScroll = () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ==========================================================================
   4. GALLERY FILTER & LIGHTBOX
   ========================================================================== */
const galleryItemsData = [
  {
    category: 'Modular Kitchen',
    title: 'Grand Island Kitchen with Warm Lighting',
    location: 'Hyderabad Luxury Residence',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'Wardrobe',
    title: 'Minimalist Smoked Glass & Wood Wardrobe',
    location: 'Master Bedroom Suite, Hyderabad',
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'TV Unit',
    title: 'Fluted Wood Panel & Acoustic Media Wall',
    location: 'Contemporary Living Room, Bowrampet',
    src: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'Modular Kitchen',
    title: 'Matte Charcoal & Marble Splashback Kitchen',
    location: 'Gated Community Apartment, Bachupally',
    src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'Living & Dining',
    title: 'Seamless Modular Living & Dining Concept',
    location: 'Luxury Villa Interior, Kompally',
    src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'TV Unit',
    title: 'Minimalist Floating Media Credenza',
    location: 'Lounge Space, Miyapur',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'Modular Kitchen',
    title: 'Sleek Handleless Ergonomic Kitchen',
    location: 'High-Rise Apartment, Kukatpally',
    src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85'
  },
  {
    category: 'Wardrobe',
    title: 'Walk-In Dressing Suite with Integrated Mirrors',
    location: 'Penthouse Wardrobe, Hyderabad',
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85'
  }
];

let currentLightboxIndex = 0;

function initGalleryFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();

  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function updateLightboxContent() {
  const item = galleryItemsData[currentLightboxIndex];
  if (!item) return;

  const imageEl = document.getElementById('lightboxImage');
  const catEl = document.getElementById('lightboxCategory');
  const titleEl = document.getElementById('lightboxTitle');
  const descEl = document.getElementById('lightboxDescription');

  if (imageEl) imageEl.src = item.src;
  if (catEl) catEl.textContent = item.category;
  if (titleEl) titleEl.textContent = item.title;
  if (descEl) descEl.textContent = item.location;
}

function nextLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex + 1) % galleryItemsData.length;
  updateLightboxContent();
}

function prevLightboxImage() {
  currentLightboxIndex = (currentLightboxIndex - 1 + galleryItemsData.length) % galleryItemsData.length;
  updateLightboxContent();
}

/* ==========================================================================
   5. CONSULTATION MODAL
   ========================================================================== */
function openConsultationModal(preselectedService = '') {
  const modal = document.getElementById('consultModal');
  const serviceSelect = document.getElementById('modalService');

  if (serviceSelect && preselectedService) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(preselectedService.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeConsultationModal() {
  const modal = document.getElementById('consultModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function handleModalSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('modalName')?.value || '';
  const phone = document.getElementById('modalPhone')?.value || '';
  const service = document.getElementById('modalService')?.value || '';
  const location = document.getElementById('modalLocation')?.value || 'Hyderabad';

  // Format WhatsApp message link
  const messageText = `Hello JR MODULARS,%0A%0AI would like to book a free interior design consultation.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(service)}%0A*Locality:* ${encodeURIComponent(location)}%0A%0APlease connect with me regarding 3D designs and quotation.`;
  const whatsappUrl = `https://wa.me/918096582023?text=${messageText}`;

  // Hide form, show success
  const form = document.getElementById('modalConsultForm');
  const successBox = document.getElementById('modalSuccess');

  if (form) form.style.display = 'none';
  if (successBox) successBox.style.display = 'block';

  // Automatically offer direct WhatsApp link redirect in a polite tab
  window.open(whatsappUrl, '_blank');
}

/* ==========================================================================
   6. CONTACT SECTION FORM SUBMISSION
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('fullName')?.value || '';
  const phone = document.getElementById('phoneNumber')?.value || '';
  const propertyType = document.getElementById('propertyType')?.value || '';
  const service = document.getElementById('serviceRequirement')?.value || '';
  const locality = document.getElementById('locality')?.value || 'Hyderabad';
  const notes = document.getElementById('message')?.value || 'N/A';

  const messageText = `Hello JR MODULARS,%0A%0AI have submitted an interior inquiry on your website:%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Property Type:* ${encodeURIComponent(propertyType)}%0A*Requirement:* ${encodeURIComponent(service)}%0A*Locality:* ${encodeURIComponent(locality)}%0A*Space Details:* ${encodeURIComponent(notes)}%0A%0APlease connect with me for site consultation.`;
  const whatsappUrl = `https://wa.me/918096582023?text=${messageText}`;

  const form = document.getElementById('contactForm');
  const successCard = document.getElementById('formSuccessMessage');

  if (form) form.style.display = 'none';
  if (successCard) successCard.style.display = 'block';

  // Open WhatsApp in new tab for high lead capture
  window.open(whatsappUrl, '_blank');
}

function resetFormState() {
  const form = document.getElementById('contactForm');
  const successCard = document.getElementById('formSuccessMessage');

  if (form) {
    form.reset();
    form.style.display = 'flex';
  }
  if (successCard) {
    successCard.style.display = 'none';
  }
}

/* ==========================================================================
   7. KEYBOARD ACCESSIBILITY
   ========================================================================== */
function initKeyboardListeners() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeConsultationModal();
      closeMobileMenu();
    } else if (e.key === 'ArrowRight') {
      const lightboxModal = document.getElementById('lightboxModal');
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        nextLightboxImage();
      }
    } else if (e.key === 'ArrowLeft') {
      const lightboxModal = document.getElementById('lightboxModal');
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        prevLightboxImage();
      }
    }
  });
}
