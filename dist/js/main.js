// Variables
const dropdownMenu = document.querySelector('.navbar__dropdown-menu');
const menuBtn = document.querySelector('.navbar__menu-btn');
const dropdownMenuItems = document.querySelectorAll('.navbar__dropdown-menu-item');
const navbarLinks = document.querySelectorAll(".navbar__menu-item a");
const navbarDropdownLinks = document.querySelectorAll(".navbar__dropdown-menu-item a");
const sections = document.querySelectorAll("section");
const activeClassName = "active";

// Toggle dropdown menu
function toggleDropdownMenu() {
  dropdownMenu.classList.toggle('is-visible');
  menuBtn.classList.toggle('is-active');
}

// Event listeners
menuBtn.addEventListener('click', toggleDropdownMenu);
dropdownMenuItems.forEach(item => item.addEventListener('click', toggleDropdownMenu));
document.body.onload = () => dropdownMenu.classList.remove('is-visible');
window.addEventListener('beforeunload', () => { document.body.style.display = 'none'; window.scrollTo(0, 0); });
document.addEventListener('DOMContentLoaded', () => AOS.init());

// Scroll to section
function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href");
  const targetSection = document.querySelector(targetId);
  targetSection.scrollIntoView({ behavior: "smooth" });
}

navbarLinks.forEach(link => link.addEventListener("click", scrollToSection));
navbarDropdownLinks.forEach(link => link.addEventListener("click", scrollToSection));

// Set active navlink on scroll
function setActiveNavLink() {
  let currentActive = null;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
      currentActive = section.getAttribute("id");
    }
  });

  navbarLinks.forEach(link => {
    const linkHref = link.getAttribute("href").slice(1);
    link.parentElement.classList.toggle(activeClassName, currentActive === linkHref);
  });

  navbarDropdownLinks.forEach(link => {
    const linkHref = link.getAttribute("href").slice(1);
    link.classList.toggle(activeClassName, currentActive === linkHref);
  });
}

document.addEventListener("scroll", setActiveNavLink);
