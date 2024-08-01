import { createRoot } from 'react-dom/client'
import App from './App'
import './utils'
import './app.less'

const root = document.getElementById('root')

// 捕捉全局未捕获的异常
window.addEventListener('unhandledrejection', e => {
  e.preventDefault()
  console.error(e.reason)
})

window.addEventListener('error', e => {
  e.preventDefault()
})

// window.addEventListener('resize', e => {
//   console.log(e)
// })

if (root) {
  createRoot(root).render(App)
}
