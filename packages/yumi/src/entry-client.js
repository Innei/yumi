import { createApp } from './main'

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  const $el = document.getElementById('app')
  // HACK
  $el.innerHTML = ''
  app.mount($el)
})
