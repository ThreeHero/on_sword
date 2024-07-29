import { createRoot } from 'react-dom/client'

import App from './App'
import './utils'
import './app.less'

const root = document.getElementById('root')

// 捕捉全局未捕获的异常
window.addEventListener('unhandledrejection', e => {
  e.preventDefault()
})

if (root) {
  createRoot(root).render(App)
}
