import routerMap from './fileRoute'
import Layout from '@/layout'
import AdminLayout from '@/admin/layout'

const { routes, adminRoutes } = routerMap || {}

export default [
  {
    path: '/',
    element: <Layout />,
    children: [...routes]
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [...adminRoutes]
  }
]
