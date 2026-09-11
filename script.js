// script.js

window.onscroll = function () {
  addScrollTopButtonOnScroll();
};

function addScrollTopButtonOnScroll() {
  const scrollup = document.getElementById("scroll-up");
  if (!scrollup) return;
  if (
    document.body.scrollTop > 800 ||
    document.documentElement.scrollTop > 800
  ) {
    scrollup.classList.remove("hidden");
  } else {
    scrollup.classList.add("hidden");
  }
}

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const mobileBreakpoint = 480;
  const tabletBreakpoint = 800;

  function calculateOffset(width) {
    if (width < mobileBreakpoint) {
      return 100 + (width / mobileBreakpoint) * 412;
    } else if (width < tabletBreakpoint) {
      return (
        512 +
        ((width - mobileBreakpoint) / (tabletBreakpoint - mobileBreakpoint)) *
          376
      );
    } else {
      return 0;
    }
  }

  links.forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const windowWidth = window.innerWidth;
        const offset = calculateOffset(windowWidth);
        if (windowWidth < tabletBreakpoint) {
          const targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        } else {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });
}

function initMobileMenu() {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!menuButton || !mobileMenu) return;
  const menuLinks = mobileMenu.querySelectorAll("a");

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("show");
    menuButton.setAttribute("aria-expanded", mobileMenu.classList.contains("show"));
  });

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("show");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSmoothScroll();
  initMobileMenu();
});
