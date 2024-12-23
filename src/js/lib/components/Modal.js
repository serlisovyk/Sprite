export default class Modal {
  constructor({ selectors, stateClasses }) {
    this.selectors = selectors
    this.stateClasses = stateClasses

    this.modal = document.querySelector(this.selectors.modal)
    this.modalTrigger = document.querySelector(this.selectors.trigger)
    this.closeBtn = document.querySelector(this.selectors.closeBtn)

    if (this.modal && this.modalTrigger && this.closeBtn) {
      this.bindEvents()
    } else {
      console.warn(
        `Element with selector "${this.selectors.modal}" or "${this.selectors.trigger}" or "${this.selectors.closeBtn}" was not found.`
      )
    }
  }

  toggleModal = () => {
    const isVisible = this.modal.classList.toggle(this.stateClasses.visible)

    if (isVisible) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.scrollbarGutter = 'stable'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.scrollbarGutter = ''
    }
  }

  closeModalOnOverlayClick = e => e.target === this.modal && this.toggleModal()

  keyDownModalClose = e => e.code === 'Escape' && this.toggleModal()

  bindEvents() {
    this.modalTrigger?.addEventListener('click', this.toggleModal)
    this.closeBtn?.addEventListener('click', this.toggleModal)
    this.modal?.addEventListener('click', this.closeModalOnOverlayClick)
    document.addEventListener('keydown', this.keyDownModalClose)
  }

  unbindEvents() {
    this.modalTrigger?.removeEventListener('click', this.toggleModal)
    this.closeBtn?.removeEventListener('click', this.toggleModal)
    this.modal?.removeEventListener('click', this.closeModalOnOverlayClick)
    document.removeEventListener('keydown', this.keyDownModalClose)
  }

  destroy() {
    this.unbindEvents()
  }
}
