import { FC } from 'react'
import { Outlet } from 'react-router'

import Header from './Header'
import ToolBar from './ToolBar'

import styles from './index.less'

const Layout: FC = () => {
  return (
    <div className={styles.container}>
      {/*  Header  */}
      <Header />
      {/*  toolbar */}
      <ToolBar />
      {/*  content */}
      <Outlet />
    </div>
  )
}

export default Layout
