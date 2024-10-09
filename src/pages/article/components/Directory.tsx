import { Drawer } from 'antd'
import { observer } from 'mobx-react'
import { MDEditor } from '@/components'

const Directory = ({ store }) => {
  return (
    <Drawer
      open={store.mobileDrawerVisible}
      onClose={() => (store.mobileDrawerVisible = false)}
      placement={'bottom'}
      title="目录"
    >
      <MDEditor.Navbar value={store.articleInfo.content || ''} />
    </Drawer>
  )
}

export default observer(Directory)
