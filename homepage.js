"use strict";

// Function to toggle accordion
const toggleAccordion = (card) => {
  const content = card.querySelector('.faq_body');
  const icon = card.querySelector('.faq_icon');
  if (content && icon) { // Check if content and icon are not null
    const questions = card.querySelectorAll('.faq-question');
    const answers = card.querySelectorAll('.faq-answer');
  
    if (content.style.maxHeight !== '0px') {
      content.style.maxHeight = '0px';
      icon.style.transform = 'rotate(0deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
      card.style.transform = 'scale(1)';
      questions.forEach(question => question.style.color = 'var(--text-color--text-alternate)');
      answers.forEach(answer => answer.style.color = 'var(--text-color--text-alternate)');
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
      icon.style.transform = 'rotate(45deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-active)';
      card.style.transform = 'scale(1.02)';
      questions.forEach(question => question.style.color = 'var(--text-color--text-primary)');
      answers.forEach(answer => answer.style.color = 'var(--text-color--text-primary)');
    }
  }
};

// Function to close all accordions and reset their styles
const closeAllAccordions = () => {
  document.querySelectorAll('.faq_accordion').forEach((card) => {
    const content = card.querySelector('.faq_body');
    const icon = card.querySelector('.faq_icon');
    if (content && icon) { // Check if content and icon are not null
      content.style.maxHeight = '0px';
      icon.style.transform = 'rotate(0deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
      card.style.transform = 'scale(1)';
      card.querySelectorAll('.faq-question').forEach(question => question.style.color = 'var(--text-color--text-alternate)');
      card.querySelectorAll('.faq-answer').forEach(answer => answer.style.color = 'var(--text-color--text-alternate)');
    }
  });
};

// Setup accordions on window load
window.onload = () => {
  const allContents = document.querySelectorAll('.faq_body');
  allContents.forEach((content) => {
    if (content) { // Ensure content is not null
      content.style.maxHeight = '0px';
    }
  });

  if (allContents.length > 0) {
    const firstAccordionContent = allContents[0];
    const firstAccordionCard = firstAccordionContent.parentNode;
    firstAccordionContent.style.maxHeight = `${firstAccordionContent.scrollHeight}px`;
    firstAccordionCard.style.backgroundColor = 'var(--backgrounds--accordion-active)';
    firstAccordionCard.style.transform = 'scale(1.02)';

    const firstAccordionIcon = firstAccordionCard.querySelector('.faq_icon');
    if (firstAccordionIcon) { // Check if the icon is not null
      firstAccordionIcon.style.transform = 'rotate(45deg)';
    }
    firstAccordionCard.querySelectorAll('.faq-question').forEach(question => question.style.color = 'var(--text-color--text-primary)');
    firstAccordionCard.querySelectorAll('.faq-answer').forEach(answer => answer.style.color = 'var(--text-color--text-primary)');
  }

  document.querySelectorAll('.faq_accordion').forEach((card) => {
    card.addEventListener('click', () => {
      closeAllAccordions();
      toggleAccordion(card);
    });
  });
};

// Handle scroll to toggle active class
const handleScroll = () => {
  const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
  
  document.querySelectorAll('.is-nav-scrolled').forEach((button) => {
    if (button) { // Ensure button is not null
      button.classList.toggle('active', scrollPercentage > 3);
    }
  });
};

// Debounce scroll events
let scrollTimeout;
document.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 100);
});
