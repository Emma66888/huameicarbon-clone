/* ============================================
   Huamei Activated Carbon - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ==========================================
  // Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (menuToggle && mainNav && mobileOverlay) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    mobileOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Close mobile nav when clicking a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          // Small delay to allow page navigation
          setTimeout(function() {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }, 200);
        }
      });
    });
  }

  // ==========================================
  // Mobile Dropdown Toggle
  // ==========================================
  const dropdownToggles = document.querySelectorAll('.nav-list > li > a .arrow');

  dropdownToggles.forEach(function(arrow) {
    const parentLink = arrow.parentElement;
    parentLink.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const li = parentLink.parentElement;
        li.classList.toggle('dropdown-open');
      }
    });
  });

  // ==========================================
  // Header Scroll Effect
  // ==========================================
  const mainHeader = document.getElementById('mainHeader');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // ==========================================
  // FAQ Accordion
  // ==========================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function(question) {
    question.addEventListener('click', function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-item.active').forEach(function(item) {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ==========================================
  // AOS - Animate on Scroll
  // ==========================================
  const aosElements = document.querySelectorAll('[data-aos]');

  function initAOS() {
    aosElements.forEach(function(el) {
      el.style.transitionProperty = 'opacity, transform';
      el.style.transitionTimingFunction = 'ease';
    });
  }

  function checkAOS() {
    const windowHeight = window.innerHeight;

    aosElements.forEach(function(el) {
      const rect = el.getBoundingClientRect();
      const triggerPoint = windowHeight * 0.85;

      if (rect.top < triggerPoint) {
        el.classList.add('aos-animate');
      }
    });
  }

  initAOS();
  checkAOS(); // Check on load
  window.addEventListener('scroll', checkAOS, { passive: true });

  // ==========================================
  // Smooth Scroll for Hash Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = mainHeader.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================
  // Active Nav Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    const headerHeight = mainHeader.offsetHeight + 50;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop - headerHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        document.querySelectorAll('.nav-list > li > a.active').forEach(function(link) {
          if (link.getAttribute('href') !== '#' + sectionId) {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ==========================================
  // Form Validation
  // ==========================================
  const forms = document.querySelectorAll('form');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;

      requiredFields.forEach(function(field) {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#cf2e2e';
          field.style.backgroundColor = '#fff5f5';
        } else {
          field.style.borderColor = '#dee2e6';
          field.style.backgroundColor = '';
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;

          setTimeout(function() {
            submitBtn.textContent = 'Sent Successfully!';
            submitBtn.style.background = 'linear-gradient(135deg, #00d084, #00b06b)';
            form.reset();

            setTimeout(function() {
              submitBtn.textContent = originalText;
              submitBtn.style.background = '';
              submitBtn.disabled = false;
            }, 3000);
          }, 1500);
        }
      }
    });

    // Clear error styling on input
    form.querySelectorAll('input, textarea').forEach(function(field) {
      field.addEventListener('input', function() {
        field.style.borderColor = '';
        field.style.backgroundColor = '';
      });
    });
  });

}); // End DOMContentLoaded
