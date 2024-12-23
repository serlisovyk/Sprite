import ThemeSwitcher from './lib/components/ThemeSwitcher.js';
import Burger from './lib/components/Burger.js';
import Modal from './lib/components/Modal.js';
import Tabs from './lib/components/Tabs.js';
import Accordion from './lib/components/Accordion.js';
import FormValidation from './lib/components/FormValidation.js';
import Form from './lib/components/Form.js';

new ThemeSwitcher({
  selectors: {
    toggleBtn: '[data-js-theme-switcher]',
  },
  stateClasses: {
    darkTheme: 'dark-mode',
  },
});

new Burger({
  selectors: {
    burger: '.burger',
    navLinks: '.header__nav-link',
  },
  stateClasses: {
    navOpen: 'nav-open',
  },
});

new Modal({
  selectors: {
    modal: '.modal',
    trigger: '[data-modal-open]',
    closeBtn: '[data-modal-close]',
  },
  stateClasses: {
    visible: 'is-visible',
  },
});

new Tabs({
  selectors: {
    btns: '.tab-button',
    content: '.tab-content',
  },
  stateClasses: {
    activeBtn: 'active-button',
    activeContent: 'active-content',
  },
  initialIndex: 0,
});

new Accordion({
  selectors: {
    accordion: '.accordion',
    item: '.accordion__item',
    trigger: '.accordion__trigger',
    content: '.accordion__content',
  },
  stateClasses: {
    active: 'accordion__item--active',
  },
  isAccordion: true,
  initialOpenIndex: 0,
});

new FormValidation({
  selectors: {
    form: '[data-js-form]',
    fieldErrors: '[data-js-form-field-errors]',
  },
  stateClasses: {
    error: 'field__error',
  },
});

new Form({
  selectors: {
    form: '[data-js-form]',
    statusMessage: '.form-status-message',
  },
  postUrl: 'https://example.com/api/submit',
  successMessage: 'Success! We will call you soon!',
  errorMessage: 'Error! Please try again later.',
});
