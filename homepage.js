"use strict";

(function () {
  // Function to toggle accordion
  const toggleAccordion = (card) => {
    const content = card.querySelector('.faq_body');
    const icon = card.querySelector('.faq_icon');
    const questions = card.querySelectorAll('.faq-question');
    const answers = card.querySelectorAll('.faq-answer');
    const iconEmbed = card.querySelector('.faq-icon-embed');
    const isOpen = content.style.maxHeight !== '0px';

    if (!isOpen) {
      closeAllAccordions();
    }

    if (isOpen) {
      content.style.maxHeight = '0px';
      icon.style.transform = 'rotate(0deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
      card.style.transform = 'scale(1)';
      questions.forEach(question => question.classList.remove('is-active'));
      answers.forEach(answer => answer.classList.remove('is-active'));
      if (iconEmbed) {
        iconEmbed.style.color = '';
        iconEmbed.style.backgroundColor = '';
      }
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
      icon.style.transform = 'rotate(45deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-active)';
      card.style.transform = 'scale(1.02)';
      questions.forEach(question => question.classList.add('is-active'));
      answers.forEach(answer => answer.classList.add('is-active'));
      if (iconEmbed) {
        iconEmbed.style.color = 'var(--base-color-brand--indigo-50)';
        iconEmbed.style.backgroundColor = 'var(--base-color-brand--indigo-300)';
      }
    }
  };

  // Function to close all accordions and reset their styles
  const closeAllAccordions = () => {
    document.querySelectorAll('.faq_accordion').forEach((card) => {
      const content = card.querySelector('.faq_body');
      content.style.maxHeight = '0px';
      const icon = card.querySelector('.faq_icon');
      icon.style.transform = 'rotate(0deg)';
      card.style.backgroundColor = 'var(--backgrounds--accordion-default)';
      card.style.transform = 'scale(1)';
      card.querySelectorAll('.faq-question').forEach(question => question.classList.remove(
        'is-active'));
      card.querySelectorAll('.faq-answer').forEach(answer => answer.classList.remove(
        'is-active'));
      const iconEmbed = card.querySelector('.faq-icon-embed');
      if (iconEmbed) {
        iconEmbed.style.color = '';
        iconEmbed.style.backgroundColor = '';
      }
    });
  };

  // Function to setup accordions and handle initial state
  const setupAccordions = () => {
    document.querySelectorAll('.faq_body').forEach((content) => {
      content.style.maxHeight = '0px';
    });

    document.querySelectorAll('.faq_accordion').forEach((card) => {
      card.addEventListener('click', () => toggleAccordion(card));
    });

    // Open the first accordion item on load
    const firstAccordion = document.querySelector('.faq_accordion');
    if (firstAccordion) {
      toggleAccordion(firstAccordion);
    }
  };

  // Handle scroll to toggle active class
  const handleScroll = () => {
    const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (
      document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
    document.querySelectorAll('.is-nav-scrolled').forEach((button) => {
      button.classList.toggle('active', scrollPercentage > 3);
    });
  };

  // Debounce scroll events
  let scrollTimeout;
  const debounceScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 100);
  };

  // Initialization function to set up event listeners
  const init = () => {
    setupAccordions();
    document.addEventListener('scroll', debounceScroll);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init(); // DOMContentLoaded has already fired
  }
})();
