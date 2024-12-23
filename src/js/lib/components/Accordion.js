export default class Accordion {
  constructor({
    selectors,
    stateClasses,
    isAccordion = true,
    initialOpenIndex = 0,
  }) {
    this.selectors = selectors
    this.stateClasses = stateClasses
    this.isAccordion = isAccordion
    this.initialOpenIndex = initialOpenIndex

    this.accordion = document.querySelector(this.selectors.accordion)
    this.items = document.querySelectorAll(this.selectors.item)
    this.triggers = document.querySelectorAll(this.selectors.trigger)

    if (this.accordion && this.items.length && this.triggers.length) {
      this.bindEvents()
      this.initialOpen()
    } else {
      console.warn(
        `Elements with selector "${this.selectors.accordion}", "${this.selectors.item}", or "${this.selectors.trigger}" were not found.`
      )
    }
  }

  toggleItem = item => {
    item.classList.toggle(this.stateClasses.active)

    const content = item.querySelector(this.selectors.content)
    content.style.maxHeight = content.style.maxHeight
      ? ''
      : `${content.scrollHeight}px`
  }

  closeAllItems = () => {
    this.items?.forEach(item => {
      item.classList.remove(this.stateClasses.active)
      item.querySelector(this.selectors.content).style.maxHeight = ''
    })
  }

  handleTriggerClick = e => {
    const item = e.target.closest(this.selectors.item)

    if (this.isAccordion) {
      if (item.classList.contains(this.stateClasses.active)) {
        this.toggleItem(item)
      } else {
        this.closeAllItems()
        this.toggleItem(item)
      }
    } else {
      this.toggleItem(item)
    }
  }

  initialOpen = () => {
    const initialItem = this.items[this.initialOpenIndex]

    if (initialItem) {
      initialItem.classList.add(this.stateClasses.active)

      const content = initialItem.querySelector(this.selectors.content)
      content.style.maxHeight = `${content.scrollHeight}px`
    }
  }

  bindEvents() {
    this.triggers?.forEach(trigger =>
      trigger.addEventListener('click', this.handleTriggerClick)
    )
  }

  unbindEvents() {
    this.triggers?.forEach(trigger =>
      trigger.removeEventListener('click', this.handleTriggerClick)
    )
  }

  destroy() {
    this.unbindEvents()
    this.closeAllItems()
  }
}
