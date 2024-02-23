"use strict";

// Function to toggle accordion
const toggleAccordion = (card) => {
  const content = card.querySelector('.faq_body');
  const icon = card.querySelector('.faq_icon');
  const questions = card.querySelectorAll('.faq-question');
  const answers = card.querySelectorAll('.faq-answer');

  if (content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
    card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
    card.style.transform = 'scale(1)';
    questions.forEach(question => question.classList.remove('is-active'));
    answers.forEach(answer => answer.classList.remove('is-active'));
  } else {
    content.style.maxHeight = `${content.scrollHeight}px`;
    icon.style.transform = 'rotate(45deg)';
    card.style.backgroundColor = 'var(--backgrounds--accordion-active)';
    card.style.transform = 'scale(1.02)';
    questions.forEach(question => question.classList.add('is-active'));
    answers.forEach(answer => answer.classList.add('is-active'));
  }
};

// Function to close all accordions and reset their styles
const closeAllAccordions = () => {
  document.querySelectorAll('.faq_accordion').forEach((card) => {
    const content = card.querySelector('.faq_body');
    const icon = card.querySelector('.faq_icon');
    const questions = card.querySelectorAll('.faq-question');
    const answers = card.querySelectorAll('.faq-answer');

    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
    card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
    card.style.transform = 'scale(1)';
    questions.forEach(question => question.classList.remove('is-active'));
    answers.forEach(answer => answer.classList.remove('is-active'));
  });
};

// Setup accordions on window load
window.onload = () => {
  const allContents = document.querySelectorAll('.faq_body');
  allContents.forEach((content) => {
    content.style.maxHeight = '0px';
  });

  document.querySelectorAll('.faq_accordion').forEach((card) => {
    card.addEventListener('click', () => {
      closeAllAccordions();
      toggleAccordion(card);
    });
  });

  // Open the first accordion item on load
  if (document.querySelectorAll('.faq_accordion').length > 0) {
    const firstAccordionCard = document.querySelectorAll('.faq_accordion')[0];
    toggleAccordion(firstAccordionCard);
  }
};

// Handle scroll to toggle active class
const handleScroll = () => {
  const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;

  document.querySelectorAll('.is-nav-scrolled').forEach((button) => {
    button.classList.toggle('active', scrollPercentage > 3);
  });
};

// Debounce scroll events
let scrollTimeout;
document.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 100);
});
