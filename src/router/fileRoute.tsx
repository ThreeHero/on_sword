import { lazy } from 'react'
import { Inject } from '@/hoc'
const replaceIndex = path => path.replaceAll('./', '').replace(/(\/?index)?\.[jt]sx?/g, '')
const whiteRoute = ['api', 'components', 'store', 'layout']

const getRoutes = (pageName: string) => {
  // require.context 用变量报错
  const map = {
    pages: require.context(`../pages`, true, /\.[jt]sx?$/),
    admin: require.context(`../admin`, true, /\.[jt]sx?$/)
  }
  const context = map[pageName]
  return context
    .keys()
    .map((modulePath: string) => {
      const filePath = replaceIndex(modulePath)
      for (const file of filePath.split('/') || []) {
        if (whiteRoute.includes(file)) {
          return null
        }
      }
      return filePath
    })
    .filter((filePath: string) => Boolean(filePath) || filePath === '')
}

const getRoutesFile = pageName => {
  const map = {
    pages: '/',
    admin: '/admin'
  }
  return getRoutes(pageName).map(file => {
    const Component = lazy(() => import(`@/${pageName}/` + file))
    // 判断
    const path =
      map[pageName] + file.replaceAll('/[', '[').replaceAll('[', '/:').replaceAll(']', '')
    return {
      path,
      element: Inject(Component)()
    }
  })
}

const routes = getRoutesFile('pages')
const adminRoutes = getRoutesFile('admin')

export default {
  routes,
  adminRoutes
}
