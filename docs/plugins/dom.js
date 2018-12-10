export default {
  install () {
    if (typeof window !== 'undefined') {
      if (/windows/i.test(navigator.userAgent)) {
        document.documentElement.classList.add('is-windows')
      }
    }
  }
}
