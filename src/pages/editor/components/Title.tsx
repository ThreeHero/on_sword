import { observer } from 'mobx-react'
import styles from '../styles.less'
import { Button, Form, Input } from 'antd'
import SubmitDrawer from './SubmitDrawer'

const Title = ({ store }) => {
  return (
    <div className={styles.title}>
      {/* 标题输入框 */}
      <Form.Item name="title" noStyle>
        <input className={styles.titleInput} placeholder="请输入标题.." />
      </Form.Item>
      {/* 提示信息 和 提交按钮 */}
      <div className={styles.titleInfo}>
        <div className={styles.tip}>文章将自动保存，直到关闭浏览器</div>
        <Button type="primary" ghost onClick={() => (store.submitDrawer = true)}>
          下一步
        </Button>
      </div>
      <SubmitDrawer store={store} />
    </div>
  )
}

export default observer(Title)
