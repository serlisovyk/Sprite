export default class ThemeSwitcher {
  themes = { dark: 'dark', light: 'light' }

  constructor({ selectors, stateClasses, storageKey = 'theme' }) {
    this.selectors = selectors
    this.stateClasses = stateClasses
    this.storageKey = storageKey

    this.toggleThemeBtn = document.querySelector(this.selectors.toggleBtn)

    if (this.toggleThemeBtn && this.stateClasses.darkTheme) {
      this.setInitialTheme()
      this.bindEvents()
    } else {
      console.warn(
        `Element with selector "${this.selectors.toggleBtn}" or "${this.stateClasses.darkTheme}" was not found.`
      )
    }
  }

  get isDarkThemeCached() {
    return localStorage.getItem(this.storageKey) === this.themes.dark
  }

  setInitialTheme() {
    if (this.isDarkThemeCached) {
      document.documentElement.classList.add(this.stateClasses.darkTheme)
    } else {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches

      document.documentElement.classList.toggle(
        this.stateClasses.darkTheme,
        prefersDarkScheme
      )

      localStorage.setItem(
        this.storageKey,
        prefersDarkScheme ? this.themes.dark : this.themes.light
      )
    }
  }

  handleClick = () => {
    localStorage.setItem(
      this.storageKey,
      this.isDarkThemeCached ? this.themes.light : this.themes.dark
    )

    document.documentElement.classList.toggle(this.stateClasses.darkTheme)
  }

  bindEvents() {
    this.toggleThemeBtn?.addEventListener('click', this.handleClick)
  }

  unbindEvents() {
    this.toggleThemeBtn?.removeEventListener('click', this.handleClick)
  }

  destroy() {
    this.unbindEvents()
  }
}
