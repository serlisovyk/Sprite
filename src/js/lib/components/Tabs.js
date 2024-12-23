export default class Tabs {
  constructor({ selectors, stateClasses, initialIndex = 0 }) {
    this.selectors = selectors
    this.stateClasses = stateClasses

    this.btns = document.querySelectorAll(this.selectors.btns)
    this.content = document.querySelectorAll(this.selectors.content)

    if (this.btns.length && this.content.length) {
      this.bindEvents()
      this.showTab(initialIndex)
    } else {
      console.warn(
        `Element with selector "${this.selectors.btns}" or "${this.selectors.content}" was not found.`
      )
    }
  }

  showTab(index) {
    this.btns?.forEach((btn, i) =>
      btn.classList.toggle(this.stateClasses.activeBtn, i === index)
    )

    this.content?.forEach((content, i) =>
      content.classList.toggle(this.stateClasses.activeContent, i === index)
    )
  }

  handleTabClick = e => {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && (e.key === 'Enter' || e.key === ' '))
    ) {
      const index = Array.from(this.btns).indexOf(e.target)
      if (index > -1) this.showTab(index)
    }
  }

  bindEvents() {
    document.addEventListener(
      'click',
      e => e.target.matches(this.selectors.btns) && this.handleTabClick(e)
    )
  }

  unbindEvents() {
    document.removeEventListener(
      'click',
      e => e.target.matches(this.selectors.btns) && this.handleTabClick(e)
    )
  }

  destroy() {
    this.unbindEvents()
  }
}
