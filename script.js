// SELECT ALL ANIMATABLE ELEMENTS
const elements = document.querySelectorAll(
  ".feature-card, .stat-card, .hero-card, .about-text, .section-heading, .video-wrapper"
);

// INTERSECTION OBSERVER FOR SCROLL ANIMATION
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // animate once only (clean UX)
      }
    });
  },
  {
    threshold: 0.15,
  }
);

// APPLY INITIAL STATE + OBSERVE
elements.forEach((el, index) => {
  el.classList.add("hidden");

  // STAGGER EFFECT (VERY IMPORTANT FOR AESTHETIC FEEL)
  el.style.transitionDelay = `${index * 0.08}s`;

  observer.observe(el);
});


// NAVBAR SCROLL EFFECT (Zoom-like clean feel)
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  lastScroll = currentScroll;
});


// SMOOTH SCROLL (extra polish)
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// VIDEO AUTO PLAY WHEN VISIBLE (VERY PREMIUM TOUCH)
const video = document.querySelector("video");

if (video) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.6 }
  );

  videoObserver.observe(video);
}