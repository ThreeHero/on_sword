import { createRoot } from 'react-dom/client'

import App from './App'
import './utils'
import './app.less'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(App)
}
