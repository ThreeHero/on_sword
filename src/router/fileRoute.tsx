import { lazy } from 'react'
import { Inject } from '@/hoc'
const replaceIndex = path => path.replaceAll('./', '').replace(/(\/?index)?\.[jt]sx?/g, '')
const whiteRoute = ['api', 'components', 'store']

const getRoutes = () => {
  const context = require.context('../pages', true, /\.[jt]sx?$/)
  return context
    .keys()
    .map((modulePath: string) => {
      const filePath = replaceIndex(modulePath)
      if (whiteRoute.includes(filePath.split('/')?.[1])) {
        return null
      }
      return filePath
    })
    .filter((filePath: string) => Boolean(filePath) || filePath === '')
}

const routes = getRoutes()

const routesFile = routes.map(file => {
  const Component = lazy(() => import('@/pages/' + file))
  // 判断
  const path = '/' + file.replaceAll('/[', '[').replaceAll('[', '/:').replaceAll(']', '')
  return {
    path,
    element: Inject(Component)()
  }
})

export default routesFile
