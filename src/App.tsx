import { FC, Suspense } from 'react'
import { ConfigProvider } from 'antd'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { antdTheme } from '@/config'
import routes from '@/router'

const Router = () => useRoutes(routes)

const App: FC = () => {
  return (
    <Suspense>
      <ConfigProvider locale={zhCN} theme={antdTheme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ConfigProvider>
    </Suspense>
  )
}

export default <App />
