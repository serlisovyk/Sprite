export default class FormValidation {
  errorMessages = {
    valueMissing: () => 'Please fill out this field',
    patternMismatch: ({ title }) => title || 'The input does not match the pattern',
    tooShort: ({ minLength }) => `Too short, minimum characters: ${minLength}`,
    tooLong: ({ maxLength }) => `Too long, maximum characters: ${maxLength}`,
  };

  constructor({ selectors, stateClasses }) {
    this.selectors = selectors;
    this.stateClasses = stateClasses;

    this.bindEvents();
  }

  manageErrors(fieldControlElement, errorMessages) {
    const fieldErrorsElement = fieldControlElement.parentElement.querySelector(
      this.selectors.fieldErrors
    );

    fieldErrorsElement.innerHTML = errorMessages
      .map(message => `<span class="${this.stateClasses.error}">${message}</span>`)
      .join('');
  }

  validateField(fieldControlElement) {
    const errors = fieldControlElement.validity;
    const errorMessages = [];

    Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
      if (errors[errorType]) {
        errorMessages.push(getErrorMessage(fieldControlElement));
      }
    });

    this.manageErrors(fieldControlElement, errorMessages);

    const isValid = errorMessages.length === 0;

    fieldControlElement.ariaInvalid = !isValid;

    return isValid;
  }

  handleBlur(event) {
    const { target } = event;
    const isFormField = target.closest(this.selectors.form);
    const isRequired = target.required;

    if (isFormField && isRequired) this.validateField(target);
  }

  handleChange(event) {
    const { target } = event;
    const isRequired = target.required;
    const isToggleType = ['radio', 'checkbox'].includes(target.type);

    if (isToggleType && isRequired) this.validateField(target);
  }

  handleSubmit(event) {
    const isFormElement = event.target.matches(this.selectors.form);
    if (!isFormElement) return;

    let isFormValid = true;
    let firstInvalidFieldControl = null;

    [...event.target.elements]
      .filter(({ required }) => required)
      .forEach(element => {
        const isFieldValid = this.validateField(element);

        if (!isFieldValid) {
          isFormValid = false;

          if (!firstInvalidFieldControl) {
            firstInvalidFieldControl = element;
          }
        }
      });

    if (!isFormValid) {
      event.preventDefault();
      firstInvalidFieldControl.focus();
    }
  }

  bindEvents() {
    document.addEventListener('blur', event => this.handleBlur(event), {
      capture: true,
    });

    document.addEventListener('change', event => this.handleChange(event));
    document.addEventListener('submit', event => this.handleSubmit(event));
  }

  unbindEvents() {
    document.removeEventListener('blur', event => this.handleBlur(event), {
      capture: true,
    });

    document.removeEventListener('change', event => this.handleChange(event));
    document.removeEventListener('submit', event => this.handleSubmit(event));
  }

  destroy() {
    this.unbindEvents();
  }
}
