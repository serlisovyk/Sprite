export default class Burger {
  constructor({ selectors, stateClasses }) {
    this.selectors = selectors
    this.stateClasses = stateClasses

    this.burger = document.querySelector(this.selectors.burger)
    this.navLinks = document.querySelectorAll(this.selectors.navLinks)

    if (this.burger && this.navLinks.length > 0) {
      this.bindEvents()
    } else {
      console.warn(
        `Element with selector "${this.selectors.burger}" or "${this.selectors.navLinks}" was not found.`
      )
    }
  }
  handleBurgerClick = () =>
    document.documentElement.classList.toggle(this.stateClasses.navOpen)

  handleNavLinkClose = () =>
    document.documentElement.classList.remove(this.stateClasses.navOpen)

  bindEvents() {
    this.burger?.addEventListener('click', this.handleBurgerClick)

    this.navLinks?.forEach(link =>
      link.addEventListener('click', this.handleNavLinkClose)
    )
  }

  unbindEvents() {
    this.burger?.removeEventListener('click', this.handleBurgerClick)

    this.navLinks?.forEach(link =>
      link.removeEventListener('click', this.handleNavLinkClose)
    )
  }

  destroy() {
    this.unbindEvents()
  }
}
