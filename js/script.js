// Profile Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initSmoothScroll();
  initMobileMenu();
  initActiveNavigation();
  initScrollEffects();
  initIntersectionObserver();
});

// Smooth Scrolling for Navigation Links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && mobileMenu.classList.contains('show')) {
          toggleMobileMenu();
        }

        // Smooth scroll to target with offset for fixed header
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (mobileMenu.classList.contains('show')) {
    mobileMenu.classList.remove('show');
    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    document.body.style.overflow = '';
  } else {
    mobileMenu.classList.remove('hidden');
    mobileMenu.classList.add('show');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// Active Navigation State Based on Scroll Position
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Scroll Effects for Header
function initScrollEffects() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow to header on scroll
    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }

    lastScroll = currentScroll;
  });
}

// Intersection Observer for Fade-In Animations
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for fade-in effect
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('section-fade-in');
    observer.observe(section);
  });

  // Observe skill cards
  const skillCards = document.querySelectorAll('#skills > div > div > div');
  skillCards.forEach((card, index) => {
    card.classList.add('section-fade-in');
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
  });

  // Observe project cards
  const projectCards = document.querySelectorAll('#projects > div > div > div');
  projectCards.forEach((card, index) => {
    card.classList.add('section-fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Optional: Scroll to Top Button
function initScrollToTop() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 pointer-events-none z-40';
  scrollBtn.id = 'scroll-to-top';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollBtn.classList.add('opacity-100');
    } else {
      scrollBtn.classList.add('opacity-0', 'pointer-events-none');
      scrollBtn.classList.remove('opacity-100');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Optional: Add parallax effect to hero section
function initParallaxEffect() {
  const hero = document.getElementById('home');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// Optional: Typing effect for hero title
function initTypingEffect() {
  const titleElement = document.querySelector('#home h1');
  if (!titleElement) return;

  const originalText = titleElement.textContent;
  titleElement.textContent = '';
  titleElement.style.opacity = '1';

  let i = 0;
  const typingSpeed = 50;

  function type() {
    if (i < originalText.length) {
      titleElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(type, typingSpeed);
    }
  }

  // Start typing after a short delay
  setTimeout(type, 500);
}

// Optional: Initialize additional features
// Uncomment to enable:
// initScrollToTop();
// initParallaxEffect();
// initTypingEffect();

// Handle window resize
window.addEventListener('resize', () => {
  const mobileMenu = document.getElementById('mobile-menu');

  // Close mobile menu on desktop resize
  if (window.innerWidth >= 768 && mobileMenu.classList.contains('show')) {
    toggleMobileMenu();
  }
});

// Prevent scroll when mobile menu is open
document.addEventListener('touchmove', function(e) {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && mobileMenu.classList.contains('show')) {
    e.preventDefault();
  }
}, { passive: false });

// Log initialization
console.log('Profile website initialized successfully!');
