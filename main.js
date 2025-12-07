// ====== NAVBAR & MOBILE MENU (TAILWIND STYLE) ======
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navLinksDesktop = document.getElementById("nav-links");
const menuBtnIcon = menuBtn?.querySelector("i");

// Mobile menu toggle
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle("hidden");

    const isOpen = !mobileMenu.classList.contains("hidden");
    if (menuBtnIcon) {
      menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line text-xl" : "ri-menu-line text-xl");
    }

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  // Close mobile menu when clicking any link inside it
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      if (menuBtnIcon) {
        menuBtnIcon.setAttribute("class", "ri-menu-line text-xl");
      }
      document.body.style.overflow = "auto";
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        if (menuBtnIcon) {
          menuBtnIcon.setAttribute("class", "ri-menu-line text-xl");
        }
        document.body.style.overflow = "auto";
      }
    }
  });
}

// Navbar scroll effect (add a subtle shadow / background if needed via CSS)
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (nav) {
    if (currentScroll > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// ====== SCROLLREVEAL CONFIG ======
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
  easing: "ease-out",
  reset: false,
  mobile: true,
};

if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal();

  // Home header (if present)
  sr.reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
    distance: "100px",
    duration: 1200,
  });

  sr.reveal(".header__content h4", {
    ...scrollRevealOption,
    origin: "left",
    delay: 200,
  });

  sr.reveal(".header__content .section__header", {
    ...scrollRevealOption,
    origin: "left",
    delay: 400,
  });

  sr.reveal(".header__content p", {
    ...scrollRevealOption,
    origin: "left",
    delay: 600,
  });

  sr.reveal(".header__btn", {
    ...scrollRevealOption,
    origin: "bottom",
    delay: 800,
    scale: 0.8,
  });

  // About page
  sr.reveal(".about__image img", {
    ...scrollRevealOption,
    origin: "left",
    distance: "80px",
    duration: 1200,
  });

  sr.reveal(".about__content .section__header", {
    ...scrollRevealOption,
    delay: 200,
  });

  sr.reveal(".about__content .section__description", {
    ...scrollRevealOption,
    delay: 400,
  });

  sr.reveal(".about__card", {
    ...scrollRevealOption,
    interval: 200,
    scale: 0.9,
  });

  // Class cards
  sr.reveal(".class__card", {
    ...scrollRevealOption,
    interval: 150,
    scale: 0.95,
  });

  // Trainer cards
  sr.reveal(".trainer__card", {
    ...scrollRevealOption,
    interval: 200,
    distance: "30px",
  });

  // Price cards
  sr.reveal(".price__card", {
    ...scrollRevealOption,
    interval: 200,
    scale: 0.9,
  });

  // Contact (Tailwind contact page uses these classes)
  sr.reveal(".contact-details", {
    ...scrollRevealOption,
    origin: "left",
  });

  sr.reveal(".contact-form", {
    ...scrollRevealOption,
    origin: "right",
    delay: 200,
  });

  // Profile card (optional)
  sr.reveal(".profile-page > div", {
    ...scrollRevealOption,
    distance: "40px",
    origin: "bottom",
  });
}

// ====== SWIPER (TESTIMONIALS) ======
if (typeof Swiper !== "undefined" && document.querySelector(".swiper")) {
  const swiper = new Swiper(".swiper", {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 800,
    effect: "slide",
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}

// ====== SMOOTH SCROLL ONLY FOR SAME-PAGE HASH LINKS ======
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ====== IMAGE LOADING CLASS ======
const images = document.querySelectorAll("img");
images.forEach((img) => {
  img.classList.add("loading");

  if (img.complete) {
    img.classList.remove("loading");
  } else {
    img.addEventListener("load", () => {
      img.classList.remove("loading");
    });
  }
});

// ====== COUNTER ANIMATION (IF .counter EXISTS) ======
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

const counters = document.querySelectorAll(".counter");
if (counters.length > 0) {
  const observerOptions = {
    threshold: 0.5,
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => counterObserver.observe(counter));
}

// ====== CONTACT FORM VALIDATION (TAILWIND CONTACT PAGE) ======
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const mobile = document.getElementById("mobile")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !mobile || !message) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(mobile)) {
      alert("Please enter a valid phone number");
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "✓ Message Sent!";
      submitBtn.style.background = "#10b981";

      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ====== PROFILE OPTIONS (PROFILE PAGE) ======
const profileOptions = document.querySelector(".profile-options");
if (profileOptions) {
  profileOptions.addEventListener("click", () => {
    const options = [
      "Edit Profile",
      "Change Password",
      "View Membership",
      "Logout",
    ];

    const choice = options[Math.floor(Math.random() * options.length)];
    alert(`${choice} - Feature coming soon!`);
  });
}

// ====== PARALLAX EFFECT (HOME HEADER IMAGE) ======
window.addEventListener("scroll", () => {
  const headerImage = document.querySelector(".header__image");
  if (headerImage && window.innerWidth > 768) {
    const scrolled = window.pageYOffset;
    headerImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ====== FADE-IN ANIMATION VIA INTERSECTION OBSERVER ======
const fadeElements = document.querySelectorAll(
  ".about__card, .class__card, .trainer__card, .price__card"
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

fadeElements.forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
  fadeObserver.observe(el);
});

// ====== CLASS CARD BG HOVER EFFECT (CLASSES PAGE) ======
const classCards = document.querySelectorAll(".class__card");
classCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const bg = card.querySelector(".class__bg");
    if (bg) {
      bg.style.opacity = "0.3";
      bg.style.transform = "rotate(45deg) scale(1.1)";
    }
  });

  card.addEventListener("mouseleave", () => {
    const bg = card.querySelector(".class__bg");
    if (bg) {
      bg.style.opacity = "0";
      bg.style.transform = "rotate(0deg) scale(1)";
    }
  });
});

// ====== LAZY LOAD IMAGES (IF data-src USED) ======
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ====== ACTIVE NAV LINK (TAILWIND NAV) ======
const currentPage =
  window.location.pathname.split("/").pop() || "index.html";

const allNavLinks = [
  ...(navLinksDesktop?.querySelectorAll("a") || []),
  ...(mobileMenu?.querySelectorAll("a") || []),
];

allNavLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("text-primary", "font-semibold");
  }
});

// ====== CONSOLE MESSAGES & PAGE ENTRANCE ANIMATION ======
console.log(
  "%c🏋️ Welcome to ADS GYM! 🏋️",
  "font-size: 20px; font-weight: bold; color: #f97316;"
);
console.log(
  "%cBuilt with ❤️ for fitness enthusiasts",
  "font-size: 14px; color: #64748b;"
);

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  console.log("✅ ADS GYM website loaded successfully!");
});
