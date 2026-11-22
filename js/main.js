/**
 * Plum Fit Ltd - Interactive Client Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 2. Sticky Navbar Effect on Scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAnswer = faqItems[0].querySelector('.faq-answer');
    if (firstAnswer) {
      firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 30 + 'px';
    }
  }

  // 4. Hero Interactive Booking Form Handler
  const bookingForm = document.getElementById('heroBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('bookingService').value;
      const postcode = document.getElementById('bookingPostcode').value.trim();
      const phone = document.getElementById('bookingPhone').value.trim();
      const urgency = document.getElementById('bookingUrgency').value;
      const submitBtn = bookingForm.querySelector('button[type="submit"]');

      if (!postcode || !phone) {
        alert('Please provide your London postcode and contact phone number.');
        return;
      }

      // Visual feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg> Checking Availability...
      `;

      setTimeout(() => {
        bookingForm.innerHTML = `
          <div style="text-align: center; padding: 25px 10px;">
            <div style="width: 56px; height: 56px; background: #dcfce7; color: #166534; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">Request Received!</h3>
            <p style="font-size: 0.92rem; color: #64748b; line-height: 1.5; margin-bottom: 18px;">
              A Gas Safe engineer assigned to <strong>${postcode.toUpperCase()}</strong> has been notified. We will call you on <strong>${phone}</strong> within 15 minutes.
            </p>
            <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 12px; font-size: 0.85rem; color: #334155; margin-bottom: 18px;">
              <strong>Urgent Emergency?</strong> Call directly: <a href="tel:02080592307" style="color: #ef4444; font-weight: 800;">020 8059 2307</a>
            </div>
            <button type="button" onclick="window.location.reload()" class="btn btn-outline btn-block" style="font-size: 0.88rem;">Submit Another Request</button>
          </div>
        `;
      }, 1000);
    });
  }

  // 5. Postcode Radius Checker
  const postcodeForm = document.getElementById('postcodeCheckerForm');
  const postcodeResult = document.getElementById('postcodeResult');

  if (postcodeForm && postcodeResult) {
    postcodeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('postcodeQuery').value.trim().toUpperCase();
      if (!input) return;

      // London outward codes pattern
      const londonPostcodeRegex = /^(SW|SE|W|NW|EC|WC|E|CR|BR|SM|KT)[0-9]/i;

      if (londonPostcodeRegex.test(input)) {
        postcodeResult.innerHTML = `
          <div style="margin-top: 14px; background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #10b981; padding: 12px 18px; border-radius: 8px; font-size: 0.92rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>✅</span>
            <span>Great news! <strong>${input}</strong> is in our rapid response zone. Current estimated arrival: <strong>30-45 minutes</strong>.</span>
          </div>
        `;
      } else {
        postcodeResult.innerHTML = `
          <div style="margin-top: 14px; background: rgba(56, 189, 248, 0.15); border: 1px solid #38bdf8; color: #38bdf8; padding: 12px 18px; border-radius: 8px; font-size: 0.92rem; font-weight: 600; display: flex; align-items: center; gap: 8px;">
            <span>ℹ️</span>
            <span>We cover <strong>${input}</strong> for planned plumbing, boiler installations and scheduled heating repairs. Call <a href="tel:02080592307" style="color:white;text-decoration:underline;">020 8059 2307</a> to confirm slot.</span>
          </div>
        `;
      }
    });
  }

  // 6. Keyframes for spinner animation
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
});
