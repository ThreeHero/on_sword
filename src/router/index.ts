import fileRoute from './fileRoute'
import Layout from '@/layout'

export default [
  {
    path: '/',
    element: Layout({}),
    children: [...fileRoute]
  }
]
