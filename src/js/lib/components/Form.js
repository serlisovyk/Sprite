export default class Form {
  constructor({ selectors, postUrl, successMessage = null, errorMessage = null }) {
    this.selectors = selectors;
    this.postUrl = postUrl;
    this.successMessage = successMessage;
    this.errorMessage = errorMessage;

    this.forms = document.querySelectorAll(this.selectors.form);

    if (this.forms.length > 0) {
      this.bindEvents();
    } else {
      console.warn(`No forms found with selector "${this.selectors.form}".`);
    }
  }

  async postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      body: data,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }

  handleSubmit = async event => {
    e.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    try {
      await this.postData(this.postUrl, formData);

      if (this.successMessage) {
        this.displayStatusMessage(form, this.successMessage, 'success');
      }
    } catch (error) {
      console.error('Error submitting form:', error);

      if (this.errorMessage) {
        this.displayStatusMessage(form, this.errorMessage, 'error');
      }
    } finally {
      this.clearForm(form);
    }
  };

  displayStatusMessage(form, message, type) {
    const messageElement = form.querySelector(this.selectors.statusMessage);

    if (messageElement) {
      messageElement.textContent = message;
      messageElement.className = '';
      messageElement.classList.add('form-status-message', `form-status-${type}`);
    }
  }

  clearForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.value = '';
    });
  }

  bindEvents() {
    this.forms.forEach(form => form.addEventListener('submit', this.handleSubmit));
  }

  unbindEvents() {
    this.forms.forEach(form =>
      form.removeEventListener('submit', this.handleSubmit)
    );
  }

  destroy() {
    this.unbindEvents();
  }
}
